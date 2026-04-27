'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Leaf } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setIsLoading(false)

    if (res?.error) {
      setError('Credenciales invalidas. (Para demo usa admin@ecosort.com)')
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
             <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
              <Leaf className="h-6 w-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Iniciar Sesión</h1>
          <p className="text-sm text-muted-foreground">Introduce tu email para acceder a EcoSort Rewards.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email profesional</Label>
            <Input id="email" name="email" type="email" placeholder="admin@ecosort.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña (Mete cualquiera en demo)</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          {error && <p className="text-sm text-destructive font-medium">{error}</p>}
          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 h-10" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Acceder al panel"}
          </Button>
        </form>
      </div>
    </div>
  )
}
