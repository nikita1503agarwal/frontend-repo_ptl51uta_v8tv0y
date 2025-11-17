import { useEffect, useState } from 'react'

function Services() {
  const [services, setServices] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/services`)
        const data = await res.json()
        setServices(data)
      } catch (e) {
        // noop
      }
    }
    fetchServices()
  }, [baseUrl])

  return (
    <section id="services" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Services</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map(s => (
          <div key={s.id} className="rounded-2xl border border-sky-300/20 bg-slate-800/40 p-5 hover:border-sky-300/40 transition">
            <div className="text-lg font-semibold text-white">{s.name}</div>
            <div className="text-sky-200/90 text-sm mt-1">{s.desc}</div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-emerald-400 font-bold">{s.price} MAD</span>
              <span className="text-xs text-sky-300/70">{s.duration} min</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
