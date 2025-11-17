import { useState } from 'react'

function Booking() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: 'cut', preferred_date: '', preferred_time: '', notes: '' })
  const [status, setStatus] = useState(null)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await fetch(`${baseUrl}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('✅ Booking request received! We will confirm shortly.')
        setForm({ name: '', phone: '', email: '', service: 'cut', preferred_date: '', preferred_time: '', notes: '' })
      } else {
        setStatus(`❌ ${data.detail || 'Something went wrong'}`)
      }
    } catch (e) {
      setStatus('❌ Network error')
    }
  }

  return (
    <section id="booking" className="max-w-3xl mx-auto px-6 pb-24">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Book an appointment</h2>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 bg-slate-800/40 border border-sky-300/20 p-6 rounded-2xl">
        <input className="input" placeholder="Full name" name="name" value={form.name} onChange={onChange} required />
        <input className="input" placeholder="Phone" name="phone" value={form.phone} onChange={onChange} required />
        <input className="input md:col-span-2" placeholder="Email (optional)" name="email" value={form.email} onChange={onChange} />
        <select className="input" name="service" value={form.service} onChange={onChange}>
          <option value="cut">Classic Cut</option>
          <option value="beard">Beard Trim</option>
          <option value="combo">Cut + Beard</option>
          <option value="fade">Skin Fade</option>
        </select>
        <div className="grid grid-cols-2 gap-4">
          <input className="input" type="date" name="preferred_date" value={form.preferred_date} onChange={onChange} />
          <input className="input" type="time" name="preferred_time" value={form.preferred_time} onChange={onChange} />
        </div>
        <textarea className="input md:col-span-2" rows="3" placeholder="Notes" name="notes" value={form.notes} onChange={onChange} />
        <button className="md:col-span-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-lg transition" type="submit">Request booking</button>
        {status && <p className="md:col-span-2 text-sky-100 mt-2">{status}</p>}
      </form>
    </section>
  )
}

export default Booking
