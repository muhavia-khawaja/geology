import { Gem, Hexagon } from 'lucide-react'
import React from 'react'

export default function Queries() {
  return (
    <div className='relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center px-6'>
      <svg
        className='absolute inset-0 w-full h-full opacity-20'
        viewBox='0 0 1440 400'
        fill='none'
      >
        <path
          d='M0 200 C 240 180, 480 220, 720 200 C 960 180, 1200 220, 1440 200'
          stroke='white'
          strokeWidth='1'
        />
        <path
          d='M0 240 C 240 220, 480 260, 720 240 C 960 220, 1200 260, 1440 240'
          stroke='white'
          strokeWidth='0.5'
        />
      </svg>

      <Gem className='hidden md:block absolute top-24 left-32 text-emerald-400/70 w-10 h-10 rotate-12' />
      <Hexagon className='hidden md:block absolute top-40 right-40 text-cyan-400/60 w-12 h-12' />
      <Gem className='hidden md:block absolute bottom-40 left-48 text-purple-400/70 w-14 h-14 -rotate-12' />
      <Hexagon className='hidden md:block absolute bottom-32 right-56 text-rose-400/70 w-10 h-10 rotate-45' />

      <div className='relative z-10 w-full max-w-4xl text-center'>
        <p className='text-[10px] md:text-xs tracking-widest text-white/50 mb-4 uppercase'>
          What are geoacoustic signals? let&apos;s dive in and find out!
        </p>

        <h2 className='text-2xl sm:text-3xl md:text-5xl font-semibold mb-6 leading-tight'>
          Ready to decode the unknown layers?
        </h2>

        <p className='text-sm md:text-base text-white/50 leading-relaxed max-w-2xl mx-auto'>
          This study delves into geoacoustic signal analysis, focusing on
          frequency offset data, sound interference evaluation, and setting a
          sampling frequency of 48,000 kHz with an offset index of 0.314.
        </p>

        <div className='mt-10 flex flex-col md:flex-row gap-4 justify-center items-center'>
          <button className='rounded-full bg-[#FEFE8C] text-black px-6 py-3 text-xs font-medium hover:bg-yellow-300/90 transition'>
            Let&apos;s embark on this immense journey together!
          </button>

          <button className='rounded-full border border-white/40 px-6 py-3 text-sm text-white/60 hover:bg-white/10 transition'>
            Feel Free to Ask Any Questions
          </button>
        </div>
      </div>
    </div>
  )
}
