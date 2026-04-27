import Link from 'next/link'
import { Leaf, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#020503] text-white pt-20 pb-10">
      <div className="container px-6 lg:px-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2.5 font-bold text-2xl">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Leaf className="h-6 w-6 text-emerald-400" />
              </div>
              <span>Eco<span className="text-emerald-400">Sort</span></span>
            </div>
            <p className="text-white/60 leading-relaxed max-w-sm text-sm">
              Únete a la revolución del reciclaje inteligente. Transformamos los residuos en recompensas reales para crear un ecosistema urbano 100% circular.
            </p>
            
            <div className="pt-4">
              <h4 className="text-xs font-bold text-white/80 mb-3 uppercase tracking-widest">Únete a nuestra Newsletter</h4>
              <div className="flex gap-2 max-w-sm">
                <input 
                  type="email" 
                  placeholder="tu@email.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-4">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-6 text-white text-lg">Soluciones</h3>
            <ul className="space-y-4 text-sm text-white/50">
              <li><Link href="/soluciones" className="hover:text-emerald-400 transition-colors">Universidades</Link></li>
              <li><Link href="/soluciones" className="hover:text-emerald-400 transition-colors">Smart Cities</Link></li>
              <li><Link href="/soluciones" className="hover:text-emerald-400 transition-colors">Retail y Centros</Link></li>
              <li><Link href="/demo" className="hover:text-emerald-400 transition-colors text-emerald-400/80 font-medium">Solicitar Máquina</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-white text-lg">Empresa</h3>
            <ul className="space-y-4 text-sm text-white/50">
              <li><Link href="/sobre-nosotros" className="hover:text-emerald-400 transition-colors">Nuestra Historia</Link></li>
              <li><Link href="/integracion" className="hover:text-emerald-400 transition-colors">Tecnología e IA</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Trabaja con nosotros</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Blog Sostenible</Link></li>
            </ul>
          </div>

          {/* App Download */}
          <div>
            <h3 className="font-bold mb-6 text-white text-lg">Descarga la App</h3>
            <p className="text-xs text-white/50 mb-4">Empieza a reciclar y ganar puntos hoy mismo.</p>
            <div className="space-y-3">
              <Link href="/app-movil" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-white/80 group-hover:text-white transition-colors" viewBox="0 0 16 16"><path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.752-2.392.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-1.082-.031-2.245.678-2.896.678-.65 0-1.722-.647-2.708-.647-1.464 0-3.328.718-4.505 2.808-1.178 2.089-1.21 5.39-.06 7.625.438.85 1.05 1.76 1.95 1.76.899 0 1.25-.664 2.275-.664 1.025 0 1.4.664 2.275.664.875 0 1.55-.91 1.95-1.76.31-.65.57-1.36.78-2.113z"/></svg>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/50 leading-none mb-1">Descarga en el</span>
                  <span className="text-sm font-bold leading-none">App Store</span>
                </div>
              </Link>
              <Link href="/app-movil" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-emerald-500/80 group-hover:text-emerald-400 transition-colors ml-0.5 mr-0.5" viewBox="0 0 16 16"><path d="M14.499 8.553l-12-8.5C2.103-.23 1.5 0 1.5 1v14c0 1 .603 1.23 1 1l12-8.5c.397-.282.397-.718 0-1z"/></svg>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/50 leading-none mb-1">DISPONIBLE EN</span>
                  <span className="text-sm font-bold leading-none">Google Play</span>
                </div>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-white/40">
            © {new Date().getFullYear()} EcoSort Rewards S.L. Todos los derechos reservados.
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
            <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-white transition-colors">Términos Legales</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-emerald-500 hover:text-white transition-all hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.873 11.633Z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-emerald-500 hover:text-white transition-all hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-emerald-500 hover:text-white transition-all hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
