import Articles from '@/components/Articles'
import Button from '@/components/Button'
import DepthSection from '@/components/DepthSection'
import Detailed from '@/components/Detailed'
import Graph from '@/components/Graph'
import Hero from '@/components/Hero'
import Queries from '@/components/Queries'
import React from 'react'

export default async function Page() {
  return (
    <div>
      <Hero />
      <DepthSection />
      <Articles />
      <Queries />
      <Detailed />
    </div>
  )
}
