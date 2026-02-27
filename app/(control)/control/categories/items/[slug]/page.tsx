import SuccessToast from '@/components/SuccessToast'
import {
  getALlCategories,
  getItem,
  getSingleArticle,
  updateArticle,
  updateItem,
} from '@/utils/actions'
import Image from 'next/image'
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
  const categories = await getALlCategories()
  const item = await getItem(params.slug)
  const success = searchParams.success

  if (!item) {
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
              Update Item
            </h2>
            <p className='text-sm text-gray-400 mt-2'>
              Fill in the details below
            </p>
            <div className='w-16 h-[2px] bg-green-400 mx-auto mt-4 opacity-70' />

            {success && (
              <SuccessToast
                text='Item Created Successfully'
                url={`/control/categories/items/${params.slug}`}
              />
            )}
          </div>

          <form className='space-y-7' action={updateItem}>
            <input type='hidden' name='id' value={item.id} />
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
                defaultValue={item.slug}
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
                defaultValue={item.title}
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
                defaultValue={item.short_desc}
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
                defaultValue={item.long_desc}
              />
            </div>

            <div>
              <label className='block text-sm text-gray-400 mb-2'>
                Item Image
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

            <div className='h-72 w-72'>
              <Image
                src={item.image}
                width={300}
                height={300}
                alt={item.title}
                className='object-contain '
              />
            </div>

            <div>
              <label className='block text-sm text-gray-400 mb-2'>
                Category
              </label>

              <select
                name='categoryId'
                className='w-full bg-black border border-gray-700 rounded-md px-4 py-3
                  text-white focus:outline-none focus:border-green-400
                  focus:ring-1 focus:ring-green-400 transition'
                required
              >
                <option value=''>Select Category</option>

                {categories.map((cat: any) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    selected={cat.id === item.categoryId}
                  >
                    {cat.title}
                  </option>
                ))}
              </select>
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
