'use client'
import React, { useState, useMemo } from 'react'
import { Search, SearchIcon, X } from 'lucide-react'
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
        className='px-4 py-2 bg-black text-white rounded-md'
      >
        <Search className='w-4 h-4 text-white' />
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex md:items-start md:justify-center md:pt-32'>
          <div
            className='
        w-full h-full md:h-auto
        md:max-w-2xl
        bg-zinc-900
        md:rounded-2xl
        shadow-2xl
        border border-zinc-800
        flex flex-col
      '
          >
            <div className='flex items-center gap-3 px-5 py-4 border-b border-zinc-800'>
              <Search className='text-zinc-400' size={20} />
              <input
                type='text'
                placeholder='Search...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='w-full bg-transparent outline-none text-white placeholder:text-zinc-500 text-lg'
                autoFocus
              />
              <button onClick={() => setIsModalOpen(false)}>
                <X className='text-zinc-400 hover:text-white' size={20} />
              </button>
            </div>

            {query === '' && (
              <div className='py-10 max-h-80 text-center flex flex-col items-center justify-center gap-4'>
                <SearchIcon className='w-6 h-6 text-white' />
                <p>Try Searching with different Keywords </p>
              </div>
            )}

            <div className='py-3 max-h-80 overflow-y-auto'>
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((sug) => (
                  <Link
                    key={sug.id}
                    href={`/explore/${sug.slug}`}
                    onClick={() => setIsModalOpen(false)}
                    className='block px-5 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white transition'
                  >
                    {sug.title}
                  </Link>
                ))
              ) : (
                <div className='px-5 py-3 text-zinc-500'>No results found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
