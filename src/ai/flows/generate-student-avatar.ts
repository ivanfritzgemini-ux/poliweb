// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Generates a student avatar based on the student's name.
 *
 * - generateStudentAvatar - A function that generates a student avatar.
 * - GenerateStudentAvatarInput - The input type for the generateStudentAvatar function.
 * - GenerateStudentAvatarOutput - The return type for the generateStudentAvatar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudentAvatarInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
});
export type GenerateStudentAvatarInput = z.infer<typeof GenerateStudentAvatarInputSchema>;

const GenerateStudentAvatarOutputSchema = z.object({
  avatarDataUri: z
    .string()
    .describe(
      'The generated avatar for the student, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // keep this comment here to avoid reformatting
    ),
});
export type GenerateStudentAvatarOutput = z.infer<typeof GenerateStudentAvatarOutputSchema>;

export async function generateStudentAvatar(input: GenerateStudentAvatarInput): Promise<GenerateStudentAvatarOutput> {
  return generateStudentAvatarFlow(input);
}

const generateStudentAvatarPrompt = ai.definePrompt({
  name: 'generateStudentAvatarPrompt',
  input: {schema: GenerateStudentAvatarInputSchema},
  output: {schema: GenerateStudentAvatarOutputSchema},
  prompt: `Generate a professional and friendly avatar for a student named {{studentName}}. The avatar should be suitable for use on a school website and should not contain any inappropriate content. The image should be a square with a white background, and the student should be smiling. Optionally add some features related to school, such as a graduation hat or school books. Ensure the generated avatar is in data URI format.`,
});

const generateStudentAvatarFlow = ai.defineFlow(
  {
    name: 'generateStudentAvatarFlow',
    inputSchema: GenerateStudentAvatarInputSchema,
    outputSchema: GenerateStudentAvatarOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      prompt: generateStudentAvatarPrompt(input).prompt,
      model: 'googleai/imagen-4.0-fast-generate-001',
    });

    if (!media?.url) {
      throw new Error('Failed to generate avatar.');
    }
    return {avatarDataUri: media.url};
  }
);
