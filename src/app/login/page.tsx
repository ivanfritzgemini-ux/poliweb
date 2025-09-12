"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast({ title: 'Error', description: error.message })
        setLoading(false)
        return
      }

      const userId = data.session?.user?.id

      if (!userId) {
        toast({ title: 'Error', description: 'No se pudo obtener el usuario.' })
        setLoading(false)
        return
      }

      // Fetch profile from usuarios table including role (roles.nombre_rol)
      const { data: profile, error: profileError } = await supabase
        .from('usuarios')
        .select('id, nombres, apellidos, email, role:roles(id, nombre_rol)')
        .eq('id', userId)
        .single()

      if (profileError) {
        // If user is authenticated but has no profile row, inform the user
        toast({ title: 'Perfil no encontrado', description: profileError.message || 'No hay perfil para este usuario.' })
        // Sign out the user since they can't access the system without a profile
        await supabase.auth.signOut()
        setLoading(false)
        return
      }

      if (!profile.role) {
        toast({ title: 'Error de acceso', description: 'No se ha asignado un rol a este usuario. Por favor contacte al administrador.' })
        // Sign out the user since they can't access the system without a role
        await supabase.auth.signOut()
        setLoading(false)
        return
      }

      // Validate that the role is one of the expected values
      const validRoles = ['admin', 'staff', 'estudiante']
      if (!validRoles.includes(profile.role.nombre_rol.toLowerCase())) {
        toast({ title: 'Error de acceso', description: 'El rol asignado no es válido. Por favor contacte al administrador.' })
        // Sign out the user since they can't access the system with an invalid role
        await supabase.auth.signOut()
        setLoading(false)
        return
      }

      // Save a minimal profile in localStorage for client usage
      try {
        localStorage.setItem('userProfile', JSON.stringify(profile))
      } catch (err) {
        // ignore localStorage errors
      }

  // Determinar la ruta de redirección basada en el rol
  let redirectTo = '/'
  if (profile.role?.nombre_rol) {
    const role = profile.role.nombre_rol.toLowerCase()
    switch (role) {
      case 'admin':
        redirectTo = '/admin'
        break
      case 'staff':
        redirectTo = '/staff'
        break
      case 'estudiante':
        redirectTo = '/students'
        break
    }
  }

  toast({ title: 'Bienvenido', description: `Hola ${profile.nombres} ${profile.apellidos}` })

  // Redirect to role-specific dashboard
  router.push(redirectTo)
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || String(err) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md p-8 rounded-lg shadow-sm bg-card">
        <h1 className="text-2xl font-semibold mb-6">Iniciar sesión</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
