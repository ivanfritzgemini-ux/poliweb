'use client';

import { useEffect, useState } from 'react';

type UserProfile = {
  nombres: string;
  apellidos: string;
  role?: { nombre_rol: string };
};

export function DashboardWelcome() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (err) {
        console.error('Error parsing profile:', err);
      }
    }
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-3xl font-headline font-bold text-primary">
        {profile ? (
          <>
            Bienvenid{profile.nombres.toLowerCase().endsWith('a') ? 'a' : 'o'} {profile.nombres} {profile.apellidos}
          </>
        ) : (
          'Bienvenido al Panel de Control'
        )}
      </h1>
      <p className="text-muted-foreground">
        {profile?.role?.nombre_rol ? (
          <span className="font-medium">{profile.role.nombre_rol} - </span>
        ) : null}
        Aquí tienes un resumen de la actividad de tu institución.
      </p>
    </div>
  );
}