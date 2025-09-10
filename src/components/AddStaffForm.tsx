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
import { getSexos, getRoles, addStaff } from '@/lib/actions';
import { Loader2 } from 'lucide-react';
import { cn, validateChileanRut } from '@/lib/utils';

const formSchema = z.object({
  rut: z.string().refine(validateChileanRut, { message: 'RUT inválido.' }),
  nombres: z.string().min(2, 'Los nombres deben tener al menos 2 caracteres.'),
  apellidos: z.string().min(2, 'Los apellidos deben tener al menos 2 caracteres.'),
  sexo_id: z.string({ required_error: 'Debe seleccionar un sexo.' }),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
  email: z.string().email('Email inválido.'),
  rol_id: z.string({ required_error: 'Debe seleccionar un rol.' }),
  fecha_nacimiento: z.string({ required_error: 'Debe seleccionar una fecha de nacimiento.' }).refine((dateString) => {
    const date = new Date(dateString);
    const currentYear = new Date().getFullYear();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is 0-indexed
    const day = date.getDate();

    if (isNaN(date.getTime())) {
      return false; // Invalid date format
    }
    if (year < 1900 || year > currentYear) {
      return false; // Year out of range
    }
    if (month < 1 || month > 12) {
      return false; // Month out of range
    }
    if (day < 1 || day > 31) {
      return false; // Day out of range (basic check)
    }
    // Check for valid day for the given month and year (e.g., no Feb 30)
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day > lastDayOfMonth) {
      return false;
    }
    return true;
  }, {
    message: 'La fecha de nacimiento no es válida. Asegúrese de que el formato sea DD/MM/YYYY y el año esté entre 1900 y el actual.',
  }),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
});

type AddStaffFormProps = {
  sexos: { id: string; nombre: string }[];
  roles: { id: string; nombre_rol: string }[];
  onStaffAdded: (staff: Staff) => void;
};

export function AddStaffForm({ onStaffAdded, sexos, roles }: AddStaffFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rut: '',
      nombres: '',
      apellidos: '',
      sexo_id: '',
      password: '',
      email: '',
      rol_id: '',
      telefono: '',
      direccion: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const fechaNacimientoDate = new Date(values.fecha_nacimiento); // Parse YYYY-MM-DD string to Date object

      const staffData = {
        rut: values.rut,
        nombres: values.nombres,
        apellidos: values.apellidos,
        sexo_id: values.sexo_id,
        email: values.email,
        rol_id: values.rol_id,
        fecha_nacimiento: fechaNacimientoDate.toISOString(), // Convert Date to ISO string
        telefono: values.telefono || null,
        direccion: values.direccion || null,
      };

      const newStaffMember = await addStaff({ ...staffData, password: values.password });

      onStaffAdded(newStaffMember as Staff);
      toast({
        title: 'Personal Añadido',
        description: `${values.nombres} ${values.apellidos} ha sido añadido al sistema.`,
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: 'Error al añadir personal',
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
              <FormLabel className="text-xs sm:text-sm">RUT*</FormLabel>
              <FormControl>
                <Input placeholder="Ej: 12.345.678-9" {...field} />
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Email*</FormLabel>
              <FormControl>
                <Input placeholder="ejemplo@acad.link" {...field} />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm">Contraseña*</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
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
                  value={field.value ? field.value.split('T')[0] : ''}
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
            Añadir
          </Button>
        </div>
      </form>
    </Form>
  );
}
