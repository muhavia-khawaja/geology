import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { Suspense } from 'react'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-rich-black min-h-screen relative selection:bg-rose-dust selection:text-white'>
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-50"></div>

      <div className='fixed -top-24 -left-24 w-96 h-96 bg-vivid-purple/10 blur-[120px] rounded-full pointer-events-none' />
      <div className='fixed -bottom-24 -right-24 w-96 h-96 bg-deep-plum/20 blur-[120px] rounded-full pointer-events-none' />

      <Navbar />

      <main className='relative z-10 pt-20'>
        <Suspense
          fallback={
            <div className='flex h-[50vh] w-full items-center justify-center'>
              <span className='loading loading-ring loading-lg text-vivid-purple'></span>
            </div>
          }
        >
          {children}
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
