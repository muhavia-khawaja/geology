import { getEarthQuakes } from '@/utils/actions'
import Card from './Card'

export default async function Detailed() {
  const earthquakes = await getEarthQuakes()

  return (
    <section className='bg-black text-white py-20 md:py-32'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='flex flex-col md:flex-row md:justify-between gap-10 md:gap-20 mb-16 md:mb-20'>
          <h2 className='text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight'>
            Latest Earthquakes <br className='hidden md:block' />
            around the world
          </h2>

          <div className='flex flex-col max-w-md'>
            <p className='text-sm md:text-base opacity-50'>
              Live data from the USGS earthquake API, showing the most recent
              seismic activity.
            </p>

            <button className='mt-6 rounded-full border border-white/40 px-6 py-2 text-sm hover:bg-white/10 transition w-fit'>
              Read More
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1  md:grid-cols-3 gap-6 justify-center'>
          {earthquakes.map((quake) => (
            <Card key={quake.id} quake={quake} />
          ))}
        </div>
      </div>
    </section>
  )
}
