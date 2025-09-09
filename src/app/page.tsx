import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, School, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const recentEnrollments = [
    { name: 'Elena Petrova', grade: '10º Grado' },
    { name: 'Marcus Aurelius', grade: 'Filosofía I' },
    { name: 'Juana de Arco', grade: 'Historia Medieval' },
  ];
  const staffActivity = [
    { name: 'Ricardo Perez', action: 'actualizó el perfil de un estudiante.' },
    { name: 'Maria Lopez', action: 'creó una nueva tarea.' },
    { name: 'Jorge Diaz', action: 'registró un pago de matrícula.' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-headline font-bold text-primary">Bienvenido a AcademiaLink</h1>
        <p className="text-muted-foreground">Aquí tienes un resumen de la actividad de tu institución.</p>
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
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personal Activo</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              +5 desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Totales</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              +2 nuevos este semestre
            </p>
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
              {recentEnrollments.map((student, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.grade}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">hace {i * 10 + 5} min</span>
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
