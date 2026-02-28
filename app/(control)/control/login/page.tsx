'use client'
import { login } from '@/utils/actions'
import {
  Lock,
  ShieldAlert,
  KeyRound,
  UserCheck,
  ChevronRight,
} from 'lucide-react'

export default function LoginForm({
  searchParams,
}: {
  searchParams: { error: string }
}) {
  const error = searchParams.error

  return (
    <div className='min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden'>
      <div
        className='absolute inset-0 opacity-[0.03] pointer-events-none'
        style={{
          backgroundImage: `linear-gradient(#6A1E55 1px, transparent 1px), linear-gradient(90deg, #6A1E55 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className='absolute w-[500px] h-[500px] bg-[#6A1E55]/10 rounded-full blur-[120px] -top-48 -left-48' />

      <div className='w-full max-w-md relative z-10'>
        <div className='flex justify-center mb-8'>
          <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6A1E55] to-[#A64D79] flex items-center justify-center shadow-[0_0_30px_rgba(106,30,85,0.4)]'>
            <Lock className='text-white w-8 h-8' />
          </div>
        </div>

        <div className='bg-[#0D0D0F] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden'>
          <div className='absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#A64D79] to-transparent animate-scan' />

          <div className='text-center mb-10'>
            <h2 className='text-white text-3xl font-black italic tracking-tighter uppercase leading-none'>
              Admin <span className='text-[#6A1E55]'>Access</span>
            </h2>
            <p className='text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-3'>
              Restricted CMS Terminal
            </p>
          </div>

          {error && (
            <div className='mb-8 flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl animate-shake'>
              <ShieldAlert className='text-red-500 w-5 h-5 flex-shrink-0' />
              <p className='text-[10px] font-black text-red-400 uppercase tracking-widest leading-tight'>
                {error}
              </p>
            </div>
          )}

          <form className='space-y-6' action={login}>
            <div className='space-y-2'>
              <label className='flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1'>
                <UserCheck size={12} /> Registry ID
              </label>
              <div className='relative'>
                <input
                  id='email'
                  type='text'
                  placeholder='admin@gravestone.io'
                  name='email'
                  required
                  className='w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/5 focus:outline-none focus:border-[#6A1E55] focus:ring-1 focus:ring-[#6A1E55] transition-all'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1'>
                <KeyRound size={12} /> Secure Key
              </label>
              <div className='relative'>
                <input
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  name='password'
                  required
                  className='w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/5 focus:outline-none focus:border-[#6A1E55] focus:ring-1 focus:ring-[#6A1E55] transition-all'
                />
              </div>
            </div>

            <button
              type='submit'
              className='group relative w-full bg-[#6A1E55] hover:bg-[#A64D79] text-white py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-[#6A1E55]/20 active:scale-95'
            >
              <div className='flex items-center justify-center gap-2'>
                Authenticate
                <ChevronRight
                  size={14}
                  className='group-hover:translate-x-1 transition-transform'
                />
              </div>
            </button>
          </form>

          <div className='mt-8 pt-8 border-t border-white/5 flex justify-center'>
            <div className='flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/10 rounded-full'>
              <div className='w-1 h-1 rounded-full bg-green-500 animate-pulse' />
              <span className='text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]'>
                Secure Session Active
              </span>
            </div>
          </div>
        </div>

        <p className='text-center mt-8 text-[9px] font-black text-white/10 uppercase tracking-[0.5em]'>
          Unauthorized access is strictly prohibited
        </p>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(400px);
            opacity: 0;
          }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  )
}
