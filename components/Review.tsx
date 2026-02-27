'use client'
import { useState } from 'react'
import { MessageSquare, User } from 'lucide-react'
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
    <div className=' bg-black flex flex-col items-center justify-center  py-36 text-white'>
      <div className='max-w-7xl w-full flex flex-col md:flex-row gap-8 md:gap-12'>
        <div className='md:w-1/3 space-y-6 text-center md:text-left'>
          <h2 className='text-xl md:text-2xl font-extrabold leading-tight'>
            What Readers Are Saying <br /> About This Article
          </h2>
          <p className='text-gray-300'>
            Check out the feedback from our readers. Your thoughts and opinions
            help us improve our content and make our blog even more valuable!
          </p>

          <button
            className='btn bg-green-400 hover:bg-green-500 transition border-none mt-2'
            onClick={() => setIsModalOpen(true)}
          >
            Write a Review
          </button>
        </div>

        <div className='md:w-2/3 flex flex-col justify-center bg-gray-800 bg-opacity-70 rounded-lg p-6 sm:p-8 shadow-lg relative'>
          {reviews.length > 0 ? (
            <>
              <div className='text-gray-500 text-5xl mb-4 select-none hidden sm:block'>
                “
              </div>
              <p className='text-gray-100 leading-relaxed mb-6 sm:mb-8'>
                {reviews[current].content}
              </p>

              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0'>
                <div className='flex items-center gap-3'>
                  <User className='w-6 h-6 text-white' />
                  <div>
                    <h4 className='font-semibold'>{reviews[current].name}</h4>
                    <p className='text-gray-400 text-sm'>User</p>
                  </div>
                </div>

                <div className='flex items-center space-x-2 mb-3 md:mb-0'>
                  <div className='rating'>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`mask mask-star-2 w-6 h-6 opacity-100 ${
                          i < reviews[current].rating
                            ? 'bg-yellow-400'
                            : 'bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                  <span className='text-sm text-gray-400'>
                    {reviews[current].rating} / 5
                  </span>
                </div>
              </div>

              <div className='absolute top-1/2 right-2 sm:right-8 flex gap-2 transform -translate-y-1/2'>
                <button
                  onClick={prevSlide}
                  className='btn btn-circle btn-sm btn-outline text-white hover:bg-gray-700'
                >
                  ←
                </button>
                <button
                  onClick={nextSlide}
                  className='btn btn-circle btn-sm btn-outline text-white hover:bg-gray-700'
                >
                  →
                </button>
              </div>

              <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
                {reviews.map((_, i) => (
                  <span
                    key={i}
                    className={`w-6 h-1 rounded-full cursor-pointer transition-colors ${
                      i === current ? 'bg-orange-500' : 'bg-gray-600'
                    }`}
                    onClick={() => setCurrent(i)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className='flex flex-col items-center justify-center py-12 text-center gap-4'>
              <MessageSquare className='w-16 h-16 text-gray-500 animate-pulse' />
              <h3 className='text-xl sm:text-2xl font-semibold text-gray-300'>
                No Reviews Yet
              </h3>
              <p className='text-gray-400 max-w-xs'>
                Be the first to share your experience with us. Click “Write a
                Review” to get started!
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
