'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Leaf, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function CinematicPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Intro Animation (on load)
      const introTl = gsap.timeline()
      introTl.fromTo('.scene-1 .bg-img', { scale: 1.5, filter: 'blur(20px)' }, { scale: 1, filter: 'blur(0px)', duration: 2, ease: "power3.out" })
             .fromTo('.scene-1 .line-inner', { y: "100%", rotationZ: 5 }, { y: "0%", rotationZ: 0, duration: 1.5, stagger: 0.15, ease: "power4.out" }, "-=1.5")
             .fromTo('.scroll-hint', { autoAlpha: 0, y: 20 }, { autoAlpha: 0.5, y: 0, duration: 1 }, "-=0.5")

      // Progress bar
      gsap.to('.scroll-progress', {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=12000",
          scrub: 0.1
        }
      })

      // Main Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=12000", // Increased scroll length for 7 scenes
          scrub: 1,
          pin: true,
        }
      })

      // Utility for standard in/out
      const DURATION = 1
      const STAGGER = 0.5

      // SCENE 1 OUT
      tl.to('.scene-1 .bg-img', { scale: 1.2, yPercent: 20, filter: 'blur(10px)', duration: DURATION }, 0)
      tl.to('.scene-1 .line-inner', { y: "-100%", rotationZ: -5, stagger: 0.1, duration: DURATION*0.8 }, 0)
      tl.to('.scene-1', { autoAlpha: 0, duration: DURATION*0.5 }, DURATION*0.5)

      // SCENE 2 IN (Fluid)
      // Clip path circle reveal
      tl.set('.scene-2', { autoAlpha: 1 }, DURATION*0.5)
      tl.fromTo('.scene-2 .bg-wrapper', 
        { clipPath: 'circle(0% at 50% 50%)' }, 
        { clipPath: 'circle(150% at 50% 50%)', duration: DURATION, ease: "power2.inOut" }, DURATION*0.5)
      tl.fromTo('.scene-2 .bg-img', { scale: 1.5 }, { scale: 1, duration: DURATION }, DURATION*0.5)
      tl.fromTo('.scene-2 .line-inner', { y: "100%", rotationX: -90 }, { y: "0%", rotationX: 0, stagger: 0.1, duration: DURATION, ease: "back.out(1.5)" }, DURATION*0.8)

      // SCENE 2 OUT
      const S2_OUT = DURATION * 2 + STAGGER
      tl.to('.scene-2 .bg-img', { scale: 1.2, yPercent: 20, duration: DURATION }, S2_OUT)
      tl.to('.scene-2 .line-inner', { y: "-100%", opacity: 0, stagger: 0.1, duration: DURATION*0.8 }, S2_OUT)
      tl.to('.scene-2', { autoAlpha: 0, duration: DURATION*0.5 }, S2_OUT + DURATION*0.5)

      // SCENE 3 IN (Grid)
      // Wipe from right
      const S3_IN = S2_OUT + DURATION*0.5
      tl.set('.scene-3', { autoAlpha: 1 }, S3_IN)
      tl.fromTo('.scene-3 .bg-wrapper', 
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }, 
        { clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)', duration: DURATION, ease: "power3.inOut" }, S3_IN)
      tl.fromTo('.scene-3 .bg-img', { xPercent: 20, scale: 1.2 }, { xPercent: 0, scale: 1, duration: DURATION }, S3_IN)
      tl.fromTo('.scene-3 .line-inner', { x: "100%", opacity: 0 }, { x: "0%", opacity: 1, stagger: 0.1, duration: DURATION, ease: "power3.out" }, S3_IN + 0.3)

      // SCENE 3 OUT
      const S3_OUT = S3_IN + DURATION + STAGGER
      tl.to('.scene-3 .bg-img', { xPercent: -20, scale: 1.2, filter: 'blur(20px)', duration: DURATION }, S3_OUT)
      tl.to('.scene-3 .line-inner', { x: "-100%", opacity: 0, stagger: 0.1, duration: DURATION*0.8 }, S3_OUT)
      tl.to('.scene-3', { autoAlpha: 0, duration: DURATION*0.5 }, S3_OUT + DURATION*0.5)

      // SCENE 4 IN (Scanner)
      const S4_IN = S3_OUT + DURATION*0.5
      tl.set('.scene-4', { autoAlpha: 1 }, S4_IN)
      tl.fromTo('.scene-4 .bg-wrapper', 
        { clipPath: 'inset(100% 0 0 0)' }, 
        { clipPath: 'inset(0% 0 0 0)', duration: DURATION, ease: "power3.inOut" }, S4_IN)
      tl.fromTo('.scene-4 .bg-img', { yPercent: -20, scale: 1.3 }, { yPercent: 0, scale: 1, duration: DURATION }, S4_IN)
      tl.fromTo('.scene-4 .line-inner', { y: "100%", scale: 0.8 }, { y: "0%", scale: 1, stagger: 0.1, duration: DURATION, ease: "back.out(1.2)" }, S4_IN + 0.3)

      // SCENE 4 OUT
      const S4_OUT = S4_IN + DURATION + STAGGER
      tl.to('.scene-4 .bg-img', { yPercent: 20, scale: 1.2, opacity: 0, duration: DURATION }, S4_OUT)
      tl.to('.scene-4 .line-inner', { y: "-100%", scale: 1.2, opacity: 0, stagger: 0.1, duration: DURATION*0.8 }, S4_OUT)
      tl.to('.scene-4', { autoAlpha: 0, duration: DURATION*0.5 }, S4_OUT + DURATION*0.5)

      // SCENE 5 IN (City)
      const S5_IN = S4_OUT + DURATION*0.5
      tl.set('.scene-5', { autoAlpha: 1 }, S5_IN)
      tl.fromTo('.scene-5 .bg-wrapper', 
        { clipPath: 'circle(0% at 50% 100%)' }, 
        { clipPath: 'circle(200% at 50% 100%)', duration: DURATION, ease: "power2.inOut" }, S5_IN)
      tl.fromTo('.scene-5 .bg-img', { scale: 1.5, rotationZ: -5 }, { scale: 1, rotationZ: 0, duration: DURATION }, S5_IN)
      tl.fromTo('.scene-5 .ui-card', { y: 200, rotationX: 45, opacity: 0 }, { y: 0, rotationX: 0, opacity: 1, duration: DURATION, ease: "power3.out" }, S5_IN + 0.4)
      tl.fromTo('.scene-5 .line-inner', { y: "100%" }, { y: "0%", stagger: 0.1, duration: DURATION*0.8, ease: "power3.out" }, S5_IN + 0.5)

      // SCENE 5 OUT
      const S5_OUT = S5_IN + DURATION + STAGGER
      tl.to('.scene-5 .bg-img', { scale: 1.2, yPercent: -20, filter: 'blur(15px)', duration: DURATION }, S5_OUT)
      tl.to('.scene-5 .ui-card', { y: -200, rotationX: -45, opacity: 0, duration: DURATION*0.8 }, S5_OUT)
      tl.to('.scene-5 .line-inner', { y: "-100%", stagger: 0.1, duration: DURATION*0.8 }, S5_OUT)
      tl.to('.scene-5', { autoAlpha: 0, duration: DURATION*0.5 }, S5_OUT + DURATION*0.5)

      // SCENE 6 IN (Holo Globe)
      const S6_IN = S5_OUT + DURATION*0.5
      tl.set('.scene-6', { autoAlpha: 1 }, S6_IN)
      tl.fromTo('.scene-6 .bg-wrapper', 
        { opacity: 0, scale: 0.5 }, 
        { opacity: 1, scale: 1, duration: DURATION, ease: "power3.inOut" }, S6_IN)
      tl.fromTo('.scene-6 .bg-img', { rotationZ: 15, scale: 1.3 }, { rotationZ: 0, scale: 1, duration: DURATION }, S6_IN)
      tl.fromTo('.scene-6 .data-card', { y: 100, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: DURATION, ease: "back.out(1.2)" }, S6_IN + 0.3)
      tl.fromTo('.scene-6 .line-inner', { y: "100%" }, { y: "0%", duration: DURATION*0.8 }, S6_IN + 0.2)

      // SCENE 6 OUT
      const S6_OUT = S6_IN + DURATION + STAGGER
      tl.to('.scene-6 .bg-img', { scale: 0.8, opacity: 0, duration: DURATION }, S6_OUT)
      tl.to('.scene-6 .data-card', { y: -100, opacity: 0, scale: 0.8, stagger: 0.05, duration: DURATION*0.8 }, S6_OUT)
      tl.to('.scene-6 .line-inner', { y: "-100%", duration: DURATION*0.8 }, S6_OUT)
      tl.to('.scene-6', { autoAlpha: 0, duration: DURATION*0.5 }, S6_OUT + DURATION*0.5)

      // SCENE 7 IN (Sapling Final)
      const S7_IN = S6_OUT + DURATION*0.5
      tl.set('.scene-7', { autoAlpha: 1 }, S7_IN)
      tl.fromTo('.scene-7 .bg-wrapper', 
        { clipPath: 'circle(0% at 50% 50%)' }, 
        { clipPath: 'circle(150% at 50% 50%)', duration: DURATION*1.5, ease: "power2.inOut" }, S7_IN)
      tl.fromTo('.scene-7 .bg-img', { scale: 1.5, yPercent: 20 }, { scale: 1, yPercent: 0, duration: DURATION*1.5 }, S7_IN)
      tl.fromTo('.scene-7 .line-inner', { y: "100%", rotationX: 90 }, { y: "0%", rotationX: 0, stagger: 0.15, duration: DURATION*1.2, ease: "back.out(1.2)" }, S7_IN + 0.5)

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-[#020503] text-white min-h-screen selection:bg-emerald-500/30 font-sans">
      <div ref={containerRef} className="h-screen w-full relative overflow-hidden bg-black" style={{ perspective: "1000px" }}>

         {/* 0:00 - Escena 1: El Origen */}
         <div className="scene-1 absolute inset-0 flex flex-col items-center justify-center z-10">
            <div className="bg-wrapper absolute inset-0 w-full h-full">
              <div className="bg-img absolute inset-0 w-full h-full will-change-transform">
                <Image src="/bottle.png" alt="Eco Bottle" fill className="object-cover object-center opacity-70" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[#020503]/30" />
              </div>
            </div>
            <div className="content relative z-10 text-center px-6 pointer-events-none">
              <h1 className="text-[11vw] md:text-8xl lg:text-[7rem] font-black tracking-tighter uppercase leading-[0.85]">
                <span className="block overflow-hidden pb-4"><span className="line-inner block will-change-transform">RECOMPENSAMOS</span></span>
                <span className="block overflow-hidden"><span className="line-inner block will-change-transform">
                  TU <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-500">COMPROMISO.</span>
                </span></span>
              </h1>
            </div>
            <div className="scroll-hint absolute bottom-12 text-center pointer-events-none text-emerald-400">
              <span className="text-xs tracking-[0.4em] uppercase font-bold block mb-2">Descubre</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-emerald-400 to-transparent mx-auto animate-pulse" />
            </div>
         </div>

         {/* 0:02 - Escena 2: La Transformación */}
         <div className="scene-2 absolute inset-0 flex flex-col items-center justify-center z-20 invisible">
            <div className="bg-wrapper absolute inset-0 w-full h-full">
              <div className="bg-img absolute inset-0 w-full h-full will-change-transform">
                <Image src="/fluid.png" alt="Fluid Energy" fill className="object-cover object-center opacity-90 mix-blend-screen" />
                <div className="absolute inset-0 bg-[#020503]/40" />
              </div>
            </div>
            <div className="content relative z-10 text-center px-6 pointer-events-none">
              <h2 className="text-[10vw] md:text-7xl lg:text-[6rem] font-black tracking-tighter uppercase leading-[0.85] text-white/90" style={{ perspective: "800px" }}>
                <span className="block overflow-hidden pb-2"><span className="line-inner block will-change-transform">TUS RESIDUOS</span></span>
                <span className="block overflow-hidden pb-2"><span className="line-inner block will-change-transform">AHORA TIENEN</span></span>
                <span className="block overflow-hidden pb-4"><span className="line-inner block will-change-transform text-amber-400 drop-shadow-[0_0_60px_rgba(251,191,36,0.8)]">VALOR.</span></span>
              </h2>
            </div>
         </div>

         {/* 0:04 - Escena 3: Nodos/Grid */}
         <div className="scene-3 absolute inset-0 flex flex-col items-center justify-center z-30 invisible">
            <div className="bg-wrapper absolute inset-0 w-full h-full">
              <div className="bg-img absolute inset-0 w-full h-full will-change-transform">
                <Image src="/tech_grid.png" alt="Tech Grid" fill className="object-cover object-center opacity-80" />
                <div className="absolute inset-0 bg-[#020503]/50" />
              </div>
            </div>
            <div className="content relative z-10 text-center px-6 pointer-events-none">
              <h2 className="text-[11vw] md:text-8xl lg:text-[7rem] font-black tracking-tighter uppercase leading-[0.85]">
                <span className="block overflow-hidden pb-2"><span className="line-inner block will-change-transform text-cyan-300 drop-shadow-[0_0_40px_rgba(34,211,238,0.5)]">TRAZABILIDAD</span></span>
                <span className="block overflow-hidden pb-4"><span className="line-inner block will-change-transform text-white">TOTAL.</span></span>
              </h2>
            </div>
         </div>

         {/* 0:06 - Escena 4: Proceso */}
         <div className="scene-4 absolute inset-0 flex flex-col items-center justify-center z-40 invisible">
            <div className="bg-wrapper absolute inset-0 w-full h-full">
              <div className="bg-img absolute inset-0 w-full h-full will-change-transform">
                <Image src="/scanner.png" alt="Scanner" fill className="object-cover object-center opacity-70" />
                <div className="absolute inset-0 bg-[#020503]/50" />
              </div>
            </div>
            <div className="content relative z-10 w-full max-w-6xl px-6 flex flex-col items-center text-center pointer-events-none">
              <h2 className="text-[9vw] md:text-7xl lg:text-[6rem] font-black tracking-tighter uppercase leading-[0.85]">
                <span className="block overflow-hidden pb-2"><span className="line-inner block will-change-transform text-white/90">TECNOLOGÍA</span></span>
                <span className="block overflow-hidden pb-2"><span className="line-inner block will-change-transform text-white/90">INTELIGENTE PARA</span></span>
                <span className="block overflow-hidden pb-4"><span className="line-inner block will-change-transform text-emerald-400 drop-shadow-[0_0_50px_rgba(52,211,153,0.6)]">UN MUNDO LIMPIO.</span></span>
              </h2>
            </div>
         </div>

         {/* 0:08 - Escena 5: Vida Real */}
         <div className="scene-5 absolute inset-0 flex flex-col items-center justify-center z-50 invisible">
            <div className="bg-wrapper absolute inset-0 w-full h-full">
              <div className="bg-img absolute inset-0 w-full h-full will-change-transform">
                <Image src="/city.png" alt="Solarpunk City" fill className="object-cover object-center opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-[#020503]/60 to-transparent" />
              </div>
            </div>
            <div className="content relative z-10 w-full max-w-4xl px-6 text-center flex flex-col items-center">
              
              <div className="ui-card w-full max-w-md aspect-[1.6/1] mb-12 rounded-3xl bg-[#020503]/40 border border-emerald-500/20 backdrop-blur-2xl p-8 flex flex-col justify-between shadow-[0_30px_60px_-15px_rgba(16,185,129,0.4)] relative overflow-hidden group will-change-transform">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent opacity-50" />
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/30 blur-[50px] rounded-full group-hover:bg-cyan-400/30 transition-colors duration-1000" />
                
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-white/90 font-mono tracking-widest text-sm font-bold drop-shadow-md">ECOSORT REWARDS</span>
                  <Leaf className="w-6 h-6 text-emerald-300 drop-shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
                </div>
                <div className="text-left relative z-10">
                  <div className="text-emerald-200/70 text-xs mb-2 tracking-widest uppercase font-bold">Balance Disponible</div>
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tight font-mono drop-shadow-lg">
                    12,450 <span className="text-emerald-400 text-2xl font-sans font-bold">PTS</span>
                  </div>
                </div>
              </div>

              <h2 className="text-[8vw] md:text-6xl lg:text-[5rem] font-black tracking-tighter uppercase leading-[0.9] mb-10">
                <span className="block overflow-hidden pb-2"><span className="line-inner block will-change-transform">ÚNETE A LA</span></span>
                <span className="block overflow-hidden pb-4"><span className="line-inner block will-change-transform text-emerald-300 drop-shadow-[0_0_30px_rgba(110,231,183,0.5)]">REVOLUCIÓN.</span></span>
              </h2>
              
              <Link href="/demo" className="pointer-events-auto">
                <Button size="lg" className="h-16 px-12 bg-white hover:bg-emerald-100 text-[#020503] font-black text-lg rounded-full transition-all duration-500 shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-110 hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] group">
                  EMPEZAR A GANAR
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-500 group-hover:translate-x-2" />
                </Button>
              </Link>
            </div>
         </div>

         {/* 0:10 - Escena 6: Escala global */}
         <div className="scene-6 absolute inset-0 flex flex-col items-center justify-center z-[60] invisible">
            <div className="bg-wrapper absolute inset-0 w-full h-full">
              <div className="bg-img absolute inset-0 w-full h-full will-change-transform">
                <Image src="/globe_data.png" alt="Holographic Globe" fill className="object-cover object-center opacity-60 mix-blend-screen" />
                <div className="absolute inset-0 bg-[#020503]/40" />
              </div>
            </div>
            <div className="content relative z-10 w-full max-w-6xl px-6 text-center">
              <h2 className="text-3xl md:text-5xl font-black tracking-widest uppercase mb-16 text-emerald-400/80 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                <span className="block overflow-hidden"><span className="line-inner block">Impacto Global</span></span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { l: "CO2 AHORRADO", v: "1.2M Kg", c: "text-emerald-300" },
                  { l: "MATERIALES", v: "840 Ton", c: "text-cyan-300" },
                  { l: "PREMIOS", v: "2.4M", c: "text-amber-300" },
                  { l: "USUARIOS", v: "150K", c: "text-white" },
                  { l: "MÁQUINAS", v: "432", c: "text-emerald-400" },
                  { l: "CIUDADES", v: "28", c: "text-cyan-400" }
                ].map((s, i) => (
                  <div key={i} className="data-card bg-[#020503]/60 border border-emerald-500/20 p-10 rounded-3xl backdrop-blur-xl flex flex-col items-center justify-center gap-4 will-change-transform shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                     <div className="text-white/60 text-xs md:text-sm font-mono font-bold tracking-[0.2em]">{s.l}</div>
                     <div className={`text-5xl md:text-6xl font-black ${s.c} tracking-tighter drop-shadow-[0_0_20px_currentColor]`}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
         </div>

         {/* 0:12 - Escena 7: Elemento Final */}
         <div className="scene-7 absolute inset-0 flex flex-col items-center justify-center z-[70] invisible">
            <div className="bg-wrapper absolute inset-0 w-full h-full">
              <div className="bg-img absolute inset-0 w-full h-full will-change-transform">
                <Image src="/sapling.png" alt="Neon Sapling" fill className="object-cover object-center opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-[#020503]/50 to-transparent" />
              </div>
            </div>
            <div className="content relative z-10 text-center px-6 pointer-events-none mt-40">
              <h2 className="text-[12vw] md:text-8xl lg:text-[9rem] font-black tracking-tighter uppercase leading-[0.8] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <span className="block overflow-hidden pb-4"><span className="line-inner block will-change-transform text-white/90">EL FUTURO</span></span>
                <span className="block overflow-hidden pb-6"><span className="line-inner block will-change-transform text-transparent bg-clip-text bg-gradient-to-b from-emerald-200 via-emerald-400 to-green-600 drop-shadow-[0_0_60px_rgba(52,211,153,0.5)]">ES VERDE.</span></span>
              </h2>
            </div>
         </div>

         {/* Progress Bar */}
         <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/5 z-[100]">
            <div className="scroll-progress w-full h-full bg-gradient-to-b from-emerald-300 via-cyan-400 to-emerald-600 shadow-[0_0_20px_rgba(52,211,153,1)] origin-top scale-y-0" />
         </div>
      </div>
    </div>
  )
}
