import React from 'react'
import Link from 'next/link'
import {
  getAllArticles,
  getArticleReview,
  getSingleArticle,
} from '@/utils/actions'
import Image from 'next/image'
import { Home } from 'lucide-react'
import parse from 'html-react-parser'
import Reviews from '@/components/Review'

// const relatedPosts = [
//   {
//     slug: 'ethiopian-opal',
//     title: 'Ethiopian Opal',
//     image:
//       'https://thumbs.dreamstime.com/b/blog-icon-dark-background-simple-vector-116865750.jpg',
//   },
//   {
//     slug: 'volcanic-minerals',
//     title: 'Volcanic Minerals',
//     image:
//       'https://thumbs.dreamstime.com/b/blog-icon-dark-background-simple-vector-116865750.jpg',
//   },
//   {
//     slug: 'gemstone-origins',
//     title: 'Gemstone Origins',
//     image:
//       'https://thumbs.dreamstime.com/b/blog-icon-dark-background-simple-vector-116865750.jpg',
//   },
// ]

export const revalidate = 0

export default async function Page({ params }: { params: { slug: string } }) {
  const article = await getSingleArticle(params.slug)
  const relatedPosts = await getAllArticles()

  if (!article) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black px-4'>
        <div className='bg-black border border-gray-700 rounded-2xl shadow-lg p-12 text-center max-w-md'>
          <Home className='mx-auto mb-6 w-12 h-12 text-green-400 animate-bounce' />
          <h2 className='text-3xl font-bold text-white mb-4'>
            No Blog Post Found
          </h2>
          <p className='text-gray-400 mb-6'>
            Sorry, we couldn’t find the blog post you’re looking for. It may
            have been removed or the URL is incorrect.
          </p>
          <Link href='/' className='btn btn-outline btn-success'>
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }
  const reviews = await getArticleReview(article?.id)

  return (
    <div className='min-h-screen bg-black text-neutral-content py-10'>
      <div className='max-w-7xl mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24'>
          <div className='relative lg:sticky lg:top-24'>
            <Image
              src={article?.image}
              alt={article?.title}
              className='w-full max-h-[520px] object-cover rounded-2xl'
              width={100}
              height={520}
            />
          </div>

          <article className='space-y-10'>
            <section className='space-y-4'>
              <h1 className='text-4xl font-bold capitalize'>
                {article?.title}
              </h1>

              <p className='text-sm text-neutral-400 leading-relaxed'>
                {article?.short_desc}
              </p>

              <blockquote className='prose prose-invert border-l-2 border-primary pl-6'>
                {parse(article.long_desc || '')}
              </blockquote>
            </section>

            <section className='space-y-4'>
              <h2 className='text-2xl font-semibold'>Vision</h2>

              <p className='text-sm text-neutral-400'>
                Demesne far hearted suppose venture excited see had has.
              </p>

              <ul className='list-disc list-inside space-y-2 text-sm text-neutral-300'>
                <li>Satisfied conveying a dependent contented gentleman</li>
                <li>Warrant private blushes removed an in equally</li>
                <li>Delivered dejection necessary objection</li>
              </ul>
            </section>
          </article>
        </div>

        <Reviews initialReviews={reviews} articleId={article.id} />

        <section className='space-y-10'>
          <h3 className='text-2xl font-semibold'>Related Posts</h3>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className='group block'
              >
                <div className='card bg-neutral shadow-xl overflow-hidden'>
                  <figure>
                    <Image
                      src={post?.image}
                      alt={post?.title}
                      className='h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                      width={100}
                      height={520}
                    />
                  </figure>

                  <div className='card-body'>
                    <h4 className='card-title text-lg'>{post.title}</h4>
                    <p>{post.short_desc.substring(0, 120) + '...'}</p>
                    <p className='text-sm text-neutral-400 mt-2'>Read more →</p>
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
