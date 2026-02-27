import HelpSection from '@/components/HelpSection'
import React, { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<div className='min-h-screen bg-black' />}>
      <HelpSection />
    </Suspense>
  )
}
