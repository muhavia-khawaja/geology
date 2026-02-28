'use client'

import { useEffect, useState, useMemo } from 'react'
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  LayersControl,
  useMap,
} from 'react-leaflet'
// @ts-ignore
import 'leaflet/dist/leaflet.css'
import {
  Activity,
  RefreshCw,
  ChevronRight,
  Search,
  BarChart3,
  Waves,
  Clock,
  Calendar,
  Navigation2,
} from 'lucide-react'
import Link from 'next/link'

interface EarthquakeFeature {
  id: string
  properties: { mag: number; place: string; time: number; depth: number }
  geometry: { coordinates: [number, number, number] }
}

export default function EarthQuakeMap() {
  const [quakes, setQuakes] = useState<EarthquakeFeature[]>([])
  const [loading, setLoading] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [minMag, setMinMag] = useState(4.0)
  const [maxDepth, setMaxDepth] = useState(700)
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  )
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [selected, setSelected] = useState<EarthquakeFeature | null>(null)

  const colors = {
    richBlack: '#1A1A1D',
    deepPlum: '#3B1C32',
    vividPurple: '#6A1E55',
    roseDust: '#A64D79',
  }

  const fetchQuakes = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&minmagnitude=2.5&limit=300`,
      )
      const data = await res.json()
      const formatted = data.features.map((f: any) => ({
        ...f,
        properties: { ...f.properties, depth: f.geometry.coordinates[2] },
      }))
      setQuakes(formatted)
    } catch (err) {
      console.error('Link Failure:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuakes()
  }, [])

  const filteredQuakes = useMemo(() => {
    return quakes
      .filter((q) => {
        const matchesSearch = q.properties.place
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
        const matchesMag = q.properties.mag >= minMag
        const matchesDepth = q.properties.depth <= maxDepth
        return matchesSearch && matchesMag && matchesDepth
      })
      .slice(0, 100)
  }, [quakes, searchQuery, minMag, maxDepth])

  return (
    <div className='flex flex-col h-screen w-full bg-[#0D0D0F] text-slate-200 overflow-hidden font-sans pt-16'>
      <header className='px-8 py-4 border-b border-white/5 bg-[#0D0D0F] z-30 shadow-2xl'>
        <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-6'>
          <div className='flex items-center gap-4'>
            <div className='p-2 rounded-lg bg-vivid-purple/10 border border-vivid-purple/20'>
              <Activity className='w-6 h-6 text-rose-dust' />
            </div>
            <h1 className='text-lg font-black tracking-tighter text-white uppercase'>
              Seismic<span className='text-vivid-purple'>Scan_V2</span>
            </h1>
          </div>

          <div className='flex flex-wrap items-center gap-3 bg-white/[0.02] p-2 rounded-2xl border border-white/5'>
            <div className='relative group border-r border-white/5 pr-3'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20' />
              <input
                type='text'
                placeholder='Locality...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='bg-black/40 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-[10px] w-32 focus:outline-none focus:border-vivid-purple/50'
              />
            </div>

            <div className='flex items-center gap-2 border-r border-white/5 pr-3'>
              <Calendar size={14} className='text-vivid-purple' />
              <div className='flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5'>
                <input
                  type='date'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className='bg-transparent text-[9px] font-black uppercase text-white/60 focus:outline-none focus:text-white cursor-pointer'
                />
                <span className='text-white/20 text-[10px]'>—</span>
                <input
                  type='date'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className='bg-transparent text-[9px] font-black uppercase text-white/60 focus:outline-none focus:text-white cursor-pointer'
                />
              </div>
            </div>

            <div className='flex items-center gap-4 border-r border-white/5 pr-3'>
              <div className='flex flex-col'>
                <span className='text-[7px] font-black text-white/20 uppercase'>
                  Mag_Gate: {minMag}
                </span>
                <input
                  type='range'
                  min='2.5'
                  max='9'
                  step='0.5'
                  value={minMag}
                  onChange={(e) => setMinMag(parseFloat(e.target.value))}
                  className='w-16 h-1 accent-vivid-purple bg-white/5 rounded-lg appearance-none cursor-pointer'
                />
              </div>
              <div className='flex flex-col'>
                <span className='text-[7px] font-black text-white/20 uppercase'>
                  Depth_Max: {maxDepth}km
                </span>
                <input
                  type='range'
                  min='10'
                  max='700'
                  step='50'
                  value={maxDepth}
                  onChange={(e) => setMaxDepth(parseInt(e.target.value))}
                  className='w-16 h-1 accent-rose-dust bg-white/5 rounded-lg appearance-none cursor-pointer'
                />
              </div>
            </div>

            <button
              onClick={fetchQuakes}
              className='flex items-center gap-2 bg-vivid-purple hover:bg-rose-dust text-white px-4 py-2 rounded-xl text-[9px] font-black tracking-widest transition-all uppercase'
            >
              <RefreshCw className={`w-3 h-3 ${loading && 'animate-spin'}`} />
              Sync Data
            </button>
          </div>
        </div>
      </header>

      <div className='flex flex-1 overflow-hidden w-full'>
        <aside className='hidden md:flex w-[380px] flex-col border-r border-white/5 bg-[#0D0D0F]'>
          <div className='px-6 py-4 flex justify-between items-center border-b border-white/5'>
            <span className='text-[9px] font-black tracking-[.3em] uppercase text-white/30'>
              Event_Log
            </span>
            <div className='px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-rose-dust'>
              {filteredQuakes.length} Nodes
            </div>
          </div>

          <div className='flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2'>
            {filteredQuakes.map((quake) => (
              <div
                key={quake.id}
                onClick={() => setSelected(quake)}
                className={`group p-4 cursor-pointer rounded-xl border transition-all duration-300 ${selected?.id === quake.id ? 'bg-vivid-purple/20 border-vivid-purple/50' : 'bg-white/[0.02] border-white/[0.03] hover:border-white/10'}`}
              >
                <div className='flex items-center gap-4'>
                  <div
                    className='text-xs font-black w-10 h-10 rounded-lg flex items-center justify-center bg-black/60 border border-white/5'
                    style={{
                      color: quake.properties.mag >= 5 ? '#A64D79' : '#6A1E55',
                    }}
                  >
                    {quake.properties.mag.toFixed(1)}
                  </div>
                  <div className='flex-1'>
                    <h4 className='text-[10px] font-bold text-white uppercase tracking-tight truncate w-48'>
                      {quake.properties.place}
                    </h4>
                    <p className='text-[8px] font-mono text-white/20 mt-1 uppercase'>
                      {new Date(quake.properties.time).toLocaleDateString()}
                      {new Date(quake.properties.time).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className='flex-1 relative'>
          <MapContainer
            center={[20, 0]}
            zoom={3}
            className='h-full w-full grayscale-[0.3] brightness-[0.7]'
            zoomControl={false}
          >
            <TileLayer url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' />
            {filteredQuakes.map((quake) => {
              const [lng, lat] = quake.geometry.coordinates
              const color = quake.properties.mag >= 6 ? '#A64D79' : '#6A1E55'
              return (
                <CircleMarker
                  key={quake.id}
                  center={[lat, lng]}
                  radius={quake.properties.mag * 3}
                  pathOptions={{
                    color,
                    fillColor: color,
                    fillOpacity: 0.4,
                    weight: 1,
                  }}
                  eventHandlers={{ click: () => setSelected(quake) }}
                >
                  <Popup className='seismic-popup'>
                    <div className='p-2 bg-[#0D0D0F]'>
                      <p className='text-[8px] font-black text-rose-dust uppercase mb-1'>
                        Mag {quake.properties.mag}
                      </p>
                      <p className='text-[10px] font-bold text-white mb-2'>
                        {quake.properties.depth}km
                      </p>
                      <h3 className='text-white text-[10px] font-bold uppercase mb-2'>
                        {quake.properties.place}
                      </h3>
                      <Link
                        href={`/real-time-data/${quake.id}`}
                        className='text-[8px] font-black text-vivid-purple uppercase'
                      >
                        View Telemetry →
                      </Link>
                    </div>
                  </Popup>
                </CircleMarker>
              )
            })}
            {selected && (
              <FlyToLocation
                coords={[
                  selected.geometry.coordinates[1],
                  selected.geometry.coordinates[0],
                ]}
              />
            )}
          </MapContainer>
        </main>
      </div>

      <style jsx global>{`
        .leaflet-container {
          background: #0d0d0f !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6a1e5533;
          border-radius: 10px;
        }
        .seismic-popup .leaflet-popup-content-wrapper {
          background: #0d0d0f !important;
          border: 1px solid #6a1e55;
          border-radius: 8px;
          color: white;
        }
        .seismic-popup .leaflet-popup-tip {
          background: #6a1e55 !important;
        }
        input[type='date']::-webkit-calendar-picker-indicator {
          filter: invert(1) brightness(0.5);
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

function FlyToLocation({ coords }: { coords: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    if (coords) map.flyTo(coords, 5)
  }, [coords, map])
  return null
}
