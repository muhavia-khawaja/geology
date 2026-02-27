'use client'

import Link from 'next/link'
import { useState } from 'react'
import parse from 'html-react-parser'
import Image from 'next/image'

export default function Tab({ categories, token }: any) {
  const [activeTab, setActiveTab] = useState(categories?.[0]?.id || null)

  const activeCategory = categories.find((cat: any) => cat.id === activeTab)

  return (
    <div className='w-full'>
      <div className='flex flex-wrap gap-2 mb-8'>
        {categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition
              ${
                activeTab === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-black text-white hover:bg-gray-800'
              }
            `}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {activeCategory.items.map((item: any) => (
          <Link
            href={`/explore/${item.slug}`}
            key={item.id}
            className='card bg-black rounded-lg shadow-lg p-4 flex flex-col items-center'
          >
            <div className='w-full h-32 relative rounded-lg overflow-hidden mb-3'>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className='object-cover'
                sizes='(max-width: 640px) 100vw, 25vw'
                priority={false}
              />
            </div>

            <h3 className='text-white font-semibold text-center'>
              {item.title}
            </h3>
          </Link>
        ))}
      </div>

      <div className='space-y-3 mt-10 text-center'>
        {parse(activeCategory.long_desc || '')}
      </div>

      {token && (
        <Link href={`/control/categories/${activeCategory.id}`} className='fixed bottom-10 left-10 btn btn-primary'>
          Edit Category
        </Link>
      )}
    </div>
  )
}
