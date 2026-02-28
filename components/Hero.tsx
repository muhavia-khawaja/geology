import { Hexagon, Gem, Sparkles, Fingerprint } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className='relative min-h-screen w-full bg-rich-black overflow-hidden flex items-center justify-center px-6'>
      <div className='absolute inset-0 opacity-20 [background-image:radial-gradient(#3B1C32_1px,transparent_1px)] [background-size:20px_20px]' />

      <svg
        className='absolute inset-0 w-full h-full opacity-30'
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
          strokeDasharray='5 5'
        />
      </svg>

      <Gem className='hidden md:block absolute top-24 left-32 text-rose-dust/40 w-10 h-10 rotate-12 animate-bounce' />
      <Hexagon className='hidden md:block absolute top-40 right-40 text-vivid-purple/50 w-12 h-12 animate-spin-slow' />
      <Sparkles className='hidden md:block absolute bottom-40 left-48 text-vivid-purple/40 w-14 h-14 -rotate-12' />
      <Fingerprint className='hidden md:block absolute bottom-32 right-56 text-rose-dust/50 w-10 h-10 rotate-45' />

      <div className='relative z-10 flex flex-col items-center'>
        <div className='relative group'>
          <div className='absolute -inset-1 bg-gradient-to-r from-vivid-purple to-rose-dust rounded-[30%] md:rounded-[40%] blur opacity-25 group-hover:opacity-50 transition duration-1000'></div>

          <div className='relative overflow-hidden rounded-[30%] md:rounded-[40%] border border-vivid-purple/30 shadow-2xl shadow-black w-full max-w-md md:max-w-[520px] bg-rich-black'>
            <img
              src='https://c4.wallpaperflare.com/wallpaper/115/707/789/cave-moon-dark-hd-wallpaper-preview.jpg'
              alt='Hero'
              className='w-full h-64 md:h-[340px] object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700'
            />
          </div>
        </div>

        <div className='hidden md:block absolute -right-48 top-44 text-[10px] text-rose-dust/60 tracking-[0.3em] font-mono border-l border-vivid-purple/30 pl-4'>
          <div className='text-white/80'>LAT: 40.7128° N</div>
          <div>2026-02-28</div>
          <div>11:56:03 UTC</div>
        </div>

        <div className='hidden md:block absolute -left-48 bottom-16 text-[10px] text-rose-dust/60 tracking-[0.3em] font-mono border-r border-vivid-purple/30 pr-4 text-right'>
          <div className='text-white/80'>LONG: 74.0060° W</div>
          <div>DEEP CORE PHASE-4</div>
          <div>SIGNAL: STABLE</div>
        </div>

        <div className='mt-10 text-center flex flex-col items-center'>
          <div className='text-[10px] md:text-xs tracking-[0.4em] text-vivid-purple font-bold mb-2'>
            ANALYSIS OF THE GEOACOUSTIC SIGNAL
          </div>
          <h1 className='text-white text-3xl md:text-4xl font-black lowercase tracking-tighter'>
            grave<span className='text-rose-dust'>stone</span> archive
          </h1>
        </div>

        <div className='mt-10'>
          <Link
            href={'/contact'}
            className='group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-rich-black border-2 border-vivid-purple rounded-full hover:bg-vivid-purple'
          >
            <span className='relative z-10 text-xs tracking-widest uppercase'>
              Initiate Inquiry
            </span>
            <div className='absolute inset-0 bg-rose-dust blur-lg opacity-0 group-hover:opacity-20 transition-opacity' />
          </Link>
        </div>
      </div>

      <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-rich-black to-transparent' />
    </div>
  )
}
