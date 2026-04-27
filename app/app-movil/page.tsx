'use client'

import { useState } from 'react'
import { Home, Map as MapIcon, Gift, User, QrCode, Bell, Battery, Wifi, Signal, ChevronRight, History, Settings, Recycle } from 'lucide-react'

export default function AppMovilPreview() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen bg-[#010302] py-32 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center mb-12 relative z-10">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 font-mono text-sm tracking-widest uppercase text-emerald-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Vista Previa Interactiva
         </div>
         <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
            Tu Recompensa, <span className="text-emerald-400">en tu Bolsillo</span>
         </h1>
         <p className="text-white/60 mt-4 max-w-lg mx-auto font-light">Explora la interfaz diseñada para nuestros usuarios: rápida, fluida y pensada para premiar cada acción sostenible al instante.</p>
      </div>

      {/* Phone Mockup Frame */}
      <div className="relative w-[380px] h-[800px] bg-black rounded-[3.5rem] border-[14px] border-[#1a1a1a] shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden z-10 transition-all duration-500">
        
        {/* Dynamic Island / Notch Area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-[#1a1a1a] rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#0a0a0a] ml-4" /> {/* Camera */}
        </div>

        {/* Status Bar */}
        <div className="absolute top-0 left-0 w-full h-12 flex justify-between items-center px-6 pt-2 z-40 text-white pointer-events-none">
          <span className="text-[13px] font-semibold mt-1">9:41</span>
          <div className="flex items-center gap-1.5 mt-1 opacity-90">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-5 h-5" />
          </div>
        </div>

        {/* App Content Area */}
        <div className="w-full h-full bg-[#050A07] text-white pt-14 pb-24 overflow-y-auto hide-scrollbar relative">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'map' && <MapView />}
          {activeTab === 'rewards' && <RewardsView />}
          {activeTab === 'profile' && <ProfileView />}
        </div>

        {/* Bottom Tab Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[90px] bg-[#0a110d]/90 backdrop-blur-xl border-t border-white/5 flex justify-between px-6 pb-6 pt-3 z-40">
          <TabItem icon={Home} label="Inicio" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <TabItem icon={MapIcon} label="Mapa" active={activeTab === 'map'} onClick={() => setActiveTab('map')} />
          
          {/* Floating Action Button (Scan) */}
          <div className="relative -top-6 flex flex-col items-center">
            <button className="w-16 h-16 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center transform hover:scale-105 transition-transform active:scale-95 text-black relative group">
              <QrCode className="w-8 h-8" />
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform" />
            </button>
            <span className="text-[10px] text-emerald-500 font-medium mt-1">Escanear</span>
          </div>

          <TabItem icon={Gift} label="Premios" active={activeTab === 'rewards'} onClick={() => setActiveTab('rewards')} />
          <TabItem icon={User} label="Perfil" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </div>

      </div>
    </div>
  )
}

function TabItem({ icon: Icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 w-16">
      <Icon className={`w-6 h-6 transition-colors ${active ? 'text-emerald-400' : 'text-white/40'}`} strokeWidth={active ? 2.5 : 2} />
      <span className={`text-[10px] font-medium transition-colors ${active ? 'text-emerald-400' : 'text-white/40'}`}>{label}</span>
    </button>
  )
}

function HomeView() {
  return (
    <div className="px-5 space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 p-0.5 overflow-hidden">
             <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <p className="text-xs text-white/60">Hola, Alex 👋</p>
            <p className="text-sm font-semibold">¿Listo para reciclar?</p>
          </div>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
          <Bell className="w-5 h-5 text-white/80" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
        </button>
      </div>

      {/* Balance Card */}
      <div className="w-full rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-900 p-5 relative overflow-hidden shadow-[0_10px_30px_rgba(16,185,129,0.2)] group cursor-pointer hover:scale-[1.02] transition-transform">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-white/20 transition-colors" />
        <p className="text-emerald-100 text-sm font-medium mb-1">Balance Total</p>
        <div className="flex items-end gap-2 mb-4">
          <h2 className="text-4xl font-black text-white">€ 24.50</h2>
          <span className="text-emerald-200 font-medium mb-1.5 flex items-center gap-1">
             <span className="w-3 h-3 bg-white/20 rounded-full flex items-center justify-center text-[8px] font-bold">E</span>
             2,450 pts
          </span>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 bg-white/20 hover:bg-white/30 transition-colors py-2.5 rounded-xl text-sm font-semibold backdrop-blur-md border border-white/10">
            Canjear
          </button>
          <button className="flex-1 bg-black/20 hover:bg-black/30 transition-colors py-2.5 rounded-xl text-sm font-semibold backdrop-blur-md border border-white/10">
            Historial
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#121c16] rounded-2xl p-4 border border-white/5 hover:border-emerald-500/30 transition-colors cursor-default">
           <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
             <span className="text-sm font-bold">14</span>
           </div>
           <p className="text-2xl font-bold">14 kg</p>
           <p className="text-xs text-white/50">CO2 Ahorrado</p>
        </div>
        <div className="bg-[#121c16] rounded-2xl p-4 border border-white/5 hover:border-emerald-500/30 transition-colors cursor-default">
           <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
             <History className="w-4 h-4" />
           </div>
           <p className="text-2xl font-bold">142</p>
           <p className="text-xs text-white/50">Envases Reciclados</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold">Actividad Reciente</h3>
          <button className="text-xs text-emerald-500 font-medium hover:text-emerald-400 transition-colors">Ver todo</button>
        </div>
        <div className="space-y-3">
          {[
            { title: 'Estación Univ. Politécnica', items: '3 botellas, 1 lata', time: 'Hoy, 14:30', amount: '+0.40€' },
            { title: 'Estación CC La Vaguada', items: '5 latas', time: 'Ayer, 18:15', amount: '+0.50€' },
            { title: 'Canje de Cupón', items: 'Descuento Cafetería', time: 'Lun, 09:00', amount: '-2.00€', isNegative: true },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center bg-[#0a110d] p-3.5 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
               <div className="flex gap-3 items-center">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.isNegative ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                   {item.isNegative ? <Gift className="w-5 h-5" /> : <Recycle className="w-5 h-5" />}
                 </div>
                 <div>
                   <p className="text-sm font-semibold truncate max-w-[150px]">{item.title}</p>
                   <p className="text-xs text-white/50">{item.items} • {item.time}</p>
                 </div>
               </div>
               <span className={`text-sm font-bold shrink-0 ${item.isNegative ? 'text-white' : 'text-emerald-400'}`}>{item.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MapView() {
  return (
    <div className="w-full h-full relative animate-in fade-in duration-300">
      {/* Dummy Map Background */}
      <div className="absolute inset-0 bg-[#0a110d] opacity-50" />
      <div className="absolute inset-0 overflow-hidden">
         <div className="w-[200%] h-[200%] -ml-[50%] -mt-[50%] opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
         {/* Map Roads / Elements dummy */}
         <div className="absolute top-1/4 left-0 w-full h-2 bg-white/5 rotate-12" />
         <div className="absolute top-1/2 left-0 w-full h-4 bg-white/5 -rotate-6" />
         <div className="absolute top-3/4 left-1/4 w-full h-1 bg-white/5 rotate-45" />
      </div>

      {/* Map Content */}
      <div className="relative z-10 px-5 pt-4">
        <div className="w-full bg-[#121c16] rounded-2xl p-3 border border-white/10 shadow-lg flex items-center gap-3">
          <MapIcon className="w-5 h-5 text-white/50" />
          <input type="text" placeholder="Buscar máquinas cercanas..." className="bg-transparent border-none outline-none text-sm w-full focus:ring-0" />
        </div>
      </div>

      {/* Pins */}
      <div className="absolute top-1/3 left-1/4 flex flex-col items-center transform hover:scale-110 transition-transform cursor-pointer group">
         <div className="bg-emerald-500 text-black px-2 py-1 rounded-md text-[10px] font-bold mb-1 shadow-lg opacity-100 transition-opacity">0.3km</div>
         <div className="w-10 h-10 bg-emerald-500 rounded-full border-4 border-[#050A07] shadow-[0_0_15px_#10b981] flex items-center justify-center group-hover:bg-white group-hover:text-emerald-500 transition-colors">
           <Recycle className="w-5 h-5 text-black group-hover:text-emerald-500" />
         </div>
      </div>

      <div className="absolute top-2/3 right-1/4 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
         <div className="w-8 h-8 bg-[#1a2e22] rounded-full border-2 border-[#050A07] flex items-center justify-center">
           <Recycle className="w-4 h-4 text-emerald-500" />
         </div>
      </div>
      
      <div className="absolute top-1/4 right-10 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
         <div className="w-8 h-8 bg-[#1a2e22] rounded-full border-2 border-[#050A07] flex items-center justify-center">
           <Recycle className="w-4 h-4 text-emerald-500" />
         </div>
      </div>

      {/* Info Card Bottom */}
      <div className="absolute bottom-[20px] left-5 right-5 bg-[#121c16]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl transition-transform cursor-pointer hover:-translate-y-1">
         <div className="flex justify-between items-start mb-3">
           <div>
             <h3 className="font-bold text-lg leading-tight">Univ. Politécnica</h3>
             <p className="text-[11px] text-emerald-400 font-medium mt-0.5">Abierto ahora • A 300m</p>
           </div>
           <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
             <ChevronRight className="w-5 h-5 text-white/70" />
           </div>
         </div>
         <div className="flex gap-2">
           <span className="text-[10px] px-2 py-1 bg-white/5 rounded-md text-white/70 border border-white/5">Plástico</span>
           <span className="text-[10px] px-2 py-1 bg-white/5 rounded-md text-white/70 border border-white/5">Latas</span>
           <span className="text-[10px] px-2 py-1 bg-white/5 rounded-md text-white/70 border border-white/5">Vidrio</span>
         </div>
      </div>
    </div>
  )
}

function RewardsView() {
  return (
    <div className="px-5 pt-4 space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Premios</h2>
        <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">2,450 pts</span>
      </div>
      
      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {['Todos', 'Transporte', 'Alimentación', 'Ocio'].map((cat, i) => (
          <button key={i} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white hover:bg-white/20 border border-white/5'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Reward */}
      <div className="w-full h-40 rounded-3xl bg-gradient-to-tr from-purple-600 to-blue-500 p-5 relative overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 transition-shadow">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10" />
         <div className="relative z-10">
           <span className="bg-black/30 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white">Destacado</span>
           <h3 className="text-2xl font-black mt-2 leading-tight drop-shadow-md">Abono Transporte<br/>Mensual</h3>
         </div>
         <div className="relative z-10 flex justify-between items-end">
           <span className="font-bold text-white drop-shadow-md">15.00€ <span className="text-xs opacity-70 font-normal">o 15,000 pts</span></span>
           <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold shadow-lg hover:bg-gray-100 transition-colors">Canjear</button>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { title: '-15% Carrefour', price: '5.00€', pts: '5000 pts', color: 'from-blue-900 to-blue-800 border-blue-500/20' },
          { title: 'Café Gratis', price: '1.50€', pts: '1500 pts', color: 'from-amber-900 to-amber-800 border-amber-500/20' },
          { title: 'Entrada Cine', price: '8.00€', pts: '8000 pts', color: 'from-red-900 to-red-800 border-red-500/20' },
          { title: 'Donación ONG', price: '2.00€', pts: '2000 pts', color: 'from-emerald-900 to-emerald-800 border-emerald-500/20' }
        ].map((item, i) => (
          <div key={i} className={`bg-gradient-to-br ${item.color} rounded-2xl p-4 h-32 flex flex-col justify-between border cursor-pointer hover:scale-[1.02] transition-transform`}>
             <h4 className="font-bold text-sm leading-tight text-white/90">{item.title}</h4>
             <div className="flex justify-between items-end">
               <div>
                 <p className="text-[10px] text-white/50">{item.pts}</p>
                 <p className="text-xs font-bold">{item.price}</p>
               </div>
               <button className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                 <ChevronRight className="w-4 h-4" />
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProfileView() {
  return (
    <div className="px-5 pt-8 animate-in fade-in duration-300">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500 p-1 mb-4 relative">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full rounded-full object-cover" />
          <button className="absolute bottom-0 right-0 w-7 h-7 bg-emerald-500 rounded-full border-[3px] border-[#050A07] flex items-center justify-center hover:scale-110 transition-transform">
            <Settings className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
        <h2 className="text-2xl font-bold">Alex Martínez</h2>
        <div className="flex items-center gap-1.5 mt-1">
          <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-[10px] text-black font-bold">✓</span>
          </div>
          <p className="text-emerald-400 text-xs font-medium">Nivel: EcoGuardián</p>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { icon: User, label: 'Datos Personales' },
          { icon: History, label: 'Historial Completo' },
          { icon: Bell, label: 'Notificaciones y Avisos' },
          { icon: QrCode, label: 'Mi Código QR' }
        ].map((item, i) => (
          <div key={i} className="bg-[#121c16] hover:bg-[#1a2920] transition-colors cursor-pointer rounded-2xl p-4 flex justify-between items-center border border-white/5">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                 <item.icon className="w-5 h-5 text-white/60" />
               </div>
               <span className="font-medium text-sm text-white/90">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-white/30" />
          </div>
        ))}
      </div>
      
      <button className="w-full mt-8 py-4 rounded-2xl border border-red-500/30 text-red-400 font-medium hover:bg-red-500/10 transition-colors text-sm">
        Cerrar Sesión
      </button>
      
      <p className="text-center text-[10px] text-white/30 mt-6">EcoSort App v2.1.0</p>
    </div>
  )
}
