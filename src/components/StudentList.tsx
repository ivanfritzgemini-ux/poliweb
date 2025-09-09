'use client';

import { useState, useMemo } from 'react';
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
import { Card, CardContent } from './ui/card';

const MOCK_STUDENTS: Student[] = [
  { id: 'STU-001', name: 'Ana García', grade: '10º Grado', enrollmentDate: '2023-09-01', status: 'active', avatarUrl: 'https://picsum.photos/seed/ana/40/40', email: 'ana.garcia@example.com', phone: '555-0101', address: '123 Maple St' },
  { id: 'STU-002', name: 'Luis Rodríguez', grade: '11º Grado', enrollmentDate: '2023-09-01', status: 'active', avatarUrl: 'https://picsum.photos/seed/luis/40/40', email: 'luis.rodriguez@example.com', phone: '555-0102', address: '456 Oak Ave' },
  { id: 'STU-003', name: 'Sofía Martinez', grade: '9º Grado', enrollmentDate: '2023-09-02', status: 'inactive', avatarUrl: 'https://picsum.photos/seed/sofia/40/40', email: 'sofia.martinez@example.com', phone: '555-0103', address: '789 Pine Ln' },
  { id: 'STU-004', name: 'Carlos Hernández', grade: '12º Grado', enrollmentDate: '2023-09-01', status: 'active', email: 'carlos.h@example.com', phone: '555-0104', address: '101 Elm Ct' },
];

export function StudentList() {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredStudents = useMemo(() =>
    students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase())
    ), [students, searchTerm]);

  const handleAddStudent = (newStudent: Student) => {
    setStudents(prev => [newStudent, ...prev]);
    setIsFormOpen(false);
  };

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead className="hidden md:table-cell">ID</TableHead>
                  <TableHead>Grado</TableHead>
                  <TableHead className="hidden lg:table-cell">Fecha de Matrícula</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatarUrl} data-ai-hint="student face" />
                            <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="truncate">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{student.id}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell className="hidden lg:table-cell">{new Date(student.enrollmentDate).toLocaleDateString('es-ES')}</TableCell>
                      <TableCell>
                        <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                          {student.status === 'active' ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No se encontraron estudiantes.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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
        <EnrollStudentForm onStudentAdded={handleAddStudent} />
      </DialogContent>
    </Dialog>
  );
}
