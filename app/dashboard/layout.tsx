import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Users, MapPin, Gift, Settings, LogOut, Package } from 'lucide-react'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  // Basic role check
  const role = session.user.role
  const dashboardRoutes = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Máquinas', path: '/dashboard/maquinas', icon: <Package className="w-5 h-5" /> },
    { name: 'Ubicaciones', path: '/dashboard/ubicaciones', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Recompensas', path: '/dashboard/recompensas', icon: <Gift className="w-5 h-5" /> },
  ]
  
  if (role === 'SUPER_ADMIN' || role === 'ADMIN_INTERNO') {
    dashboardRoutes.push({ name: 'Usuarios', path: '/dashboard/usuarios', icon: <Users className="w-5 h-5" /> })
    dashboardRoutes.push({ name: 'Configuración', path: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> })
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/20 flex flex-col">
        <div className="p-4 border-b">
          <p className="font-semibold">{session.user.name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {dashboardRoutes.map((route) => (
              <li key={route.path}>
                <Link href={route.path} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700 text-sm font-medium transition-colors">
                  {route.icon}
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-destructive/10 hover:text-destructive text-sm font-medium transition-colors">
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-muted/10 p-6 md:p-8">
        {children}
      </main>
    </div>
  )
}
