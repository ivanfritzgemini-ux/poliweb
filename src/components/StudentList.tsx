'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Student } from '@/lib/types';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle, Search } from 'lucide-react';
import { EnrollStudentForm } from './EnrollStudentForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { getStudents, getSexos, getCourses } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';

export function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [sexos, setSexos] = useState<{ id: string; nombre: string }[]>([]);
  const [courses, setCourses] = useState<{ id: string; nombre: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [studentsData, sexosData, coursesData] = await Promise.all([
          getStudents(),
          getSexos(),
          getCourses(),
        ]);

        setStudents(studentsData as Student[]);
        setSexos(sexosData as { id: string; nombre: string }[]);
        setCourses(coursesData as { id: string; nombre: string }[]);
      } catch (error) {
        toast({
          title: 'Error al cargar datos',
          description: 'No se pudieron cargar los datos iniciales.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [toast]);

  const filteredStudents = useMemo(() =>
    students.filter(student =>
      `${student.nombres} ${student.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase())
    ), [students, searchTerm]);

  const maxId = useMemo(() => {
    if (students.length === 0) {
      return 0;
    }
    return Math.max(...students.map(s => parseInt(s.id, 10)));
  }, [students]);

  const handleAddStudent = (newStudent: Student) => {
    setStudents(prev => [newStudent, ...prev]);
    setIsFormOpen(false);
  };

  const TableSkeleton = () => (
    <Table>
      <TableHeader>
        <TableRow key="skeleton-header">
          {[...Array(10)].map((_, i) => <TableHead key={i}><Skeleton className="h-5 w-full" /></TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, i) => (
          <TableRow key={i}>
            <TableCell colSpan={10}>
              <Skeleton className="h-8 w-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, ID, grado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Matricular Estudiante
              </Button>
            </DialogTrigger>
          </div>
          <div className="rounded-lg border">
            {isLoading ? <TableSkeleton /> : (
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Nº Registro</TableHead>
                  <TableHead>RUT</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="hidden md:table-cell">Sexo</TableHead>
                  <TableHead className="hidden lg:table-cell">Fec. Nacimiento</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead className="hidden lg:table-cell">Fec. Matrícula</TableHead>
                  <TableHead className="hidden lg:table-cell">Fec. Retiro</TableHead>
                  <TableHead className="text-right w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.id}
                      </TableCell>
                      <TableCell>{student.rut}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {`${student.nombres} ${student.apellidos}`}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{student.sexo?.nombre}</TableCell>
                      <TableCell className="hidden lg:table-cell">{new Date(student.fecha_nacimiento).toLocaleDateString('es-ES')}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell className="hidden lg:table-cell">{new Date(student.enrollmentDate).toLocaleDateString('es-ES')}</TableCell>
                      <TableCell className="hidden lg:table-cell">{student.fecha_retiro ? new Date(student.fecha_retiro).toLocaleDateString('es-ES') : '-'}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center">
                      No se encontraron estudiantes.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            )}
          </div>
        </CardContent>
      </Card>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline">Matricular Nuevo Estudiante</DialogTitle>
          <DialogDescription>
            Complete los detalles a continuación para registrar a un nuevo estudiante. Se generará una foto de perfil por IA si no se carga una.
          </DialogDescription>
        </DialogHeader>
        <EnrollStudentForm onStudentAdded={handleAddStudent} nextId={maxId + 1} sexos={sexos} courses={courses} />
      </DialogContent>
    </Dialog>
  );
}
