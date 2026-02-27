import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-[#151515] text-neutral-content rounded-xl px-6 py-10'>
      <div className='max-w-7xl mx-auto flex flex-col gap-10 md:grid md:grid-cols-4'>
        <div className='flex flex-col justify-between gap-6'>
          <h2 className='text-3xl font-semibold lowercase tracking-wide text-white'>
            grave <br />
            stone
          </h2>

          <p className='text-sm text-white/50 md:hidden'>
            © 2024 Gravestone. All rights reserved.
          </p>
        </div>

        <div>
          <h6 className='text-white font-semibold mb-4'>System Integration</h6>
          <div className='flex flex-col gap-2 text-white/70'>
            <a className='hover:text-white transition'>Facebook</a>
            <a className='hover:text-white transition'>GitHub</a>
          </div>
        </div>

        <div>
          <h6 className='text-white font-semibold mb-4'>Explore</h6>
          <div className='flex flex-col gap-2 text-white/70'>
            <a className='hover:text-white transition'>Features</a>
            <a className='hover:text-white transition'>Enterprise</a>
          </div>
        </div>

        <div className='flex items-end md:items-start'>
          <p className='text-white/60'>Built with ❤️ by Gravestone Team</p>
        </div>
      </div>

      <div className='hidden md:block mt-10 border-t border-white/10 pt-6 text-sm text-white/50 text-right max-w-7xl mx-auto'>
        © 2024 Gravestone. All rights reserved.
      </div>
    </footer>
  )
}
