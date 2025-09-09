import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatChileanRut(rut: string): string {
  if (!rut) {
    return '';
  }
  const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  
  if (cleanRut.length < 2) {
    return cleanRut;
  }

  let body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);

  body = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${body}-${dv}`;
}

export function validateChileanRut(rut: string): boolean {
  if (!rut) return false;

  // Clean RUT: remove dots and hyphens
  const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();

  // Check basic format: 7 to 9 digits/K followed by a single digit/K
  if (!/^[0-9]{7,8}[0-9kK]{1}$/.test(cleanRut)) {
    return false;
  }

  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);

  let sum = 0;
  let multiple = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body.charAt(i), 10) * multiple;
    multiple = multiple === 7 ? 2 : multiple + 1;
  }

  const calculatedDv = 11 - (sum % 11);
  const expectedDv = calculatedDv === 11 ? '0' : calculatedDv === 10 ? 'K' : calculatedDv.toString();

  return dv === expectedDv;
}
