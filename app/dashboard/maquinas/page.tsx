import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, MoreHorizontal } from 'lucide-react'

export default async function MaquinasPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  const role = session.user.role
  
  // If user is client, show only their machines. If Super Admin, show all.
  const whereClause = role === 'CLIENTE_INSTITUCIONAL' && session.user.companyId
    ? { location: { companyId: session.user.companyId } }
    : {}

  const maquinas = await prisma.machine.findMany({
    where: whereClause,
    include: { location: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Máquinas</h1>
          <p className="text-muted-foreground">Monitoriza el estado y capacidad del parque de máquinas activas.</p>
        </div>
        {(role === 'SUPER_ADMIN' || role === 'ADMIN_INTERNO') && (
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Máquina
          </Button>
        )}
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número de Serie</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Capacidad Registrada</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maquinas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No hay máquinas registradas en su organización.
                </TableCell>
              </TableRow>
            ) : null}
            {maquinas.map((machine: any) => (
              <TableRow key={machine.id}>
                <TableCell className="font-medium">{machine.serialNumber}</TableCell>
                <TableCell>{machine.location?.name || 'Sin asignar'}</TableCell>
                <TableCell>
                  <Badge variant={machine.status === 'ACTIVE' ? 'default' : machine.status === 'MAINTENANCE' ? 'secondary' : 'destructive'} 
                         className={machine.status === 'ACTIVE' ? 'bg-emerald-500' : ''}>
                    {machine.status === 'ACTIVE' ? 'Operativa' : machine.status === 'MAINTENANCE' ? 'Mantenimiento' : 'Inactiva'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                       <div 
                         className={`h-full ${machine.capacity > 80 ? 'bg-destructive' : machine.capacity > 50 ? 'bg-yellow-500' : 'bg-emerald-500'}`} 
                         style={{ width: `${machine.capacity}%` }} 
                       />
                    </div>
                    <span className="text-sm text-muted-foreground">{machine.capacity}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
