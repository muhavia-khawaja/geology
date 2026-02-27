'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

type ModalImageProps = {
  src: string
  alt?: string
}

export default function ModalImage({ src, alt }: ModalImageProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <div className='flex justify-center'>
      <div
        className='relative w-full max-w-md cursor-pointer overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300'
        onClick={openModal}
      >
        <Image
          src={src}
          alt={alt || 'Image'}
          width={400}
          height={400}
          className='w-full h-64 md:h-80 object-cover rounded-xl'
        />

        <div className='absolute top-2 right-2 flex gap-2'>
          <button className='btn btn-circle btn-sm bg-black/50 border-none hover:bg-black/70 transition'>
            ←
          </button>
        </div>

        <button className='btn btn-circle btn-sm bg-black/50 border-none hover:bg-black/70 transition absolute top-3/4 right-10'>
          ⤴
        </button>

        <button className='btn btn-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 border-none text-white hover:bg-black/80 transition'>
          +
        </button>
      </div>

      {isOpen && (
        <div className='fixed inset-0 z-[1002] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4'>
          <div className='relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl'>
            <div className='relative w-full h-[500px] md:h-[600px]'>
              <Image
                src={src}
                alt={alt || 'Image'}
                fill
                className='object-contain'
                sizes='(max-width: 768px) 100vw, 50vw'
              />

              <button
                onClick={closeModal}
                className='absolute top-4 right-4 z-10 bg-black/70 p-2 rounded-full hover:bg-black/90 transition btn '
              >
                <X className='w-5 h-5 text-white' />
              </button>
            </div>

            {alt && (
              <div className='p-4 text-center text-white text-sm md:text-base opacity-80 bg-black/30'>
                {alt}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
