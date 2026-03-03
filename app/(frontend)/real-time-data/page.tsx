import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

const MapSkeleton = () => (
  <div className='w-full h-[500px] rounded-2xl border border-gray-700 shadow-lg bg-gray-900 relative overflow-hidden animate-pulse'>
    <div className='absolute top-4 left-4 w-24 h-6 bg-gray-700 rounded-md' />
    <div className='absolute top-4 right-4 w-16 h-6 bg-gray-700 rounded-md' />
    <div className='flex items-center justify-center h-full'>
      <span className='text-white/50 font-semibold text-lg'>
        Loading Map...
      </span>
    </div>
  </div>
)

const EarthquakeMapContent = dynamic(
  () => import('@/components/EarthquakeMapComponent'),
  {
    ssr: false,
    loading: () => <MapSkeleton />,
  },
)

export const metadata: Metadata = {
  title: 'Real-Time Geological Data',
  description:
    'Explore geological categories, access seismic logs, tectonic data, and educational resources across protected sectors in real-time.',
  keywords:
    'Gravestone, geological intelligence, Earth history, sub-surface signals, geology platform, seismic decryption, geological research, geology education, earthquake map, real-time seismic data',
}

export default function RealTimeDataPage() {
  return (
    <main>
      <EarthquakeMapContent />
    </main>
  )
}
