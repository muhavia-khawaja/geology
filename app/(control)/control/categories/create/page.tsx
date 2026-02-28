import SuccessToast from '@/components/SuccessToast'
import { createCategory } from '@/utils/actions'
import { 
  PlusCircle, 
  ArrowLeft, 
  Layers, 
  Type, 
  Database, 
  ShieldCheck,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Page({
  searchParams,
}: {
  searchParams: { success?: string }
}) {
  const success = searchParams.success === 'true'

  return (
    <div className='max-w-6xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      {/* --- BREADCRUMBS & NAVIGATION --- */}
      <div className='flex items-center justify-between mb-12'>
        <div className='flex items-center gap-6'>
          <Link 
            href="/control/categories" 
            className="group p-3 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white hover:border-[#6A1E55] transition-all"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h2 className='text-3xl font-black italic text-white tracking-tighter uppercase'>
              Initialize <span className='text-[#6A1E55]'>Sector</span>
            </h2>
            <p className='text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-1'>
              Registry Classification // Data Hierarchy
            </p>
          </div>
        </div>

        {success && (
          <SuccessToast
            text='Sector Successfully Initialized'
            url='/control/categories/create'
          />
        )}
      </div>

      <form action={createCategory} className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        
        {/* --- MAIN COLUMN: SECTOR CORE --- */}
        <div className='lg:col-span-2 space-y-6'>
          <div className='bg-[#0D0D0F] border border-white/5 p-8 lg:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden'>
            {/* Themed ambient glow */}
            <div className='absolute -top-24 -right-24 w-64 h-64 bg-[#6A1E55]/5 blur-[120px] pointer-events-none' />
            
            <div className='space-y-12'>
              {/* Sector Title */}
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <Type size={14} className='text-[#6A1E55]' />
                  <span className='text-[10px] font-black text-white/30 uppercase tracking-[0.2em]'>Sector_Label</span>
                </div>
                <input
                  type='text'
                  name='title'
                  required
                  placeholder='Enter Sector Title...'
                  className='w-full bg-transparent border-b border-white/10 py-4 text-3xl font-black text-white focus:outline-none focus:border-[#6A1E55] placeholder:text-white/5 transition-all tracking-tight'
                />
              </div>

              {/* Long Description */}
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <Layers size={14} className='text-[#6A1E55]' />
                  <span className='text-[10px] font-black text-white/30 uppercase tracking-[0.2em]'>Classification_Details</span>
                </div>
                <textarea
                  rows={8}
                  name='long_desc'
                  placeholder='Define the parameters of this sector...'
                  className='w-full bg-white/[0.03] border border-white/10 rounded-3xl px-6 py-5 text-sm text-white/80 focus:border-[#6A1E55] focus:outline-none focus:ring-1 focus:ring-[#6A1E55] transition-all leading-relaxed'
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- SIDEBAR: PROTOCOLS --- */}
        <div className='lg:col-span-1 space-y-6'>
          <div className='bg-[#0D0D0F] border border-white/5 p-8 rounded-[2.5rem] space-y-8 sticky top-28'>
            
            <div className='flex items-center gap-2'>
              <Database size={14} className='text-[#6A1E55]' />
              <span className='text-[10px] font-black text-white/30 uppercase tracking-widest'>Data_Config</span>
            </div>

            {/* Featured Protocol */}
            <div className='p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4'>
              <div className='flex items-center justify-between group cursor-pointer'>
                <div className='flex flex-col'>
                  <span className='text-xs font-bold text-white uppercase tracking-tighter'>Priority Node</span>
                  <span className='text-[9px] text-white/20 uppercase mt-0.5 tracking-tighter'>Feature in Primary Hub</span>
                </div>
                <input
                  type='checkbox'
                  name='featured'
                  className='checkbox checkbox-primary border-white/10 [--chkbg:#6A1E55] [--chkfg:white] transition-all shadow-lg'
                />
              </div>
              
              <div className='pt-4 border-t border-white/5 flex items-center gap-3 opacity-30'>
                <ShieldCheck size={12} />
                <span className='text-[8px] font-bold uppercase tracking-widest'>Encryption Verified</span>
              </div>
            </div>

            {/* Submit Section */}
            <div className='space-y-4'>
              <button
                type='submit'
                className='w-full py-5 rounded-2xl bg-[#6A1E55] hover:bg-[#A64D79] text-white font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-[#6A1E55]/20 flex items-center justify-center gap-3 group'
              >
                <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                Establish Sector
              </button>
              
              <div className='flex items-center gap-2 justify-center opacity-20'>
                <Zap size={10} className='text-[#A64D79]' />
                <span className='text-[8px] font-black uppercase tracking-[0.2em]'>Syncing with Registry Core</span>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}