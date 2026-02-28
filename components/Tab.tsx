'use client'

import Link from 'next/link'
import { useState } from 'react'
import parse from 'html-react-parser'
import Image from 'next/image'
import { Edit3, ArrowUpRight, Box } from 'lucide-react'

export default function Tab({ categories, token }: any) {
  const [activeTab, setActiveTab] = useState(categories?.[0]?.id || null)

  const activeCategory = categories.find((cat: any) => cat.id === activeTab)

  return (
    <div className='w-full'>
      <div className='flex flex-wrap gap-3 mb-12 border-b border-white/5 pb-6'>
        {categories.map((cat: any) => {
          const isActive = activeTab === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative px-6 py-2 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300
                ${
                  isActive
                    ? 'bg-[#6A1E55] text-white shadow-[0_0_20px_rgba(106,30,85,0.4)]'
                    : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              {cat.title}
              {isActive && (
                <span className='absolute -bottom-[25px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#A64D79] shadow-[0_0_10px_#A64D79]' />
              )}
            </button>
          )
        })}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {activeCategory?.items.map((item: any) => (
          <Link
            href={`/explore/${item.slug}`}
            key={item.id}
            className='group relative bg-[#111114] rounded-3xl overflow-hidden border border-white/5 hover:border-[#6A1E55]/50 transition-all duration-500'
          >
            <div className='aspect-square relative overflow-hidden'>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0'
                sizes='(max-width: 640px) 100vw, 25vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent opacity-80' />

              <div className='absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <ArrowUpRight className='w-4 h-4 text-[#A64D79]' />
              </div>
            </div>

            <div className='p-5'>
              <div className='flex items-center gap-2 mb-1'>
                <Box className='w-3 h-3 text-[#6A1E55]' />
                <span className='text-[8px] font-black text-white/20 uppercase tracking-[0.2em]'>
                  Sector Log
                </span>
              </div>
              <h3 className='text-white font-bold text-sm tracking-tight group-hover:text-[#A64D79] transition-colors'>
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className='mt-16 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5'>
        <div className='max-w-3xl mx-auto text-center prose prose-invert prose-p:text-white/40 prose-p:text-sm prose-p:leading-relaxed prose-headings:text-white prose-headings:tracking-tighter'>
          {parse(activeCategory?.long_desc || '')}
        </div>
      </div>

      {token && (
        <Link
          href={`/control/categories/${activeCategory?.id}`}
          className='fixed bottom-10 right-10 z-50 flex items-center gap-3 bg-[#A64D79] hover:bg-[#6A1E55] text-white px-6 py-3 rounded-2xl font-bold text-xs tracking-widest uppercase transition-all shadow-2xl hover:scale-105 active:scale-95'
        >
          <Edit3 size={16} />
          Edit Registry
        </Link>
      )}
    </div>
  )
}
