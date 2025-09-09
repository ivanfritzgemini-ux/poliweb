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
import { PlusCircle, Search, MoreHorizontal } from 'lucide-react';
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
import { getStaff } from '@/lib/actions';
import { formatChileanRut } from '@/lib/utils';

export function StaffList() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      const staffData = await getStaff();
      setStaff(staffData);
    };
    fetchStaff();
  }, []);

  const filteredStaff = useMemo(() =>
    staff.filter(person =>
      `${person.nombres} ${person.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
    ), [staff, searchTerm]);

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

  const handleStatusChange = (rut: string, status: 'active' | 'inactive') => {
    setStaff(prev => prev.map(s => s.rut === rut ? { ...s, status } : s));
  };


  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir Personal
              </Button>
            </DialogTrigger>
          </div>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RUT</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Sexo</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((person) => (
                    <TableRow key={person.rut}>
                      <TableCell className="font-medium">{formatChileanRut(person.rut)}</TableCell>
                      <TableCell>{`${person.nombres} ${person.apellidos}`}</TableCell>
                      <TableCell>{person.sexo?.nombre}</TableCell>
                      <TableCell className="hidden md:table-cell">{person.email}</TableCell>
                      <TableCell>{person.role?.nombre_rol}</TableCell>
                      <TableCell>
                        <Badge variant={person.status === 'active' ? 'default' : 'secondary'}>
                          {person.status === 'active' ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
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
                            {person.status === 'active' ? (
                               <DropdownMenuItem onClick={() => handleStatusChange(person.rut, 'inactive')}>Desactivar cuenta</DropdownMenuItem>
                            ) : (
                               <DropdownMenuItem onClick={() => handleStatusChange(person.rut, 'active')}>Activar cuenta</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No se encontró personal.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Añadir Nuevo Personal</DialogTitle>
          <DialogDescription>
            Cree una nueva cuenta para un miembro del personal.
          </DialogDescription>
        </DialogHeader>
        <AddStaffForm onStaffAdded={handleAddStaff} />
      </DialogContent>

      {selectedStaff && (
        <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-headline">Editar Personal</DialogTitle>
              <DialogDescription>
                Actualice la información del miembro del personal.
              </DialogDescription>
            </DialogHeader>
            <EditStaffForm staff={selectedStaff} onStaffUpdated={handleStaffUpdated} />
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}

