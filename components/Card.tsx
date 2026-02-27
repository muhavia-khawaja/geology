import { StepBack } from 'lucide-react'
import Link from 'next/link'

export default function Card({
  quake,
}: {
  quake: { magnitude: number; location: string; time: number }
}) {
  const quakeDate = new Date(quake.time)
  const date = quakeDate.toLocaleDateString()
  const time = quakeDate.toLocaleTimeString()

  return (
    <Link
      href='#'
      className='group border border-white rounded-xl shadow-lg shadow-white/10 hover:shadow-white/30 transition-all duration-300 hover:-translate-y-1 w-72 md:w-96'
    >
      <div
        className='bg-black text-white rounded-xl p-6 
        bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] 
        bg-size-[4.95em_4.95em]'
      >
        <div className='flex justify-between mb-10'>
          <div className='font-semibold text-sm md:text-base'>
            Magnitude {quake.magnitude.toFixed(1)}
          </div>
          <div className='text-4xl md:text-5xl opacity-10'>❁</div>
        </div>

        <div className='text-base md:text-lg mb-6 opacity-40'>
          {quake.location}
        </div>

        <div className='flex justify-between text-sm'>
          <div>
            <div className='text-xs opacity-40'>Date</div>
            <div className='opacity-80 mt-2'>{date}</div>
          </div>

          <div className='text-right'>
            <div className='text-xs opacity-40 flex items-center justify-end'>
              <StepBack className='w-4 h-4 mr-1' />
              Time
            </div>
            <div className='opacity-80 mt-2'>{time}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
