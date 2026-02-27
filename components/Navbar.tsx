'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  const links = [
    { name: 'EXPLORE', href: '/explore' },
    { name: 'ARTICLES', href: '/blog' },
    { name: 'DOCUMENTATION', href: '#' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'Real Time Data', href: '/real-time-data' },
    { name: 'OPTIMIZATION', href: '#' },
  ]

  return (
    <>
      <div className='fixed top-6 left-1/2 z-[1001] w-[92%] -translate-x-1/2'>
        <div className='navbar rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg shadow-white/10 px-6'>
          <div className='lg:hidden navbar-start'>
            <button
              onClick={toggleDrawer}
              className='btn btn-ghost btn-circle'
              aria-label='Menu'
            >
              {drawerOpen ? (
                <X className='w-6 h-6 text-white' />
              ) : (
                <Menu className='w-6 h-6 text-white' />
              )}
            </button>
          </div>

          <div className='navbar-start hidden lg:flex gap-4'>
            {links.slice(0, 3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className=' px-10 font-semibold text-xs tracking-widest text-white/70 hover:text-white hover:bg-transparent'
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className='navbar-center'>
            <Link
              href={'/'}
              className='text-lg font-semibold lowercase tracking-wide text-white'
            >
              gravestone
            </Link>
          </div>

          <div className='lg:hidden navbar-end'>
            <button className='btn btn-ghost btn-circle'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </button>
          </div>

          <div className='navbar-end hidden lg:flex gap-4'>
            {links.slice(3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className=' px-10 font-semibold text-xs tracking-widest text-white/70 hover:text-white hover:bg-transparent border-none'
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-96 bg-black/90 backdrop-blur-xl shadow-2xl z-40 transform transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex justify-between items-center p-6 border-b border-gray-700'>
          <span className='text-lg font-semibold lowercase tracking-wide text-white'>
            gravestone
          </span>
          <button onClick={toggleDrawer}>
            <X className='w-6 h-6 text-white' />
          </button>
        </div>

        <ul className='menu p-6 space-y-4'>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className='text-white font-medium text-lg hover:text-green-400 transition'
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {drawerOpen && <div className='fixed z-50' onClick={toggleDrawer} />}
    </>
  )
}
