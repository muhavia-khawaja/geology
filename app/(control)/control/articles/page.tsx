import SuccessToast from '@/components/SuccessToast'
import { deleteArticle, getAllArticles } from '@/utils/actions'
import { Pen, PenBox, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page({
  searchParams,
}: {
  searchParams: { success: string }
}) {
  const success = searchParams.success === 'true'
  const articles = await getAllArticles()

  return (
    <div
      className='bg-[#0f0f0f] p-8 rounded-2xl border border-[#1c1c1c] 
                    shadow-[0_0_25px_rgba(34,197,94,0.05)]'
    >
      <div className='flex justify-between items-center pr-10 mb-8'>
        <h2 className='text-2xl font-semibold text-white  tracking-wide'>
          Articles
        </h2>

        <Link
          href='/control/articles/create'
          className='border border-primary p-2 rounded-full'
        >
          <PenBox className='w-4 h-4 text-white' />
        </Link>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='text-gray-500 border-b border-gray-800'>
              <th className='pb-4 text-left'>Image</th>
              <th className='pb-4 text-left'>Title</th>
              <th className='pb-4 text-left'>Featured</th>
              <th className='pb-4 text-left'>Slug</th>
              <th className='pb-4 text-center'>Action</th>
            </tr>
          </thead>

          {articles.length === 0 && (
            <tbody>
              <tr>
                <td colSpan={4} className='text-center py-10 text-gray-500'>
                  No Articles Yet
                </td>
              </tr>
            </tbody>
          )}

          <tbody>
            {articles.map((article) => (
              <tr
                key={article.id}
                className='border-b border-[#1a1a1a] hover:bg-[#141414] transition'
              >
                <td className='py-5'>
                  <div className='relative w-14 h-14 rounded-md overflow-hidden border border-gray-700'>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className='object-cover'
                    />
                  </div>
                </td>

                <td>
                  <div>
                    <p className='text-white font-medium'>{article.title}</p>
                    <p className='text-xs text-gray-500 mt-1'>
                      {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </td>

                <td className='py-4 '>
                  {article.featured === true ? (
                    <span className='text-green-400 font-semibold'>Yes</span>
                  ) : (
                    <span className='text-red-400 font-semibold'>No</span>
                  )}
                </td>

                <td className='py-5   text-gray-400'>{article.slug}</td>

                <td className='py-5 text-center flex items-center gap-3 justify-center'>
                  <Link href={`/control/articles/${article.slug}`}>
                    <button
                      className='flex items-center gap-2 px-4 py-2 rounded-md
                                 border border-green-500/40 text-green-400
                                 hover:bg-green-500/10 hover:border-green-500
                                 transition'
                    >
                      <Pen className='w-4 h-4' />
                    </button>
                  </Link>

                  <form action={deleteArticle}>
                    <input type='hidden' name='id' value={article.id} />
                    <button
                      className='flex items-center gap-2 px-4 py-2 rounded-md
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
        <SuccessToast url='/control/articles' text='Deleted Successfully!' />
      )}
    </div>
  )
}
