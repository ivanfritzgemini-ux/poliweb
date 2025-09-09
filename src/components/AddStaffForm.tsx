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







import { cn, validateChileanRut } from '@/lib/utils';

const formSchema = z.object({
  rut: z.string().refine(validateChileanRut, { message: 'RUT inválido.' }),
  nombres: z.string().min(2, 'Los nombres deben tener al menos 2 caracteres.'),
  apellidos: z.string().min(2, 'Los apellidos deben tener al menos 2 caracteres.'),
  sexo_id: z.string({ required_error: 'Debe seleccionar un sexo.' }),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
  email: z.string().email('Email inválido.'),
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

type AddStaffFormProps = {
  onStaffAdded: (staff: Staff) => void;
};

export function AddStaffForm({ onStaffAdded }: AddStaffFormProps) {
  const { toast } = useToast();
  const [sexos, setSexos] = useState<{ id: string; nombre: string }[]>([]);
  const [roles, setRoles] = useState<{ id: string; nombre_rol: string }[]>([]);

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

      // The addStaff action expects the data to be in the format of the 'usuarios' table
      // The 'id' field for the 'usuarios' table will be populated by the auth.signUp result
      const staffData = {
        rut: values.rut,
        nombres: values.nombres,
        apellidos: values.apellidos,
        sexo_id: values.sexo_id,
        email: values.email,
        rol_id: values.rol_id,
                fecha_de_nacimiento: fechaNacimientoDate.toISOString(), // Convert Date to ISO string

        telefono: values.telefono || null,
        direccion: values.direccion || null,
      };

      await addStaff({ ...staffData, password: values.password });

      // Assuming the addStaff function returns the newly added staff member
      // We need to construct a Staff object to pass to onStaffAdded
      const newStaffMember: Staff = {
        rut: values.rut,
        nombres: values.nombres,
        apellidos: values.apellidos,
        sexo: sexos.find(s => s.id === values.sexo_id) || null,
        email: values.email,
        role: roles.find(r => r.id === values.rol_id) || null,
        status: 'active', // Default status for new staff
      };

      onStaffAdded(newStaffMember);
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
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 pt-4">
        <FormField
          control={form.control}
          name="rut"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">RUT</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Email</FormLabel>
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
              <FormLabel className="text-sm sm:text-base">Contraseña</FormLabel>
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
                  value={field.value ? field.value.split('T')[0] : ''} // Ensure YYYY-MM-DD format for input type="date"
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
          <Button type="submit">Añadir Personal</Button>
        </div>
      </form>
    </Form>
  );
}