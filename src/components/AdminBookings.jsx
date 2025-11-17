import { useEffect, useState, useMemo } from 'react'

function Badge({ children, color = 'emerald' }) {
  const colors = {
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
    sky: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
  }
  return (
    <span className={`px-2 py-0.5 rounded-md text-xs border ${colors[color]}`}>{children}</span>
  )
}

export default function AdminBookings() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [data, setData] = useState({ items: [], count: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [q, setQ] = useState('')
  const [service, setService] = useState('')

  const fetchBookings = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${baseUrl}/api/bookings`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.detail || 'Failed to fetch bookings')
      setData(json)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBookings() }, [baseUrl])

  const filtered = useMemo(() => {
    let items = data.items || []
    if (q) {
      const s = q.toLowerCase()
      items = items.filter(i => (
        (i.name || '').toLowerCase().includes(s) ||
        (i.phone || '').toLowerCase().includes(s) ||
        (i.email || '').toLowerCase().includes(s)
      ))
    }
    if (service) items = items.filter(i => i.service === service)
    return items
  }, [data.items, q, service])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Admin • Bookings</h1>
            <p className="text-sky-300/70">View and filter incoming booking requests.</p>
          </div>
          <button onClick={fetchBookings} className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold">Refresh</button>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mb-6">
          <input className="input md:col-span-2" placeholder="Search name, phone, email" value={q} onChange={e=>setQ(e.target.value)} />
          <select className="input" value={service} onChange={e=>setService(e.target.value)}>
            <option value="">All services</option>
            <option value="cut">Classic Cut</option>
            <option value="beard">Beard Trim</option>
            <option value="combo">Cut + Beard</option>
            <option value="fade">Skin Fade</option>
          </select>
        </div>

        {loading ? (
          <div className="text-sky-100">Loading bookings…</div>
        ) : error ? (
          <div className="text-rose-300">{error}</div>
        ) : (
          <div>
            <div className="text-sky-300/80 text-sm mb-2">{filtered.length} of {data.count} bookings</div>
            <div className="overflow-x-auto rounded-2xl border border-sky-300/20">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-800/60 text-sky-200">
                  <tr>
                    <th className="text-left p-3">Customer</th>
                    <th className="text-left p-3">Contact</th>
                    <th className="text-left p-3">Service</th>
                    <th className="text-left p-3">Preferred</th>
                    <th className="text-left p-3">Notes</th>
                    <th className="text-left p-3">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-300/10">
                  {filtered.map(b => (
                    <tr key={b.id} className="hover:bg-slate-800/40">
                      <td className="p-3 text-white">
                        <div className="font-semibold">{b.name}</div>
                      </td>
                      <td className="p-3 text-sky-100/90">
                        <div>{b.phone}</div>
                        {b.email && <div className="text-sky-300/70 text-xs">{b.email}</div>}
                      </td>
                      <td className="p-3">
                        <Badge color="emerald">{b.service}</Badge>
                      </td>
                      <td className="p-3 text-sky-100/90">
                        <div className="text-sm">{b.preferred_date || '-'} {b.preferred_time || ''}</div>
                      </td>
                      <td className="p-3 text-sky-100/90 max-w-[280px]">
                        <div className="line-clamp-2">{b.notes || '-'}</div>
                      </td>
                      <td className="p-3 text-sky-300/70">
                        <div className="text-xs font-mono">{b.created_at ? new Date(b.created_at).toLocaleString() : '-'}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6">
          <a href="/" className="text-sky-300/80 hover:text-white">← Back to site</a>
        </div>
      </div>
    </div>
  )
}
