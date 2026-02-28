'use client'

import { createComment } from '@/utils/actions'
import { useSearchParams } from 'next/navigation'
import { useRef, useTransition } from 'react'
import { Send, Shield, Zap, Terminal } from 'lucide-react'

export default function HelpSection() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()

  return (
    <section className='relative min-h-screen bg-[#0A0A0B] py-32 md:py-44 text-slate-400 selection:bg-[#6A1E55]/30 overflow-hidden'>
      {/* Background Decor */}
      <div
        className='absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none'
        style={{
          backgroundImage: `radial-gradient(#6A1E55 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {success === 'true' && (
        <div
          className='max-w-md mx-auto mb-12 bg-[#6A1E55]/10 border border-[#6A1E55]/20 text-[#A64D79] rounded-2xl py-4 px-6 font-black text-xs uppercase tracking-widest shadow-[0_0_40px_rgba(106,30,85,0.1)] text-center animate-in fade-in slide-in-from-top-4 duration-500'
          role='alert'
        >
          <Shield className='inline-block mr-2 w-4 h-4' /> Message Interred
          Successfully.
        </div>
      )}

      <div className='flex flex-col lg:flex-row items-center gap-24 max-w-7xl mx-auto px-6 relative z-10'>
        <div className='flex-1 w-full'>
          <header className='mb-12 space-y-4'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#6A1E55]/10 border border-[#6A1E55]/30'>
              <Zap size={12} className='text-[#A64D79]' />
              <span className='text-[10px] font-black uppercase tracking-[0.3em] text-[#A64D79]'>
                Priority Communication
              </span>
            </div>
            <h1 className='text-6xl sm:text-7xl font-black tracking-tighter text-white uppercase italic leading-[0.8]'>
              Direct <br />
              <span className='text-[#6A1E55]'>Uplink.</span>
            </h1>
            <p className='text-white/30 font-medium tracking-wide max-w-md text-sm leading-relaxed'>
              Initialize a secure transmission to the Gravestone registry. Our
              analysts will decrypt and respond to your inquiry within 24
              cycles.
            </p>
          </header>

          <form
            ref={formRef}
            action={(formData: FormData) => {
              startTransition(async () => {
                await createComment(formData)
                formRef.current?.reset()
              })
            }}
            className='space-y-4'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='text-[9px] font-black text-white/20 uppercase tracking-widest ml-1'>
                  Full Identity
                </label>
                <input
                  type='text'
                  name='name'
                  placeholder='Name...'
                  className='w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white placeholder-white/10 focus:outline-none focus:border-[#6A1E55] focus:ring-1 focus:ring-[#6A1E55] transition-all'
                  required
                />
              </div>
              <div className='space-y-2'>
                <label className='text-[9px] font-black text-white/20 uppercase tracking-widest ml-1'>
                  Return Address
                </label>
                <input
                  type='email'
                  name='email'
                  placeholder='Email...'
                  className='w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white placeholder-white/10 focus:outline-none focus:border-[#6A1E55] focus:ring-1 focus:ring-[#6A1E55] transition-all'
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-[9px] font-black text-white/20 uppercase tracking-widest ml-1'>
                Transmission Details
              </label>
              <textarea
                name='message'
                rows={5}
                placeholder='How can we assist with your research?'
                className='w-full bg-white/[0.03] border border-white/10 p-4 rounded-xl text-white placeholder-white/10 focus:outline-none focus:border-[#6A1E55] focus:ring-1 focus:ring-[#6A1E55] transition-all resize-none'
                required
              />
            </div>

            <button
              type='submit'
              disabled={isPending}
              className='group relative w-full overflow-hidden rounded-xl bg-[#6A1E55] px-8 py-5 font-black text-[10px] uppercase tracking-[0.3em] text-white transition-all hover:bg-[#A64D79] active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-[#6A1E55]/20'
            >
              <div className='flex items-center justify-center gap-3'>
                {isPending ? 'ENCRYPTING...' : 'INITIALIZE TRANSMISSION'}
                <Send
                  size={14}
                  className={
                    isPending
                      ? 'animate-pulse'
                      : 'group-hover:translate-x-1 transition-transform'
                  }
                />
              </div>
            </button>
          </form>
        </div>

        <aside className='relative flex-1 w-full'>
          <div className='absolute -inset-10 bg-[#6A1E55]/10 rounded-full blur-[120px] opacity-40' />

          <div className='relative bg-[#111114] border border-white/5 p-12 rounded-[2.5rem] shadow-2xl overflow-hidden'>
            <div className='flex items-center gap-3 mb-12'>
              <Terminal size={18} className='text-[#A64D79]' />
              <h2 className='text-[10px] font-black tracking-[0.4em] text-white/30 uppercase'>
                Archived Testimony
              </h2>
            </div>

            <blockquote className='text-3xl font-bold leading-[1.1] text-white mb-12 tracking-tight italic'>
              &ldquo;Gravestone transformed our project management from a
              chaotic mess into a{' '}
              <span className='text-[#6A1E55]'>
                seamless, high-speed machine.
              </span>
              &rdquo;
            </blockquote>

            <div className='flex items-center gap-5'>
              <div className='h-14 w-14 rounded-2xl bg-gradient-to-br from-[#6A1E55] to-[#A64D79] p-[1px]'>
                <div className='w-full h-full bg-[#111114] rounded-[15px] flex items-center justify-center'>
                  <Shield size={20} className='text-white/20' />
                </div>
              </div>
              <div>
                <p className='font-black text-white uppercase italic tracking-tighter'>
                  GraveStone Team
                </p>
                <p className='text-[9px] font-black uppercase tracking-[0.2em] text-[#A64D79]'>
                  Enterprise Partner
                </p>
              </div>
            </div>

            <svg
              className='absolute -bottom-4 -right-4 w-32 h-32 opacity-[0.02] text-white rotate-12'
              fill='currentColor'
              viewBox='0 0 32 32'
            >
              <path d='M10 4v12H4v4h12v-4H10V4zM24 4v12h-6v4h12v-4H24V4z' />
            </svg>
          </div>
        </aside>
      </div>
    </section>
  )
}
