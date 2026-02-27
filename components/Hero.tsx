import { Hexagon, Gem } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
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

      <div className='relative z-10 flex flex-col items-center'>
        <div className='overflow-hidden rounded-[30%] md:rounded-[40%] border border-white/10 shadow-2xl shadow-black w-full max-w-md md:max-w-[520px]'>
          <img
            src='https://c4.wallpaperflare.com/wallpaper/115/707/789/cave-moon-dark-hd-wallpaper-preview.jpg'
            alt='Hero'
            className='w-full h-64 md:h-[340px] object-cover'
          />
        </div>

        <div className='hidden md:block absolute -right-40 top-44 text-xs text-white/40 tracking-widest'>
          <div>2025-07-04</div>
          <div>17:23:34 UTC</div>
        </div>

        <div className='hidden md:block absolute -left-40 bottom-16 text-xs text-white/40 tracking-widest'>
          <div>2025-07-04</div>
          <div>17:20:22 UTC</div>
        </div>

        <div className='mt-6 text-center text-[10px] md:text-xs tracking-widest text-white/60'>
          ANALYSIS OF THE GEOACOUSTIC SIGNAL
        </div>

        <div className='mt-8'>
          <Link
            href={'/contact'}
            className='rounded-full bg-[#FEFE8C] text-black px-6 py-3 text-sm font-medium hover:bg-yellow-300/90 transition'
          >
            Feel Free to Ask Any Questions
          </Link>
        </div>
      </div>
    </div>
  )
}
