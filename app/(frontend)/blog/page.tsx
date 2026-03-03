import { getAllArticles, getFeaturedArticles } from '@/utils/actions'
import Link from 'next/link'
import Image from 'next/image'
import { Terminal, Newspaper, ArrowRight, Activity } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Latest Insights - Gravestone',
  description:
    "Access decrypted research logs, tectonic shift analysis, and recent seismic findings from the global registry. Stay informed with Gravestone's latest geological intelligence and insights.",
  keywords:
    'geology insights, seismic findings, tectonic shift analysis, geological intelligence, research logs, geology news, earth science updates, geology articles',
}

export default async function Page() {
  const articles = await getAllArticles()
  const featuredArticles = await getFeaturedArticles()

  return (
    <div className='relative min-h-screen bg-[#0A0A0B] py-24 px-6 selection:bg-[#6A1E55]/30'>
      <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-[#6A1E55]/5 blur-[120px] rounded-full pointer-events-none' />

      <header className='relative z-10 mx-auto max-w-3xl text-center mb-24'>
        <div className='flex items-center justify-center gap-3 mb-6'>
          <div className='h-px w-12 bg-[#6A1E55]' />
          <p className='text-[10px] font-black tracking-[0.5em] uppercase text-[#A64D79]'>
            Deep Sea Archives
          </p>
          <div className='h-px w-12 bg-[#6A1E55]' />
        </div>

        <h1 className='text-5xl md:text-7xl font-black mb-8 text-white uppercase italic tracking-tighter'>
          Latest <span className='text-[#6A1E55]'>Insights.</span>
        </h1>

        <p className='text-sm text-white/30 leading-relaxed font-medium max-w-xl mx-auto'>
          Access decrypted research logs, tectonic shift analysis, and recent
          seismic findings from the global registry.
        </p>
      </header>

      <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-32'>
        {articles.slice(0, 4).map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.slug}`}
            className='group relative bg-[#111114] border border-white/5 
                       rounded-3xl overflow-hidden hover:border-[#6A1E55]/50 
                       transition-all duration-500 hover:-translate-y-2'
          >
            <figure className='relative h-48 w-full overflow-hidden'>
              <Image
                src={article.image}
                alt={article.title}
                fill
                className='object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent' />
            </figure>

            <div className='p-6 space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-[9px] font-black text-[#A64D79] uppercase tracking-widest'>
                  Log #{article.id.slice(0, 4)}
                </span>
                <p className='text-[10px] font-mono text-white/20'>
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>

              <h3 className='text-lg font-bold text-white leading-tight group-hover:text-[#A64D79] transition-colors'>
                {article.title}
              </h3>

              <p className='text-xs text-white/40 leading-relaxed line-clamp-3 font-medium'>
                {article.short_desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {featuredArticles.length > 0 && (
        <section className='relative'>
          <div className='flex items-center gap-4 mb-12'>
            <Activity className='text-[#6A1E55] animate-pulse' size={20} />
            <h2 className='text-2xl font-black uppercase italic tracking-tighter text-white'>
              Priority Broadcasts
            </h2>
            <div className='h-px flex-1 bg-gradient-to-r from-white/10 to-transparent' />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {featuredArticles.slice(0, 2).map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className='group relative bg-[#111114] border border-[#6A1E55]/20 rounded-[2.5rem]
                           overflow-hidden hover:border-[#6A1E55] transition-all duration-500 shadow-2xl'
              >
                <div className='flex flex-col lg:flex-row h-full'>
                  <figure className='relative w-full lg:w-64 h-64 lg:h-auto shrink-0'>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className='object-cover transition-transform duration-700 
                                 group-hover:scale-105 grayscale group-hover:grayscale-0'
                    />
                    <div className='absolute inset-0 bg-gradient-to-r from-[#111114] via-transparent to-transparent hidden lg:block' />
                  </figure>

                  <div className='flex flex-col justify-between p-8 flex-1'>
                    <div className='space-y-4'>
                      <div className='flex items-center gap-2'>
                        <Terminal size={12} className='text-[#A64D79]' />
                        <p className='text-[10px] font-black text-white/30 uppercase tracking-[0.3em]'>
                          Featured Intelligence
                        </p>
                      </div>

                      <h3 className='text-2xl font-bold text-white group-hover:text-[#A64D79] transition-colors tracking-tight'>
                        {article.title}
                      </h3>

                      <p className='text-sm text-white/40 leading-relaxed font-medium line-clamp-3'>
                        {article.short_desc}
                      </p>
                    </div>

                    <div className='pt-8'>
                      <span className='inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#6A1E55] group-hover:text-[#A64D79] transition-all'>
                        Decrypt Full Report{' '}
                        <ArrowRight
                          size={14}
                          className='group-hover:translate-x-2 transition-transform'
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
