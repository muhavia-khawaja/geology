import SuccessToast from '@/components/SuccessToast'
import { deleteCategory, getALlCategories } from '@/utils/actions'
import { Pen, PenBox, Trash2, FolderTree, ShieldCheck, ShieldAlert, Layers } from 'lucide-react'
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
    <div className='bg-[#0D0D0F] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in duration-700'>
      {/* --- HEADER --- */}
      <div className='p-8 pb-0 flex justify-between items-end'>
        <div>
          <h2 className='text-3xl font-black italic text-white tracking-tighter uppercase'>
            Data <span className='text-[#6A1E55]'>Sectors</span>
          </h2>
          <p className='text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-2'>
            Classification Registry // Primary Folders
          </p>
        </div>

        <Link
          href='/control/categories/create'
          className='flex items-center gap-3 bg-[#6A1E55] hover:bg-[#A64D79] text-white px-6 py-3 rounded-2xl transition-all group shadow-lg shadow-[#6A1E55]/20'
        >
          <span className='text-[10px] font-black uppercase tracking-widest'>Create Sector</span>
          <PenBox className='w-4 h-4 group-hover:rotate-12 transition-transform' />
        </Link>
      </div>

      <div className='p-8'>
        <div className='overflow-x-auto'>
          <table className='w-full border-separate border-spacing-y-2'>
            <thead>
              <tr className='text-[10px] font-black text-white/20 uppercase tracking-[0.3em]'>
                <th className='px-6 pb-4 text-left'>Sector_Identity</th>
                <th className='px-6 pb-4 text-center'>Priority_Protocol</th>
                <th className='px-6 pb-4 text-center'>Access_Nodes</th>
              </tr>
            </thead>

            {categories.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={3} className='text-center py-20 bg-white/[0.01] rounded-3xl border border-dashed border-white/10'>
                    <Layers className='w-10 h-10 text-white/5 mx-auto mb-4' />
                    <p className='text-[10px] font-black text-white/20 uppercase tracking-[0.5em]'>
                      No data sectors initialized
                    </p>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className='group bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300'
                  >
                    {/* Title & Metadata */}
                    <td className='py-4 px-6 first:rounded-l-3xl border-l border-y border-white/5 group-hover:border-[#6A1E55]/30 transition-colors'>
                      <div className='flex items-center gap-4'>
                        <div className='p-3 bg-white/5 rounded-xl text-white/20 group-hover:text-[#6A1E55] transition-colors'>
                          <FolderTree size={18} />
                        </div>
                        <div className='flex flex-col'>
                          <span className='text-sm font-bold text-white tracking-tight group-hover:text-[#A64D79] transition-colors'>
                            {category.title}
                          </span>
                          <span className='text-[9px] font-mono text-white/20 uppercase mt-1 tracking-tighter'>
                            Created: {new Date(category.createdAt).toISOString().split('T')[0]}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Featured Status */}
                    <td className='px-6 text-center border-y border-white/5 group-hover:border-[#6A1E55]/30 transition-colors'>
                      {category.featured ? (
                        <div className='inline-flex items-center gap-2 px-3 py-1 bg-[#6A1E55]/10 border border-[#6A1E55]/30 rounded-full'>
                           <ShieldCheck size={10} className='text-[#A64D79]' />
                           <span className='text-[9px] font-black text-[#A64D79] uppercase tracking-widest'>Active</span>
                        </div>
                      ) : (
                        <div className='inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full'>
                           <ShieldAlert size={10} className='text-white/20' />
                           <span className='text-[9px] font-black text-white/20 uppercase tracking-widest'>Idle</span>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className='px-6 text-center last:rounded-r-3xl border-r border-y border-white/5 group-hover:border-[#6A1E55]/30 transition-colors'>
                      <div className='flex items-center justify-center gap-3'>
                        <Link href={`/control/categories/${category.id}`}>
                          <button className='p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white hover:border-[#6A1E55] hover:bg-[#6A1E55]/10 transition-all'>
                            <Pen size={14} />
                          </button>
                        </Link>

                        <form action={deleteCategory}>
                          <input type='hidden' name='id' value={category.id} />
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
        <SuccessToast url='/control/categories' text='Sector Purged from Registry' />
      )}
    </div>
  )
}