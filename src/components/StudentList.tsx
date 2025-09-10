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
import { PlusCircle, Search } from 'lucide-react';
import { EnrollStudentForm } from './EnrollStudentForm';
import { EditStudentForm } from './EditStudentForm';
import { Card, CardContent } from './ui/card';
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // You can make this configurable
  const [totalStudents, setTotalStudents] = useState(0);

  const totalPages = useMemo(() => Math.ceil(totalStudents / pageSize), [totalStudents, pageSize]);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const { students: studentsData, totalCount } = await getStudents(currentPage, pageSize);
        const sortedStudents = (studentsData as Student[]).sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
        setStudents(sortedStudents);
        setTotalStudents(totalCount);
      } catch (error) {
        toast({
          title: 'Error al cargar estudiantes',
          description: 'No se pudieron cargar los datos de los estudiantes.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchSexosAndCourses = async () => {
      try {
        const [sexosData, coursesData] = await Promise.all([
          getSexos(),
          getCourses(),
        ]);
        setSexos(sexosData as { id: string; nombre: string }[]);
        setCourses(coursesData as { id: string; nombre: string }[]);
      } catch (error) {
        toast({
          title: 'Error al cargar datos complementarios',
          description: 'No se pudieron cargar los datos de sexos y cursos.',
          variant: 'destructive',
        });
      }
    };

    fetchStudents();
    fetchSexosAndCourses();
  }, [currentPage, pageSize, toast]);

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
    const max = Math.max(...students.map(s => parseInt(s.id, 10)));
    return isFinite(max) ? max : 0;
  }, [students]);

  const handleAddStudent = (newStudent: Student) => {
    // After adding a student, we should ideally re-fetch the current page
    // to ensure the list is up-to-date and pagination is correct.
    // For simplicity, we'll just add it to the current list for now.
    setStudents(prev => {
      const updatedStudents = [...prev, newStudent];
      return updatedStudents.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
    });
    setTotalStudents(prev => prev + 1); // Increment total count
    setIsFormOpen(false);
  };

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleStudentUpdated = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setIsEditModalOpen(false);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
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
    <>
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
            <div className="rounded-lg border overflow-x-auto">
              {isLoading ? <TableSkeleton /> : (
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Nº Registro</TableHead>
                    <TableHead className="whitespace-nowrap">RUT</TableHead>
                    <TableHead className="whitespace-nowrap">Nombre</TableHead>
                    <TableHead className="hidden md:table-cell whitespace-nowrap">Sexo</TableHead>
                    <TableHead className="hidden lg:table-cell whitespace-nowrap">Fec. Nacimiento</TableHead>
                    <TableHead className="whitespace-nowrap">Curso</TableHead>
                    <TableHead className="hidden lg:table-cell whitespace-nowrap">Fec. Matrícula</TableHead>
                    <TableHead className="hidden lg:table-cell whitespace-nowrap">Fec. Retiro</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium whitespace-nowrap">
                          {student.id}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{student.rut}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            {`${student.nombres} ${student.apellidos}`}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell whitespace-nowrap">{student.sexo?.nombre}</TableCell>
                        <TableCell className="hidden lg:table-cell whitespace-nowrap">{new Date(student.fecha_nacimiento).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</TableCell>
                        <TableCell className="whitespace-nowrap">{student.grade}</TableCell>
                        <TableCell className="hidden lg:table-cell whitespace-nowrap">{new Date(student.enrollmentDate).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</TableCell>
                        <TableCell className="hidden lg:table-cell whitespace-nowrap">{student.fecha_retiro ? new Date(student.fecha_retiro).toLocaleDateString('es-ES', { timeZone: 'UTC' }) : '-'}</TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <Button variant="ghost" size="sm" onClick={() => handleEditClick(student)}>Editar</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} className="h-24 text-center whitespace-nowrap">
                        No se encontraron estudiantes.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              )}
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-sm text-muted-foreground">
                Mostrando {filteredStudents.length} de {totalStudents} estudiantes
              </span>
              <div className="space-x-2 flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
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

      {selectedStudent && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-headline">Editar Estudiante</DialogTitle>
              <DialogDescription>
                Actualice los datos del estudiante.
              </DialogDescription>
            </DialogHeader>
            <EditStudentForm
              student={selectedStudent}
              onStudentUpdated={handleStudentUpdated}
              sexos={sexos}
              courses={courses}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

