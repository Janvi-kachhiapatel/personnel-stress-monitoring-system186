'use client'

import { useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  Bell,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileCheck2,
  HeartHandshake,
  Home,
  LockKeyhole,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react'

type Risk = 'Priority' | 'Watch' | 'Steady'

type Person = {
  name: string
  id: string
  unit: string
  signal: string
  score: number
  risk: Risk
  time: string
  initials: string
  color: string
}

const people: Person[] = [
  { name: 'Arjun Mehta', id: 'CRPF • 2841', unit: '37 BN, Srinagar', signal: 'Sleep & workload trend', score: 78, risk: 'Priority', time: '8 min ago', initials: 'AM', color: 'bg-[#e8d8d5] text-[#814d48]' },
  { name: 'Priya Nair', id: 'CRPF • 6519', unit: '114 BN, Guwahati', signal: 'Wellness check-in', score: 64, risk: 'Watch', time: '42 min ago', initials: 'PN', color: 'bg-[#dbe6e2] text-[#32675d]' },
  { name: 'Rahul Singh', id: 'CRPF • 1904', unit: '88 BN, Dantewada', signal: 'Leave recovery', score: 59, risk: 'Watch', time: '1 hr ago', initials: 'RS', color: 'bg-[#e4e0d7] text-[#6d6048]' },
  { name: 'Ishita Rao', id: 'CRPF • 4472', unit: '24 BN, Imphal', signal: 'Routine check-in', score: 28, risk: 'Steady', time: '2 hrs ago', initials: 'IR', color: 'bg-[#dedced] text-[#5a5681]' },
]

const navItems = [
  { label: 'Overview', icon: Home },
  { label: 'People at a glance', icon: UsersRound, count: '12' },
  { label: 'Care pathways', icon: HeartHandshake },
  { label: 'Wellness pulse', icon: Activity },
]

function RiskBadge({ risk }: { risk: Risk }) {
  const styles = {
    Priority: 'bg-[#f6e3df] text-[#a34e43]',
    Watch: 'bg-[#f4ead4] text-[#967128]',
    Steady: 'bg-[#e1eee8] text-[#407466]',
  }
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles[risk]}`}>{risk}</span>
}

function ScoreRing({ score }: { score: number }) {
  const radius = 29
  const circumference = 2 * Math.PI * radius
  const color = score >= 70 ? '#b55b50' : score >= 50 ? '#c59a3e' : '#51887c'
  return (
    <div className="relative h-[72px] w-[72px] shrink-0">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 72 72" aria-label={`Stress index ${score}`} role="img">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="#eeeae2" strokeWidth="6" />
        <circle cx="36" cy="36" r={radius} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - (score / 100) * circumference} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-serif text-lg font-semibold text-[#283b38]">{score}</span>
    </div>
  )
}

export default function Page() {
  const [active, setActive] = useState('Overview')
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [showAudit, setShowAudit] = useState(false)
  const [notice, setNotice] = useState('')

  const auditEvents = [
    { time: '09:42', action: 'Care conversation scheduled', actor: 'Ananya Kulkarni', result: 'Allowed' },
    { time: '09:18', action: 'Individual disciplinary lookup', actor: 'Command role', result: 'Denied by firewall' },
    { time: '08:55', action: 'Unit pulse viewed', actor: 'Welfare team', result: 'Aggregate only' },
  ]

  function notify(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3500)
  }

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#273b37]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[248px] border-r border-[#e7e4dc] bg-[#fbfbf9] px-5 py-7 lg:flex lg:flex-col">
        <div className="mb-12 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#345b53] text-white shadow-sm"><BrainCircuit size={19} /></div>
          <div><p className="font-serif text-[19px] font-semibold tracking-tight">MAANAS</p><p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#78928b]">Care, before crisis</p></div>
        </div>
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9f99]">Command centre</p>
        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon, count }) => <button key={label} onClick={() => setActive(label)} className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[13px] font-medium transition ${active === label ? 'bg-[#e8f0ec] text-[#315d54]' : 'text-[#707c78] hover:bg-[#f1f2ee]'}`}><span className="flex items-center gap-3"><Icon size={17} strokeWidth={1.8} />{label}</span>{count && <span className="rounded-full bg-[#d5e4dc] px-2 py-0.5 text-[10px] text-[#447064]">{count}</span>}</button>)}
        </nav>
        <p className="mb-3 mt-10 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a9f99]">Resources</p>
        <nav className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-medium text-[#707c78] hover:bg-[#f1f2ee]"><BookOpen size={17} strokeWidth={1.8} />Care playbooks</button>
          <button onClick={() => setShowAudit(true)} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-medium text-[#707c78] hover:bg-[#f1f2ee]"><FileCheck2 size={17} strokeWidth={1.8} />Audit log</button>
        </nav>
        <div className="mt-auto rounded-2xl border border-[#dce8e2] bg-[#eef5f1] p-4"><div className="mb-3 flex items-center gap-2 text-[#397264]"><ShieldCheck size={16} /><span className="text-[11px] font-bold">Privacy by design</span></div><p className="text-[11px] leading-relaxed text-[#648079]">Wellness data is encrypted, consent-bound and never used for disciplinary action.</p><button onClick={() => notify('Privacy centre opened')} className="mt-3 text-[11px] font-semibold text-[#397264] underline underline-offset-2">View safeguards</button></div>
        <div className="mt-5 flex items-center gap-3 border-t border-[#e9e7e0] pt-5"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d8e4df] text-[11px] font-bold text-[#48756a]">AK</div><div className="min-w-0"><p className="truncate text-[12px] font-semibold">Ananya Kulkarni</p><p className="text-[10px] text-[#8b9590]">Welfare officer · North zone</p></div><MoreHorizontal className="ml-auto text-[#98a09b]" size={16} /></div>
      </aside>

      <section className="lg:pl-[248px]">
        <header className="flex h-[78px] items-center justify-between border-b border-[#e7e4dc] bg-[#fbfbf9]/80 px-5 backdrop-blur-md sm:px-9">
          <div className="flex items-center gap-3"><button className="lg:hidden" aria-label="Open menu"><Menu size={20} /></button><div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#92a09a]">Monday, 29 September 2026</p><h1 className="mt-1 font-serif text-[23px] font-semibold tracking-tight text-[#2b403b]">Good morning, Ananya</h1></div></div>
          <div className="flex items-center gap-2 sm:gap-4"><button className="hidden h-9 items-center gap-2 rounded-lg border border-[#e6e5df] bg-white px-3 text-[12px] text-[#74827d] sm:flex"><Search size={15} />Search people</button><button onClick={() => notify('You are all caught up')} className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#e6e5df] bg-white text-[#6f7d78]" aria-label="Notifications"><Bell size={17} /><span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-[#c26256]" /></button><div className="hidden h-8 w-px bg-[#e8e5de] sm:block" /><button onClick={() => notify('Secure session active')} className="flex items-center gap-2 text-[12px] font-semibold text-[#60716b]"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d8e4df] text-[11px] text-[#467267]">AK</span><ChevronDown size={14} /></button></div>
        </header>

        <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-9 lg:px-10 lg:py-9">
          {active !== 'Overview' ? <div className="flex min-h-[650px] items-center justify-center"><div className="max-w-md text-center"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f0ec] text-[#3e7467]"><Activity size={25} /></div><h2 className="font-serif text-3xl font-semibold">{active}</h2><p className="mt-3 text-sm leading-6 text-[#798681]">This workspace is ready for your next care decision. The same consent-bound data layer powers every MAANAS view.</p><button onClick={() => setActive('Overview')} className="mt-6 rounded-xl bg-[#345b53] px-5 py-3 text-xs font-bold text-white">Back to overview</button></div></div> : <>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#73918a]"><span className="h-2 w-2 rounded-full bg-[#65a28f]" />Live welfare pulse</p><h2 className="font-serif text-[34px] font-semibold tracking-[-0.03em] text-[#29413b] sm:text-[39px]">A clearer view of care.</h2><p className="mt-2 max-w-xl text-[13px] leading-6 text-[#7a8882]">Signals are here to guide a human conversation, never to make a decision for you.</p></div><button onClick={() => setShowCheckIn(true)} className="flex items-center justify-center gap-2 rounded-xl bg-[#345b53] px-4 py-3 text-[12px] font-bold text-white shadow-[0_5px_14px_rgba(52,91,83,0.16)] transition hover:bg-[#284c45]"><MessageCircle size={16} />Start a care conversation</button></div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[['People in your care','248','+6 this week','↑','text-[#51887c]'],['Signals needing review','12','3 new today','!','text-[#b55b50]'],['Care conversations','34','8 completed','✓','text-[#c39a3d]'],['Unit wellness pulse','72%','+4% this month','↗','text-[#51887c]']].map(([title, value, sub, mark, tone]) => <div key={title} className="rounded-2xl border border-[#e8e6df] bg-white p-5 shadow-[0_2px_10px_rgba(52,65,59,0.02)]"><div className="mb-5 flex items-start justify-between"><p className="text-[11px] font-semibold text-[#85908b]">{title}</p><span className={`flex h-7 w-7 items-center justify-center rounded-lg bg-[#f4f5f1] text-xs font-bold ${tone}`}>{mark}</span></div><div className="flex items-end gap-3"><p className="font-serif text-[31px] font-semibold leading-none text-[#2d443e]">{value}</p><p className="mb-0.5 text-[10px] font-semibold text-[#67a08e]">{sub}</p></div></div>)}
            </div>

            <div className="mt-7 grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
              <section className="rounded-2xl border border-[#e8e6df] bg-white p-5 sm:p-6"><div className="mb-6 flex items-start justify-between"><div><h3 className="font-serif text-[20px] font-semibold text-[#304740]">Signals needing your care</h3><p className="mt-1 text-[11px] text-[#89938e]">Prioritised by consent, recency and confidence</p></div><button onClick={() => setActive('People at a glance')} className="flex items-center gap-1 text-[11px] font-bold text-[#528276]">View all <ArrowUpRight size={14} /></button></div><div className="space-y-2">{people.map((person) => <button key={person.id} onClick={() => notify(`Care profile opened for ${person.name}`)} className="group flex w-full items-center gap-3 rounded-xl border border-transparent p-2 text-left transition hover:border-[#e7ece8] hover:bg-[#f7faf8]"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${person.color}`}>{person.initials}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-[13px] font-semibold text-[#40514c]">{person.name}</p><RiskBadge risk={person.risk} /></div><p className="mt-1 text-[10px] text-[#8c9792]">{person.unit} <span className="mx-1 text-[#ccd1cd]">•</span> {person.signal}</p></div><div className="hidden text-right sm:block"><p className="text-[10px] font-semibold text-[#7e8c86]">{person.time}</p><p className="mt-1 text-[10px] text-[#a1aaa5]">Consent active</p></div><ScoreRing score={person.score} /></button>)}</div><div className="mt-4 flex items-center gap-2 rounded-xl bg-[#f7f8f5] px-3 py-2.5 text-[10px] text-[#82908a]"><LockKeyhole size={13} className="text-[#6c9a8e]" />Individual signals are visible only to authorised welfare and medical staff.</div></section>

              <section className="rounded-2xl border border-[#e8e6df] bg-[#f1f6f3] p-5 sm:p-6"><div className="mb-5 flex items-start justify-between"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b988b]">Today&apos;s rhythm</p><h3 className="font-serif text-[20px] font-semibold text-[#304740]">Unit wellness pulse</h3></div><button aria-label="More options" className="text-[#839991]"><MoreHorizontal size={18} /></button></div><div className="mb-4 rounded-xl bg-white/75 p-4"><div className="mb-3 flex items-end justify-between"><div><p className="text-[10px] text-[#8b9792]">North zone · 37 BN</p><p className="mt-1 font-serif text-[27px] font-semibold text-[#345f55]">72<span className="text-base">%</span></p></div><span className="rounded-full bg-[#e1eee8] px-2 py-1 text-[10px] font-semibold text-[#4d8274]">Healthy trend</span></div><div className="flex h-[92px] items-end gap-1.5 border-b border-[#e4ebe6] pb-0">{[36,45,42,58,55,64,61,70,67,75,72,79,76,84,81,88,83,92,87,90].map((h, i) => <div key={i} className={`flex-1 rounded-t-sm ${i > 15 ? 'bg-[#6fa18f]' : 'bg-[#c5ddd1]'}`} style={{ height: `${h}%` }} />)}</div><div className="mt-2 flex justify-between text-[9px] text-[#a1aaa5]"><span>14 days ago</span><span>Today</span></div></div><div className="space-y-3">{[['Rest & recovery','76%','bg-[#76a992]'],['Workload balance','68%','bg-[#bca05d]'],['Peer connection','74%','bg-[#89a9b8]']].map(([label, value, color]) => <div key={label}><div className="mb-1.5 flex justify-between text-[10px] font-semibold text-[#70817a]"><span>{label}</span><span>{value}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white"><div className={`h-full rounded-full ${color}`} style={{ width: value }} /></div></div>)}</div><button onClick={() => notify('Wellness report downloaded')} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#cddfd7] bg-transparent py-2.5 text-[11px] font-bold text-[#4e7e71] transition hover:bg-white"><FileCheck2 size={14} />Open unit report</button></section>
            </div>

            <section className="mt-5 rounded-2xl border border-[#dce8e2] bg-[#eef5f1] p-5 sm:p-6"><div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center"><div className="max-w-xl"><div className="mb-2 flex items-center gap-2 text-[#397264]"><ShieldCheck size={16} /><p className="text-[10px] font-bold uppercase tracking-[0.15em]">Trust layer active</p></div><h3 className="font-serif text-[21px] font-semibold text-[#304740]">The model can abstain.</h3><p className="mt-2 text-[12px] leading-5 text-[#6d8078]">MAANAS only surfaces a care signal when confidence and consent thresholds are met. Uncertain cases are marked <span className="font-semibold text-[#397264]">insufficient evidence</span>, never escalated automatically.</p></div><div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-4"><div className="rounded-xl bg-white/70 px-3 py-2"><p className="font-serif text-lg font-semibold text-[#345f55]">18%</p><p className="text-[9px] text-[#81918a]">abstained</p></div><div className="rounded-xl bg-white/70 px-3 py-2"><p className="font-serif text-lg font-semibold text-[#345f55]">3</p><p className="text-[9px] text-[#81918a]">signals</p></div><div className="rounded-xl bg-white/70 px-3 py-2"><p className="font-serif text-lg font-semibold text-[#345f55]">100%</p><p className="text-[9px] text-[#81918a]">consent-bound</p></div><button onClick={() => setShowAudit(true)} className="rounded-xl bg-[#345b53] px-3 py-2 text-[9px] font-bold text-white">View proof</button></div></div></section>

            <div className="mt-5 grid gap-5 md:grid-cols-3"><section className="rounded-2xl border border-[#e8e6df] bg-white p-5"><div className="mb-4 flex items-center gap-2"><CalendarDays size={16} className="text-[#6d9689]" /><h3 className="text-[13px] font-bold text-[#53635e]">Care calendar</h3></div><p className="font-serif text-[25px] font-semibold text-[#304740]">8 <span className="font-sans text-[11px] font-normal text-[#8d9994]">conversations today</span></p><p className="mt-2 text-[11px] text-[#85908b]">Next: Priya Nair · 11:30 AM</p></section><section className="rounded-2xl border border-[#e8e6df] bg-white p-5"><div className="mb-4 flex items-center gap-2"><Sparkles size={16} className="text-[#bf9840]" /><h3 className="text-[13px] font-bold text-[#53635e]">One useful insight</h3></div><p className="text-[12px] leading-5 text-[#697a73]">Night-duty clusters are easing across 37 BN. Recovery signals are <span className="font-bold text-[#4c806f]">up 9%</span> since the last rotation.</p><button onClick={() => notify('Insight saved to your notes')} className="mt-3 text-[11px] font-bold text-[#558377]">Save insight <ArrowUpRight className="ml-1 inline" size={13} /></button></section><section className="rounded-2xl border border-[#e8e6df] bg-[#fffaf0] p-5"><div className="mb-4 flex items-center gap-2"><CircleHelp size={16} className="text-[#ba9341]" /><h3 className="text-[13px] font-bold text-[#756342]">A gentle reminder</h3></div><p className="text-[12px] leading-5 text-[#887855]">Three people have not checked in this fortnight. Consider a team-level wellbeing touchpoint.</p><button onClick={() => setShowCheckIn(true)} className="mt-3 text-[11px] font-bold text-[#a27b2e]">Plan a touchpoint <ArrowUpRight className="ml-1 inline" size={13} /></button></section></div>
          </>}
        </div>
      </section>

      {notice && <div role="status" className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-xl bg-[#294d45] px-4 py-3 text-xs font-semibold text-white shadow-xl"><Check size={15} />{notice}</div>}
      {showAudit && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#243b35]/25 p-4"><div className="w-full max-w-lg rounded-2xl border border-[#e8e6df] bg-white p-6 shadow-2xl"><div className="mb-5 flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b988b]">Tamper-evident care log</p><h2 className="mt-2 font-serif text-2xl font-semibold text-[#304740]">Safety proof, not a promise</h2></div><button onClick={() => setShowAudit(false)} aria-label="Close audit log" className="text-[#8b9691]"><X size={18} /></button></div><p className="mb-4 text-[12px] leading-5 text-[#74817c]">Every access is append-only, consent-scoped and visible to the safeguarding team. Misuse attempts are denied and recorded.</p><div className="space-y-2">{auditEvents.map((event) => <div key={event.time} className="flex items-center gap-3 rounded-xl bg-[#f7f8f5] p-3"><span className="w-10 text-[10px] font-semibold text-[#99a39e]">{event.time}</span><div className="min-w-0 flex-1"><p className="text-[11px] font-semibold text-[#4c5f57]">{event.action}</p><p className="text-[10px] text-[#89958f]">{event.actor}</p></div><span className={`rounded-full px-2 py-1 text-[9px] font-bold ${event.result === 'Denied by firewall' ? 'bg-[#f6e3df] text-[#a34e43]' : 'bg-[#e1eee8] text-[#407466]'}`}>{event.result}</span></div>)}</div><div className="mt-5 flex items-center gap-2 rounded-xl border border-[#dce8e2] bg-[#eef5f1] px-3 py-2.5 text-[10px] text-[#648079]"><LockKeyhole size={13} />Hash-chain verified · last anchor 09:42 IST</div></div></div>}
      {showCheckIn && <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#243b35]/25 p-4 sm:items-center"><div className="w-full max-w-md rounded-2xl border border-[#e8e6df] bg-white p-6 shadow-2xl"><div className="mb-5 flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b988b]">Consent-first workflow</p><h2 className="mt-2 font-serif text-2xl font-semibold text-[#304740]">Start a care conversation</h2></div><button onClick={() => setShowCheckIn(false)} aria-label="Close dialog" className="text-[#8b9691]"><X size={18} /></button></div><p className="text-[13px] leading-6 text-[#74817c]">Choose a gentle next step. MAANAS will record the action in the immutable care audit log, not a disciplinary record.</p><div className="mt-5 space-y-2"><button onClick={() => { setShowCheckIn(false); notify('Conversation added to care calendar') }} className="flex w-full items-center gap-3 rounded-xl border border-[#dfeae4] p-3 text-left hover:bg-[#f5faf7]"><MessageCircle size={17} className="text-[#51887c]" /><span><strong className="block text-[12px] text-[#43564f]">Offer a private check-in</strong><span className="text-[10px] text-[#8a9690]">No score or reason is shared with command.</span></span></button><button onClick={() => { setShowCheckIn(false); notify('Peer support pathway suggested') }} className="flex w-full items-center gap-3 rounded-xl border border-[#dfeae4] p-3 text-left hover:bg-[#f5faf7]"><UsersRound size={17} className="text-[#51887c]" /><span><strong className="block text-[12px] text-[#43564f]">Offer peer support</strong><span className="text-[10px] text-[#8a9690]">Connect with a trained, confidential peer.</span></span></button><button onClick={() => { setShowCheckIn(false); notify('Leave planning pathway suggested') }} className="flex w-full items-center gap-3 rounded-xl border border-[#dfeae4] p-3 text-left hover:bg-[#f5faf7]"><Clock3 size={17} className="text-[#51887c]" /><span><strong className="block text-[12px] text-[#43564f]">Explore recovery time</strong><span className="text-[10px] text-[#8a9690]">Review leave and workload balance together.</span></span></button></div></div></div>}
    </main>
  )
}
