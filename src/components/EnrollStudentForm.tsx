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
import type { Student } from '@/lib/types';
import { generateAvatarAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  email: z.string().email('Email inválido.'),
  phone: z.string().min(5, 'Número de teléfono inválido.'),
  address: z.string().min(5, 'Dirección inválida.'),
  grade: z.string().min(1, 'El grado es requerido.'),
});

type EnrollStudentFormProps = {
  onStudentAdded: (student: Student) => void;
};

export function EnrollStudentForm({ onStudentAdded }: EnrollStudentFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      grade: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const avatarResult = await generateAvatarAction({ studentName: values.name });

      if (avatarResult.error) {
        toast({
          title: 'Error al generar avatar',
          description: avatarResult.error,
          variant: 'destructive',
        });
      }

      const newStudent: Student = {
        id: `STU-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
        ...values,
        enrollmentDate: new Date().toISOString(),
        status: 'active',
        avatarUrl: avatarResult.avatarDataUri,
      };

      onStudentAdded(newStudent);
      toast({
        title: 'Estudiante Matriculado',
        description: `${values.name} ha sido añadido exitosamente.`,
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al matricular al estudiante.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Juan Pérez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grado</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 10º Grado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="ejemplo@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="555-123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input placeholder="123 Calle Falsa, Ciudad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Matricular Estudiante
          </Button>
        </div>
      </form>
    </Form>
  );
}
