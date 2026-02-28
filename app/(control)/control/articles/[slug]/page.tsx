import SuccessToast from '@/components/SuccessToast'
import { getSingleArticle, updateArticle } from '@/utils/actions'
import { notFound } from 'next/navigation'
import { Save, Image as ImageIcon, FileCode, Type, Layout, ArrowLeft } from 'lucide-react'
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
  const article = await getSingleArticle(params.slug)
  const success = searchParams.success

  if (!article) return notFound()

  return (
    <div className='max-w-6xl mx-auto pb-20'>
      {/* --- TOP BAR --- */}
      <div className='flex items-center justify-between mb-10'>
        <div className='flex items-center gap-4'>
          <Link 
            href="/control/articles" 
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white transition-all"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h2 className='text-3xl font-black italic text-white tracking-tighter uppercase'>
              Modify <span className='text-[#6A1E55]'>Log</span>
            </h2>
            <p className='text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]'>
              Entry ID: {article.id.slice(-12)}
            </p>
          </div>
        </div>

        {success && (
          <SuccessToast
            url={`/control/articles/${params.slug}`}
            text='Registry Synchronized Successfully'
          />
        )}
      </div>

      <form action={updateArticle} className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <input type='hidden' name='id' value={article.id} />

        {/* --- LEFT COLUMN: CONFIGURATION --- */}
        <div className='lg:col-span-1 space-y-6'>
          <div className='bg-[#0D0D0F] border border-white/5 p-8 rounded-[2rem] space-y-6'>
            <div className='flex items-center gap-2 mb-2'>
              <FileCode size={14} className='text-[#6A1E55]' />
              <span className='text-[10px] font-black text-white/30 uppercase tracking-widest'>Core Metadata</span>
            </div>

            {/* Slug Input */}
            <div className='space-y-2'>
              <label className='text-[10px] font-bold text-white/40 uppercase ml-1'>Registry Slug</label>
              <input
                type='text'
                name='slug'
                defaultValue={article.slug}
                className='w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#6A1E55] focus:ring-1 focus:ring-[#6A1E55] transition-all font-mono'
              />
            </div>

            {/* Featured Checkbox */}
            <div className='p-4 bg-white/[0.02] border border-white/5 rounded-2xl'>
              <label className='flex items-center justify-between cursor-pointer'>
                <div className='flex flex-col'>
                  <span className='text-xs font-bold text-white uppercase tracking-tight'>Priority Status</span>
                  <span className='text-[9px] text-white/20 uppercase mt-0.5'>Push to Featured Deck</span>
                </div>
                <input
                  type='checkbox'
                  name='featured'
                  className='checkbox checkbox-primary border-white/20 [--chkbg:#6A1E55] [--chkfg:white]'
                  defaultChecked={article.featured}
                />
              </label>
            </div>

            {/* Media Preview */}
            <div className='space-y-4 pt-4 border-t border-white/5'>
              <div className='flex items-center gap-2'>
                <ImageIcon size={14} className='text-[#6A1E55]' />
                <span className='text-[10px] font-black text-white/30 uppercase tracking-widest'>Visual Asset</span>
              </div>
              
              <div className='relative aspect-video rounded-2xl overflow-hidden border border-white/10 group'>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent' />
              </div>

              <input
                type='file'
                name='image'
                className='file-input file-input-bordered w-full bg-black text-xs text-white/40 
                           file:bg-[#6A1E55] file:text-white file:border-none file:text-[10px] file:uppercase file:font-black'
              />
            </div>
          </div>

          <button
            type='submit'
            className='w-full py-5 rounded-2xl bg-[#6A1E55] hover:bg-[#A64D79] text-white font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-[#6A1E55]/20 flex items-center justify-center gap-3'
          >
            <Save size={16} />
            Synchronize Changes
          </button>
        </div>

        {/* --- RIGHT COLUMN: CONTENT --- */}
        <div className='lg:col-span-2 space-y-6'>
          <div className='bg-[#0D0D0F] border border-white/5 p-8 rounded-[2rem] space-y-8'>
            
            {/* Title */}
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <Type size={14} className='text-[#6A1E55]' />
                <span className='text-[10px] font-black text-white/30 uppercase tracking-widest'>Log Headline</span>
              </div>
              <input
                type='text'
                name='title'
                defaultValue={article.title}
                placeholder='Enter Log Title'
                className='w-full bg-transparent border-b border-white/10 py-4 text-2xl font-black text-white focus:outline-none focus:border-[#6A1E55] placeholder:text-white/5 transition-all'
              />
            </div>

            {/* Short Desc */}
            <div className='space-y-3'>
              <label className='text-[10px] font-bold text-white/40 uppercase ml-1'>Briefing Overlay</label>
              <textarea
                rows={2}
                name='short_desc'
                defaultValue={article.short_desc}
                className='w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white/70 focus:border-[#6A1E55] focus:outline-none focus:ring-1 focus:ring-[#6A1E55] transition-all italic'
              />
            </div>

            {/* Long Desc */}
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <Layout size={14} className='text-[#6A1E55]' />
                <span className='text-[10px] font-black text-white/30 uppercase tracking-widest'>Main Intelligence Body</span>
              </div>
              <textarea
                rows={12}
                name='long_desc'
                defaultValue={article.long_desc}
                className='w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white/80 focus:border-[#6A1E55] focus:outline-none focus:ring-1 focus:ring-[#6A1E55] transition-all leading-relaxed'
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}