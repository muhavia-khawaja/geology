import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { Suspense } from 'react'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-black p-6 md:p-10'>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  )
}
