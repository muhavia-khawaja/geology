import React from 'react'
import Link from 'next/link'
import {
  getAllArticles,
  getArticleReview,
  getSingleArticle,
} from '@/utils/actions'
import Image from 'next/image'
import {
  Home,
  Calendar,
  Clock,
  Share2,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react'
import parse from 'html-react-parser'
import Reviews from '@/components/Review'

export const revalidate = 0

export default async function Page({ params }: { params: { slug: string } }) {
  const article = await getSingleArticle(params.slug)
  const allArticles = await getAllArticles()

  // Filter out the current article from related posts
  const relatedPosts = allArticles
    .filter((a) => a.slug !== params.slug)
    .slice(0, 3)

  if (!article) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#0A0A0B] px-4'>
        <div className='bg-[#111114] border border-[#6A1E55]/30 rounded-[2rem] shadow-2xl p-12 text-center max-w-md'>
          <ShieldCheck className='mx-auto mb-6 w-16 h-16 text-[#A64D79] animate-pulse' />
          <h2 className='text-3xl font-black text-white mb-4 tracking-tighter uppercase italic'>
            Archive Corrupted
          </h2>
          <p className='text-white/40 mb-8 text-sm leading-relaxed'>
            The intelligence log you are attempting to decrypt does not exist or
            has been redacted from the registry.
          </p>
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 bg-[#6A1E55] hover:bg-[#A64D79] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all'
          >
            <ArrowLeft size={14} /> Back to Feed
          </Link>
        </div>
      </div>
    )
  }

  const reviews = await getArticleReview(article?.id)

  return (
    <div className='min-h-screen bg-[#0A0A0B] text-white selection:bg-[#6A1E55]/30'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#6A1E55]/10 to-transparent pointer-events-none' />

      <div className='relative z-10 max-w-7xl mx-auto px-6 py-24'>
        <div className='mb-12'>
          <Link
            href='/blog'
            className='group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-[#A64D79] transition-colors'
          >
            <ArrowLeft
              size={12}
              className='group-hover:-translate-x-1 transition-transform'
            />
            Back to Intelligence Feed
          </Link>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-16 items-start'>
          <div className='lg:col-span-5 space-y-8 lg:sticky lg:top-24'>
            <div className='relative group'>
              <div className='absolute -inset-1 bg-gradient-to-tr from-[#6A1E55] to-[#A64D79] rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000'></div>
              <Image
                src={article?.image}
                alt={article?.title}
                className='relative w-full aspect-[4/5] object-cover rounded-[2rem] border border-white/10'
                width={800}
                height={1000}
                priority
              />
            </div>

            <div className='grid grid-cols-2 gap-4 p-6 bg-[#111114] border border-white/5 rounded-3xl'>
              <div className='space-y-1'>
                <p className='text-[8px] font-black text-[#A64D79] uppercase tracking-widest'>
                  Published
                </p>
                <div className='flex items-center gap-2 text-xs font-bold text-white/60'>
                  <Calendar size={14} />{' '}
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className='space-y-1'>
                <p className='text-[8px] font-black text-[#A64D79] uppercase tracking-widest'>
                  Read Time
                </p>
                <div className='flex items-center gap-2 text-xs font-bold text-white/60'>
                  <Clock size={14} /> 6 Min Read
                </div>
              </div>
            </div>
          </div>

          <div className='lg:col-span-7 space-y-12'>
            <header className='space-y-6'>
              <h1 className='text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.9]'>
                {article?.title}
                <span className='text-[#6A1E55]'>.</span>
              </h1>

              <p className='text-lg text-white/50 leading-relaxed font-medium italic border-l-4 border-[#6A1E55] pl-6'>
                {article?.short_desc}
              </p>
            </header>

            <div className='prose prose-invert prose-p:text-white/40 prose-p:leading-relaxed prose-headings:text-white prose-headings:tracking-tighter max-w-none'>
              {parse(article.long_desc || '')}
            </div>

            <section className='p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-6'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-[2px] bg-[#6A1E55]' />
                <h2 className='text-xl font-black uppercase tracking-widest'>
                  Strategic Vision
                </h2>
              </div>

              <p className='text-sm text-white/40 leading-relaxed font-medium'>
                Analysis of tectonic shifts requires a forward-thinking approach
                to planetary surveillance and data decryption.
              </p>

              <ul className='space-y-4'>
                {[
                  'Satisfied conveying a dependent contented gentleman',
                  'Warrant private blushes removed an in equally',
                  'Delivered dejection necessary objection',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className='flex items-start gap-4 text-sm text-white/60'
                  >
                    <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-[#A64D79] shadow-[0_0_8px_#A64D79] shrink-0' />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className='pt-10'>
              <Reviews initialReviews={reviews} articleId={article.id} />
            </div>
          </div>
        </div>

        <section className='mt-32 pt-20 border-t border-white/5 space-y-12'>
          <div className='flex items-center justify-between'>
            <h3 className='text-2xl font-black uppercase italic tracking-tighter'>
              Related <span className='text-[#6A1E55]'>Intelligence</span>
            </h3>
            <Link
              href='/blog'
              className='text-[10px] font-black uppercase tracking-widest text-[#A64D79] hover:underline'
            >
              View All Logs
            </Link>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className='group bg-[#111114] border border-white/5 rounded-[2rem] overflow-hidden hover:border-[#6A1E55]/50 transition-all duration-500 hover:-translate-y-2'
              >
                <div className='relative h-48 overflow-hidden'>
                  <Image
                    src={post?.image}
                    alt={post?.title}
                    fill
                    className='object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105'
                  />
                </div>

                <div className='p-6 space-y-3'>
                  <h4 className='text-lg font-bold text-white group-hover:text-[#A64D79] transition-colors leading-tight'>
                    {post.title}
                  </h4>
                  <p className='text-xs text-white/30 line-clamp-2 font-medium'>
                    {post.short_desc}
                  </p>
                  <div className='pt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#6A1E55]'>
                    Read Dossier <ArrowLeft size={12} className='rotate-180' />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
