import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

export default function SignInPage() { return <main className="flex min-h-screen items-center justify-center bg-[#f7f7f4] p-6"><div className="w-full max-w-md rounded-3xl border border-[#e6e5df] bg-white p-7 shadow-sm"><p className="mb-8 text-sm font-bold tracking-[0.15em] text-[#397264]">MAANAS</p><AuthForm mode="sign-in" /><p className="mt-6 text-center text-sm text-[#74817c]">New welfare officer? <Link className="font-semibold text-[#397264]" href="/sign-up">Create an account</Link></p></div></main> }
