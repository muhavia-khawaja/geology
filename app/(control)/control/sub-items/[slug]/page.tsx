import SuccessToast from '@/components/SuccessToast'
import { getAllItems, getSubItem, updateSubItem } from '@/utils/actions'
import {
  Save,
  ArrowLeft,
  Type,
  Fingerprint,
  FileText,
  Image as ImageIcon,
  Database,
  ShieldCheck,
  RefreshCw,
  Layers,
} from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: {
    slug: string
  }
  searchParams: {
    success?: string
  }
}

export default async function Page({ params, searchParams }: Props) {
  const items = await getAllItems()
  const subItem = await getSubItem(params.slug)
  const success = searchParams.success === 'true'

  if (!subItem) return notFound()

  return (
    <div className='max-w-6xl mx-auto pb-20 animate-in fade-in duration-500'>
      <div className='flex items-center justify-between mb-12'>
        <div className='flex items-center gap-6'>
          <Link
            href='/control/sub-items'
            className='p-3 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white hover:border-[#6A1E55] transition-all'
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className='text-3xl font-black italic text-white tracking-tighter uppercase'>
              Calibrate <span className='text-[#6A1E55]'>Sub_Node</span>
            </h2>
            <p className='text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-1'>
              Refining Nested Intelligence // UID: {subItem.id.slice(0, 8)}
            </p>
          </div>
        </div>

        {success && (
          <SuccessToast
            text='Sub-Node Intelligence Synchronized'
            url={`/control/sub-items/${params.slug}`}
          />
        )}
      </div>

      <form
        action={updateSubItem}
        className='grid grid-cols-1 lg:grid-cols-3 gap-8'
      >
        <input type='hidden' name='id' value={subItem.id} />

        <div className='lg:col-span-2 space-y-6'>
          <div className='bg-[#0D0D0F] border border-white/5 p-8 lg:p-12 rounded-[2.5rem] shadow-2xl space-y-12'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-white/30'>
                <Type size={14} className='text-[#6A1E55]' />
                <span className='text-[10px] font-black uppercase tracking-[0.2em]'>
                  Node_Label
                </span>
              </div>
              <input
                type='text'
                name='title'
                defaultValue={subItem.title}
                className='w-full bg-transparent border-b border-white/10 py-4 text-3xl font-black text-white focus:outline-none focus:border-[#6A1E55] transition-all tracking-tight'
              />
            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-white/30'>
                <Fingerprint size={14} className='text-[#6A1E55]' />
                <span className='text-[10px] font-black uppercase tracking-[0.2em]'>
                  Access_Slug
                </span>
              </div>
              <input
                type='text'
                name='slug'
                defaultValue={subItem.slug}
                className='w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm font-mono text-[#A64D79] focus:outline-none focus:border-[#6A1E55] transition-all'
              />
            </div>

            <div className='space-y-8'>
              <div className='space-y-4'>
                <div className='flex items-center gap-2 text-white/30'>
                  <FileText size={14} className='text-[#6A1E55]' />
                  <span className='text-[10px] font-black uppercase tracking-[0.2em]'>
                    Node_Abstract
                  </span>
                </div>
                <textarea
                  name='short_desc'
                  rows={2}
                  defaultValue={subItem.short_desc}
                  className='w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm text-white/70 focus:outline-none focus:border-[#6A1E55]'
                />
              </div>

              <div className='space-y-4'>
                <div className='flex items-center gap-2 text-white/30'>
                  <Database size={14} className='text-[#6A1E55]' />
                  <span className='text-[10px] font-black uppercase tracking-[0.2em]'>
                    Extended_Manifest
                  </span>
                </div>
                <textarea
                  name='long_desc'
                  rows={8}
                  defaultValue={subItem.long_desc}
                  className='w-full bg-white/[0.03] border border-white/10 rounded-3xl px-6 py-5 text-sm text-white/80 focus:outline-none focus:border-[#6A1E55] leading-relaxed'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='lg:col-span-1 space-y-6'>
          <div className='bg-[#0D0D0F] border border-white/5 p-8 rounded-[3rem] space-y-8 sticky top-28'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-white/30'>
                <ImageIcon size={14} />
                <span className='text-[10px] font-black uppercase tracking-widest'>
                  Current_Visual
                </span>
              </div>
              <div className='relative aspect-square w-full rounded-3xl overflow-hidden border border-white/10 bg-black shadow-inner group'>
                <Image
                  src={subItem.image}
                  fill
                  alt={subItem.title}
                  className='object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#0D0D0F] to-transparent' />
              </div>
              <input
                type='file'
                name='image'
                className='w-full text-[10px] text-white/40 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-white/5 file:text-white/60 hover:file:bg-[#6A1E55]/20 file:transition-all cursor-pointer mt-2'
              />
            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-white/30'>
                <Layers size={14} />
                <span className='text-[10px] font-black uppercase tracking-widest'>
                  Parent_Association
                </span>
              </div>
              <select
                name='itemId'
                className='w-full bg-black border border-white/10 rounded-2xl px-4 py-4 text-xs font-bold text-white focus:border-[#6A1E55] outline-none cursor-pointer'
              >
                {items.map((parent: any) => (
                  <option
                    key={parent.id}
                    value={parent.id}
                    selected={parent.id === subItem.itemId}
                  >
                    {parent.title.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className='pt-6 border-t border-white/5 space-y-4'>
              <button
                type='submit'
                className='w-full py-5 rounded-2xl bg-[#6A1E55] hover:bg-[#A64D79] text-white font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-[#6A1E55]/20 flex items-center justify-center gap-3 active:scale-95 group'
              >
                <RefreshCw
                  size={18}
                  className='group-hover:rotate-180 transition-transform duration-700'
                />
                Re-Sync Node
              </button>

              <div className='flex items-center gap-3 justify-center opacity-20'>
                <ShieldCheck size={12} />
                <span className='text-[8px] font-black uppercase tracking-[0.2em]'>
                  Verified Calibration
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
