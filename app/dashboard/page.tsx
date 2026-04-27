import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BarChart3, Recycle, Users, Building2 } from 'lucide-react'

export default async function DashboardHome() {
  const session = await auth()
  
  // Fetch some metrics for the dashboard
  const userCount = await prisma.user.count()
  const machineCount = await prisma.machine.count()
  const stats = await prisma.recyclingEvent.aggregate({
    _sum: {
      weight: true,
      pointsEarned: true
    },
    _count: true
  })
  
  const totalWeight = stats._sum.weight || 0
  const totalPoints = stats._sum.pointsEarned || 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido, {session?.user?.name}</h1>
        <p className="text-muted-foreground">Aquí está el resumen de impacto de hoy.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Material Reciclado</CardTitle>
            <Recycle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWeight.toFixed(2)} kg</div>
            <p className="text-xs text-muted-foreground">
              +14% respecto al mes pasado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">EcoPuntos Generados</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints}</div>
            <p className="text-xs text-muted-foreground">
              Equivalente a {Math.round(totalPoints / 10)} recompensas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
            <p className="text-xs text-muted-foreground">
              Usuarios registrados en el sistema
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Máquinas Operativas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{machineCount}</div>
            <p className="text-xs text-muted-foreground">
              En todas las ubicaciones
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Impacto Ambiental (Mensual)</CardTitle>
            <CardDescription>
              Kilos de CO2 evitados gracias al reciclaje en las máquinas EcoSort.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-dashed m-4 rounded-xl bg-muted/20">
            <p className="text-muted-foreground text-sm">El gráfico de barras se renderizaría aquí con Recharts</p>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimos eventos de reciclaje detectados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
               <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Estudiante</p>
                    <p className="text-sm text-muted-foreground">Campus Central</p>
                  </div>
                  <div className="ml-auto font-medium">+10 Puntos</div>
               </div>
               <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Profesor</p>
                    <p className="text-sm text-muted-foreground">Facultad de Ciencias</p>
                  </div>
                  <div className="ml-auto font-medium">+5 Puntos</div>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
