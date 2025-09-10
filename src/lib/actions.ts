'use server';

import { supabase } from './supabase';
import type { Staff } from './types';

export async function getStaff(page: number = 1, pageSize: number = 10): Promise<{ staff: Staff[], totalCount: number }> {
  const rangeFrom = (page - 1) * pageSize;
  const rangeTo = page * pageSize - 1;

  const { data, error, count } = await supabase
    .from('usuarios')
    .select('id, rut, nombres, apellidos, email, status, fecha_nacimiento, sexo(id, nombre), role:roles(id, nombre_rol)', { count: 'exact' })
    .order('rut', { ascending: true }) // Order by RUT for consistent pagination
    .range(rangeFrom, rangeTo);

  if (error) {
    console.error('Error fetching staff:', error);
    throw new Error('Could not fetch staff data.');
  }

  return { staff: data as Staff[], totalCount: count || 0 };
}

export async function getSexos() {
  const { data, error } = await supabase.from('sexo').select('id, nombre');
  if (error) {
    console.error('Error fetching sexos:', error);
    throw new Error('Could not fetch sexos data.');
  }
  return data.map(sexo => ({ ...sexo, id: String(sexo.id) }));
}

export async function getRoles() {
  const { data, error } = await supabase.from('roles').select('id, nombre_rol');
  if (error) {
    console.error('Error fetching roles:', error);
    throw new Error('Could not fetch roles data.');
  }
  return data.map(role => ({ ...role, id: String(role.id) }));
}

export async function getRoleIdByName(roleName: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('roles')
    .select('id')
    .eq('nombre_rol', roleName)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found, which is not an error here.
    console.error(`Error fetching role ID for ${roleName}:`, error);
    throw new Error(`Could not fetch role ID for ${roleName}.`);
  }

  return data ? String(data.id) : null;
}

export async function addStaff(formData: any) {
  const { email, password, ...rest } = formData;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error('Error signing up user:', authError);
    throw new Error(authError.message);
  }

  const { data, error } = await supabase.from('usuarios').insert({
    id: authData.user?.id, // Link to Supabase Auth user ID
    rut: rest.rut,
    nombres: rest.nombres,
    apellidos: rest.apellidos,
    sexo_id: rest.sexo_id,
    email: email,
    rol_id: rest.rol_id,
    fecha_nacimiento: rest.fecha_nacimiento, // Already an ISO string
    telefono: rest.telefono || null,
    direccion: rest.direccion || null,
  }).select('id, rut, nombres, apellidos, email, status, sexo(id, nombre), role:roles(id, nombre_rol)').single();

  if (error) {
    console.error('Error inserting staff data:', error);
    throw new Error(error.message);
  }

  return data;
}

export async function updateStaff(rut: string, updates: any, userId?: string) {
  const { email, password, ...profileUpdates } = updates;

  // 1. Update Supabase Auth if email or password are provided
  if (email || password) {
    const authUpdates: any = {};
    if (email) authUpdates.email = email;
    if (password) authUpdates.password = password;

    if (!userId) {
      throw new Error('User ID is required to update email or password.');
    }

    const { data: authData, error: authError } = await supabase.auth.admin.updateUserById(
      userId,
      authUpdates
    );

    if (authError) {
      console.error('Error updating auth user:', authError);
      throw new Error(authError.message);
    }

    // If email was changed, update it in the profile table as well
    if (email) {
      profileUpdates.email = email;
    }
  }

  // 2. Update the public.usuarios table
  const { data, error } = await supabase.from('usuarios').update(profileUpdates).eq('rut', rut);

  if (error) {
    console.error('Error updating staff data:', error);
    throw new Error(error.message);
  }

  return data;
}

export async function getStaffByRut(rut: string): Promise<Staff | null> {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, rut, nombres, apellidos, email, status, sexo(id, nombre), role:roles(id, nombre_rol), telefono, direccion, fecha_nacimiento')
    .eq('rut', rut)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found, which is not an error here.
    console.error('Error fetching staff by RUT:', error);
    throw new Error('No se pudo buscar el personal por RUT.');
  }

  return data as Staff | null;
}

export async function getStudents(page: number = 1, pageSize: number = 10): Promise<{ students: any[], totalCount: number }> {
  const rangeFrom = (page - 1) * pageSize;
  const rangeTo = page * pageSize - 1;

  const { data, error, count } = await supabase
    .from('estudiantes_detalles')
    .select('nro_registro, fecha_matricula, fecha_retiro, curso:cursos(id, nivel, letra), usuario:usuarios(id, rut, nombres, apellidos, fecha_nacimiento, sexo:sexo(id, nombre), email, telefono, direccion)', { count: 'exact' })
    .order('nro_registro', { ascending: true })
    .range(rangeFrom, rangeTo);

  if (error) {
    console.error('Error fetching students:', error);
    throw new Error('Could not fetch student data.');
  }

  const students = data.map(s => {
    const student = { ...s.usuario, ...s, id: s.nro_registro, userId: s.usuario.id, grade: s.curso?.nivel ? `${s.curso.nivel}º Medio ${s.curso.letra}` : null, enrollmentDate: s.fecha_matricula };
    student.sexo = s.usuario.sexo;
    student.curso = s.curso;
    return student;
  });

  return { students, totalCount: count || 0 };
}

export async function getCourses(): Promise<{ id: string; nombre: string }[]> {
  const { data, error } = await supabase.from('cursos').select('id, nivel, letra');

  if (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Could not fetch courses data.');
  }

  return data.map(curso => ({ id: String(curso.id), nombre: `${curso.nivel}º Medio ${curso.letra}` }));
}

export async function createUser(userData: any, rol_id: string | null = null) {
  const { email, password, ...rest } = userData;

  // Generate a random password if not provided
  const userPassword = password || Math.random().toString(36).substring(2, 15);

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: userPassword,
  });

  if (authError) {
    console.error('Error signing up user:', authError);
    throw new Error(authError.message);
  }

  const { data, error } = await supabase.from('usuarios').insert({
    id: authData.user?.id, // Link to Supabase Auth user ID
    rut: rest.rut,
    nombres: rest.nombres,
    apellidos: rest.apellidos,
    sexo_id: rest.sexo_id,
    email: email,
    fecha_nacimiento: rest.fecha_nacimiento,
    telefono: rest.phone || null,
    direccion: rest.address || null,
    rol_id: rol_id,
  }).select('id').single();

  if (error) {
    console.error('Error inserting user data:', error);
    throw new Error(error.message);
  }

  return data.id; // Return the new user's ID
}

export async function addStudent(studentData: any) {
  // This function now only inserts into 'estudiantes_detalles'
  // It assumes the user (identified by RUT) already exists in the 'usuarios' table.
  const { data, error } = await supabase
    .from('estudiantes_detalles')
    .insert([
      {
        id: studentData.usuario,
        nro_registro: studentData.id,
        curso_id: studentData.curso_id,
        fecha_matricula: studentData.enrollmentDate,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error inserting student data:', error);
    throw new Error(error.message);
  }

  return data;
}

export async function updateStudent(userId: string, updates: any) {
  const {
    // Fields for 'usuarios' table
    nombres,
    apellidos,
    sexo_id,
    fecha_nacimiento,
    telefono,
    direccion,
    // Fields for 'estudiantes_detalles' table
    curso_id,
    fecha_matricula,
    fecha_retiro,
  } = updates;

  // 1. Update the 'usuarios' table
  const { error: userError } = await supabase
    .from('usuarios')
    .update({
      nombres,
      apellidos,
      sexo_id,
      fecha_nacimiento,
      telefono,
      direccion,
    })
    .eq('id', userId);

  if (userError) {
    console.error('Error updating student user data:', userError);
    throw new Error('Could not update student user data.');
  }

  // 2. Update the 'estudiantes_detalles' table
  const { error: studentDetailsError } = await supabase
    .from('estudiantes_detalles')
    .update({
      curso_id,
      fecha_matricula,
      fecha_retiro,
    })
    .eq('id', userId);

  if (studentDetailsError) {
    console.error('Error updating student details:', studentDetailsError);
    throw new Error('Could not update student details.');
  }

  // 3. Fetch and return the updated student data
  const { data: updatedStudent, error: fetchError } = await supabase
    .from('estudiantes_detalles')
    .select('nro_registro, fecha_matricula, fecha_retiro, curso:cursos(id, nivel, letra), usuario:usuarios(id, rut, nombres, apellidos, fecha_nacimiento, sexo:sexo(id, nombre), email, telefono, direccion)')
    .eq('id', userId)
    .single();

  if (fetchError) {
    console.error('Error fetching updated student data:', fetchError);
    throw new Error('Could not fetch updated student data.');
  }
  
  const mappedStudent = { 
    ...updatedStudent.usuario, 
    ...updatedStudent, 
    id: updatedStudent.nro_registro, 
    userId: updatedStudent.usuario.id,
    grade: updatedStudent.curso?.nivel ? `${updatedStudent.curso.nivel}º Medio ${updatedStudent.curso.letra}` : null, 
    enrollmentDate: updatedStudent.fecha_matricula 
  };

  mappedStudent.sexo = updatedStudent.usuario.sexo;
  mappedStudent.curso = updatedStudent.curso;


  return mappedStudent;
}
