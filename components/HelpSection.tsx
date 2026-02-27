'use client'

import { createComment } from '@/utils/actions'
import { useSearchParams } from 'next/navigation'
import { useRef, useTransition } from 'react'

export default function HelpSection() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()

  return (
    <section className='min-h-screen bg-[#050505] py-32 md:py-44 text-slate-300 selection:bg-emerald-500/30'>
      {success === 'true' && (
        <div
          className='max-w-md mx-auto mb-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl py-4 px-6 font-medium shadow-[0_0_20px_rgba(16,185,129,0.1)] text-center animate-in fade-in slide-in-from-top-4 duration-500'
          role='alert'
        >
          Message interred successfully.
        </div>
      )}

      <div className='flex flex-col lg:flex-row items-center gap-20 max-w-6xl mx-auto px-6'>
        <div className='flex-1 w-full'>
          <header className='mb-10'>
            <h1 className='text-5xl sm:text-6xl font-black tracking-tighter text-white mb-4 uppercase'>
              Final{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500'>
                Words?
              </span>
            </h1>
            <p className='text-slate-500 font-medium tracking-wide'>
              Reach out to the Gravestone team for support or inquiries.
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
              <input
                type='text'
                name='name'
                placeholder='Full Name'
                className='w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all'
                required
              />
              <input
                type='email'
                name='email'
                placeholder='Email Address'
                className='w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all'
                required
              />
            </div>

            <textarea
              name='message'
              rows={5}
              placeholder='How can we assist you?'
              className='w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none'
              required
            />

            <button
              type='submit'
              disabled={isPending}
              className='group relative w-full overflow-hidden rounded-xl bg-white px-8 py-4 font-bold text-black transition-all hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-50'
            >
              <span className='relative z-10'>
                {isPending ? 'SENDING...' : 'SEND MESSAGE'}
              </span>
            </button>
          </form>
        </div>

        <aside className='relative flex-1 w-full'>
          <div className='absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-3xl opacity-30' />

          <div className='relative bg-neutral-900/50 border border-white/5 p-12 rounded-3xl backdrop-blur-xl shadow-2xl'>
            <h2 className='text-sm font-black tracking-[0.3em] text-emerald-500 uppercase mb-8'>
              User Testimony
            </h2>

            <blockquote className='text-2xl font-medium leading-tight text-white mb-10'>
              &ldquo;Gravestone transformed our project management from a
              chaotic mess into a{' '}
              <span className='text-emerald-400'>
                seamless, high-speed machine.
              </span>
              &rdquo;
            </blockquote>

            <div className='flex items-center gap-4'>
              <div className='h-12 w-12 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500' />
              <div>
                <p className='font-bold text-white'>Arctiq Team</p>
                <p className='text-xs uppercase tracking-widest text-slate-500'>
                  Enterprise Partner
                </p>
              </div>
            </div>

            <svg
              className='absolute bottom-8 right-8 w-20 h-20 opacity-5 text-white'
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
