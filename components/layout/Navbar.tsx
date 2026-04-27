'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Leaf, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-2 shadow-2xl shadow-emerald-900/20'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className={`relative p-2 rounded-xl transition-all duration-500 ${scrolled ? 'bg-emerald-500/20' : 'bg-white/10 backdrop-blur-sm'}`}>
              <Leaf className="h-5 w-5 text-emerald-400 transition-transform duration-500 group-hover:rotate-12" />
              <div className="absolute inset-0 rounded-xl bg-emerald-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              Eco<span className="text-emerald-400">Sort</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '/soluciones', label: 'Soluciones' },
              { href: '/integracion', label: 'Cómo Funciona' },
              { href: '/sobre-nosotros', label: 'Nosotros' },
              { href: '/app-movil', label: 'App Móvil' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-emerald-400 rounded-full transition-all duration-300 group-hover:w-3/4" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="sm"
                className="relative overflow-hidden bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-full px-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5"
              >
                <span className="relative z-10">Solicitar Demo</span>
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-6 pt-4 pb-6 space-y-3 bg-black/90 backdrop-blur-xl border-t border-white/10">
          {[
            { href: '/soluciones', label: 'Soluciones' },
            { href: '/integracion', label: 'Cómo Funciona' },
            { href: '/sobre-nosotros', label: 'Nosotros' },
            { href: '/app-movil', label: 'App Móvil' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-white/80 hover:text-white py-2 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/login">
              <Button variant="ghost" className="w-full text-white/70 hover:text-white hover:bg-white/10">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/demo">
              <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-full">
                Solicitar Demo
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
