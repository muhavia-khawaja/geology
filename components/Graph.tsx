import { DownloadIcon, GitGraph, Settings, SolarPanel } from 'lucide-react'
import Stack from './Stack'

export default function Graph() {
  return (
    <section className='bg-black text-white py-32'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='flex justify-between  mb-20'>
          <h2 className='text-4xl md:text-3xl font-semibold mb-6'>
            Real Time Graph B7-90542
          </h2>

          <div className='flex  items-center'>
            <Settings className='w-6 h-6 text-white/50' />
            <SolarPanel className='w-6 h-6 text-white/50 mx-6' />
            <DownloadIcon className='w-6 h-6 text-white/50 ' />
          </div>
        </div>

        <div className='flex gap-2 md:gap-10 flex-wrap   justify-center'>
          <Stack length={15} />
          <Stack length={15} />
          <Stack length={15} />
        </div>
      </div>
    </section>
  )
}
