'use server';

import {
  generateStudentAvatar,
  type GenerateStudentAvatarInput,
} from '@/ai/flows/generate-student-avatar';
import { supabase } from './supabase';
import type { Staff } from './types';

export async function generateAvatarAction(input: GenerateStudentAvatarInput) {
  try {
    const output = await generateStudentAvatar(input);
    return { avatarDataUri: output.avatarDataUri };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'An unknown error occurred' };
  }
}

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
  });

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
