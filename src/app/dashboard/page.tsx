'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, School, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { getStudents, getStaff, getCourses } from "@/lib/actions";
import { useEffect, useState } from "react";

type UserProfile = {
  nombres: string;
  apellidos: string;
  role?: { nombre_rol: string };
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    studentCount: 0,
    staffCount: 0,
    courseCount: 0,
    recentEnrollments: [] as any[],
  });

  useEffect(() => {
    // Load profile from localStorage
    try {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (err) {
      console.error('Error loading profile:', err);
    }

    // Load stats
    async function loadStats() {
      try {
        const [
          { totalCount: studentCount },
          { totalCount: staffCount },
          courses,
          { students: recentEnrollments }
        ] = await Promise.all([
          getStudents(1, 0),
          getStaff(1, 0),
          getCourses(),
          getStudents(1, 3, { column: 'fecha_matricula', ascending: false })
        ]);

        setStats({
          studentCount,
          staffCount,
          courseCount: courses.length,
          recentEnrollments,
        });
      } catch (err) {
        console.error('Error loading stats:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const staffActivity = [
    { name: 'Ricardo Perez', action: 'actualizó el perfil de un estudiante.' },
    { name: 'Maria Lopez', action: 'creó una nueva tarea.' },
    { name: 'Jorge Diaz', action: 'registró un pago de matrícula.' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-headline font-bold text-primary">
          Bienvenido{profile?.nombres?.endsWith('a') ? 'a' : ''} {profile ? `${profile.nombres} ${profile.apellidos}` : ''}
        </h1>
        <p className="text-muted-foreground">
          {profile?.role?.nombre_rol ? `${profile.role.nombre_rol} - ` : ''}
          Aquí tienes un resumen de la actividad de tu institución.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Estudiantes
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.studentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personal Activo</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.staffCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Totales</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.courseCount}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline">Matriculaciones Recientes</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/students">
                Ver todos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {loading ? (
                <li className="text-sm text-muted-foreground">Cargando matriculaciones...</li>
              ) : stats.recentEnrollments.map((student, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{student.nombres} {student.apellidos}</p>
                    <p className="text-sm text-muted-foreground">{student.grade}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline">Actividad del Personal</CardTitle>
             <Button variant="ghost" size="sm" asChild>
              <Link href="/staff">
                Ver todo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
             <ul className="space-y-4">
              {staffActivity.map((activity, i) => (
                <li key={i} className="flex items-center">
                  <div className="flex flex-col">
                    <p className="text-sm"><span className="font-semibold">{activity.name}</span> {activity.action}</p>
                    <span className="text-xs text-muted-foreground">hace {i * 15 + 3} min</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}