'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6 text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500" />
        <h1 className="text-2xl font-bold">Acceso No Autorizado</h1>
        <p className="text-muted-foreground">
          No tienes permisos para acceder a esta sección. Por favor, contacta al administrador si crees que esto es un error.
        </p>
        <Button onClick={() => router.push('/')} variant="default">
          Volver al Inicio
        </Button>
      </div>
    </div>
  )
}