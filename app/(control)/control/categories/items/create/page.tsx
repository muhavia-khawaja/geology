import SuccessToast from '@/components/SuccessToast'
import { createItem, getALlCategories } from '@/utils/actions'
import {
  ArrowLeft,
  PlusCircle,
  Type,
  Fingerprint,
  FileText,
  Image as ImageIcon,
  Tag,
  Database,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams: { success: string }
}) {
  const categories = await getALlCategories()
  const success = searchParams.success === 'true'

  return (
    <div className='max-w-6xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <div className='flex items-center justify-between mb-12'>
        <div className='flex items-center gap-6'>
          <Link
            href='/control/categories/items'
            className='group p-3 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white hover:border-[#6A1E55] transition-all'
          >
            <ArrowLeft
              size={20}
              className='group-hover:-translate-x-1 transition-transform'
            />
          </Link>
          <div>
            <h2 className='text-3xl font-black italic text-white tracking-tighter uppercase'>
              Initialize <span className='text-[#6A1E55]'>Asset</span>
            </h2>
            <p className='text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-1'>
              Sub-Sector Entry // Intelligence Manifest
            </p>
          </div>
        </div>

        {success && (
          <SuccessToast
            text='Asset Successfully Registered'
            url='/control/categories/items/create'
          />
        )}
      </div>

      <form
        action={createItem}
        className='grid grid-cols-1 lg:grid-cols-3 gap-8'
      >
        <div className='lg:col-span-2 space-y-6'>
          <div className='bg-[#0D0D0F] border border-white/5 p-8 lg:p-12 rounded-[2.5rem] shadow-2xl space-y-10'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Type size={14} className='text-[#6A1E55]' />
                <span className='text-[10px] font-black text-white/30 uppercase tracking-[0.2em]'>
                  Asset_Title
                </span>
              </div>
              <input
                type='text'
                name='title'
                required
                placeholder='Identify the asset...'
                className='w-full bg-transparent border-b border-white/10 py-4 text-3xl font-black text-white focus:outline-none focus:border-[#6A1E55] placeholder:text-white/5 transition-all tracking-tight'
              />
            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Fingerprint size={14} className='text-[#6A1E55]' />
                <span className='text-[10px] font-black text-white/30 uppercase tracking-[0.2em]'>
                  Reference_Slug
                </span>
              </div>
              <input
                type='text'
                name='slug'
                required
                placeholder='asset-reference-id'
                className='w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm font-mono text-[#A64D79] focus:outline-none focus:border-[#6A1E55] transition-all'
              />
            </div>

            <div className='grid grid-cols-1 gap-8'>
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <FileText size={14} className='text-[#6A1E55]' />
                  <span className='text-[10px] font-black text-white/30 uppercase tracking-[0.2em]'>
                    Brief_Summary
                  </span>
                </div>
                <textarea
                  name='short_desc'
                  rows={2}
                  className='w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm text-white/70 focus:outline-none focus:border-[#6A1E55] transition-all'
                  placeholder='Concise intelligence briefing...'
                />
              </div>

              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <Database size={14} className='text-[#6A1E55]' />
                  <span className='text-[10px] font-black text-white/30 uppercase tracking-[0.2em]'>
                    Full_Intelligence_Report
                  </span>
                </div>
                <textarea
                  name='long_desc'
                  rows={8}
                  className='w-full bg-white/[0.03] border border-white/10 rounded-3xl px-6 py-5 text-sm text-white/80 focus:outline-none focus:border-[#6A1E55] transition-all leading-relaxed'
                  placeholder='Complete data breakdown...'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='lg:col-span-1 space-y-6'>
          <div className='bg-[#0D0D0F] border border-white/5 p-8 rounded-[3rem] space-y-8 sticky top-28'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-white/30'>
                <Tag size={14} />
                <span className='text-[10px] font-black uppercase tracking-widest'>
                  Sector_Classification
                </span>
              </div>
              <select
                name='categoryId'
                required
                className='w-full bg-black border border-white/10 rounded-2xl px-4 py-4 text-xs font-bold text-white focus:border-[#6A1E55] outline-none appearance-none cursor-pointer'
              >
                <option value=''>Select Sector...</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id} className='bg-[#0D0D0F]'>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-white/30'>
                <ImageIcon size={14} />
                <span className='text-[10px] font-black uppercase tracking-widest'>
                  Visual_Reference
                </span>
              </div>
              <div className='relative group'>
                <input
                  type='file'
                  name='image'
                  required
                  className='w-full text-[10px] text-white/40 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-[#6A1E55]/10 file:text-[#A64D79] file:font-black file:uppercase file:tracking-widest hover:file:bg-[#6A1E55]/20 transition-all cursor-pointer'
                />
              </div>
            </div>

            <div className='pt-8 border-t border-white/5 space-y-4'>
              <button
                type='submit'
                className='w-full py-5 rounded-2xl bg-[#6A1E55] hover:bg-[#A64D79] text-white font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-[#6A1E55]/20 flex items-center justify-center gap-3 group active:scale-95'
              >
                <PlusCircle
                  size={18}
                  className='group-hover:rotate-90 transition-transform duration-500'
                />
                Register Asset
              </button>

              <div className='flex items-center gap-3 justify-center py-2 opacity-20'>
                <ShieldCheck size={12} />
                <span className='text-[8px] font-black uppercase tracking-[0.2em]'>
                  Biometric Auth Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
