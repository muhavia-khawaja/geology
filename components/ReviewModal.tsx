'use client'

import { createReview } from '@/utils/actions'
import { X, ShieldAlert, Terminal, Send } from 'lucide-react'

export default function ReviewModal({ onClose, articleId }: any) {
  return (
    <div className='fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-4'>
      <div
        className='
          w-full max-w-xl
          bg-[#0D0D0F]
          rounded-[2rem]
          shadow-[0_0_50px_rgba(0,0,0,0.5)]
          border border-white/10
          flex flex-col
          overflow-hidden
          relative
        '
      >
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#6A1E55] to-transparent opacity-50" />

        <div className='p-8'>
          <div className='flex justify-between items-start mb-10'>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#A64D79] mb-1">
                <Terminal size={14} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Secure Uplink</span>
              </div>
              <h3 className='text-3xl font-black text-white uppercase italic tracking-tighter'>
                Initialize <span className="text-[#6A1E55]">Report</span>
              </h3>
            </div>

            <button 
              onClick={onClose} 
              className='group p-2 hover:bg-white/5 rounded-full transition-colors border border-white/5'
            >
              <X className='w-5 h-5 text-white/40 group-hover:text-white transition-colors' />
            </button>
          </div>

          <form action={async (formData) => {
            await createReview(formData);
            onClose();
          }} className="space-y-6">
            <input type='hidden' value={articleId} name='articleId' />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Originator Name</label>
                <input
                  type='text'
                  placeholder='Identification...'
                  className='w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-[#6A1E55] focus:ring-1 focus:ring-[#6A1E55] transition-all'
                  name='name'
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Secure Email</label>
                <input
                  type='email'
                  placeholder='registry@sector.01'
                  className='w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-[#6A1E55] focus:ring-1 focus:ring-[#6A1E55] transition-all'
                  name='email'
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Log Content</label>
              <textarea
                placeholder='Begin data transmission...'
                className='w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-[#6A1E55] focus:ring-1 focus:ring-[#6A1E55] transition-all min-h-[120px]'
                rows={4}
                name='content'
                required
              />
            </div>

            <div className="flex flex-col gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
              <span className="text-[9px] font-black text-white/30 uppercase tracking-widest text-center">Transmission Reliability Level</span>
              <div className='flex justify-center gap-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="cursor-pointer group">
                    <input
                      type='radio'
                      name='rating'
                      value={star}
                      className='peer hidden'
                      required
                    />
                    <div className='w-10 h-3 rounded-sm bg-white/5 peer-checked:bg-[#A64D79] peer-checked:shadow-[0_0_15px_#A64D79] group-hover:bg-white/10 transition-all border border-white/5' />
                  </label>
                ))}
              </div>
            </div>

            <div className='flex items-center justify-between pt-4 border-t border-white/5'>
              <div className="flex items-center gap-2 text-white/20">
                <ShieldAlert size={12} />
                <span className="text-[8px] font-bold uppercase tracking-widest">Encrypted SSL V.2</span>
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  className='px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors'
                  onClick={onClose}
                >
                  Abort
                </button>
                <button 
                  type="submit"
                  className='group flex items-center gap-2 bg-[#6A1E55] hover:bg-[#A64D79] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-[#6A1E55]/20 active:scale-95'
                >
                  Transmit <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}