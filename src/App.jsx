import Navbar from './components/Navbar'
import HeroZellige from './components/HeroZellige'
import Services from './components/Services'
import Booking from './components/Booking'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* soft zellige speckles */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{backgroundImage:'radial-gradient(#0ea5e9 1px, transparent 1px), radial-gradient(#eab308 1px, transparent 1px)', backgroundSize:'24px 24px, 32px 32px', backgroundPosition:'0 0, 12px 12px'}} />

      <Navbar />
      <main className="relative">
        <HeroZellige />
        <Services />
        <Booking />
      </main>
      <footer className="relative border-t border-sky-300/10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sky-300/70 text-sm">© {new Date().getFullYear()} Zellige Barber • Marrakech</p>
          <a className="text-sky-300/70 hover:text-white text-sm" href="tel:+212612345678">Call us</a>
        </div>
      </footer>
    </div>
  )
}

export default App
