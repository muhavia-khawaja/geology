'use client'
import { useState } from 'react'
import {
  MessageSquare,
  User,
  ArrowLeft,
  ArrowRight,
  Quote,
  Zap,
  ShieldCheck,
} from 'lucide-react'
import ReviewModal from './ReviewModal'

interface Review {
  id: string
  content: string
  name: string
  rating: number
}

interface ReviewsProps {
  initialReviews?: Review[]
  articleId: string
}

export default function Reviews({
  initialReviews = [],
  articleId,
}: ReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews)
  const [current, setCurrent] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const nextSlide = () => setCurrent((prev) => (prev + 1) % reviews.length)
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))

  return (
    <div className='relative bg-[#0A0A0B] py-32 overflow-hidden'>
      <div
        className='absolute inset-0 opacity-[0.03] pointer-events-none'
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
        }}
      />

      <div className='max-w-7xl mx-auto px-6 relative z-10'>
        <div className='flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-white/5 pb-12'>
          <div className='max-w-2xl space-y-6'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#6A1E55]/20 border border-[#6A1E55]/40'>
              <Zap size={12} className='text-[#A64D79] animate-pulse' />
              <span className='text-[10px] font-black uppercase tracking-[0.3em] text-[#A64D79]'>
                Feedback Uplink
              </span>
            </div>
            <h2 className='text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.8] text-white'>
              Reader <span className='text-[#6A1E55]'>Transmissions</span>
            </h2>
            <p className='text-base text-white/40 leading-relaxed font-medium max-w-lg'>
              Decrypted logs from the community. These insights help calibrate
              our seismic forecasting models.
            </p>
          </div>

          <button
            className='group flex items-center gap-4 bg-[#6A1E55] hover:bg-[#A64D79] text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(106,30,85,0.4)]'
            onClick={() => setIsModalOpen(true)}
          >
            Submit Report
            <ArrowRight
              size={16}
              className='group-hover:translate-x-2 transition-transform'
            />
          </button>
        </div>

        <div className='relative'>
          {reviews.length > 0 ? (
            <div className='grid grid-cols-1  gap-0 border border-white/10 rounded-[3rem] overflow-hidden bg-[#111114]/50 backdrop-blur-md'>
              <div className='lg:col-span-8 p-10 md:p-20 relative border-b lg:border-b-0 lg:border-r border-white/10'>
                <Quote className='absolute top-10 left-10 w-20 h-20 text-[#6A1E55]/10 pointer-events-none' />
                <div className='relative z-10'>
                  <div className='flex items-center gap-3 mb-8 text-[#A64D79]'>
                    <ShieldCheck size={14} />
                    <span className='text-[10px] font-mono uppercase tracking-[0.4em]'>
                      Verified Entry #{reviews[current].id.slice(0, 5)}
                    </span>
                  </div>
                  <p className='text-xl font-bold text-white leading-tight tracking-tight italic'>
                    {reviews[current].content}
                  </p>
                </div>
              </div>

              <div className='lg:col-span-4 p-10 md:p-12 flex flex-col justify-between bg-white/[0.02]'>
                <div className='space-y-12'>
                  <div className='flex items-center gap-5'>
                    <div className='w-16 h-16 rounded-3xl bg-gradient-to-br from-[#6A1E55] to-[#A64D79] p-[1px]'>
                      <div className='w-full h-full bg-[#111114] rounded-[22px] flex items-center justify-center'>
                        <User className='w-7 h-7 text-white' />
                      </div>
                    </div>
                    <div>
                      <h4 className='text-xl font-black text-white uppercase italic'>
                        {reviews[current].name}
                      </h4>
                      <p className='text-[10px] font-black text-[#A64D79] uppercase tracking-widest'>
                        Data Contributor
                      </p>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <p className='text-[9px] font-black text-white/30 uppercase tracking-[0.3em]'>
                      Entry Reliability
                    </p>
                    <div className='flex items-center gap-2'>
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${
                            i < reviews[current].rating
                              ? 'bg-[#A64D79] shadow-[0_0_15px_#A64D79]'
                              : 'bg-white/5'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-between mt-12 pt-8 border-t border-white/5'>
                  <div className='flex gap-4'>
                    <button
                      onClick={prevSlide}
                      className='p-4 rounded-2xl border border-white/10 hover:bg-[#6A1E55] text-white transition-all group'
                    >
                      <ArrowLeft
                        size={20}
                        className='group-active:-translate-x-2 transition-transform'
                      />
                    </button>
                    <button
                      onClick={nextSlide}
                      className='p-4 rounded-2xl border border-white/10 hover:bg-[#6A1E55] text-white transition-all group'
                    >
                      <ArrowRight
                        size={20}
                        className='group-active:translate-x-2 transition-transform'
                      />
                    </button>
                  </div>
                  <span className='text-xs font-mono text-white/20 font-bold uppercase'>
                    {current + 1} / {reviews.length}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className='group relative bg-[#111114] border border-dashed border-white/10 rounded-[3rem] p-24 text-center hover:border-[#6A1E55]/50 transition-colors'>
              <MessageSquare className='w-20 h-20 text-white/5 mx-auto mb-8 group-hover:text-[#6A1E55]/20 transition-colors' />
              <h3 className='text-2xl font-black text-white uppercase italic tracking-widest mb-2'>
                Signal Lost
              </h3>
              <p className='text-white/30 text-sm font-medium'>
                No entries detected in this sector.
              </p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ReviewModal
          onClose={() => setIsModalOpen(false)}
          articleId={articleId}
        />
      )}
    </div>
  )
}
