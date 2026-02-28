import SuccessToast from '@/components/SuccessToast'
import { deleteArticle, getAllArticles } from '@/utils/actions'
import { Pen, PenBox, Trash2, Globe, ShieldCheck, ShieldAlert, Hash } from 'lucide-react'
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
    <div className='bg-[#0D0D0F] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl'>
      
      <div className='p-8 pb-0 flex justify-between items-end'>
        <div>
          <h2 className='text-3xl font-black italic text-white tracking-tighter uppercase'>
            Intelligence <span className='text-[#6A1E55]'>Logs</span>
          </h2>
          <p className='text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-2'>
            Registry Database // Sub-surface Articles
          </p>
        </div>

        <Link
          href='/control/articles/create'
          className='flex items-center gap-3 bg-[#6A1E55] hover:bg-[#A64D79] text-white px-6 py-3 rounded-2xl transition-all group shadow-lg shadow-[#6A1E55]/20'
        >
          <span className='text-[10px] font-black uppercase tracking-widest'>Initialize New Log</span>
          <PenBox className='w-4 h-4 group-hover:rotate-12 transition-transform' />
        </Link>
      </div>

      <div className='p-8'>
        <div className='overflow-x-auto'>
          <table className='w-full border-separate border-spacing-y-3'>
            <thead>
              <tr className='text-[10px] font-black text-white/20 uppercase tracking-[0.3em]'>
                <th className='px-4 pb-4 text-left font-black'>Visual_ID</th>
                <th className='px-4 pb-4 text-left font-black'>Log_Title</th>
                <th className='px-4 pb-4 text-left font-black'>Status</th>
                <th className='px-4 pb-4 text-left font-black'>Data_Link</th>
                <th className='px-4 pb-4 text-center font-black'>Protocols</th>
              </tr>
            </thead>

            {articles.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={5} className='text-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10'>
                    <p className='text-[10px] font-black text-white/20 uppercase tracking-[0.5em] animate-pulse'>
                      No data streams detected in registry
                    </p>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className='group bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-white/5'
                  >
                    
                    <td className='py-4 px-4 first:rounded-l-3xl'>
                      <div className='relative w-16 h-12 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#6A1E55]/50 transition-colors'>
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className='object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
                        />
                      </div>
                    </td>

                    
                    <td className='px-4'>
                      <div className='flex flex-col'>
                        <p className='text-sm font-bold text-white tracking-tight group-hover:text-[#A64D79] transition-colors'>
                          {article.title}
                        </p>
                        <div className='flex items-center gap-2 mt-1'>
                           <Globe size={10} className='text-white/20' />
                           <p className='text-[9px] font-mono text-white/30 uppercase tracking-tighter'>
                             {new Date(article.createdAt).toISOString().split('T')[0]} | {article.slug}
                           </p>
                        </div>
                      </div>
                    </td>

                    
                    <td className='px-4'>
                      {article.featured ? (
                        <div className='inline-flex items-center gap-2 px-3 py-1 bg-[#6A1E55]/10 border border-[#6A1E55]/30 rounded-full'>
                           <ShieldCheck size={10} className='text-[#A64D79]' />
                           <span className='text-[9px] font-black text-[#A64D79] uppercase tracking-widest'>Priority</span>
                        </div>
                      ) : (
                        <div className='inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full'>
                           <ShieldAlert size={10} className='text-white/20' />
                           <span className='text-[9px] font-black text-white/20 uppercase tracking-widest'>Standard</span>
                        </div>
                      )}
                    </td>

                    
                    <td className='px-4'>
                      <div className='flex items-center gap-2 text-white/40'>
                        <Hash size={12} className='text-[#6A1E55]' />
                        <span className='text-[10px] font-mono lowercase'>{article.slug}</span>
                      </div>
                    </td>

                    
                    <td className='px-4 text-center last:rounded-r-3xl'>
                      <div className='flex items-center justify-center gap-2'>
                        <Link href={`/control/articles/${article.slug}`}>
                          <button className='p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white hover:border-[#6A1E55] hover:bg-[#6A1E55]/10 transition-all'>
                            <Pen size={14} />
                          </button>
                        </Link>

                        <form action={deleteArticle}>
                          <input type='hidden' name='id' value={article.id} />
                          <button className='p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition-all'>
                            <Trash2 size={14} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {success && (
        <SuccessToast url='/control/articles' text='Log Purged Successfully' />
      )}
    </div>
  )
}