import Image from 'next/image'
import Link from 'next/link'
import { getAllItems } from '@/utils/actions'

export default async function DepthSection() {
  const items = await getAllItems()

  return (
    <section className='bg-black text-white py-32'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='mx-auto max-w-3xl text-center mb-20'>
          <p className='text-xs tracking-widest text-white/50 mb-4'>
            GEOLOGICAL ARCHIVE · CLASSIFIED FORMATIONS
          </p>

          <h2 className='text-4xl md:text-5xl font-semibold mb-6'>
            Explore Geological Specimens
          </h2>

          <p className='text-sm text-white/50 leading-relaxed'>
            A curated collection of geological formations, rock classifications,
            and mineral structures. Examine composition, formation process, and
            structural characteristics.
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-3'>
          {items?.map((item: any) => (
            <Link
              key={item.id}
              href={`/explore/${item.slug}`}
              className='card bg-white/5 backdrop-blur-xl border border-white rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition group'
            >
              <figure className='relative'>
                <div className='relative h-60 w-full overflow-hidden'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                </div>

                <span className='absolute bottom-4 left-4 rounded-full bg-black/60 px-4 py-1 text-xs text-white/70 backdrop-blur'>
                  {item.category?.title || 'GEO FORMATION'}
                </span>
              </figure>

              <div className='card-body'>
                <h3 className='card-title text-xl group-hover:text-primary transition'>
                  {item.title}
                </h3>

                <p className='text-xs text-white/50 leading-relaxed line-clamp-4'>
                  {item.short_desc}
                </p>

                <div className='card-actions mt-4'>
                  <button className='btn  bg-transparent btn-sm rounded-full text-white/70 group-hover:text-white'>
                    Explore specimen
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
