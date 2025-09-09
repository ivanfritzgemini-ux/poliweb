import { StudentList } from '@/components/StudentList';

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-headline font-bold text-primary">Gestión de Estudiantes</h1>
        <p className="text-muted-foreground">Busque, matricule y gestione los perfiles de los estudiantes.</p>
      </div>
      <StudentList />
    </div>
  );
}
