import SuccessToast from '@/components/SuccessToast'
import { deleteSubItem, getAllSubItems } from '@/utils/actions'
import {
  Pen,
  PenBox,
  Trash2,
  Layers,
  Calendar,
  Link as LinkIcon,
  Database,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams: { success: string }
}) {
  const success = searchParams.success === 'true'
  const items = await getAllSubItems()

  return (
    <div className='max-w-6xl mx-auto animate-in fade-in duration-700'>
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10'>
        <div>
          <h2 className='text-3xl font-black italic text-white tracking-tighter uppercase'>
            Sub_<span className='text-[#6A1E55]'>Registry</span>
          </h2>
          <p className='text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-2'>
            Deep-Level Intelligence // Granular Data Nodes
          </p>
        </div>

        <Link
          href='/control/sub-items/create'
          className='flex items-center gap-3 bg-white/5 border border-white/10 hover:border-[#6A1E55] hover:bg-[#6A1E55]/10 text-white px-6 py-3 rounded-2xl transition-all group'
        >
          <span className='text-[10px] font-black uppercase tracking-widest'>
            Initialize Sub-Node
          </span>
          <PenBox className='w-4 h-4 text-[#6A1E55] group-hover:scale-110 transition-transform' />
        </Link>
      </div>

      <div className='bg-[#0D0D0F] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl'>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='text-[10px] font-black text-white/20 uppercase tracking-[0.3em] border-b border-white/5'>
                <th className='px-8 py-6 text-left'>Asset_Preview</th>
                <th className='px-8 py-6 text-left'>Node_Identity</th>
                <th className='px-8 py-6 text-center'>Parent_Node</th>
                <th className='px-8 py-6 text-right'>Protocols</th>
              </tr>
            </thead>

            {items.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={4} className='text-center py-24'>
                    <Database className='w-10 h-10 text-white/5 mx-auto mb-4' />
                    <p className='text-[10px] font-black text-white/20 uppercase tracking-[0.5em]'>
                      Sub-Registry Empty // No Nodes Detected
                    </p>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className='divide-y divide-white/[0.03]'>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className='group hover:bg-white/[0.02] transition-colors'
                  >
                    <td className='px-8 py-5'>
                      <div className='relative w-14 h-14 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#6A1E55]/50 transition-colors'>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className='object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
                        />
                      </div>
                    </td>

                    <td className='px-8 py-5'>
                      <div className='flex flex-col'>
                        <span className='text-sm font-bold text-white tracking-tight group-hover:text-[#A64D79] transition-colors'>
                          {item.title}
                        </span>
                        <div className='flex items-center gap-2 mt-1.5 text-white/20'>
                          <Calendar size={10} />
                          <span className='text-[9px] font-mono uppercase'>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className='px-8 py-5 text-center'>
                      <div className='inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/10 rounded-lg'>
                        <LinkIcon size={10} className='text-[#6A1E55]' />
                        <span className='text-[9px] font-bold text-white/60 uppercase tracking-tighter'>
                          {item.item.title}
                        </span>
                      </div>
                    </td>

                    <td className='px-8 py-5'>
                      <div className='flex items-center justify-end gap-3'>
                        <Link href={`/control/sub-items/${item.slug}`}>
                          <button className='p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white hover:border-[#6A1E55] hover:bg-[#6A1E55]/10 transition-all'>
                            <Pen size={14} />
                          </button>
                        </Link>
                        <form action={deleteSubItem}>
                          <input type='hidden' name='id' value={item.id} />
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
        <SuccessToast
          url='/control/sub-items'
          text='Sub-Node Purged Successfully'
        />
      )}
    </div>
  )
}
