export type Student = {
  id: string;
  rut: string;
  nombres: string; // from usuarios
  apellidos: string; // from usuarios
  sexo: { nombre: string } | null;
  fecha_nacimiento: string;
  grade: string;
  enrollmentDate: string;
  fecha_retiro?: string | null;
  status: 'active' | 'inactive';
  email: string;
  phone: string;
  address: string;
};

export type Staff = {
  id: string;
  rut: string;
  nombres: string;
  apellidos: string;
  sexo: { id: string; nombre: string } | null;
  email: string;
  role: { id: string; nombre_rol: string } | null;
  status: boolean;
  fecha_nacimiento?: string;
  telefono?: string | null;
  direccion?: string | null;
};
