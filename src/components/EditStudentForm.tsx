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
import { updateStudent } from '@/lib/actions';
import { validateChileanRut } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
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

type EditStudentFormProps = {
  student: Student;
  onStudentUpdated: (student: Student) => void;
  sexos: { id: string; nombre: string }[];
  courses: { id: string; nombre: string }[];
};

export function EditStudentForm({ student, onStudentUpdated, sexos, courses }: EditStudentFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rut: student.rut,
      nombres: student.nombres,
      apellidos: student.apellidos,
      sexo_id: student.sexo?.id || '',
      email: student.email,
      fecha_nacimiento: student.fecha_nacimiento ? student.fecha_nacimiento.substring(0, 10) : '',
      telefono: student.telefono || '',
      direccion: student.direccion || '',
      curso_id: student.curso?.id || '',
      enrollmentDate: student.enrollmentDate ? student.enrollmentDate.substring(0, 10) : '',
      fecha_retiro: student.fecha_retiro ? student.fecha_retiro.substring(0, 10) : '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const updatedStudent = await updateStudent(student.userId, {
        ...values,
        fecha_nacimiento: new Date(values.fecha_nacimiento).toISOString(),
        fecha_matricula: new Date(values.enrollmentDate).toISOString(),
        fecha_retiro: values.fecha_retiro ? new Date(values.fecha_retiro).toISOString() : null,
      });

      onStudentUpdated(updatedStudent);
      toast({
        title: 'Estudiante Actualizado',
        description: `${values.nombres} ${values.apellidos} ha sido actualizado.`,
      });
    } catch (error: any) {
      toast({
        title: 'Error al actualizar estudiante',
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
        <FormField
          control={form.control}
          name="rut"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">RUT</FormLabel>
              <FormControl>
                <Input {...field} disabled />
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
                <Input {...field} disabled />
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
            Actualizar Estudiante
          </Button>
        </div>
      </form>
    </Form>
  );
}
