import { Activity, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function Card({
  quake,
}: {
  quake: { id: string; magnitude: number; location: string; time: number }
}) {
  const quakeDate = new Date(quake.time)
  const date = quakeDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const time = quakeDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <Link
      href={`/real-time-data/${quake.id}`}
      className='group relative block w-full transition-all duration-500 hover:-translate-y-2'
    >
      <div className='absolute -inset-0.5 bg-gradient-to-br from-vivid-purple to-rose-dust rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500' />

      <div className='relative flex flex-col h-full bg-deep-plum/10 backdrop-blur-md border border-vivid-purple/20 rounded-2xl p-6 overflow-hidden'>
        <div className='absolute top-0 right-0 w-32 h-32 bg-vivid-purple/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none' />

        <div className='flex justify-between items-start mb-8'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-vivid-purple uppercase'>
              <Activity className='w-3 h-3' />
              Seismic Event
            </div>
            <div className='font-black text-3xl text-rose-dust tracking-tighter'>
              {quake.magnitude.toFixed(1)}{' '}
              <span className='text-xs font-medium text-white/40 ml-1 uppercase tracking-widest'>
                mag
              </span>
            </div>
          </div>

          <div className='p-2 rounded-full bg-white/5 border border-white/5 group-hover:bg-rose-dust group-hover:text-white transition-colors'>
            <ArrowUpRight className='w-4 h-4' />
          </div>
        </div>

        <div className='flex items-start gap-2 mb-8'>
          <MapPin className='w-4 h-4 text-vivid-purple shrink-0 mt-1' />
          <div className='text-lg font-bold leading-tight text-white/90 group-hover:text-white transition-colors'>
            {quake.location}
          </div>
        </div>

        <div className='mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-white/5'>
          <div className='flex flex-col gap-1'>
            <div className='text-[10px] font-bold text-white/20 uppercase tracking-widest flex items-center gap-1'>
              Date
            </div>
            <div className='text-sm font-medium text-white/60'>{date}</div>
          </div>

          <div className='flex flex-col gap-1 text-right'>
            <div className='text-[10px] font-bold text-white/20 uppercase tracking-widest flex items-center justify-end gap-1'>
              <Clock className='w-3 h-3' />
              Time
            </div>
            <div className='text-sm font-medium text-white/60'>{time} UTC</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
