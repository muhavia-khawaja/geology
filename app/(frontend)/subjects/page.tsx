import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
  const subjectsLength = 20
  return (
    <div className='p-20'>
      <h2>{subjectsLength} Subject</h2>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-10 mt-4'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='card shadow-2xl  hover:animate-pulse transform rotate-6 hover:rotate-0 cursor-pointer'
          >
            <figure>
              <Image src='/banner.jpg' alt='' width={300} height={300} />
            </figure>
            <div className='card-body mt-0'>
              <h2 className='card-title '>Subject {i + 1}</h2>
              <p className='text-gray-100'>
                Author:{' '}
                <span className='text-primary font-bold'>
                  Mark Lewis {i + 1}
                </span>
              </p>
              <Link
                href={'#'}
                className='text-primary hover:underline leading-10 '
              >
                View Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
