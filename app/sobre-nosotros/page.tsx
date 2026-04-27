"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Leaf, Users, Target, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';

const teamMembers = [
  { role: "CEO / Director General", name: "Pablo Crespo Monserrat", initials: "PC", image: "/team/pablo-crespo.jpg" },
  { role: "COO / Director de Operaciones", name: "Alex Marco Jover", initials: "AM", image: "/team/alex-marco.jpg", fit: "object-cover object-top" },
  { role: "CTO / Director de Tecnología", name: "Izan Arán Orejón", initials: "IA", image: "/team/izan-aran.jpg" },
  { role: "CFO / Director Financiero y Administración", name: "Óscar Molina Sirvent", initials: "ÓM", image: "/team/oscar-molina.jpg", fit: "object-cover object-top" },
  { role: "CMO / Director de Marketing y Comunicación", name: "Álvaro Amengual Tarrazona", initials: "ÁA", image: "/team/alvaro-amengual.jpg" },
  { role: "Director Comercial B2B / B2G", name: "Pablo Casanova Almerich", initials: "PC", image: "/team/pablo-casanova.jpg" },
  { role: "Responsable de Producto e IA", name: "Isaac Garrido Hasbi", initials: "IG", image: "/team/isaac.jpg", fit: "object-cover object-[center_20%]" },
  { role: "Responsable de Instalaciones y Mantenimiento", name: "Bruno Gracia Donat", initials: "BG", image: "/team/bruno.jpg" },
  { role: "Responsable de Logística y Soporte Técnico", name: "Adrián Alarcón Serra", initials: "AA", image: "/team/alarcon.jpg" }
];

function MemberImage({ member }: { member: any }) {
  const [error, setError] = useState(false);

  return (
    <>
      {!error && member.image ? (
        <Image 
          src={member.image} 
          alt={member.name} 
          fill 
          className={`${member.fit || 'object-cover'} transition-opacity duration-1000`}
          onError={() => setError(true)}
          priority
        />
      ) : (
        <>
          <div className={`absolute inset-0 bg-gradient-to-br from-emerald-950/80 via-[#020503] to-cyan-950/80`} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[12rem] md:text-[16rem] font-black text-white/[0.03] tracking-tighter select-none">
              {member.initials}
            </span>
          </div>
        </>
      )}
    </>
  );
}

export default function SobreNosotrosPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % teamMembers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextMember = () => setActiveIndex((current) => (current + 1) % teamMembers.length);
  const prevMember = () => setActiveIndex((current) => (current - 1 + teamMembers.length) % teamMembers.length);

  return (
    <div className="bg-[#020503] text-white min-h-screen pt-32 pb-20 selection:bg-emerald-500/30">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-8 font-mono text-sm tracking-widest uppercase">
            <Leaf className="w-4 h-4" />
            Conócenos
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8">
            El Equipo Detrás de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-600">Revolución.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed text-balance">
            Somos más que tecnología. Somos un grupo de visionarios comprometidos con transformar la manera en que el mundo interactúa con sus residuos.
          </p>
        </div>

        {/* Misión y Foto Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Misión */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase border-b border-white/10 pb-6">
              Nuestra Misión
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-white/70 font-light leading-relaxed">
              <p>
                <strong className="text-white font-bold">No solo reciclamos. Redefinimos el valor de nuestro entorno.</strong>
              </p>
              <p>
                Nuestra misión fundamental es <span className="text-emerald-400">transformar cada acción sostenible en un impacto tangible</span>. Queremos acabar con la idea de que el reciclaje es una obligación y convertirlo en una experiencia gratificante, inteligente y conectada.
              </p>
              <p>
                Creemos firmemente en el poder de la comunidad. Construimos EcoSort para empoderar a ciudadanos, instituciones y empresas, dándoles las herramientas para construir una economía verdaderamente circular donde <strong className="text-emerald-300">quien cuida el planeta, siempre gana.</strong>
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-white/10">
              <div className="flex gap-4 items-start">
                <Target className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">Impacto Real</h4>
                  <p className="text-sm text-white/50">Métricas transparentes y trazabilidad total.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <ShieldCheck className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">Tecnología Segura</h4>
                  <p className="text-sm text-white/50">IA y validación de datos inquebrantables.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Carrusel del Equipo */}
          <div className="relative group perspective-1000 h-full flex flex-col justify-center">
            {/* Glow effect behind image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-600/30 to-cyan-500/30 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
            
            <div className="relative aspect-[3/4] md:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-[#060d08] shadow-2xl transition-transform duration-700 hover:-translate-y-1">
              {teamMembers.map((member, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                >
                  <MemberImage member={member} />

                  {/* Gradiente de sombra en la parte inferior */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020503] via-[#020503]/40 to-transparent" />
                  
                  {/* Información del miembro */}
                  <div className={`absolute bottom-0 left-0 p-8 md:p-10 w-full transform transition-all duration-700 delay-100 ${idx === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="flex flex-col gap-3">
                      <div className="inline-flex">
                        <span className="text-emerald-400 font-mono text-xs md:text-sm tracking-widest uppercase bg-emerald-950/50 px-4 py-2 rounded-full border border-emerald-500/20 backdrop-blur-md">
                          {member.role}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-3xl md:text-4xl tracking-tight leading-none">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Controles de Navegación */}
              <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
                <div className="flex gap-2 bg-[#020503]/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  {teamMembers.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeIndex ? 'w-6 bg-emerald-400' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                      aria-label={`Ver miembro ${idx + 1}`}
                    />
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={prevMember}
                    className="p-2 rounded-full bg-[#020503]/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors"
                    aria-label="Anterior miembro"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextMember}
                    className="p-2 rounded-full bg-[#020503]/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors"
                    aria-label="Siguiente miembro"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
