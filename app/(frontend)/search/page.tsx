import React from 'react'

export default function page({
  searchParams,
}: {
  searchParams: Record<string, string>
}) {
  const query = searchParams.query || ''
  return (
    <div className='py-20 max-w-7xl mx-auto text-black'>
      <h1 className='text-3xl font-bold mb-4'>Search Results</h1>
      {query ? (
        <p className='mb-6'>
          Showing results for: <span className='font-semibold'>{query}</span>
        </p>
      ) : (
        <p className='mb-6'>Please enter a search query.</p>
      )}

      <section>
        <h2 className='text-2xl font-semibold mb-4'>Results:</h2>
        <ul className='list-disc list-inside space-y-2'>
          <li>
            <a href='#' className='text-blue-600 hover:underline'>
              Geology Article 1
            </a>
          </li>
          <li>
            <a href='#' className='text-blue-600 hover:underline'>
              Geology Article 2
            </a>
          </li>
          <li>
            <a href='#' className='text-blue-600 hover:underline'>
              Geology Article 3
            </a>
          </li>
          <li>
            <a href='#' className='text-blue-600 hover:underline'>
              Geology Article 4
            </a>
          </li>
          <li>
            <a href='#' className='text-blue-600 hover:underline'>
              Geology Article 5
            </a>
          </li>
          <li>
            <a href='#' className='text-blue-600 hover:underline'>
              Geology Article 6
            </a>
          </li>
          <li>
            <a href='#' className='text-blue-600 hover:underline'>
              Geology Article 7
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
