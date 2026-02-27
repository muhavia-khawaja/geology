import SuccessToast from '@/components/SuccessToast'
import { deleteReview, getAllReview } from '@/utils/actions'
import { PenBox, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default async function Page({
  searchParams,
}: {
  searchParams: { success: string }
}) {
  const success = searchParams.success === 'true'
  const reviews = await getAllReview()

  return (
    <div className='bg-[#0f0f0f] min-h-screen '>
      <div className='max-w-7xl mx-auto bg-[#111111] border border-[#1c1c1c]  shadow-[0_0_40px_rgba(34,197,94,0.04)] p-6'>
        <div className=' mb-10'>
          <div>
            <h2 className='text-3xl font-bold text-white tracking-wide'>
              Reviews
            </h2>
            <p className='text-gray-500 text-sm mt-1'>
              Manage and delete user submitted reviews
            </p>
          </div>
        </div>

        {reviews.length === 0 && (
          <div className='text-center py-20 border border-dashed border-[#222] rounded-xl'>
            <h3 className='text-lg font-semibold text-gray-400'>
              No Reviews Yet
            </h3>
            <p className='text-sm text-gray-600 mt-2'>
              Reviews submitted by users will appear here.
            </p>
          </div>
        )}

        {reviews.length > 0 && (
          <>
            <div className='hidden md:block overflow-x-auto rounded-xl border border-[#1a1a1a]'>
              <table className='w-full text-sm'>
                <thead className='bg-[#151515] text-gray-400 uppercase text-xs tracking-wider'>
                  <tr>
                    <th className='px-6 py-4 text-left'>Name / Rating</th>
                    <th className='px-6 py-4 text-left'>Email</th>
                    <th className='px-6 py-4 text-left'>Message</th>
                    <th className='px-6 py-4 text-center'>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {reviews.map((review) => (
                    <tr
                      key={review.id}
                      className='border-t border-[#1a1a1a] hover:bg-[#141414] transition'
                    >
                      <td className='px-6 py-5 text-gray-400'>
                        <div>
                          <p className='text-white font-medium'>
                            {review.name}
                          </p>
                          <p className='text-xs text-gray-500 mt-1'>
                            <div className='rating'>
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`mask mask-star-2 w-3 h-3 opacity-100 ${
                                    i < review.rating
                                      ? 'bg-yellow-400'
                                      : 'bg-gray-500'
                                  }`}
                                />
                              ))}
                            </div>
                          </p>
                        </div>
                      </td>
                      <td className='px-6 py-5 text-gray-400'>
                        {review.email}
                      </td>

                      <td className='px-6 py-5 text-gray-400 max-w-xs truncate'>
                        {review.content}
                      </td>

                      <td className='px-6 py-5 text-center'>
                        <form action={deleteReview}>
                          <input type='hidden' name='id' value={review.id} />
                          <button
                            className='inline-flex items-center gap-2 px-4 py-2 
                                       rounded-lg border border-red-500/40 
                                       text-red-400 hover:bg-red-500/10 
                                       hover:border-red-500 transition'
                          >
                            <Trash2 className='w-4 h-4' />
                            Delete
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='md:hidden space-y-5'>
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className='bg-[#141414] border border-[#1c1c1c] rounded-xl p-5 space-y-3 shadow-sm'
                >
                  <div>
                    <p className='text-white font-semibold'>{review.name}</p>
                    <p className='text-xs text-gray-500'>{review.email}</p>
                  </div>

                  <p className='text-sm text-gray-400'>{review.content}</p>

                  <form action={deleteReview} className='pt-2'>
                    <input type='hidden' name='id' value={review.id} />
                    <button
                      className='w-full flex items-center justify-center gap-2 
                                 px-4 py-2 rounded-lg border border-red-500/40 
                                 text-red-400 hover:bg-red-500/10 
                                 hover:border-red-500 transition'
                    >
                      <Trash2 className='w-4 h-4' />
                      Delete Review
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </>
        )}

        {success && (
          <SuccessToast url='/control/reviews' text='Deleted Successfully!' />
        )}
      </div>
    </div>
  )
}
