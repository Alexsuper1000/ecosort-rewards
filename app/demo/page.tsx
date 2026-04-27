'use client'

import { useState } from 'react'
import { submitDemoRequest } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

export default function DemoPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    try {
      await submitDemoRequest(formData)
      setIsSubmitted(true)
    } catch (error) {
      console.error(error)
      alert("Hubo un error al enviar la solicitud.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container px-4 py-20 mx-auto flex justify-center">
      <Card className="w-full max-w-lg border-emerald-100 shadow-xl shadow-emerald-900/5">
        <CardHeader className="text-center space-y-2">
          {isSubmitted ? (
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
            </div>
          ) : null}
          <CardTitle className="text-3xl font-bold">Solicitud de Demo</CardTitle>
          <CardDescription>
            {isSubmitted 
              ? "Hemos recibido tus datos correctamente." 
              : "Déjanos tus datos y un especialista de EcoSort Rewards te contactará en las próximas 24 horas."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center space-y-6 py-8">
              <p className="text-muted-foreground">
                Gracias por tu interés en transformar el reciclaje en tu comunidad. 
                Revisaremos tu solicitud y prepararemos una demostración personalizada para tu sector.
              </p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => window.location.href = '/'}>
                Volver al Inicio
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" name="name" placeholder="Ana García" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email profesional</Label>
                <Input id="email" name="email" type="email" placeholder="ana@universidad.edu" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Organización / Empresa</Label>
                <Input id="company" name="company" placeholder="Universidad Politécnica" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Cuéntanos sobre tus necesidades principales</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Nos gustaría instalar máquinas en cafeterías..." 
                  className="min-h-[100px]"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg">
                {isLoading ? "Enviando..." : "Solicitar Demo"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
