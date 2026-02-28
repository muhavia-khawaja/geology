import {
  Activity,
  MapPin,
  Clock,
  ShieldAlert,
  Navigation,
  Layers,
} from 'lucide-react'
import Link from 'next/link'

async function getQuakeDetails(id: string) {
  const res = await fetch(
    `https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=${id}&format=geojson`,
    {
      next: { revalidate: 3600 },
    },
  )
  if (!res.ok) return null
  return res.json()
}

export default async function QuakeDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const data = await getQuakeDetails(params.id)

  if (!data) {
    return (
      <div className='min-h-screen bg-rich-black flex items-center justify-center'>
        <p className='text-rose-dust font-mono'>ERROR: EVENT_ID_NOT_FOUND</p>
      </div>
    )
  }

  const { properties, geometry } = data
  const [longitude, latitude, depth] = geometry.coordinates
  const date = new Date(properties.time).toLocaleString()

  return (
    <div className='min-h-screen bg-rich-black text-white pt-32 pb-20 px-6'>
      <div className='mx-auto max-w-5xl'>
        <Link
          href='/real-time-data'
          className='text-[10px] font-bold text-vivid-purple hover:text-rose-dust transition-colors tracking-[.3em] uppercase mb-12 block'
        >
          ← Back to Archive
        </Link>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          <div className='lg:col-span-2 space-y-8'>
            <header>
              <div className='flex items-center gap-3 mb-4'>
                <div className='px-3 py-1 rounded-full bg-vivid-purple/20 border border-vivid-purple/40 text-vivid-purple text-[10px] font-black tracking-widest uppercase'>
                  Event Analysis
                </div>
                {properties.tsunami === 1 && (
                  <div className='flex items-center gap-1 text-rose-dust animate-pulse'>
                    <ShieldAlert className='w-4 h-4' />
                    <span className='text-[10px] font-black uppercase'>
                      Tsunami Warning
                    </span>
                  </div>
                )}
              </div>
              <h1 className='text-4xl md:text-6xl font-black tracking-tighter mb-6'>
                {properties.place}
              </h1>
            </header>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='bg-deep-plum/10 border border-white/5 p-6 rounded-2xl'>
                <p className='text-[10px] text-white/30 font-bold uppercase tracking-widest mb-2'>
                  Magnitude
                </p>
                <p className='text-4xl font-black text-rose-dust'>
                  {properties.mag.toFixed(1)}
                </p>
              </div>
              <div className='bg-deep-plum/10 border border-white/5 p-6 rounded-2xl'>
                <p className='text-[10px] text-white/30 font-bold uppercase tracking-widest mb-2'>
                  Depth
                </p>
                <p className='text-4xl font-black text-vivid-purple'>
                  {depth.toFixed(1)}
                  <span className='text-sm ml-1 text-white/40'>km</span>
                </p>
              </div>
              <div className='bg-deep-plum/10 border border-white/5 p-6 rounded-2xl'>
                <p className='text-[10px] text-white/30 font-bold uppercase tracking-widest mb-2'>
                  Alert
                </p>
                <p
                  className={`text-xl font-black uppercase ${properties.alert ? 'text-rose-dust' : 'text-white/60'}`}
                >
                  {properties.alert || 'None'}
                </p>
              </div>
              <div className='bg-deep-plum/10 border border-white/5 p-6 rounded-2xl'>
                <p className='text-[10px] text-white/30 font-bold uppercase tracking-widest mb-2'>
                  Gap
                </p>
                <p className='text-xl font-black text-white/60'>
                  {properties.gap}°
                </p>
              </div>
            </div>

            <div className='bg-deep-plum/5 border border-vivid-purple/20 rounded-3xl p-8 relative overflow-hidden'>
              <div className='relative z-10 flex flex-col md:flex-row justify-between gap-8'>
                <div className='space-y-6'>
                  <div className='flex items-center gap-3'>
                    <Navigation className='w-5 h-5 text-vivid-purple' />
                    <h3 className='text-xl font-bold'>Coordinates</h3>
                  </div>
                  <div className='font-mono space-y-2'>
                    <p className='text-sm text-white/60 uppercase tracking-widest'>
                      Lat: <span className='text-white'>{latitude}</span>
                    </p>
                    <p className='text-sm text-white/60 uppercase tracking-widest'>
                      Long: <span className='text-white'>{longitude}</span>
                    </p>
                  </div>
                </div>
                <div className='space-y-6 md:text-right'>
                  <div className='flex items-center md:justify-end gap-3'>
                    <Clock className='w-5 h-5 text-vivid-purple' />
                    <h3 className='text-xl font-bold'>Origin Time</h3>
                  </div>
                  <p className='text-sm text-white/60 font-mono'>{date} UTC</p>
                </div>
              </div>

              <div className='absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#6A1E55_1px,transparent_1px),linear-gradient(to_bottom,#6A1E55_1px,transparent_1px)] [background-size:2rem_2rem] -z-0' />
            </div>
          </div>

          <div className='space-y-6'>
            <div className='bg-rich-black border border-white/10 p-8 rounded-3xl'>
              <div className='flex items-center gap-2 mb-6'>
                <Layers className='w-4 h-4 text-rose-dust' />
                <h3 className='text-xs font-bold tracking-[.2em] uppercase'>
                  Detailed Metadata
                </h3>
              </div>
              <ul className='space-y-4'>
                <li className='flex justify-between border-b border-white/5 pb-2'>
                  <span className='text-[10px] text-white/30 uppercase'>
                    Status
                  </span>
                  <span className='text-[10px] font-bold text-vivid-purple uppercase'>
                    {properties.status}
                  </span>
                </li>
                <li className='flex justify-between border-b border-white/5 pb-2'>
                  <span className='text-[10px] text-white/30 uppercase'>
                    Significance
                  </span>
                  <span className='text-[10px] font-bold text-white/80'>
                    {properties.sig}
                  </span>
                </li>
                <li className='flex justify-between border-b border-white/5 pb-2'>
                  <span className='text-[10px] text-white/30 uppercase'>
                    RMS Error
                  </span>
                  <span className='text-[10px] font-bold text-white/80'>
                    {properties.rms}s
                  </span>
                </li>
                <li className='flex justify-between'>
                  <span className='text-[10px] text-white/30 uppercase'>
                    ID
                  </span>
                  <span className='text-[10px] font-bold text-white/40'>
                    {params.id}
                  </span>
                </li>
              </ul>

              <a
                href={properties.url}
                target='_blank'
                className='mt-8 block w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold tracking-widest text-center uppercase transition-all'
              >
                View on USGS Site
              </a>
            </div>

            <div className='bg-vivid-purple/5 border border-vivid-purple/10 p-8 rounded-3xl'>
              <Activity className='w-8 h-8 text-vivid-purple mb-4' />
              <p className='text-xs text-white/40 leading-relaxed font-light'>
                Geoacoustic signal captured via Gravestone Deep Core Array.
                Interference index calculated at 0.314.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
