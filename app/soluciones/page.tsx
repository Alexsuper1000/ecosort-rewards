'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { GraduationCap, MapPin, Building2, ArrowRight, ChevronDown, Calculator, Users, TrendingUp, Building, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function SolucionesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo('.hero-text', 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out" }
      )

      // Horizontal Scroll Animation
      const panels = gsap.utils.toArray('.panel') as HTMLElement[]
      
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + (panelsRef.current?.offsetWidth || 0),
        }
      })

      // Parallax for panel images
      panels.forEach((panel, i) => {
        const bg = panel.querySelector('.panel-bg')
        if (bg) {
           gsap.fromTo(bg, 
             { x: i === 0 ? "0%" : "20%" },
             {
               x: i === panels.length - 1 ? "0%" : "-20%",
               ease: "none",
               scrollTrigger: {
                 trigger: pinRef.current,
                 start: "top top",
                 end: () => "+=" + (panelsRef.current?.offsetWidth || 0),
                 scrub: 1
               }
             }
           )
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const solutions = [
    {
      id: "universidades",
      title: "UNIVERSIDADES",
      subtitle: "Campus Conectado",
      desc: "Fomenta la conciencia ecológica entre los estudiantes. Nuestras máquinas se integran con las tarjetas universitarias, ofreciendo recompensas inmediatas como descuentos en cafetería, material de estudio o créditos universitarios.",
      icon: GraduationCap,
      img: "/uni.png",
      color: "from-emerald-500",
      textColor: "text-emerald-400"
    },
    {
      id: "ayuntamientos",
      title: "AYUNTAMIENTOS",
      subtitle: "Smart City",
      desc: "Implementa sistemas de Devolución y Recompensa a escala masiva. Mejora drásticamente la limpieza de las calles y recompensa a los ciudadanos con bonos de transporte público o apoyo al comercio local.",
      icon: MapPin,
      img: "/city_sol.png",
      color: "from-cyan-500",
      textColor: "text-cyan-400"
    },
    {
      id: "retail",
      title: "RETAIL",
      subtitle: "Centros Comerciales",
      desc: "Atrae tráfico cualificado a tus instalaciones y genera una fidelidad de marca inquebrantable. Los usuarios que reciclan en tus nodos obtienen cupones directos para gastar exclusivamente en tus tiendas.",
      icon: Building2,
      img: "/retail.png",
      color: "from-amber-500",
      textColor: "text-amber-400"
    }
  ]

  return (
    <div ref={containerRef} className="bg-[#020503] text-white min-h-screen selection:bg-emerald-500/30 overflow-hidden">
      
      {/* Hero Section */}
      <div className="h-[80vh] flex flex-col items-center justify-center text-center px-6 relative">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15)_0%,#020503_70%)] pointer-events-none" />
         
         <div className="hero-text inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 font-mono text-sm tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Ecosistemas a Medida
         </div>
         <h1 className="hero-text text-[12vw] md:text-8xl lg:text-[7rem] font-black tracking-tighter uppercase leading-[0.85] mb-8">
            ESCALA TU <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-500 drop-shadow-[0_0_40px_rgba(52,211,153,0.3)]">
               IMPACTO.
            </span>
         </h1>
         <p className="hero-text text-xl md:text-2xl text-white/60 font-light max-w-2xl text-balance">
            Descubre cómo nuestra tecnología se adapta a tu entorno para maximizar la participación y revolucionar el reciclaje.
         </p>
         
         <div className="absolute bottom-10 hero-text animate-bounce text-white/30">
            <span className="text-xs tracking-widest uppercase font-mono block mb-2">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent mx-auto" />
         </div>
      </div>

      {/* Horizontal Scroll Section */}
      <div ref={pinRef} className="h-screen w-full relative">
        <div ref={panelsRef} className="flex h-full w-[300vw]">
          
          {solutions.map((sol, index) => {
            const Icon = sol.icon
            return (
              <div key={sol.id} className="panel w-screen h-full relative flex items-center justify-center overflow-hidden">
                
                {/* Background Image with Parallax */}
                <div className="absolute inset-0 w-full h-full">
                   <div className="panel-bg absolute inset-0 w-[120%] h-full -left-[10%]">
                     <Image src={sol.img} alt={sol.title} fill className="object-cover opacity-50 mix-blend-screen" priority={index === 0} />
                   </div>
                   <div className={`absolute inset-0 bg-gradient-to-r ${sol.color}/10 to-[#020503]/80 mix-blend-multiply`} />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-[#020503]/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                  
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl">
                        <Icon className={`w-8 h-8 ${sol.textColor}`} strokeWidth={1.5} />
                      </div>
                      <span className="font-mono tracking-[0.3em] text-sm uppercase text-white/50">0{index + 1} // {sol.subtitle}</span>
                    </div>

                    <h2 className={`text-6xl md:text-8xl font-black tracking-tighter uppercase ${sol.textColor} drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]`}>
                      {sol.title}
                    </h2>

                    <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-xl">
                      {sol.desc}
                    </p>

                    <Link href="/integracion">
                      <Button size="lg" className="h-14 px-8 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-full backdrop-blur-md transition-all duration-300 group">
                        EXPLORAR INTEGRACIÓN
                        <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                      </Button>
                    </Link>
                  </div>

                  {/* Visual Element / Decorator (Dashboard Widget) */}
                  <div className="hidden md:flex relative h-[600px] items-center justify-end">
                    <div className="w-[380px] rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0a110d]/90 to-black/80 backdrop-blur-2xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform transition-transform hover:scale-105 group">
                       
                       {/* Header */}
                       <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-5">
                         <div className="flex items-center gap-3">
                           <div className={`p-2.5 rounded-xl bg-white/5 ${sol.textColor}`}>
                             <Icon className="w-5 h-5" />
                           </div>
                           <span className="font-bold text-sm tracking-wide text-white/90">Métricas en Tiempo Real</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <span className="text-[10px] font-mono text-emerald-400">LIVE</span>
                           <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                         </div>
                       </div>
                       
                       {/* Main Metric (Donut Chart) */}
                       <div className="mb-10 text-center relative">
                         <div className="w-48 h-48 mx-auto rounded-full flex flex-col items-center justify-center relative">
                            {/* SVG Donut */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-2xl" viewBox="0 0 100 100">
                               <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="8" className={`${sol.textColor} opacity-10`} />
                               <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="276" strokeDashoffset="40" className={`${sol.textColor} transition-all duration-1000 opacity-80`} strokeLinecap="round" />
                            </svg>
                            <span className="text-5xl font-black text-white tracking-tighter drop-shadow-lg">+85<span className="text-2xl">%</span></span>
                            <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mt-2">Tasa de Reciclaje</span>
                         </div>
                       </div>

                       {/* Mini Bar Chart */}
                       <div className="space-y-4">
                         <div className="flex justify-between text-[10px] text-white/40 mb-2 font-mono tracking-widest">
                           <span>LUN</span><span>MAR</span><span>MIE</span><span>JUE</span><span>VIE</span>
                         </div>
                         <div className="flex justify-between items-end h-24 gap-3">
                            {[40, 75, 45, 95, 65].map((height, idx) => (
                              <div key={idx} className="w-full bg-white/5 rounded-t-md relative group/bar">
                                <div 
                                  className={`absolute bottom-0 w-full rounded-t-md transition-all duration-1000 opacity-80 group-hover/bar:opacity-100 ${sol.textColor.replace('text-', 'bg-')}`} 
                                  style={{ height: `${height}%` }}
                                >
                                  <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a2920] border border-emerald-500/30 text-white text-[11px] font-bold py-1.5 px-2.5 rounded-lg transition-opacity shadow-xl z-20">
                                    {height * 12}
                                  </div>
                                </div>
                              </div>
                            ))}
                         </div>
                       </div>
                       
                    </div>
                  </div>

                </div>
              </div>
            )
          })}

        </div>
      </div>
      {/* Social Proof Section */}
      <div className="py-20 bg-black relative border-t border-white/10 z-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/40 font-mono text-sm tracking-widest uppercase mb-10">Empresas e Instituciones que ya confían en EcoSort</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex items-center gap-3 font-black text-2xl"><Building className="w-8 h-8" /> TECHNO PARK</div>
             <div className="flex items-center gap-3 font-black text-2xl"><GraduationCap className="w-8 h-8" /> UNIV. STATE</div>
             <div className="flex items-center gap-3 font-black text-2xl"><Building2 className="w-8 h-8" /> MEGA MALL</div>
             <div className="flex items-center gap-3 font-black text-2xl"><MapPin className="w-8 h-8" /> CITY COUNCIL</div>
          </div>
        </div>
      </div>

      {/* ROI Calculator & FAQ Section */}
      <div className="py-32 bg-[#020503] relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20">
            <RoiCalculator />
            <FaqSection />
          </div>
        </div>
      </div>

      {/* Footer spacer for natural scroll out */}
      <div className="h-[10vh] bg-[#020503]" />
    </div>
  )
}

function RoiCalculator() {
  const [visitors, setVisitors] = useState(5000)
  const calcBottles = Math.floor(visitors * 0.15 * 30) // 15% rate, 30 days
  const calcCO2 = (calcBottles * 0.08).toFixed(1) // 80g per bottle
  const calcLoyalty = Math.floor(visitors * 0.05) // 5% loyal users

  return (
    <div className="bg-[#050A07] border border-emerald-500/20 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-500/10 rounded-xl">
          <Calculator className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tight">Calculadora de Retorno</h3>
      </div>
      
      <p className="text-white/60 mb-8 font-light">Estima el impacto medioambiental y la tracción de usuarios que generarías en tu instalación mensualmente.</p>

      <div className="mb-10">
        <div className="flex justify-between mb-4">
          <span className="font-medium text-white/80">Tráfico diario estimado</span>
          <span className="font-black text-emerald-400 text-xl">{visitors.toLocaleString()} personas</span>
        </div>
        <input 
          type="range" 
          min="500" 
          max="50000" 
          step="500" 
          value={visitors} 
          onChange={(e) => setVisitors(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between mt-2 text-xs text-white/40 font-mono">
          <span>500</span>
          <span>50,000+</span>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-blue-400" /></div>
             <span className="font-medium">Envases Recuperados / mes</span>
           </div>
           <span className="text-2xl font-black">{calcBottles.toLocaleString()}</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center"><Leaf className="w-5 h-5 text-emerald-400" /></div>
             <span className="font-medium">CO2 Ahorrado / mes</span>
           </div>
           <span className="text-2xl font-black">{calcCO2} Kg</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center"><Users className="w-5 h-5 text-amber-400" /></div>
             <span className="font-medium">Nuevos Usuarios Fidelizados</span>
           </div>
           <span className="text-2xl font-black">+{calcLoyalty.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    { q: "¿Quién financia las recompensas?", a: "EcoSort se asocia con marcas sostenibles, negocios locales y administraciones que patrocinan las recompensas a cambio de visibilidad, tráfico y datos de impacto positivo." },
    { q: "¿Qué mantenimiento requiere la máquina?", a: "Nuestras máquinas están conectadas a la nube (IoT). Te avisarán automáticamente cuando necesiten ser vaciadas. El mantenimiento técnico está incluido en nuestro plan de suscripción." },
    { q: "¿Cómo evitan el fraude al reciclar?", a: "Utilizamos una combinación de IA visual (reconocimiento de imagen), sensores de peso ultrasónicos y lectura de código de barras para garantizar que solo se recompensen envases válidos." },
    { q: "¿Cuánto espacio ocupa?", a: "El modelo estándar tiene una huella de tan solo 1m x 1m, conectándose a un enchufe estándar de 220V. Está diseñada para encajar perfectamente en pasillos, cafeterías o entradas." }
  ]

  return (
    <div className="flex flex-col justify-center">
      <h3 className="text-4xl font-black uppercase tracking-tight mb-8">Preguntas <span className="text-emerald-400">Frecuentes</span></h3>
      
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'bg-white/5 shadow-lg shadow-emerald-500/5' : 'bg-transparent hover:bg-white/5'}`}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-6 py-5 flex items-center justify-between text-left"
            >
              <span className="font-semibold text-lg">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-emerald-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <div 
              className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}
            >
              <p className="text-white/60 font-light leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center">
        <p className="text-white/80 font-medium mb-3">¿Tienes más dudas sobre la implementación?</p>
        <Link href="/demo" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors inline-flex items-center gap-2">
          Habla con un especialista <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
