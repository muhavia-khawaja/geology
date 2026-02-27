import dynamic from 'next/dynamic'

const EarthquakeMapContent = dynamic(
  () => import('@/components/EarthquakeMapComponent'),
  {
    ssr: false,
    loading: () => (
      <p className='text-white text-center p-10'>Loading Map...</p>
    ),
  },
)

export default function RealTimeDataPage() {
  return (
    <main>
      <EarthquakeMapContent />
    </main>
  )
}
