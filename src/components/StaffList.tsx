'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Staff } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Search, MoreHorizontal, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import { AddStaffForm } from './AddStaffForm';
import { EditStaffForm } from './EditStaffForm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from './ui/card';
import { formatChileanRut } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';
import { getStaff, updateStaff, getSexos, getRoles } from '@/lib/actions';

type SortableKeys = 'rut' | 'nombreCompleto' | 'rol' | 'status';
type SortDirection = 'ascending' | 'descending';

type SortConfig = {
  key: SortableKeys | null;
  direction: SortDirection;
};

export function StaffList() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [sexos, setSexos] = useState<{ id: string; nombre: string }[]>([]);
  const [roles, setRoles] = useState<{ id: string; nombre_rol: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'ascending' });
  const { toast } = useToast();

  useEffect(() => {
    const fetchStaff = async () => {
      setIsLoading(true);
      try {
        const [staffData, sexosData, rolesData] = await Promise.all([
          getStaff(),
          getSexos(),
          getRoles(),
        ]);
        setStaff(staffData);
        setSexos(sexosData as { id: string; nombre: string }[]);
        setRoles(rolesData as { id: string; nombre_rol: string }[]);
      } catch (error) {
        console.error("Failed to fetch initial data", error);
        toast({
          title: 'Error de Carga',
          description: 'No se pudieron cargar los datos del personal.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchStaff();
  }, []);

  const filteredStaff = useMemo(() =>
    staff.filter(person =>
      `${person.nombres} ${person.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
    ), [staff, searchTerm]);
  
  const sortedAndFilteredStaff = useMemo(() => {
    let sortableItems = [...filteredStaff];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (sortConfig.key === 'nombreCompleto') {
          aValue = `${a.nombres} ${a.apellidos}`;
          bValue = `${b.nombres} ${b.apellidos}`;
        } else if (sortConfig.key === 'rol') {
          aValue = a.role?.nombre_rol || '';
          bValue = b.role?.nombre_rol || '';
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredStaff, sortConfig]);
  
  const handleAddStaff = (newStaffMember: Staff) => {
    setStaff(prev => [newStaffMember, ...prev]);
    setIsFormOpen(false);
  };
  
  const handleEditClick = (person: Staff) => {
    setSelectedStaff(person);
    setIsEditFormOpen(true);
  };

  const handleStaffUpdated = (updatedStaff: Staff) => {
    setStaff(prev => prev.map(s => s.rut === updatedStaff.rut ? updatedStaff : s));
    setIsEditFormOpen(false);
    setSelectedStaff(null);
  };

  const handleStatusChange = async (person: Staff, status: boolean) => {
    try {
      await updateStaff(person.rut, { status }, person.id);
      setStaff(prev => prev.map(s => s.rut === person.rut ? { ...s, status } : s));
      toast({
        title: 'Estado Actualizado',
        description: `La cuenta de ${person.nombres} ${person.apellidos} ha sido ${status ? 'activada' : 'desactivada'}.`,
      });
    } catch (error: any) {
      toast({
        title: 'Error al actualizar estado',
        description: error.message || 'Ocurrió un error desconocido.',
        variant: 'destructive',
      });
    }
  };

  const requestSort = (key: SortableKeys) => {
    let direction: SortDirection = 'descending';
    if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortableKeys) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />;
  };

  const TableSkeleton = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="p-2 sm:p-4"><Skeleton className="h-6 w-20" /></TableHead>
          <TableHead className="p-2 sm:p-4"><Skeleton className="h-6 w-32" /></TableHead>
          <TableHead className="hidden sm:table-cell p-2 sm:p-4"><Skeleton className="h-6 w-16" /></TableHead>
          <TableHead className="hidden md:table-cell p-2 sm:p-4"><Skeleton className="h-6 w-40" /></TableHead>
          <TableHead className="p-2 sm:p-4"><Skeleton className="h-6 w-20" /></TableHead>
          <TableHead className="p-2 sm:p-4"><Skeleton className="h-6 w-20" /></TableHead>
          <TableHead className="text-right p-2 sm:p-4"><Skeleton className="h-6 w-16" /></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, i) => <TableRow key={i} className="text-xs sm:text-sm"><TableCell colSpan={7}><Skeleton className="h-8 w-full" /></TableCell></TableRow>)}
      </TableBody>
    </Table>
  );

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <Card>
        <CardContent className="p-2 sm:p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <PlusCircle className="mr-0 h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Añadir Personal</span>
              </Button>
            </DialogTrigger>
          </div>
          <div className="rounded-lg border">
            {isLoading ? <TableSkeleton /> : (
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-2 sm:p-4">
                    <Button variant="ghost" onClick={() => requestSort('rut')}>RUT {getSortIcon('rut')}</Button>
                  </TableHead>
                  <TableHead className="p-2 sm:p-4">
                    <Button variant="ghost" onClick={() => requestSort('nombreCompleto')}>Nombre {getSortIcon('nombreCompleto')}</Button>
                  </TableHead>
                  <TableHead className="hidden sm:table-cell p-2 sm:p-4">Sexo</TableHead>
                  <TableHead className="hidden md:table-cell p-2 sm:p-4">Email</TableHead>
                  <TableHead className="p-2 sm:p-4">
                    <Button variant="ghost" onClick={() => requestSort('rol')}>Rol {getSortIcon('rol')}</Button>
                  </TableHead>
                  <TableHead className="p-2 sm:p-4">
                    <Button variant="ghost" onClick={() => requestSort('status')}>Estado {getSortIcon('status')}</Button>
                  </TableHead>
                  <TableHead className="text-right p-2 sm:p-4">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAndFilteredStaff.length > 0 ? (
                  sortedAndFilteredStaff.map((person) => (
                    <TableRow key={person.rut} className="text-xs sm:text-sm">
                      <TableCell className="font-medium p-2 sm:p-4">{formatChileanRut(person.rut)}</TableCell>
                      <TableCell className="p-2 sm:p-4">{`${person.nombres} ${person.apellidos}`}</TableCell>
                      <TableCell className="hidden sm:table-cell p-2 sm:p-4">{person.sexo?.nombre}</TableCell>
                      <TableCell className="hidden md:table-cell p-2 sm:p-4">{person.email}</TableCell>
                      <TableCell className="p-2 sm:p-4">{person.role?.nombre_rol}</TableCell>
                      <TableCell className="p-2 sm:p-4">
                        <Badge variant={person.status ? 'default' : 'secondary'}>
                          {person.status ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right p-2 sm:p-4">
                         <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menú</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditClick(person)}>Editar información</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {person.status ? (
                               <DropdownMenuItem onClick={() => handleStatusChange(person, false)}>Desactivar cuenta</DropdownMenuItem>
                            ) : (
                               <DropdownMenuItem onClick={() => handleStatusChange(person, true)}>Activar cuenta</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                 </TableRow>
                ))) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No se encontró personal.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            )}
          </div>
        </CardContent>
      </Card>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Nuevo Personal</DialogTitle>
          <DialogDescription>
            Complete los datos para crear una nueva cuenta.
          </DialogDescription>
        </DialogHeader>
        <AddStaffForm onStaffAdded={handleAddStaff} sexos={sexos} roles={roles} />
      </DialogContent>

      {selectedStaff && (
        <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-headline">Editar Personal</DialogTitle>
              <DialogDescription>
                Actualice los datos del miembro del personal.
              </DialogDescription>
            </DialogHeader>
            <EditStaffForm staff={selectedStaff} onStaffUpdated={handleStaffUpdated} sexos={sexos} roles={roles} />
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
