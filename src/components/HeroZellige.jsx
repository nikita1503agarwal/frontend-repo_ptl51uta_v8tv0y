import { useEffect, useState } from 'react'

function HeroZellige() {
  const [shop, setShop] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/shop`)
        const data = await res.json()
        setShop(data)
      } catch (e) {
        // noop
      }
    }
    fetchShop()
  }, [baseUrl])

  return (
    <section className="relative overflow-hidden">
      {/* Moroccan Zellige inspired background */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none"
           style={{
             backgroundImage:
               'radial-gradient(circle at 10% 10%, #0ea5e9 2px, transparent 2px), radial-gradient(circle at 30% 30%, #f59e0b 2px, transparent 2px), radial-gradient(circle at 70% 70%, #10b981 2px, transparent 2px), radial-gradient(circle at 90% 90%, #ef4444 2px, transparent 2px)',
             backgroundSize: '40px 40px, 60px 60px, 50px 50px, 70px 70px'
           }} />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-sm">
              Crafted Cuts • Moroccan Soul
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Zellige Barber
            </h1>
            <p className="mt-4 text-lg text-sky-100/90 max-w-prose">
              Premium grooming with a touch of Moroccan artistry. Inspired by the timeless
              patterns of zellige tiles, every detail is considered — from sharp fades to
              clean beard lines.
            </p>
            {shop && (
              <div className="mt-6 text-sky-100/90">
                <p className="font-semibold">{shop.address}</p>
                <p className="">{shop.phone}</p>
                <p className="text-sm mt-1">Mon–Fri: {shop.hours?.mon_fri} • Sat: {shop.hours?.sat} • Sun: {shop.hours?.sun}</p>
              </div>
            )}
            <div className="mt-8 flex gap-3">
              <a href="#booking" className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-lg transition">Book an appointment</a>
              <a href="#services" className="px-5 py-3 border border-sky-300/30 hover:border-sky-300 text-sky-100 rounded-lg transition">View services</a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -rotate-6 bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-amber-500/20 blur-2xl rounded-3xl" />
            <div className="relative p-1 rounded-3xl bg-gradient-to-br from-emerald-500/60 via-sky-500/60 to-amber-500/60">
              <div className="rounded-[22px] bg-slate-900">
                <div className="aspect-[4/3] rounded-[22px] overflow-hidden relative flex items-center justify-center">
                  {/* Decorative zellige tile grid */}
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {[...Array(36)].map((_, i) => {
                      const x = (i % 6) * 34 + 16
                      const y = Math.floor(i / 6) * 34 + 16
                      const colors = ['#10b981','#0ea5e9','#eab308','#f97316','#ef4444']
                      const c = colors[i % colors.length]
                      return (
                        <g key={i} transform={`translate(${x},${y}) rotate(${(i%2)*45})`}>
                          <polygon points="0,-12 12,0 0,12 -12,0" fill={c} opacity="0.9" />
                          <polygon points="0,-7 7,0 0,7 -7,0" fill="#0f172a" opacity="0.95" />
                        </g>
                      )
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroZellige
