import { Gem, Hexagon, Waves, Share2, MessageSquare, Zap } from 'lucide-react'
import React from 'react'

export default function Queries() {
  return (
    <div className='relative min-h-[80vh] w-full bg-rich-black overflow-hidden flex items-center justify-center px-6 border-t border-white/5'>
      <svg
        className='absolute inset-0 w-full h-full opacity-30 pointer-events-none'
        viewBox='0 0 1440 400'
        fill='none'
      >
        <path
          d='M0 200 C 240 180, 480 220, 720 200 C 960 180, 1200 220, 1440 200'
          stroke='#6A1E55'
          strokeWidth='2'
          className='animate-pulse'
        />
        <path
          d='M0 240 C 240 220, 480 260, 720 240 C 960 220, 1200 260, 1440 240'
          stroke='#A64D79'
          strokeWidth='1'
          strokeDasharray='10 5'
        />
      </svg>

      <Gem className='hidden md:block absolute top-24 left-32 text-rose-dust/30 w-10 h-10 rotate-12 animate-bounce' />
      <Hexagon className='hidden md:block absolute top-40 right-40 text-vivid-purple/40 w-12 h-12 animate-spin-slow' />
      <Waves className='hidden md:block absolute bottom-40 left-48 text-vivid-purple/30 w-14 h-14' />
      <Zap className='hidden md:block absolute bottom-32 right-56 text-rose-dust/40 w-10 h-10 rotate-45' />

      <div className='relative z-10 w-full max-w-4xl text-center'>
        <div className='flex justify-center items-center gap-3 mb-6'>
          <div className='h-px w-8 bg-vivid-purple/50' />
          <p className='text-[10px] md:text-xs tracking-[0.5em] text-rose-dust font-bold uppercase'>
            Decoding Geoacoustic Signals
          </p>
          <div className='h-px w-8 bg-vivid-purple/50' />
        </div>

        <h2 className='text-3xl sm:text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter text-white'>
          Ready to <span className='text-vivid-purple'>Decode</span> the <br />
          Unknown <span className='text-rose-dust'>Layers?</span>
        </h2>

        <p className='text-sm md:text-base text-white/40 leading-relaxed max-w-2xl mx-auto font-light'>
          Our archive specializes in high-fidelity signal analysis. From
          <span className='text-white/70 italic'>
            {' '}
            frequency offset indexing{' '}
          </span>{' '}
          to
          <span className='text-white/70 italic'> 48,000 kHz sampling</span>, we
          provide the data required to visualize the deep core.
        </p>

        <div className='mt-12 flex flex-col md:flex-row gap-6 justify-center items-center'>
          <button className='group relative flex items-center gap-3 rounded-full bg-vivid-purple px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white hover:bg-rose-dust transition-all duration-300 shadow-xl shadow-vivid-purple/20'>
            <Share2 className='w-4 h-4 group-hover:rotate-12 transition-transform' />
            Join the Expedition
          </button>

          <button className='flex items-center gap-3 rounded-full border border-vivid-purple/40 px-10 py-4 text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-white hover:border-rose-dust hover:bg-deep-plum/20 transition-all duration-300'>
            <MessageSquare className='w-4 h-4' />
            Technical Inquiry
          </button>
        </div>
      </div>

      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-vivid-purple/5 blur-[120px] rounded-full pointer-events-none' />
    </div>
  )
}
