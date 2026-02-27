import { getAllArticles, getFeaturedArticles } from '@/utils/actions'
import Link from 'next/link'
import Image from 'next/image'

export default async function Page() {
  const articles = await getAllArticles()
  const featuredArticles = await getFeaturedArticles()

  return (
    <div className='py-20 max-w-7xl mx-auto px-6'>
      {/* Header */}
      <div className='mx-auto max-w-3xl text-center mb-20'>
        <p className='text-xs tracking-widest text-white/50 mb-4'>
          Ready for such depths?
        </p>

        <h2 className='text-4xl md:text-5xl font-semibold mb-6 text-white'>
          Latest Articles
        </h2>

        <p className='text-sm text-white/50 leading-relaxed'>
          Discover our most recent insights and research articles.
        </p>
      </div>

      <div className='grid gap-8 md:grid-cols-4'>
        {articles.slice(0, 4).map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.slug}`}
            className='card bg-white/5 backdrop-blur-xl border border-white/10 
                       rounded-2xl shadow-xl hover:shadow-2xl 
                       hover:-translate-y-1 transition duration-300'
          >
            <figure className='relative h-56 w-full'>
              <Image
                src={article.image}
                alt={article.title}
                fill
                className='object-cover rounded-t-2xl'
              />
            </figure>

            <div className='card-body'>
              <p className='text-xs text-white/40'>
                {new Date(article.createdAt).toLocaleDateString()}
              </p>

              <h3 className='card-title text-lg text-white'>{article.title}</h3>

              <p className='text-xs text-white/50 leading-relaxed line-clamp-3'>
                {article.short_desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {featuredArticles.length > 0 && (
        <>
          <div className='my-20'>
            <h2 className='text-3xl font-semibold text-white'>Featured Blog</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
            {featuredArticles.slice(0, 2).map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className='group bg-white/5 backdrop-blur-xl
                 border border-white/10 rounded-2xl
                 overflow-hidden
                 hover:border-white/20
                 hover:shadow-2xl hover:shadow-black/30
                 transition-all duration-300'
              >
                <div className='flex flex-col md:flex-row h-full'>
                  {/* Image */}
                  <figure className='relative w-full md:w-72 h-56 md:h-auto shrink-0'>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className='object-cover transition-transform duration-500 
                       group-hover:scale-105'
                    />
                  </figure>

                  {/* Content */}
                  <div className='flex flex-col justify-between p-5 flex-1'>
                    <div className='space-y-3'>
                      <p className='text-xs text-white/40 tracking-wide'>
                        {new Date(article.createdAt).toLocaleDateString()}
                      </p>

                      <h3
                        className='text-lg md:text-xl font-semibold text-white 
                           group-hover:text-primary transition'
                      >
                        {article.title}
                      </h3>

                      <p className='text-sm text-white/60 line-clamp-3'>
                        {article.short_desc}
                      </p>
                    </div>

                    <div className='pt-4'>
                      <span
                        className='inline-flex items-center text-sm font-medium
                             text-primary group-hover:underline'
                      >
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
