'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Maximize2, Scan, Shield } from 'lucide-react'

type ModalImageProps = {
  src: string
  alt?: string
}

export default function ModalImage({ src, alt }: ModalImageProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  return (
    <div className='flex justify-center w-full'>
      <div
        className='group relative w-full cursor-crosshair overflow-hidden rounded-[2rem] bg-[#1A1A1D] border border-white/5 shadow-2xl transition-all duration-500 hover:border-[#6A1E55]/50'
        onClick={openModal}
      >
        <Image
          src={src}
          alt={alt || 'Seismic Data Image'}
          width={800}
          height={600}
          className='w-full h-72 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[0.2] group-hover:grayscale-0'
        />

        <div className='absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent opacity-60' />

        <div className='absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <div className='flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10'>
            <Scan size={12} className='text-[#A64D79] animate-pulse' />
            <span className='text-[8px] font-black uppercase tracking-[0.2em] text-white/70'>
              Analysis Mode
            </span>
          </div>
        </div>

        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0'>
          <div className='bg-[#6A1E55] text-white p-4 rounded-2xl shadow-[0_0_30px_rgba(106,30,85,0.6)]'>
            <Maximize2 size={24} strokeWidth={3} />
          </div>
        </div>

        <div className='absolute bottom-4 left-6'>
          <p className='text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]'>
            Visual Uplink v4.2
          </p>
        </div>
      </div>

      {isOpen && (
        <div
          className='fixed inset-0 z-50 mt-24 flex items-center justify-center bg-[#050505]/fb backdrop-blur-xl p-4 md:p-12 animate-in fade-in duration-300'
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className='absolute top-8 right-8 z-[100] bg-white/5 hover:bg-[#6A1E55] p-4 rounded-full border border-white/10 text-white transition-all group'
          >
            <X className='w-6 h-6 group-hover:rotate-90 transition-transform' />
          </button>

          <div
            className='relative w-full max-w-6xl h-full flex flex-col items-center justify-center'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative w-full h-full max-h-[80vh] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(106,30,85,0.1)]'>
              <Image
                src={src}
                alt={alt || 'Full Resolution Image'}
                fill
                className='object-contain'
                sizes='100vw'
                priority
              />
            </div>

            {alt && (
              <div className='mt-8 max-w-2xl text-center space-y-2 animate-in slide-in-from-bottom-4 duration-500 delay-150'>
                <div className='flex justify-center items-center gap-3'>
                  <div className='h-px w-8 bg-[#6A1E55]' />
                  <Shield size={14} className='text-[#A64D79]' />
                  <div className='h-px w-8 bg-[#6A1E55]' />
                </div>
                <h3 className='text-xl font-black italic uppercase tracking-tighter text-white'>
                  {alt}
                </h3>
                <p className='text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]'>
                  Encrypted Sector Visualization
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
