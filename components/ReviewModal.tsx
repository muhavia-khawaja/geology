'use client'

import { createReview } from '@/utils/actions'
import { X } from 'lucide-react'

export default function ReviewModal({ onClose, articleId }: any) {
  return (
    <div className='fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex md:items-start md:justify-center md:pt-32'>
      <div
        className='
          w-full md:max-w-2xl
          bg-zinc-900
          md:rounded-2xl
          shadow-2xl
          border border-zinc-800
          flex flex-col
          p-6
        '
      >
        <div className='flex justify-between items-center mb-6'>
          <h3 className='text-2xl font-bold text-white '>Write a Review</h3>

          <button onClick={onClose} className='border rounded-full p-1 '>
            <X className='w-4 h-4 text-white' />
          </button>
        </div>

        <form action={createReview}>
          <input type='hidden' value={articleId} name='articleId' />
          <input
            type='text'
            placeholder='Your Name'
            className='input input-bordered border-white/60 input-lg w-full bg-transparent mb-4 text-white placeholder:text-white/80 '
            name='name'
          />

          <input
            type='text'
            placeholder='Your Email'
            className='input input-bordered bg-transparent border-white/60 input-lg w-full mb-4 text-white placeholder:text-white/80'
            name='email'
          />

          <textarea
            placeholder='Your Review'
            className='textarea textarea-bordered textarea-lg bg-transparent w-full mb-4 text-white placeholder:text-white/80 border-white/60'
            rows={4}
            name='content'
          />

          <div className='rating'>
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type='radio'
                name='rating'
                value={star}
                className='mask mask-star-2 bg-yellow-400'
                required={star === 1}
              />
            ))}
          </div>

          <div className='flex justify-end gap-3'>
            <button
              className='btn btn-outline btn-md text-white border-gray-500 hover:bg-gray-700 hover:border-gray-400'
              onClick={onClose}
            >
              Cancel
            </button>
            <button className='btn btn-primary btn-md'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
