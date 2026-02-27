'use client'

import { createComment } from '@/utils/actions'
import { useSearchParams } from 'next/navigation'
import { format } from 'path'
import { useRef } from 'react'

export default function HelpSection() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <section className='min-h-screen bg-black  py-32 md:py-44  text-gray-300'>
      {success === 'true' && (
        <div
          className='
            max-w-md mx-auto mb-8
            bg-green-600 bg-opacity-90 text-green-100
            rounded-md py-3 px-6
            font-semibold tracking-wide
            shadow-lg
            text-center
            animate-fadeIn
          '
          role='alert'
        >
          Message Sent Successfully
        </div>
      )}

      <div className='flex flex-col md:flex-row items-start md:items-center gap-16 max-w-5xl mx-auto'>
        <div className='flex-1 max-w-md w-full'>
          <h1
            className='
              text-4xl sm:text-5xl font-extrabold 
              leading-tight
              mb-8 
              text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-500
              drop-shadow-lg
            '
          >
            We&apos;re here to help
          </h1>

          <form
            ref={formRef}
            action={async (formData: FormData) => {
              await createComment(formData)
              formRef.current?.reset()
            }}
            className='space-y-6'
            method='POST'
          >
            <input
              type='text'
              name='name'
              aria-label='Name'
              placeholder='e.g. John Smith'
              className='
                input input-bordered w-full 
                bg-gray-900 border-gray-700
                placeholder-gray-500
                text-white
                focus:border-green-400 focus:ring-2 focus:ring-green-400
                transition
                rounded-lg
                shadow-md
              '
              required
            />
            <input
              type='email'
              name='email'
              aria-label='Email address'
              placeholder='e.g. example@gmail.com'
              className='
                input input-bordered w-full 
                bg-gray-900 border-gray-700
                placeholder-gray-500
                text-white
                focus:border-green-400 focus:ring-2 focus:ring-green-400
                transition
                rounded-lg
                shadow-md
              '
              required
            />
            <textarea
              name='message'
              aria-label='Message'
              rows={6}
              placeholder='Let us know how we can help'
              className='
                textarea textarea-bordered w-full 
                bg-gray-900 border-gray-700
                placeholder-gray-500
                text-white
                resize-none
                focus:border-green-400 focus:ring-2 focus:ring-green-400
                transition
                rounded-lg
                shadow-md
              '
              required
            />

            <button
              type='submit'
              className='
                btn btn-primary w-full
                rounded-full
                py-3
                font-bold text-lg
                shadow-lg
                hover:scale-105 hover:shadow-xl
                transition-transform duration-300
                bg-gradient-to-r from-green-500 to-green-600
                border-none
              '
            >
              Send message
            </button>
          </form>
        </div>

        {/* Right: Testimonial */}
        <aside
          aria-label='Testimonial from Arctiq'
          className='
            flex-1 max-w-lg 
            bg-gradient-to-br from-green-900/30 to-green-700/40
            rounded-2xl
            p-10
            shadow-2xl
            backdrop-blur-lg
            border border-green-700/40
            text-gray-200
            flex flex-col
            select-none
            relative
          '
        >
          <header className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl font-extrabold tracking-wide drop-shadow-md'>
              Arctiq
            </h2>
          </header>
          <blockquote className='text-lg italic leading-relaxed tracking-wide'>
            <span className='font-semibold text-white'>
              Arctic cut project delays by 30%
            </span>{' '}
            and transformed our global team communication, saving us hours every
            week.
          </blockquote>

          <svg
            className='absolute top-6 left-6 w-12 h-12 opacity-10 text-green-400'
            fill='currentColor'
            viewBox='0 0 32 32'
            aria-hidden='true'
          >
            <path d='M10 4v12H4v4h12v-4H10V4zM24 4v12h-6v4h12v-4H24V4z' />
          </svg>
        </aside>
      </div>
    </section>
  )
}
