import { getAllArticles } from '@/utils/actions'
import Image from 'next/image'
import Link from 'next/link'
import { Activity, BookOpen, Star } from 'lucide-react'

export default async function Articles() {
  const articles = await getAllArticles()

  return (
    <section className='bg-rich-black text-white py-32 relative'>
      <div className='absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-vivid-purple/50 to-transparent' />

      <div className='mx-auto max-w-7xl px-6'>
        <div className='mx-auto max-w-3xl text-center mb-20'>
          <div className='flex justify-center items-center gap-2 mb-6 text-rose-dust'>
            <Activity className='w-4 h-4 animate-pulse' />
            <p className='text-[10px] tracking-[0.4em] font-bold uppercase'>
              Acoustic Intelligence Reports
            </p>
          </div>

          <h2 className='text-4xl md:text-5xl font-black mb-6 tracking-tight'>
            Oceanic <span className='text-vivid-purple'>Dossiers</span>
          </h2>

          <p className='text-sm text-white/40 leading-relaxed max-w-xl mx-auto'>
            This study delves into geoacoustic signal analysis, focusing on
            frequency offset data and sound interference evaluation within a
            48,000 kHz sampling range.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-4'>
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className='group flex flex-col bg-deep-plum/5 border border-vivid-purple/20 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-deep-plum/10 hover:border-rose-dust/40 hover:-translate-y-1 shadow-2xl shadow-black/40'
            >
              <figure className='relative h-52 overflow-hidden'>
                <Image
                  src={article.image}
                  alt={article.title}
                  className='object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1'
                  fill
                />

                <div className='absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-transparent opacity-60' />
                <div className='absolute inset-0 bg-vivid-purple/10 opacity-0 group-hover:opacity-100 transition-opacity' />

                {article.featured === true && (
                  <div className='absolute top-3 right-3 flex items-center gap-1 bg-rose-dust text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-md'>
                    <Star className='w-3 h-3 fill-current' />
                    FEATURED
                  </div>
                )}
              </figure>

              <div className='p-6 flex flex-col flex-grow'>
                <div className='flex items-center gap-2 mb-3'>
                  <BookOpen className='w-3 h-3 text-vivid-purple' />
                  <span className='text-[9px] font-bold text-white/30 tracking-widest uppercase'>
                    Archive_File.dat
                  </span>
                </div>

                <h3 className='text-lg font-bold leading-tight mb-4 group-hover:text-rose-dust transition-colors'>
                  {article.title.length > 60
                    ? article.title.slice(0, 60) + '...'
                    : article.title}
                </h3>

                <p className='text-[11px] text-white/40 leading-relaxed line-clamp-3 mb-6'>
                  {article.short_desc}
                </p>

                <div className='mt-auto pt-4 border-t border-white/5 flex justify-between items-center'>
                  <div className='h-1 w-12 bg-vivid-purple/30 rounded-full overflow-hidden'>
                    <div className='h-full bg-rose-dust w-1/2 group-hover:w-full transition-all duration-700' />
                  </div>
                  <span className='text-[10px] font-mono text-white/20 uppercase tracking-tighter'>
                    Freq_Off: 0.314
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
