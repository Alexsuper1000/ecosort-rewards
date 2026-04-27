'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Bot, Recycle, Coins, ArrowDown, Smartphone, ScanLine } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

export default function IntegracionPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Timeline for the hero and the machine
      const tl = gsap.timeline()
      tl.fromTo('.machine-img', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      )
      .fromTo('.title-text', 
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
        "-=0.8"
      )

      // Steps animation
      const steps = gsap.utils.toArray('.step-card') as HTMLElement[]
      steps.forEach((step, i) => {
        gsap.fromTo(step,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
            }
          }
        )
      })

      // Looping Process Animation
      const processTl = gsap.timeline({ 
        repeat: -1, 
        repeatDelay: 0.5,
        scrollTrigger: {
          trigger: '.process-container',
          start: 'top 80%',
        }
      })
      
      processTl.set('.anim-bottle', { left: "10%", top: "50%", xPercent: -50, yPercent: -50, opacity: 0, rotation: 0, scale: 1, filter: "none" })
      processTl.set('.anim-scanner-line', { top: "0%", opacity: 0 })
      processTl.set('.anim-coin', { left: "50%", top: "50%", xPercent: -50, yPercent: -50, opacity: 0, scale: 0 })
      processTl.set('.anim-phone-screen', { backgroundColor: '#0a0a0a' })
      processTl.set('.anim-phone-icon', { color: 'rgba(255,255,255,0.3)', scale: 1 })

      // Bottle enters
      processTl.to('.anim-bottle', { opacity: 1, duration: 0.5 })
      processTl.to('.anim-bottle', { left: "50%", duration: 1.5, ease: 'power2.inOut' })

      // Scanning phase
      processTl.to('.anim-scanner-line', { opacity: 1, duration: 0.1 })
      processTl.to('.anim-scanner-line', { top: "100%", duration: 0.4, yoyo: true, repeat: 1, ease: 'linear' })
      processTl.to('.anim-scanner-line', { opacity: 0, duration: 0.1 })

      // Bottle turns green (accepted)
      processTl.to('.anim-bottle', { filter: 'drop-shadow(0 0 15px #34d399)', duration: 0.2 })

      // Bottle drops into bin
      processTl.to('.anim-bottle', { top: "150%", rotation: 45, opacity: 0, duration: 0.8, ease: 'power2.in' })

      // Coin pops up
      processTl.to('.anim-coin', { opacity: 1, scale: 1, top: "25%", duration: 0.5, ease: 'back.out(1.5)' }, "-=0.4")
      
      // Coin moves to phone
      processTl.to('.anim-coin', { left: "90%", top: "50%", scale: 0.5, opacity: 0, duration: 0.8, ease: 'power2.inOut' })

      // Phone screen lights up
      processTl.to('.anim-phone-screen', { backgroundColor: '#064e3b', duration: 0.2 }, "-=0.2")
      processTl.to('.anim-phone-icon', { color: '#34d399', scale: 1.2, duration: 0.2 }, "-=0.2")
      
      // Hold state, then reset
      processTl.to({}, { duration: 1.5 })
      processTl.to('.anim-phone-screen', { backgroundColor: '#0a0a0a', duration: 0.5 })
      processTl.to('.anim-phone-icon', { color: 'rgba(255,255,255,0.3)', scale: 1, duration: 0.5 }, "-=0.5")

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020503] text-white overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-emerald-900/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[50vw] h-[50vw] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Text and Steps */}
          <div className="space-y-16 relative z-10">
            <div className="space-y-6">
              <div className="title-text inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 font-mono text-sm tracking-widest uppercase text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Tecnología Inteligente
              </div>
              <h1 className="title-text text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                CÓMO FUNCIONA <br/> LA <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">MÁQUINA</span>
              </h1>
              <p className="title-text text-xl text-white/60 font-light max-w-lg leading-relaxed">
                Nuestra papelera inteligente hace el trabajo por ti. Solo introduce tu envase y nuestro sistema de visión artificial y sensores se encargan del resto, recompensándote al instante.
              </p>
            </div>

            {/* The Steps */}
            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[27px] before:w-px before:bg-gradient-to-b before:from-emerald-500/50 before:to-transparent">
              
              {/* Step 1 */}
              <div className="step-card relative pl-20">
                <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center backdrop-blur-md z-10">
                  <Recycle className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">1. Inserta el residuo</h3>
                <p className="text-white/60 font-light">
                  Introduce tu botella de plástico, lata o envase en la apertura de la máquina. El diseño es intuitivo y rápido, perfecto para zonas de alto tráfico.
                </p>
              </div>

              {/* Step 2 */}
              <div className="step-card relative pl-20">
                <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center backdrop-blur-md z-10">
                  <Bot className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">2. Clasificación automática</h3>
                <p className="text-white/60 font-light">
                  Mediante Inteligencia Artificial y sensores de peso/material, la máquina identifica al instante qué tipo de residuo es y lo clasifica internamente sin errores.
                </p>
              </div>

              {/* Step 3 */}
              <div className="step-card relative pl-20">
                <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center backdrop-blur-md z-10">
                  <Coins className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">3. Recibe tu recompensa</h3>
                <p className="text-white/60 font-light">
                  Obtén tus puntos EcoSort al instante. Escanea el código QR o usa tu tarjeta NFC para acumular saldo que podrás canjear por beneficios y descuentos locales.
                </p>
              </div>

            </div>

            <div className="pt-8 title-text">
              <Link href="/demo">
                <Button size="lg" className="h-14 px-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition-all duration-300 font-bold text-lg">
                  Solicitar Máquina para mi Empresa
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side: The Machine Image */}
          <div className="machine-img relative h-[600px] lg:h-[800px] w-full flex items-center justify-center">
            {/* Ambient glow behind machine */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-transparent to-transparent rounded-full blur-[100px]" />
            
            {/* The Image Wrapper */}
            <div className="relative w-full h-full max-w-[500px] rounded-3xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-sm p-4">
              <div className="w-full h-full relative rounded-2xl overflow-hidden bg-black/40">
                {/* 
                  Assuming the user will place their provided image as /machine-render.jpg in public folder
                  If not, this styling acts as a beautiful fallback frame.
                */}
                <img 
                  src="/machine-render.jpg" 
                  alt="Máquina inteligente EcoSort" 
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    // Fallback to a placeholder gradient if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-emerald-900/50', 'to-black');
                  }}
                />
                
                {/* Visual UI Overlays */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-xs text-white/80">SISTEMA ONLINE</span>
                  </div>
                  <span className="font-mono text-xs text-emerald-400">ID: ECO-0892</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-end mb-2">
                     <span className="text-white/60 text-sm">Estado de llenado</span>
                     <span className="text-emerald-400 font-bold">24%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-[24%] h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </div>

      {/* Visual Animation Section */}
      <div className="py-24 relative border-t border-white/10 bg-[#010302] process-container">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">El Proceso en <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Tiempo Real</span></h2>
            <p className="text-white/60 font-light max-w-2xl mx-auto">Observa lo que ocurre en el interior de la máquina y en tu dispositivo en cuestión de milisegundos.</p>
          </div>

          {/* Animation Container */}
          <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] bg-[#030805] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl shadow-emerald-900/10">
            
            {/* Background Decor */}
            <div className="absolute inset-0 grid grid-cols-3 divide-x divide-white/5 pointer-events-none">
              <div className="flex flex-col items-center justify-end pb-8 opacity-50">
                 <span className="font-mono text-xs text-white/50 mb-3 tracking-widest">01. INGRESO</span>
                 <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              <div className="flex flex-col items-center justify-end pb-8 opacity-50">
                 <span className="font-mono text-xs text-white/50 mb-3 tracking-widest">02. ANÁLISIS IA</span>
                 <div className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
              </div>
              <div className="flex flex-col items-center justify-end pb-8 opacity-50">
                 <span className="font-mono text-xs text-white/50 mb-3 tracking-widest">03. RECOMPENSA</span>
                 <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
              </div>
            </div>

            {/* Elements inside the animation */}
            
            {/* 1. The Bottle */}
            <div className="anim-bottle absolute z-20 flex flex-col items-center drop-shadow-2xl">
              <div className="w-4 h-3 bg-blue-300/80 rounded-t-sm" />
              <div className="w-10 h-24 bg-blue-500/30 border border-blue-300/50 rounded-xl backdrop-blur-md relative overflow-hidden flex justify-center">
                <div className="absolute bottom-0 w-full h-1/2 bg-blue-400/20" />
                <div className="w-full h-full absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
              </div>
            </div>

            {/* 2. The Scanner Area */}
            <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-40 h-48 border-2 border-dashed border-emerald-500/20 rounded-2xl flex items-center justify-center z-10 bg-emerald-500/5">
               {/* The moving laser line */}
               <div className="anim-scanner-line w-full h-[2px] bg-emerald-400 shadow-[0_0_15px_#34d399] absolute top-0 z-30" />
               <ScanLine className="w-12 h-12 text-emerald-500/30" strokeWidth={1} />
            </div>

            {/* 3. The Bin Glow (Bottom Center) */}
            <div className="absolute left-[50%] bottom-0 -translate-x-1/2 translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl z-0 pointer-events-none" />

            {/* 4. The Coin */}
            <div className="anim-coin absolute z-30">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full border-2 border-amber-200 shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center justify-center transform hover:scale-110 transition-transform">
                <span className="text-amber-900 font-black text-xl">€</span>
              </div>
            </div>

            {/* 5. The Smartphone */}
            <div className="absolute right-[10%] md:right-[15%] top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
              <div className="w-20 md:w-24 h-40 md:h-48 bg-black border-[4px] border-white/20 rounded-[2rem] relative p-1 shadow-2xl drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black rounded-full z-10" />
                
                {/* Phone Screen */}
                <div className="anim-phone-screen w-full h-full bg-[#0a0a0a] rounded-[1.5rem] flex flex-col items-center justify-center gap-3 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                  <Smartphone className="anim-phone-icon w-8 h-8 text-white/30 transition-colors" strokeWidth={1.5} />
                  <div className="w-10 h-1.5 bg-white/10 rounded-full" />
                  <div className="w-6 h-1.5 bg-white/10 rounded-full" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
