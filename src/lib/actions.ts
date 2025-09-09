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
  const { data, error } = await supabase.from('usuarios').select('*');
  if (error) {
    console.error('Error fetching staff:', error);
    throw new Error('Could not fetch staff data.');
  }
  return data as Staff[];
}
