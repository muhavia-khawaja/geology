import SuccessToast from '@/components/SuccessToast'
import { deleteReview, getAllReview } from '@/utils/actions'
import {
  Trash2,
  MessageSquare,
  Star,
  Mail,
  User,
  ShieldAlert,
  Activity,
} from 'lucide-react'
import React from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams: { success: string }
}) {
  const success = searchParams.success === 'true'
  const reviews = await getAllReview()

  return (
    <div className='max-w-6xl mx-auto pb-20 animate-in fade-in duration-700'>
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
        <div>
          <h2 className='text-3xl font-black italic text-white tracking-tighter uppercase'>
            Sentiment_<span className='text-[#6A1E55]'>Monitor</span>
          </h2>
          <p className='text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-2 flex items-center gap-2'>
            <Activity size={12} className='text-[#6A1E55] animate-pulse' />
            Live Public Feedback Feed // Audit Required
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className='bg-[#0D0D0F] border border-white/5 rounded-[3rem] py-32 text-center'>
          <MessageSquare className='w-12 h-12 text-white/5 mx-auto mb-6' />
          <h3 className='text-[10px] font-black text-white/20 uppercase tracking-[0.5em]'>
            No Active Transmissions Detected
          </h3>
        </div>
      ) : (
        <>
          <div className='hidden md:block bg-[#0D0D0F] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='text-[10px] font-black text-white/20 uppercase tracking-[0.3em] border-b border-white/5'>
                  <th className='px-8 py-6 text-left'>Source_Entity</th>
                  <th className='px-8 py-6 text-left'>Contact_Protocol</th>
                  <th className='px-8 py-6 text-left'>Transmission_Data</th>
                  <th className='px-8 py-6 text-right'>System_Purge</th>
                </tr>
              </thead>

              <tbody className='divide-y divide-white/[0.03]'>
                {reviews.map((review) => (
                  <tr
                    key={review.id}
                    className='group hover:bg-white/[0.02] transition-colors'
                  >
                    <td className='px-8 py-6'>
                      <div className='flex items-center gap-4'>
                        <div className='p-3 bg-white/5 rounded-xl border border-white/5 text-white/40 group-hover:text-[#6A1E55] group-hover:border-[#6A1E55]/30 transition-all'>
                          <User size={16} />
                        </div>
                        <div>
                          <p className='text-sm font-bold text-white group-hover:text-[#A64D79] transition-colors'>
                            {review.name}
                          </p>
                          <div className='flex items-center gap-0.5 mt-1'>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={10}
                                fill={
                                  i < review.rating ? '#A64D79' : 'transparent'
                                }
                                className={
                                  i < review.rating
                                    ? 'text-[#A64D79]'
                                    : 'text-white/10'
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className='px-8 py-6'>
                      <div className='flex items-center gap-2 text-white/40 font-mono text-[10px]'>
                        <Mail size={12} className='text-[#6A1E55]' />
                        {review.email}
                      </div>
                    </td>

                    <td className='px-8 py-6'>
                      <p className='text-[11px] leading-relaxed text-white/60 max-w-xs line-clamp-2 italic'>
                        {review.content}
                      </p>
                    </td>

                    <td className='px-8 py-6'>
                      <div className='flex justify-end'>
                        <form action={deleteReview}>
                          <input type='hidden' name='id' value={review.id} />
                          <button className='p-3 bg-white/5 border border-white/10 rounded-xl text-white/20 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition-all group/del'>
                            <Trash2
                              size={16}
                              className='group-hover/del:scale-110 transition-transform'
                            />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='md:hidden space-y-4'>
            {reviews.map((review) => (
              <div
                key={review.id}
                className='bg-[#0D0D0F] border border-white/5 rounded-3xl p-6 space-y-4'
              >
                <div className='flex justify-between items-start'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-white/5 rounded-lg text-[#6A1E55]'>
                      <User size={14} />
                    </div>
                    <div>
                      <h4 className='text-xs font-bold text-white uppercase tracking-wider'>
                        {review.name}
                      </h4>
                      <div className='flex items-center gap-0.5 mt-1'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={8}
                            fill={i < review.rating ? '#A64D79' : 'transparent'}
                            className='text-[#A64D79]'
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <form action={deleteReview}>
                    <input type='hidden' name='id' value={review.id} />
                    <button className='p-2 text-white/20 hover:text-red-500 transition-colors'>
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>

                <div className='bg-black/40 rounded-2xl p-4 border border-white/5'>
                  <p className='text-xs text-white/50 leading-relaxed italic line-clamp-4'>
                    {review.content}
                  </p>
                </div>

                <div className='flex items-center gap-2 text-[10px] font-mono text-white/20'>
                  <Mail size={10} />
                  {review.email}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className='mt-10 pt-8 border-t border-white/5 flex items-center justify-between'>
        <div className='flex items-center gap-4 text-white/10'>
          <ShieldAlert size={14} />
          <span className='text-[8px] font-black uppercase tracking-[0.3em]'>
            System Audit: Operational
          </span>
        </div>
      </div>

      {success && (
        <SuccessToast
          url='/control/reviews'
          text='Transmission Purged Successfully'
        />
      )}
    </div>
  )
}
