'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  async function submit(formData: FormData) {
    setPending(true); setError('')
    const email = String(formData.get('email') ?? ''), password = String(formData.get('password') ?? ''), name = String(formData.get('name') ?? '')
    const result = mode === 'sign-up' ? await authClient.signUp.email({ email, password, name }) : await authClient.signIn.email({ email, password })
    if (result.error) setError('We could not verify those details. Please try again.')
    else { router.push('/'); router.refresh() }
    setPending(false)
  }
  return <form action={submit} className="space-y-4"><h1 className="font-serif text-3xl font-semibold text-[#29413b]">{mode === 'sign-up' ? 'Create your secure workspace' : 'Welcome back to MAANAS'}</h1>{mode === 'sign-up' && <input name="name" required placeholder="Full name" className="w-full rounded-xl border border-[#dfe6e1] px-4 py-3 text-sm" />}<input name="email" type="email" required placeholder="Work email" className="w-full rounded-xl border border-[#dfe6e1] px-4 py-3 text-sm" /><input name="password" type="password" minLength={8} required placeholder="Password" className="w-full rounded-xl border border-[#dfe6e1] px-4 py-3 text-sm" />{error && <p className="text-sm text-[#a34e43]">{error}</p>}<button disabled={pending} className="w-full rounded-xl bg-[#345b53] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">{pending ? 'Securing session…' : mode === 'sign-up' ? 'Create workspace' : 'Sign in'}</button></form>
}
