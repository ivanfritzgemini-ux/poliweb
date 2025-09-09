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
import { getStaffByRut, getSexos, getCourses, addStudent } from '@/lib/actions';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState, useRef } from 'react';
import { Loader2, Search } from 'lucide-react';
import { formatChileanRut, validateChileanRut } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const formSchema = z.object({
  id: z.string().min(1, "El número de registro es requerido."),
  rut: z.string().refine(validateChileanRut, { message: 'RUT inválido.' }),
  nombres: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  apellidos: z.string().min(2, 'Los apellidos deben tener al menos 2 caracteres.'),
  sexo_id: z.string({ required_error: 'Debe seleccionar un sexo.' }),
  fecha_nacimiento: z.string({ required_error: 'Debe seleccionar una fecha de nacimiento.' }).refine(
    (dateString) => !isNaN(new Date(dateString).getTime()),
    {
      message: 'La fecha de nacimiento no es válida.',
    }
  ),
  email: z.string().email('Email inválido.'),
  phone: z.string().min(5, 'Número de teléfono inválido.').optional().or(z.literal('')),
  address: z.string().min(5, 'Dirección inválida.').optional().or(z.literal('')),
  curso_id: z.string({ required_error: 'Debe seleccionar un curso.' }),
  enrollmentDate: z.string({ required_error: 'Debe seleccionar una fecha de matrícula.' }).refine(
    (dateString) => !isNaN(new Date(dateString).getTime()),
    {
      message: 'La fecha de matrícula no es válida.',
    }
  ),
});

type EnrollStudentFormProps = {
  nextId: number;
  sexos: { id: string; nombre: string }[];
  courses: { id: string; nombre: string }[];
  onStudentAdded: (student: Student) => void;
};

export function EnrollStudentForm({ onStudentAdded, nextId, sexos: initialSexos, courses: initialCourses }: EnrollStudentFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [sexos, setSexos] = useState(initialSexos);
  const [courses, setCourses] = useState(initialCourses);
  const rutInputRef = useRef<HTMLInputElement>(null);
  const [foundUserId, setFoundUserId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: String(nextId),
      rut: '',
      nombres: '',
      apellidos: '',
      sexo_id: '',
      fecha_nacimiento: '', // This should be a string in 'yyyy-MM-dd' format
      email: '',
      phone: '',
      address: '',
      curso_id: '',
      enrollmentDate: new Date().toISOString().split('T')[0],
    },
  });
  
  useEffect(() => {
    rutInputRef.current?.focus();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!initialSexos || initialSexos.length === 0) {
        const fetchedSexos = await getSexos();
        setSexos(fetchedSexos as { id: string; nombre: string }[]);
      }
      if (!initialCourses || initialCourses.length === 0) {
        const fetchedCourses = await getCourses();
        setCourses(fetchedCourses);
      }
    }
    fetchData();
  }, [initialSexos, initialCourses]);

  const handleSearchByRut = async () => {
    const rut = form.getValues('rut');
    if (!validateChileanRut(rut)) {
      form.setError('rut', { type: 'manual', message: 'RUT inválido.' });
      return;
    }
    setIsSearching(true);
    try {
      const person = await getStaffByRut(rut);
      if (person) {
        setFoundUserId(person.id);
        form.setValue('nombres', person.nombres);
        form.setValue('apellidos', person.apellidos);
        form.setValue('email', person.email);
        form.setValue('phone', person.telefono || '');
        form.setValue('address', person.direccion || '');
        form.setValue('fecha_nacimiento', person.fecha_nacimiento ? format(new Date(person.fecha_nacimiento), 'yyyy-MM-dd') : '');
        if (person.sexo) form.setValue('sexo_id', person.sexo.id);
        toast({ title: 'Persona Encontrada', description: 'Datos cargados en el formulario.' });
      } else {
        setFoundUserId(null);
        toast({ title: 'No Encontrado', description: 'No se encontró a nadie con ese RUT. Puede registrarlo manualmente.', variant: 'destructive' });
      }
    } catch (error: any) {
      toast({
        title: 'Error en la Búsqueda',
        description: error.message || 'No se pudo realizar la búsqueda.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      let userId = foundUserId;
      if (!userId) {
        const user = await getStaffByRut(values.rut);
        if (user) {
          userId = user.id;
        } else {
          toast({
            title: 'Error',
            description: 'El usuario con el RUT especificado no existe. Búsquelo antes de matricular.',
            variant: 'destructive',
          });
          setIsSubmitting(false);
          return;
        }
      }

      const studentName = `${values.nombres} ${values.apellidos}`;
      const newStudentData = await addStudent({ ...values, usuario: userId });

      // Construct the full student object for optimistic update
      const fullNewStudent = {
        ...values,
        id: values.id, // nro_registro
        sexo: sexos.find(s => s.id === values.sexo_id) || null,
        grade: courses.find(c => c.id === values.curso_id)?.nombre || '',
      };
      onStudentAdded(fullNewStudent as Student);
      toast({
        title: 'Estudiante Matriculado',
        description: `${studentName} ha sido añadido exitosamente.`,
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Ocurrió un error al matricular al estudiante.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Registro</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: STU-001" {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <div className="flex items-end gap-2">
          <FormField
            control={form.control}
            name="rut"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>RUT</FormLabel>
                <FormControl>
                  <Input placeholder="12.345.678-9" {...field} ref={rutInputRef} onBlur={(e) => field.onChange(formatChileanRut(e.target.value))}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={handleSearchByRut} disabled={isSearching} className="h-10">
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span className="sr-only">Buscar</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="nombres"
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
            name="apellidos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Pérez Díaz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="enrollmentDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Matrícula</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value ? format(new Date(field.value), 'yyyy-MM-dd') : ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="curso_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Curso</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un curso"/>
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
            name="sexo_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo</FormLabel>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fecha_nacimiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value ? format(new Date(field.value), 'yyyy-MM-dd') : ''}
                  />
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
