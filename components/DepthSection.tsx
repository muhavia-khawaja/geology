import Image from 'next/image'
import Link from 'next/link'
import { getAllItems } from '@/utils/actions'
import { Layers, Box, ArrowUpRight, Microscope, Info } from 'lucide-react'

export default async function DepthSection() {
  const items = await getAllItems()

  return (
    <section className='bg-rich-black text-white py-32 relative overflow-hidden'>
      <div className='absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#6A1E55_1px,transparent_1px),linear-gradient(to_bottom,#6A1E55_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' />
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-vivid-purple/20 blur-[120px] rounded-full opacity-30 pointer-events-none' />

      <div className='mx-auto max-w-7xl px-6 relative z-10'>
        <div className='mx-auto max-w-3xl text-center mb-24'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full border border-vivid-purple/30 bg-deep-plum/20 mb-6'>
            <Layers className='w-3 h-3 text-rose-dust' />
            <span className='text-[10px] tracking-[0.2em] text-rose-dust font-bold uppercase'>
              Geological Archive
            </span>
          </div>

          <h2 className='text-5xl md:text-6xl font-black mb-6 tracking-tighter'>
            Subterranean{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-vivid-purple to-rose-dust'>
              Specimens
            </span>
          </h2>

          <p className='text-sm text-white/40 leading-relaxed max-w-lg mx-auto'>
            Analyzing the structural integrity and mineral composition of rare
            formations retrieved from the gravestone depths.
          </p>
        </div>

        <div className='grid gap-10 md:grid-cols-3'>
          {items?.map((item: any) => (
            <Link
              key={item.id}
              href={`/explore/${item.slug}`}
              className='group relative'
            >
              <div className='relative z-10 flex flex-col h-full bg-deep-plum/5 backdrop-blur-md border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:border-vivid-purple/50 group-hover:bg-deep-plum/10'>
                <div className='relative h-72 w-full overflow-hidden'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className='object-cover transition-transform duration-1000 group-hover:scale-110'
                  />

                  <div className='absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-transparent opacity-80' />

                  <div className='absolute top-6 left-6 flex items-center gap-2 rounded-full bg-rich-black/60 border border-white/10 px-3 py-1.5 text-[10px] font-bold tracking-wider text-white backdrop-blur-md'>
                    <Box className='w-3 h-3 text-vivid-purple' />
                    {item.category?.title || 'FORMATION'}
                  </div>
                </div>

                <div className='p-8 flex flex-col flex-grow'>
                  <div className='flex justify-between items-start mb-4'>
                    <h3 className='text-2xl font-bold tracking-tight group-hover:text-rose-dust transition-colors'>
                      {item.title}
                    </h3>
                    <div className='p-2 rounded-full bg-white/5 group-hover:bg-vivid-purple/20 transition-colors'>
                      <ArrowUpRight className='w-5 h-5 text-white/30 group-hover:text-rose-dust transition-colors' />
                    </div>
                  </div>

                  <p className='text-xs text-white/40 leading-relaxed line-clamp-3 mb-8'>
                    {item.short_desc}
                  </p>

                  <div className='mt-auto pt-6 border-t border-white/5 flex items-center justify-between'>
                    <div className='flex gap-4'>
                      <div className='flex items-center gap-1.5 text-white/30'>
                        <Microscope className='w-3.5 h-3.5' />
                        <span className='text-[10px] uppercase font-bold tracking-tighter'>
                          Analysis
                        </span>
                      </div>
                      <div className='flex items-center gap-1.5 text-white/30'>
                        <Info className='w-3.5 h-3.5' />
                        <span className='text-[10px] uppercase font-bold tracking-tighter'>
                          Data
                        </span>
                      </div>
                    </div>

                    <span className='text-[10px] font-bold text-vivid-purple opacity-0 group-hover:opacity-100 transition-opacity'>
                      EXPLORE NOW
                    </span>
                  </div>
                </div>
              </div>

              <div className='absolute inset-0 bg-vivid-purple/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] -z-10' />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
