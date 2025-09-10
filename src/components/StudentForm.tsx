'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Student } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { updateStudent, addStudent, createUser, getRoleIdByName, getStaffByRut } from '@/lib/actions';
import { validateChileanRut } from '@/lib/utils';
import { Loader2, Search } from 'lucide-react';

const formSchema = z.object({
  id: z.string(), // Added for nro_registro
  rut: z.string().refine(validateChileanRut, { message: 'RUT inválido.' }),
  nombres: z.string().min(2, 'Los nombres deben tener al menos 2 caracteres.'),
  apellidos: z.string().min(2, 'Los apellidos deben tener al menos 2 caracteres.'),
  sexo_id: z.string({ required_error: 'Debe seleccionar un sexo.' }),
  email: z.string().email('Email inválido.'),
  fecha_nacimiento: z.string({ required_error: 'Debe seleccionar una fecha de nacimiento.' }),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  curso_id: z.string({ required_error: 'Debe seleccionar un curso.' }),
  enrollmentDate: z.string({ required_error: 'Debe seleccionar una fecha de matrícula.' }),
  fecha_retiro: z.string().optional(),
});

type StudentFormProps = {
  student?: Student;
  onSuccess: (student: Student) => void;
  sexos: { id: string; nombre: string }[];
  courses: { id: string; nombre: string }[];
  nextId?: number;
};

export function StudentForm({ student, onSuccess, sexos, courses, nextId }: StudentFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [staffRutSearch, setStaffRutSearch] = useState(''); // New state for staff RUT search
  const [isSearchingStaff, setIsSearchingStaff] = useState(false); // New state for search loading

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: String(nextId ?? student?.id ?? ''),
      rut: student?.rut ?? '',
      nombres: student?.nombres ?? '',
      apellidos: student?.apellidos ?? '',
      sexo_id: student?.sexo?.id ?? '',
      email: student?.email ?? '',
      fecha_nacimiento: student?.fecha_nacimiento?.substring(0, 10) ?? '',
      telefono: student?.telefono ?? '',
      direccion: student?.direccion ?? '',
      curso_id: student?.curso?.id ?? '',
      enrollmentDate: student?.enrollmentDate?.substring(0, 10) ?? '',
      fecha_retiro: student?.fecha_retiro?.substring(0, 10) ?? '',
    },
  });

  // New function to handle staff search
  async function handleStaffSearch() {
    if (!staffRutSearch) {
      toast({
        title: 'RUT de Personal Requerido',
        description: 'Por favor, ingrese el RUT del personal a buscar.',
        variant: 'destructive',
      });
      return;
    }

    setIsSearchingStaff(true);
    try {
      const staff = await getStaffByRut(staffRutSearch);
      if (staff) {
        form.setValue('rut', staff.rut);
        form.setValue('nombres', staff.nombres);
        form.setValue('apellidos', staff.apellidos);
        form.setValue('email', staff.email);
        form.setValue('telefono', staff.telefono ?? '');
        form.setValue('direccion', staff.direccion ?? '');
        form.setValue('fecha_nacimiento', staff.fecha_nacimiento?.substring(0, 10) ?? '');
        form.setValue('sexo_id', staff.sexo?.id ?? '');
        toast({
          title: 'Personal Encontrado',
          description: `Datos de ${staff.nombres} ${staff.apellidos} precargados.`,
        });
      } else {
        toast({
          title: 'Personal No Encontrado',
          description: 'No se encontró personal con el RUT proporcionado.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error al Buscar Personal',
        description: error.message || 'Ocurrió un error desconocido al buscar personal.',
        variant: 'destructive',
      });
    } finally {
      setIsSearchingStaff(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      let resultStudent: Student;

      if (student) {
        // Update existing student
        resultStudent = await updateStudent(student.userId, {
          ...values,
          fecha_nacimiento: new Date(values.fecha_nacimiento).toISOString(),
          fecha_matricula: new Date(values.enrollmentDate).toISOString(),
          fecha_retiro: values.fecha_retiro ? new Date(values.fecha_retiro).toISOString() : null,
        });
        toast({
          title: 'Estudiante Actualizado',
          description: `${values.nombres} ${values.apellidos} ha sido actualizado.`,
        });
      } else {
        // Add new student
        const studentRoleId = await getRoleIdByName('student');
        if (!studentRoleId) {
          throw new Error('Student role not found.');
        }

        const newUserId = await createUser({
          email: values.email,
          rut: values.rut,
          nombres: values.nombres,
          apellidos: values.apellidos,
          sexo_id: values.sexo_id,
          fecha_nacimiento: new Date(values.fecha_nacimiento).toISOString(),
          telefono: values.telefono,
          direccion: values.direccion,
        }, studentRoleId);

        const newStudentData = await addStudent({
          usuario: newUserId,
          id: values.id, // Use the ID from the form
          curso_id: values.curso_id,
          enrollmentDate: new Date(values.enrollmentDate).toISOString(),
        });

        // Construct the Student object to pass to onSuccess
        resultStudent = {
          id: values.id,
          userId: newUserId,
          rut: values.rut,
          nombres: values.nombres,
          apellidos: values.apellidos,
          email: values.email,
          fecha_nacimiento: new Date(values.fecha_nacimiento).toISOString(),
          telefono: values.telefono,
          direccion: values.direccion,
          sexo: sexos.find(s => s.id === values.sexo_id) || { id: '', nombre: '' },
          grade: courses.find(c => c.id === values.curso_id)?.nombre || '',
          enrollmentDate: new Date(values.enrollmentDate).toISOString(),
          fecha_retiro: values.fecha_retiro ? new Date(values.fecha_retiro).toISOString() : null,
          status: true, // Assuming new students are active
          curso: courses.find(c => c.id === values.curso_id) || { id: '', nivel: '', letra: '' },
        };

        toast({
          title: 'Estudiante Matriculado',
          description: `${values.nombres} ${values.apellidos} ha sido matriculado exitosamente.`,
        });
      }

      onSuccess(resultStudent);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Ocurrió un error desconocido.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4">
        {/* New Staff RUT Search Field */}
        {!student && ( // Only show for new student enrollment
          <FormItem className="col-span-2">
            <FormLabel className="text-xs sm:text-sm">RUT de Personal (para precargar datos)</FormLabel>
            <div className="relative flex items-center">
              <FormControl>
                <Input
                  placeholder="Ej: 12345678-9"
                  value={staffRutSearch}
                  onChange={(e) => setStaffRutSearch(e.target.value)}
                  onBlur={() => setStaffRutSearch(validateChileanRut(staffRutSearch) ? staffRutSearch : '')}
                  className="pr-10" // Add padding to the right for the button
                />
              </FormControl>
              <Button
                type="button"
                onClick={handleStaffSearch}
                disabled={isSearchingStaff}
                size="icon"
                className="absolute right-0 mr-1 h-8 w-8"
              >
                {isSearchingStaff ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span className="sr-only">Buscar Personal</span>
              </Button>
            </div>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}

        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Nº Registro</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rut"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">RUT</FormLabel>
              <FormControl>
                <Input {...field} disabled={!!student} autoFocus={!student} />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Email</FormLabel>
              <FormControl>
                <Input {...field} disabled={!!student} />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nombres"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Nombres*</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Juan" {...field} />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apellidos"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Apellidos*</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Pérez" {...field} />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sexo_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Sexo*</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el sexo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sexos.map((sexo) => (
                    <SelectItem key={sexo.id} value={sexo.id}>
                      {sexo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="curso_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Curso*</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un curso" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fecha_nacimiento"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Fecha de Nacimiento*</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value ? field.value.substring(0, 10) : ''}
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enrollmentDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Fecha de Matrícula*</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value ? field.value.substring(0, 10) : ''}
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="Ej: +56912345678" {...field} />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="direccion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Calle Falsa 123" {...field} />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fecha_retiro"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="text-xs sm:text-sm">Fecha de Retiro</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value ? field.value.substring(0, 10) : ''}
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex justify-end pt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {student ? 'Actualizar Estudiante' : 'Matricular Estudiante'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
  
