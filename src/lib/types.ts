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
  rut: string;
  nombres: string;
  apellidos: string;
  sexo: string;
  email: string;
  role: string;
  status: string;
};
