function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mt-4 flex items-center justify-between rounded-2xl backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 border border-sky-300/20 p-3">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-400 to-amber-400" />
            <span className="text-white font-semibold">Zellige Barber</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sky-100">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#booking" className="hover:text-white">Booking</a>
            <a href="/admin" className="hover:text-white">Admin</a>
            <a href="/test" className="hover:text-white">System</a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
