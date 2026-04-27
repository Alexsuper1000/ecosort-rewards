import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Gift } from 'lucide-react'

export default async function RecompensasPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  const role = session.user.role
  const whereClause = role === 'PARTNER' || role === 'CLIENTE_INSTITUCIONAL' && session.user.companyId
    ? { companyId: session.user.companyId }
    : {}

  const recompensas = await prisma.reward.findMany({
    where: whereClause,
    include: { company: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catálogo de Recompensas</h1>
          <p className="text-muted-foreground">Gestiona las recompensas disponibles para los usuarios finales.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Recompensa
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recompensas.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground bg-card border rounded-lg">
            No hay recompensas registradas.
          </div>
        ) : null}
        
        {recompensas.map((reward: any) => (
          <Card key={reward.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant={reward.active ? 'default' : 'secondary'} className={reward.active ? 'bg-emerald-500' : ''}>
                  {reward.active ? 'Activa' : 'Inactiva'}
                </Badge>
                <div className="text-emerald-600 font-bold flex items-center gap-1">
                  <Gift className="w-4 h-4" />
                  {reward.pointsRequired} pts
                </div>
              </div>
              <CardTitle className="mt-4">{reward.title}</CardTitle>
              <CardDescription>{reward.company?.name}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">{reward.description}</p>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="text-xs text-muted-foreground">Stock: {reward.stock} disponibles</div>
              <Button variant="outline" size="sm">Editar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
