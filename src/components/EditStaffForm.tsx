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
import type { Staff } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { updateStaff } from '@/lib/actions';
import { validateChileanRut } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  rut: z.string().refine(validateChileanRut, { message: 'RUT inválido.' }),
  nombres: z.string().min(2, 'Los nombres deben tener al menos 2 caracteres.'),
  apellidos: z.string().min(2, 'Los apellidos deben tener al menos 2 caracteres.'),
  sexo_id: z.string({ required_error: 'Debe seleccionar un sexo.' }),
  email: z.string().email('Email inválido.'),
  rol_id: z.string({ required_error: 'Debe seleccionar un rol.' }),
  fecha_nacimiento: z.string({ required_error: 'Debe seleccionar una fecha de nacimiento.' }).refine((dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }, {
    message: 'La fecha de nacimiento no es válida.',
  }),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
});

type EditStaffFormProps = {
  staff: Staff;
  onStaffUpdated: (staff: Staff) => void;
  sexos: { id: string; nombre: string }[];
  roles: { id: string; nombre_rol: string }[];
};

export function EditStaffForm({ staff, onStaffUpdated, sexos, roles }: EditStaffFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rut: staff.rut,
      nombres: staff.nombres,
      apellidos: staff.apellidos,
      sexo_id: staff.sexo?.id || '',
      email: staff.email,
      rol_id: staff.role?.id || '',
      fecha_nacimiento: staff.fecha_nacimiento ? staff.fecha_nacimiento.substring(0, 10) : '',
      telefono: staff.telefono || '',
      direccion: staff.direccion || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const fechaNacimientoDate = new Date(values.fecha_nacimiento);

      const updates = {
        nombres: values.nombres,
        apellidos: values.apellidos,
        sexo_id: values.sexo_id,
        rol_id: values.rol_id,
        fecha_nacimiento: fechaNacimientoDate.toISOString(),
        telefono: values.telefono || null,
        direccion: values.direccion || null,
      };

      await updateStaff(staff.rut, updates, staff.id);

      const updatedStaffMember: Staff = {
        ...staff,
        ...updates,
        sexo: sexos.find(s => s.id === values.sexo_id) || null,
        role: roles.find(r => r.id === values.rol_id) || null,
      };

      onStaffUpdated(updatedStaffMember);
      toast({
        title: 'Personal Actualizado',
        description: `${values.nombres} ${values.apellidos} ha sido actualizado.`,
      });
    } catch (error: any) {
      toast({
        title: 'Error al actualizar personal',
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
                <Input placeholder="Ej: Ricardo" {...field} />
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
                <Input placeholder="Ej: Pérez Díaz" {...field} />
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
          name="rol_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Rol*</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.nombre_rol}
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
            <FormItem className="col-span-2">
              <FormLabel className="text-xs sm:text-sm">Fecha de Nacimiento*</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="YYYY-MM-DD"
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
        <div className="col-span-2 flex justify-end pt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Actualizar
          </Button>
        </div>
      </form>
    </Form>
  );
}
