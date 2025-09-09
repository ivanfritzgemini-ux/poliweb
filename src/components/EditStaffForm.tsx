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
import { useEffect, useState } from 'react';
import { getSexos, getRoles, updateStaff } from '@/lib/actions';

import { format } from 'date-fns';

import { cn, validateChileanRut } from '@/lib/utils';

const formSchema = z.object({
  nombres: z.string().min(2, 'Los nombres deben tener al menos 2 caracteres.'),
  apellidos: z.string().min(2, 'Los apellidos deben tener al menos 2 caracteres.'),
  sexo_id: z.string({ required_error: 'Debe seleccionar un sexo.' }),
  rol_id: z.string({ required_error: 'Debe seleccionar un rol.' }),
  fecha_de_nacimiento: z.string({ required_error: 'Debe seleccionar una fecha de nacimiento.' }).refine(
    (dateString) => !isNaN(new Date(dateString).getTime()),
    {
      message: 'La fecha de nacimiento no es válida.',
    }
  ),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
});

type EditStaffFormProps = {
  staff: Staff;
  onStaffUpdated: (staff: Staff) => void;
};

export function EditStaffForm({ staff, onStaffUpdated }: EditStaffFormProps) {
  const { toast } = useToast();
  const [sexos, setSexos] = useState<{ id: string; nombre: string }[]>([]);
  const [roles, setRoles] = useState<{ id: string; nombre_rol: string }[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: staff.nombres,
      apellidos: staff.apellidos,
      sexo_id: staff.sexo?.id || '',
      rol_id: staff.role?.id || '',
      fecha_de_nacimiento: staff.fecha_de_nacimiento ? format(new Date(staff.fecha_de_nacimiento), 'yyyy-MM-dd') : '',
      telefono: staff.telefono || '',
      direccion: staff.direccion || '',
    },
  });

  useEffect(() => {
    async function fetchData() {
      const fetchedSexos = await getSexos();
      const fetchedRoles = await getRoles();
      setSexos(fetchedSexos as { id: string; nombre: string }[]);
      setRoles(fetchedRoles as { id: string; nombre_rol: string }[]);
    }
    fetchData();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const fechaNacimientoDate = new Date(values.fecha_de_nacimiento); // Parse YYYY-MM-DD string to Date object

      const updates = {
        nombres: values.nombres,
        apellidos: values.apellidos,
        sexo_id: values.sexo_id,
        rol_id: values.rol_id,
        fecha_nacimiento: fechaNacimientoDate.toISOString(), // Convert Date to ISO string
        telefono: values.telefono || null,
        direccion: values.direccion || null,
      };

      await updateStaff(staff.rut, updates);

      const updatedStaffMember: Staff = {
        ...staff,
        nombres: values.nombres,
        apellidos: values.apellidos,
        sexo: sexos.find(s => s.id === values.sexo_id) || null,
        role: roles.find(r => r.id === values.rol_id) || null,
        fecha_de_nacimiento: fechaNacimientoDate.toISOString(),
        telefono: values.telefono || null,
        direccion: values.direccion || null,
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
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 pt-4">
        <FormField
          control={form.control}
          name="nombres"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Nombres</FormLabel>
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
              <FormLabel className="text-sm sm:text-base">Apellidos</FormLabel>
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
              <FormLabel className="text-sm sm:text-base">Sexo</FormLabel>
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
              <FormLabel className="text-sm sm:text-base">Rol</FormLabel>
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
          name="fecha_de_nacimiento"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel className="text-sm sm:text-base">Fecha de Nacimiento</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="YYYY-MM-DD"
                  {...field}
                  value={field.value ? format(new Date(field.value), 'yyyy-MM-dd') : ''} // Ensure YYYY-MM-DD format for input type="date"
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
              <FormLabel className="text-sm sm:text-base">Teléfono (Opcional)</FormLabel>
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
              <FormLabel className="text-sm sm:text-base">Dirección (Opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Calle Falsa 123" {...field} />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex justify-end pt-2">
          <Button type="submit">Actualizar Personal</Button>
        </div>
      </form>
    </Form>
  );
}