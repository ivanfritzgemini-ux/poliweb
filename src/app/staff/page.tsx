import { StaffList } from '@/components/StaffList';

export default function StaffPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-headline font-bold text-primary">Gestión de Personal</h1>
        <p className="text-muted-foreground">Añada nuevos miembros del personal y gestione las cuentas existentes.</p>
      </div>
      <StaffList />
    </div>
  );
}
