'use server';

import { supabase } from './supabase';
import type { Staff } from './types';

export async function getStaff(): Promise<Staff[]> {
  const { data, error } = await supabase.from('usuarios').select('id, rut, nombres, apellidos, email, status, sexo(id, nombre), role:roles(id, nombre_rol)');
  if (error) {
    console.error('Error fetching staff:', error);
    throw new Error('Could not fetch staff data.');
  }
  return data as Staff[];
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
    fecha_nacimiento: rest.fecha_de_nacimiento, // Already an ISO string
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

export async function getStudents(): Promise<any[]> {
  // This query joins student details with user details.
  // It assumes 'estudiantes_detalles' has a 'rut' column that is a foreign key to 'usuarios.rut'.
  const { data, error } = await supabase
    .from('estudiantes_detalles')
    .select('nro_registro, fecha_matricula, fecha_retiro, curso:cursos(nivel, letra), usuario:usuarios(rut, nombres, apellidos, fecha_nacimiento, sexo:sexo(nombre), email, telefono, direccion)')
    .order('nro_registro', { ascending: true });
  if (error) {
    console.error('Error fetching students:', error);
    throw new Error('Could not fetch student data.');
  }
  return data.map(s => ({ ...s.usuario, ...s, id: s.nro_registro, grade: s.curso?.nivel ? `${s.curso.nivel}º Medio ${s.curso.letra}` : null, enrollmentDate: s.fecha_matricula }));
}

export async function getCourses(): Promise<{ id: string; nombre: string }[]> {
  const { data, error } = await supabase.from('cursos').select('id, nivel, letra');

  if (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Could not fetch courses data.');
  }

  return data.map(curso => ({ id: String(curso.id), nombre: `${curso.nivel}º Medio ${curso.letra}` }));
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
