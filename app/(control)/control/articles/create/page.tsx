'use client'

import SuccessToast from '@/components/SuccessToast'
import { createArticle } from '@/utils/actions'
import { 
  PlusCircle, 
  ArrowLeft, 
  Info, 
  Image as ImageIcon, 
  Hash, 
  Zap, 
  Type, 
  AlignLeft 
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Page({
  searchParams,
}: {
  searchParams: { success: string }
}) {
  const success = searchParams.success === 'true'

  return (
    <div className='max-w-6xl mx-auto pb-20 animate-in fade-in duration-500'>
      
      <div className='flex items-center justify-between mb-10'>
        <div className='flex items-center gap-5'>
          <Link 
            href="/control/articles" 
            className="group p-3 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white hover:border-[#6A1E55] transition-all"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h2 className='text-3xl font-black italic text-white tracking-tighter uppercase'>
              Initialize <span className='text-[#6A1E55]'>New_Log</span>
            </h2>
            <p className='text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-1'>
              Deployment Terminal // Article Registry
            </p>
          </div>
        </div>

        {success && (
          <SuccessToast
            url='/control/articles'
            text='Log Successfully Deployed to Registry'
          />
        )}
      </div>

      <form action={createArticle} className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        
        
        <div className='lg:col-span-2 space-y-6'>
          <div className='bg-[#0D0D0F] border border-white/5 p-8 lg:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden'>
            
            <div className='absolute -top-24 -left-24 w-48 h-48 bg-[#6A1E55]/10 blur-[100px] pointer-events-none' />
            
            <div className='space-y-10'>
              
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <Type size={14} className='text-[#6A1E55]' />
                  <span className='text-[10px] font-black text-white/30 uppercase tracking-[0.2em]'>Headline_Input</span>
                </div>
                <input
                  type='text'
                  name='title'
                  required
                  placeholder='Enter primary title...'
                  className='w-full bg-transparent border-b border-white/10 py-4 text-3xl font-black text-white focus:outline-none focus:border-[#6A1E55] placeholder:text-white/5 transition-all tracking-tight'
                />
              </div>

              
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <Info size={14} className='text-[#6A1E55]' />
                  <span className='text-[10px] font-black text-white/30 uppercase tracking-[0.2em]'>Briefing_Overlay</span>
                </div>
                <textarea
                  rows={2}
                  name='short_desc'
                  placeholder='Summarize the intelligence log...'
                  className='w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm text-white/80 focus:border-[#6A1E55] focus:outline-none focus:ring-1 focus:ring-[#6A1E55] transition-all italic leading-relaxed'
                />
              </div>

              
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <AlignLeft size={14} className='text-[#6A1E55]' />
                  <span className='text-[10px] font-black text-white/30 uppercase tracking-[0.2em]'>Main_Intelligence_Body</span>
                </div>
                <textarea
                  rows={10}
                  name='long_desc'
                  placeholder='Compose full narrative data...'
                  className='w-full bg-white/[0.03] border border-white/10 rounded-3xl px-6 py-5 text-sm text-white/80 focus:border-[#6A1E55] focus:outline-none focus:ring-1 focus:ring-[#6A1E55] transition-all leading-7'
                />
              </div>
            </div>
          </div>
        </div>

        
        <div className='lg:col-span-1 space-y-6'>
          <div className='bg-[#0D0D0F] border border-white/5 p-8 rounded-[2.5rem] space-y-8 sticky top-28'>
            
            
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <Hash size={14} className='text-[#6A1E55]' />
                <span className='text-[10px] font-black text-white/30 uppercase tracking-widest'>Registry_Path</span>
              </div>
              <input
                type='text'
                name='slug'
                required
                placeholder='article-unique-slug'
                className='w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#6A1E55] transition-all font-mono placeholder:text-white/10'
              />
            </div>

            
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <ImageIcon size={14} className='text-[#6A1E55]' />
                <span className='text-[10px] font-black text-white/30 uppercase tracking-widest'>Visual_Asset</span>
              </div>
              <div className='group relative'>
                <input
                  type='file'
                  name='image'
                  required
                  className='file-input file-input-bordered w-full bg-black text-[10px] text-white/40 
                             file:bg-[#6A1E55] file:text-white file:border-none file:text-[9px] file:uppercase file:font-black'
                />
              </div>
            </div>

            
            <div className='p-5 bg-white/[0.02] border border-white/5 rounded-2xl'>
              <label className='flex items-center justify-between cursor-pointer group'>
                <div className='flex flex-col'>
                  <span className='text-xs font-bold text-white uppercase tracking-tighter group-hover:text-[#A64D79] transition-colors'>Priority Status</span>
                  <span className='text-[9px] text-white/20 uppercase mt-0.5 tracking-tighter'>Promote to Global Feed</span>
                </div>
                <input
                  type='checkbox'
                  name='featured'
                  className='checkbox checkbox-primary border-white/10 [--chkbg:#6A1E55] [--chkfg:white] transition-all'
                />
              </label>
            </div>

            
            <div className='pt-4'>
              <button
                type='submit'
                className='w-full py-5 rounded-2xl bg-[#6A1E55] hover:bg-[#A64D79] text-white font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-[#6A1E55]/20 flex items-center justify-center gap-3 active:scale-95'
              >
                <PlusCircle size={18} />
                Deploy Intelligence
              </button>
              <p className='text-[8px] text-center text-white/10 uppercase font-bold tracking-[0.2em] mt-4'>
                Finalize all fields before transmission
              </p>
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}