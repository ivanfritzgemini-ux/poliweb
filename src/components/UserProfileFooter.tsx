'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

type UserProfile = {
  nombres: string;
  apellidos: string;
  email: string;
  role?: { nombre_rol: string };
};

export function UserProfileFooter() {
  const router = useRouter();
  const { toast } = useToast();
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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('userProfile');
      router.replace('/login');
      toast({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión exitosamente.',
      });
    } catch (err) {
      console.error('Error signing out:', err);
      toast({
        title: 'Error',
        description: 'No se pudo cerrar la sesión.',
      });
    }
  };

  if (!profile) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage
            src="https://picsum.photos/40/40"
            alt={profile.nombres}
            data-ai-hint="person face"
          />
          <AvatarFallback>{profile.nombres[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">
            {profile.nombres} {profile.apellidos}
          </span>
          <span className="text-xs text-muted-foreground">
            {profile.role?.nombre_rol || ''}
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Cerrar sesión</span>
      </Button>
    </div>
  );
}