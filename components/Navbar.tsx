'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  const links = [
    { name: 'EXPLORE', href: '/explore' },
    { name: 'ARTICLES', href: '/blog' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'DATA', href: '/real-time-data' },
  ]

  return (
    <>
      <div className='fixed top-6 left-1/2  w-[92%] -translate-x-1/2 z-50'>
        <div className='navbar rounded-full border border-vivid-purple/30 bg-rich-black/80 backdrop-blur-md shadow-2xl shadow-black/50 px-6'>
          <div className='lg:hidden navbar-start'>
            <button
              onClick={toggleDrawer}
              className='btn btn-ghost btn-circle hover:bg-deep-plum text-rose-dust'
              aria-label='Menu'
            >
              {drawerOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>

          <div className='navbar-start hidden lg:flex gap-2'>
            {links.slice(0, 2).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className='btn btn-ghost rounded-full px-8 font-bold text-[10px] tracking-[0.2em] text-white/70 hover:text-rose-dust hover:bg-deep-plum/40 transition-all'
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className='navbar-center'>
            <Link
              href={'/'}
              className='text-2xl font-black lowercase tracking-tighter text-white hover:text-rose-dust transition-colors'
            >
              grave<span className='text-vivid-purple'>stone</span>
            </Link>
          </div>

          <div className='lg:hidden navbar-end'>
            <button className='btn btn-ghost btn-circle text-rose-dust'>
              <Search className='w-5 h-5' />
            </button>
          </div>

          <div className='navbar-end hidden lg:flex gap-2'>
            {links.slice(2).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className='btn btn-ghost rounded-full px-8 font-bold text-[10px] tracking-[0.2em] text-white/70 hover:text-rose-dust hover:bg-deep-plum/40 transition-all'
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-rich-black border-r border-vivid-purple/20 shadow-2xl z-40 transform transition-transform duration-500 ease-in-out ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex justify-between items-center p-8'>
          <span className='text-xl font-bold lowercase text-white'>
            gravestone
          </span>
          <button
            onClick={toggleDrawer}
            className='p-2 hover:bg-deep-plum rounded-full text-rose-dust'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        <ul className='menu px-6 py-4 gap-4'>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className='text-white/80 font-semibold text-xl py-4 hover:bg-vivid-purple/20 hover:text-rose-dust border-b border-white/5 rounded-none'
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className='absolute bottom-10 left-8 right-8 h-px bg-gradient-to-r from-transparent via-vivid-purple to-transparent opacity-50' />
      </div>

      {drawerOpen && (
        <div
          className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[1001] transition-opacity'
          onClick={toggleDrawer}
        />
      )}
    </>
  )
}
