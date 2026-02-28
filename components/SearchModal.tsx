'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { Search, X, Command, Hash, Zap } from 'lucide-react'
import Link from 'next/link'

interface Item {
  id: string
  title: string
  slug: string
}

interface Category {
  items: Item[]
}

export default function SearchModal({ cat }: { cat: Category[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [query, setQuery] = useState('')

  // Gravestone Palette Definitions
  const colors = {
    vividPurple: '#6A1E55',
    roseDust: '#A64D79',
    richBlack: '#1A1A1D',
  }

  // Keyboard Shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsModalOpen((open) => !open)
      }
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const suggestions = useMemo(() => {
    return cat?.flatMap((c) => c.items) || []
  }, [cat])

  const filteredSuggestions = suggestions.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className='group flex items-center gap-3 px-4 py-2 bg-[#1A1A1D] border border-white/10 hover:border-[#6A1E55]/50 text-white/50 hover:text-white rounded-xl transition-all duration-300 shadow-lg'
      >
        <Search
          size={16}
          className='group-hover:text-[#A64D79] transition-colors'
        />
        <span className='text-xs font-bold tracking-widest uppercase hidden md:inline'>
          Search Logs...
        </span>
        <kbd className='hidden md:flex items-center gap-1 bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-[10px] font-mono'>
          <Command size={10} /> K
        </kbd>
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 bg-[#050505]/95 backdrop-blur-md z-[100] flex md:items-start md:justify-center md:pt-32'>
          <div className='w-full h-full md:h-auto md:max-w-2xl bg-[#111114] md:rounded-3xl shadow-[0_0_50px_rgba(106,30,85,0.2)] border border-[#6A1E55]/20 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200'>
            <div className='flex items-center gap-4 px-6 py-5 border-b border-white/5'>
              <Search className='text-[#6A1E55]' size={22} />
              <input
                type='text'
                placeholder='Access secure registry...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='w-full bg-transparent outline-none text-white placeholder:text-white/20 text-lg font-medium tracking-tight'
                autoFocus
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className='p-2 hover:bg-white/5 rounded-full transition-colors'
              >
                <X className='text-white/30 hover:text-[#A64D79]' size={20} />
              </button>
            </div>

            <div className='flex-1 max-h-[450px] overflow-y-auto custom-scrollbar'>
              {query === '' ? (
                <div className='py-20 text-center flex flex-col items-center justify-center gap-4'>
                  <div className='w-16 h-16 rounded-3xl bg-[#6A1E55]/10 flex items-center justify-center border border-[#6A1E55]/20'>
                    <Zap className='text-[#A64D79]' size={32} />
                  </div>
                  <div className='space-y-1'>
                    <p className='text-sm font-black uppercase tracking-[0.2em] text-white'>
                      Registry Search
                    </p>
                    <p className='text-xs text-white/30 font-medium'>
                      Enter keywords to query the seismic archives.
                    </p>
                  </div>
                </div>
              ) : (
                <div className='p-3'>
                  <p className='px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#A64D79] opacity-70'>
                    Results Match ({filteredSuggestions.length})
                  </p>
                  {filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((sug) => (
                      <Link
                        key={sug.id}
                        href={`/explore/${sug.slug}`}
                        onClick={() => setIsModalOpen(false)}
                        className='group flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-[#6A1E55]/10 transition-all duration-200 mb-1 border border-transparent hover:border-[#6A1E55]/30'
                      >
                        <div className='w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#6A1E55]/20 transition-colors'>
                          <Hash
                            size={16}
                            className='text-white/20 group-hover:text-[#A64D79]'
                          />
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-sm font-bold text-white/80 group-hover:text-white transition-colors'>
                            {sug.title}
                          </h3>
                          <p className='text-[10px] text-white/20 font-mono tracking-tighter uppercase'>
                            /{sug.slug}
                          </p>
                        </div>
                        <ChevronRight
                          size={14}
                          className='text-white/10 group-hover:text-[#A64D79] group-hover:translate-x-1 transition-all'
                        />
                      </Link>
                    ))
                  ) : (
                    <div className='px-6 py-10 text-center text-white/30 text-xs font-bold uppercase tracking-widest'>
                      Zero matches found in registry
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className='px-6 py-3 bg-white/[0.02] border-t border-white/5 flex justify-between items-center'>
              <span className='text-[9px] font-black text-white/20 uppercase tracking-widest'>
                Gravestone Search Engine v1.0
              </span>
              <div className='flex items-center gap-3'>
                <span className='text-[9px] text-white/40 flex items-center gap-1'>
                  <kbd className='bg-white/5 px-1 rounded'>ESC</kbd> to close
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6a1e55;
          border-radius: 10px;
        }
      `}</style>
    </>
  )
}

function ChevronRight({
  size,
  className,
}: {
  size: number
  className: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='m9 18 6-6-6-6' />
    </svg>
  )
}
