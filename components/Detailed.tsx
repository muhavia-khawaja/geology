import { getEarthQuakes } from '@/utils/actions'
import Card from './Card'
import { Activity, Globe, Info } from 'lucide-react'

export default async function Detailed() {
  const earthquakes = await getEarthQuakes()

  return (
    <section className='bg-rich-black text-white py-20 md:py-32 relative overflow-hidden'>
      <div className='absolute top-0 right-0 w-1/3 h-1/3 bg-vivid-purple/5 blur-[120px] rounded-full pointer-events-none' />

      <div className='mx-auto max-w-7xl px-6 relative z-10'>
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16 md:mb-24'>
          <div className='space-y-4'>
            <div className='flex items-center gap-2 text-rose-dust'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-dust opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-rose-dust'></span>
              </span>
              <span className='text-[10px] font-black tracking-[0.3em] uppercase'>
                Live Seismic Feed
              </span>
            </div>

            <h2 className='text-3xl sm:text-4xl md:text-6xl font-black leading-none tracking-tighter'>
              Global <span className='text-vivid-purple'>Activity</span>{' '}
              <br className='hidden md:block' />
              Real-Time <span className='text-rose-dust'>Logs</span>
            </h2>
          </div>

          <div className='flex flex-col max-w-md border-l border-vivid-purple/20 pl-8'>
            <div className='flex items-center gap-2 mb-4 text-white/30'>
              <Globe className='w-4 h-4' />
              <span className='text-xs font-mono uppercase'>
                USGS API Integration
              </span>
            </div>

            <p className='text-sm md:text-base text-white/40 leading-relaxed font-light'>
              Continuous monitoring of geoacoustic signals and tectonic shifts.
              Data represents the most recent seismic events detected globally.
            </p>

            <button className='group mt-8 flex items-center gap-2 rounded-full border border-vivid-purple/40 px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white hover:border-rose-dust hover:bg-deep-plum/20 transition-all w-fit'>
              <Info className='w-4 h-4' />
              Dataset Specs
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {earthquakes.map((quake) => (
            <Card key={quake.id} quake={quake} />
          ))}
        </div>

        <div className='mt-20 py-4 border-y border-white/5 flex flex-wrap justify-between items-center gap-4'>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2 text-[10px] font-mono text-white/20'>
              <Activity className='w-3 h-3' />
              SIGNAL STRENGTH: 100%
            </div>
            <div className='flex items-center gap-2 text-[10px] font-mono text-white/20'>
              <div className='w-2 h-2 rounded-full bg-vivid-purple/40' />
              NODES ACTIVE: 1,204
            </div>
          </div>
          <p className='text-[10px] font-mono text-rose-dust/40'>
            AUTO-REFRESH: ENABLED (60S)
          </p>
        </div>
      </div>
    </section>
  )
}
