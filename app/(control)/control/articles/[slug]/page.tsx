import SuccessToast from '@/components/SuccessToast'
import { getSingleArticle, updateArticle } from '@/utils/actions'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  params: {
    slug: string
  }
  searchParams: {
    success?: string
  }
}

export default async function page({ params, searchParams }: Props) {
  const article = await getSingleArticle(params.slug)
  const success = searchParams.success

  if (!article) {
    return notFound()
  }

  return (
    <div className='min-h-screen bg-black flex items-center justify-center px-6'>
      <div className='w-full max-w-3xl'>
        <div
          className='bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-10
                          shadow-[0_0_20px_rgba(34,197,94,0.08)]'
        >
          <div className='mb-10 text-center'>
            <h2 className='text-3xl font-bold text-white tracking-wide'>
              Update Article
            </h2>
            <p className='text-sm text-gray-400 mt-2'>
              Fill in the details below
            </p>
            <div className='w-16 h-[2px] bg-green-400 mx-auto mt-4 opacity-70' />

            {success && (
              <SuccessToast
                url={`/control/articles/${params.slug}`}
                text='Updated Successfully!'
              />
            )}
          </div>

          <form className='space-y-7' action={updateArticle}>
            <input type='hidden' name='id' value={article.id} />
            <div>
              <label className='block text-sm text-gray-400 mb-2'>Slug</label>
              <input
                type='text'
                placeholder='article-slug'
                className='w-full bg-black border border-gray-700 rounded-md px-4 py-3
                             text-white placeholder-gray-500
                             focus:outline-none focus:border-green-400
                             focus:ring-1 focus:ring-green-400 transition'
                name='slug'
                defaultValue={article.slug}
              />
            </div>

            <div>
              <label className='block text-sm text-gray-400 mb-2'>Title</label>
              <input
                type='text'
                placeholder='Enter article title'
                className='w-full bg-black border border-gray-700 rounded-md px-4 py-3
                             text-white placeholder-gray-500
                             focus:outline-none focus:border-green-400
                             focus:ring-1 focus:ring-green-400 transition'
                name='title'
                defaultValue={article.title}
              />
            </div>

            <div>
              <label className='block text-sm text-gray-400 mb-2'>
                Short Description
              </label>
              <textarea
                rows={3}
                placeholder='Brief description...'
                name='short_desc'
                className='w-full bg-black border border-gray-700 rounded-md px-4 py-3
                             text-white placeholder-gray-500
                             focus:outline-none focus:border-green-400
                             focus:ring-1 focus:ring-green-400 transition'
                defaultValue={article.short_desc}
              />
            </div>

            <div>
              <label className='block text-sm text-gray-400 mb-2'>
                Long Description
              </label>
              <textarea
                rows={6}
                placeholder='Full article content...'
                name='long_desc'
                className='w-full bg-black border border-gray-700 rounded-md px-4 py-3
                             text-white placeholder-gray-500
                             focus:outline-none focus:border-green-400
                             focus:ring-1 focus:ring-green-400 transition'
                defaultValue={article.long_desc}
              />
            </div>

            <div>
              <label className='block text-sm text-gray-400 mb-2'>
                Article Image
              </label>
              <input
                type='file'
                name='image'
                className='w-full text-sm text-gray-400
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-md file:border-0
                             file:bg-green-500/10 file:text-green-400
                             hover:file:bg-green-500/20
                             file:transition'
              />
            </div>

            <div>
              <img src={article.image} alt={article.title} />
            </div>

            <div className='form-control w-full max-w-xs'>
              <label className='label cursor-pointer'>
                <span className='label-text text-gray-400'>
                  Featured Article
                </span>

                <input
                  type='checkbox'
                  name='featured'
                  className='checkbox checkbox-primary'
                  defaultChecked={article.featured}
                />
              </label>
            </div>

            <div className='flex justify-end gap-4 pt-6'>
              <button
                type='submit'
                className='px-6 py-2 rounded-md bg-green-500/90 text-black font-semibold
                             hover:bg-green-400 transition
                             shadow-[0_0_12px_rgba(34,197,94,0.25)]'
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
