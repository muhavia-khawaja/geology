import SuccessToast from '@/components/SuccessToast'
import { getSingleCategory, updateCategory } from '@/utils/actions'
import {
  Save,
  ArrowLeft,
  Layers,
  Type,
  Database,
  ShieldCheck,
  ListOrdered,
} from 'lucide-react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: {
    id: string
  }
  searchParams: {
    success?: string
  }
}

export default async function page({ params, searchParams }: Props) {
  const category = await getSingleCategory(params.id)
  const success = searchParams.success === 'true'

  if (!category) return notFound()

  return (
    <div className='max-w-6xl mx-auto pb-20 animate-in fade-in duration-500'>
      <div className='flex items-center justify-between mb-12'>
        <div className='flex items-center gap-6'>
          <Link
            href='/control/categories'
            className='p-3 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white hover:border-[#6A1E55] transition-all'
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className='text-3xl font-black italic text-white tracking-tighter uppercase'>
              Modify <span className='text-[#6A1E55]'>Sector_Node</span>
            </h2>
            <p className='text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-1'>
              Refining Data Hierarchy // Sector: {category.title}
            </p>
          </div>
        </div>

        {success && (
          <SuccessToast
            text='Sector Parameters Synchronized'
            url={`/control/categories/${params.id}`}
          />
        )}
      </div>

      <form
        action={updateCategory}
        className='grid grid-cols-1 lg:grid-cols-3 gap-8'
      >
        <input type='hidden' name='id' value={category.id} />

        <div className='lg:col-span-2 space-y-6'>
          <div className='bg-[#0D0D0F] border border-white/5 p-8 lg:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden'>
            <div className='space-y-12'>
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <Type size={14} className='text-[#6A1E55]' />
                  <span className='text-[10px] font-black text-white/30 uppercase tracking-[0.2em]'>
                    Identity_Label
                  </span>
                </div>
                <input
                  type='text'
                  name='title'
                  defaultValue={category.title}
                  className='w-full bg-transparent border-b border-white/10 py-4 text-3xl font-black text-white focus:outline-none focus:border-[#6A1E55] transition-all tracking-tight'
                />
              </div>

              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <Layers size={14} className='text-[#6A1E55]' />
                  <span className='text-[10px] font-black text-white/30 uppercase tracking-[0.2em]'>
                    Extended_Intelligence
                  </span>
                </div>
                <textarea
                  rows={10}
                  name='long_desc'
                  defaultValue={category.long_desc}
                  className='w-full bg-white/[0.03] border border-white/10 rounded-3xl px-6 py-5 text-sm text-white/80 focus:border-[#6A1E55] focus:outline-none focus:ring-1 focus:ring-[#6A1E55] transition-all leading-relaxed'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='lg:col-span-1 space-y-6'>
          <div className='bg-[#0D0D0F] border border-white/5 p-8 rounded-[2.5rem] space-y-8 sticky top-28'>
            <div className='flex items-center gap-2'>
              <Database size={14} className='text-[#6A1E55]' />
              <span className='text-[10px] font-black text-white/30 uppercase tracking-widest'>
                Node_Protocols
              </span>
            </div>

            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <ListOrdered size={14} className='text-[#6A1E55]' />
                <span className='text-[10px] font-bold text-white/40 uppercase tracking-tighter'>
                  Sequence Index
                </span>
              </div>
              <input
                type='number'
                name='display_order'
                defaultValue={category.display_order}
                className='w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#6A1E55] transition-all font-mono'
              />
            </div>

            <div className='p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4'>
              <label className='flex items-center justify-between cursor-pointer group'>
                <div className='flex flex-col'>
                  <span className='text-xs font-bold text-white uppercase tracking-tighter'>
                    Priority Status
                  </span>
                  <span className='text-[9px] text-white/20 uppercase mt-0.5 tracking-tighter'>
                    Push to Primary Feed
                  </span>
                </div>
                <input
                  type='checkbox'
                  name='featured'
                  defaultChecked={category.featured}
                  className='checkbox checkbox-primary border-white/10 [--chkbg:#6A1E55] [--chkfg:white] transition-all'
                />
              </label>

              <div className='pt-4 border-t border-white/5 flex items-center gap-3 opacity-30'>
                <ShieldCheck size={12} />
                <span className='text-[8px] font-bold uppercase tracking-widest'>
                  Registry Locked
                </span>
              </div>
            </div>

            <div className='pt-4'>
              <button
                type='submit'
                className='w-full py-5 rounded-2xl bg-[#6A1E55] hover:bg-[#A64D79] text-white font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-[#6A1E55]/20 flex items-center justify-center gap-3 active:scale-95'
              >
                <Save size={18} />
                Commit Changes
              </button>
              <p className='text-[8px] text-center text-white/10 uppercase font-bold tracking-[0.2em] mt-6'>
                ID_REF: {category.id}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
