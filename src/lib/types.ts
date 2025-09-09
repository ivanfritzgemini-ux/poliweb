export type Student = {
  id: string;
  name: string;
  grade: string;
  enrollmentDate: string;
  status: 'active' | 'inactive';
  avatarUrl?: string;
  email: string;
  phone: string;
  address: string;
};

export type Staff = {
  id: string;
  rut: string;
  nombres: string;
  apellidos: string;
  sexo: { nombre: string } | null;
  email: string;
  role: { nombre_rol: string } | null;
  status: string;
};
