import SuccessToast from '@/components/SuccessToast'
import { deleteCategory, deleteItem, getAllItems } from '@/utils/actions'
import { Pen, PenBox, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams: { success: string }
}) {
  const success = searchParams.success === 'true'
  const items = await getAllItems()

  return (
    <div
      className='bg-[#0f0f0f] p-8 rounded-2xl border border-[#1c1c1c] 
             shadow-[0_0_25px_rgba(34,197,94,0.05)] '
    >
      <div className='flex justify-between items-center pr-10 mb-8'>
        <h2 className='text-2xl font-semibold text-white  tracking-wide'>
          Items
        </h2>

        <Link
          href='/control/categories/items/create'
          className='border border-primary p-2 rounded-full'
        >
          <PenBox className='w-4 h-4 text-white' />
        </Link>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm table-auto border-collapse'>
          <thead>
            <tr className='text-gray-400 border-b border-gray-800'>
              <th className='pb-4 text-left'>Image</th>
              <th className='pb-4 text-center'>Title</th>
              <th className='pb-4 text-center'>Category</th>
              <th className='pb-4 text-center'>Action</th>
            </tr>
          </thead>

          {items.length === 0 && (
            <tbody>
              <tr>
                <td colSpan={3} className='text-center py-10 text-gray-500'>
                  No items Yet
                </td>
              </tr>
            </tbody>
          )}

          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className='border-b border-[#1a1a1a] hover:bg-[#141414] transition'
              >
                <td className='py-5'>
                  <div className='relative w-14 h-14 rounded-md overflow-hidden border border-gray-700'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className='object-cover'
                    />
                  </div>
                </td>

                <td className='py-4 place-items-center'>
                  <div className='flex flex-col'>
                    <span className='text-white font-medium'>{item.title}</span>
                    <span className='text-xs text-gray-500 mt-1'>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </td>

                <td className='place-items-center text-center'>
                  <span className='text-black font-medium badge badge-soft'>
                    {item.category.title}
                  </span>
                </td>

                <td className='py-4  flex justify-center items-center gap-3'>
                  <Link href={`/control/categories/items/${item.slug}`}>
                    <button
                      className='flex items-center gap-2 px-4 py-2 rounded-md
                                 border border-green-500/40 text-green-400
                                 hover:bg-green-500/10 hover:border-green-500
                                 transition'
                    >
                      <Pen className='w-4 h-4' />
                    </button>
                  </Link>
                  <form action={deleteItem}>
                    <input type='hidden' name='id' value={item.id} />
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
        <SuccessToast
          url='/control/categories/items'
          text='Deleted Successfully!'
        />
      )}
    </div>
  )
}
