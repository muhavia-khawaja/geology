import { getAllArticles } from '@/utils/actions'
import Image from 'next/image'
import Link from 'next/link'

export default async function Articles() {
  const articles = await getAllArticles()
  return (
    <section className='bg-black text-white py-32'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='mx-auto max-w-3xl text-center mb-20'>
          <p className='text-xs tracking-widest text-white/50 mb-4 uppercase'>
            Curious About the sounds of the ocean floor? let&apos;s dive in.
          </p>

          <h2 className='text-4xl md:text-5xl font-semibold mb-6 capitalize'>
            Are You prepared to explore the ocean depths?
          </h2>

          <p className='text-sm text-white/50 leading-relaxed'>
            This Study delves into geoacoustic signal analysis, focusing on
            frequency offset data, sound interference evaluation, and setting a
            sampling frequency of 48,000 kHz with an offset index of 0.314.
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-4'>
          {articles.map((article) => {
            return (
              <Link
                className='card bg-white/5 backdrop-blur-xl border border-white rounded-2xl shadow-xl hover:shadow-2xl transition'
                key={article.id}
                href={`/blog/${article.slug}`}
              >
                <figure className='relative h-60'>
                  <Image
                    src={article.image}
                    alt={article.title}
                    className='h-56 w-full object-cover'
                    fill
                  />
                  {article.featured === true && (
                    <span className='absolute top-3 right-3 bg-green-300 text-black text-xs px-2 py-1 rounded-full backdrop-blur'>
                      Featured
                    </span>
                  )}
                </figure>

                <div className='card-body'>
                  <h3 className='card-title text-xl'>
                    {article.title.slice(0, 90) + '...'}
                  </h3>

                  <p className='text-xs text-white/50 leading-relaxed'>
                    {article.short_desc.slice(0, 155) + '...'}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
