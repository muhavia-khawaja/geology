import SuccessToast from '@/components/SuccessToast'
import { deleteCategory, getALlCategories } from '@/utils/actions'
import { Pen, PenBox, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams: { success: string }
}) {
  const success = searchParams.success === 'true'
  const categories = await getALlCategories()
  return (
    <div
      className='bg-[#0f0f0f] p-8 rounded-2xl border border-[#1c1c1c] 
             shadow-[0_0_25px_rgba(34,197,94,0.05)] '
    >
      <div className='flex justify-between items-center pr-10 mb-8'>
        <h2 className='text-2xl font-semibold text-white  tracking-wide'>
          Categories
        </h2>

        <Link
          href='/control/categories/create'
          className='border border-primary p-2 rounded-full'
        >
          <PenBox className='w-4 h-4 text-white' />
        </Link>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm table-auto border-collapse'>
          <thead>
            <tr className='text-gray-400 border-b border-gray-800'>
              <th className='pb-4 text-left'>Title</th>
              <th className='pb-4 text-center'>Featured</th>
              <th className='pb-4 text-center'>Action</th>
            </tr>
          </thead>

          {categories.length === 0 && (
            <tbody>
              <tr>
                <td colSpan={3} className='text-center py-10 text-gray-500'>
                  No Categories Yet
                </td>
              </tr>
            </tbody>
          )}

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className='border-b border-[#1a1a1a] hover:bg-[#141414] transition'
              >
                <td className='py-4'>
                  <div className='flex flex-col'>
                    <span className='text-white font-medium'>
                      {category.title}
                    </span>
                    <span className='text-xs text-gray-500 mt-1'>
                      {new Date(category.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </td>

                <td className='py-4 text-center'>
                  {category.featured === true ? (
                    <span className='text-green-400 font-semibold'>Yes</span>
                  ) : (
                    <span className='text-red-400 font-semibold'>No</span>
                  )}
                </td>

                <td className='py-4  flex justify-center items-center gap-3'>
                  <Link href={`/control/categories/${category.id}`}>
                    <button
                      className='flex items-center gap-2 px-4 py-2 rounded-md
                                 border border-green-500/40 text-green-400
                                 hover:bg-green-500/10 hover:border-green-500
                                 transition'
                    >
                      <Pen className='w-4 h-4' />
                    </button>
                  </Link>

                  <form action={deleteCategory}>
                    <input type='hidden' name='id' value={category.id} />
                    <button
                      className='flex items-center justify-center gap-2 px-4 py-2 rounded-md
                             border border-red-500/40 text-red-400
                             hover:bg-red-500/10 hover:border-red-500
                             transition'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {success && (
        <SuccessToast url='/control/categories' text='Deleted Successfully!' />
      )}
    </div>
  )
}
