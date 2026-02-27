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
import 'leaflet/dist/leaflet.css'

// --- Types ---
interface EarthquakeProperties {
  mag: number
  place: string
  time: number
}
interface EarthquakeGeometry {
  coordinates: [number, number, number]
}
interface EarthquakeFeature {
  id: string
  properties: EarthquakeProperties
  geometry: EarthquakeGeometry
}
interface EarthquakeResponse {
  features: EarthquakeFeature[]
}

function FlyToLocation({ coords }: { coords: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    if (coords) map.flyTo(coords, 6, { duration: 1.5, easeLinearity: 0.25 })
  }, [coords, map])
  return null
}

export default function EarthQuakeMap() {
  const [quakes, setQuakes] = useState<EarthquakeFeature[]>([])
  const [selected, setSelected] = useState<EarthquakeFeature | null>(null)
  const [loading, setLoading] = useState(false)
  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')

  const MAX_DISPLAY = 40

  const fetchQuakes = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (from) params.append('starttime', from)
      if (to) params.append('endtime', to)
      params.append('format', 'geojson')
      params.append('minmagnitude', '2.5')
      const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?${params.toString()}`
      const res = await fetch(url)
      const data: EarthquakeResponse = await res.json()
      const sorted = data.features.sort(
        (a, b) => b.properties.time - a.properties.time,
      )
      setQuakes(sorted.slice(0, MAX_DISPLAY))
    } catch (err) {
      console.error('Failed to fetch USGS data', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuakes()
    const interval = setInterval(fetchQuakes, 120000)
    return () => clearInterval(interval)
  }, [from, to])

  const getColor = (mag: number) => {
    if (mag >= 6) return '#f43f5e'
    if (mag >= 5) return '#fb923c'
    if (mag >= 4) return '#fbbf24'
    return '#2dd4bf'
  }

  const markers = useMemo(
    () =>
      quakes.map((quake) => {
        const [lng, lat] = quake.geometry.coordinates
        const mag = quake.properties.mag
        const isSelected = selected?.id === quake.id
        return (
          <CircleMarker
            key={quake.id}
            center={[lat, lng]}
            radius={isSelected ? mag * 5 : mag * 3}
            pathOptions={{
              color: isSelected ? '#ffffff' : getColor(mag),
              fillColor: getColor(mag),
              fillOpacity: isSelected ? 0.8 : 0.4,
              weight: isSelected ? 3 : 1.5,
            }}
            eventHandlers={{ click: () => setSelected(quake) }}
          >
            <Popup className='dark-popup'>
              <div className='p-1 text-slate-200'>
                <h3 className='font-bold text-sm mb-1'>
                  {quake.properties.place}
                </h3>
                <div className='flex justify-between text-xs opacity-80'>
                  <span>Mag: {mag.toFixed(1)}</span>
                  <span>
                    {new Date(quake.properties.time).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        )
      }),
    [quakes, selected],
  )

  return (
    <div className='flex flex-col h-screen w-full bg-[#050505] text-slate-200 overflow-hidden font-sans selection:bg-teal-500/30 py-28'>
      <header className='px-6 py-8 border-b border-white/5 bg-gradient-to-b from-neutral-900 to-transparent'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4'>
          <div>
            <h1 className='text-4xl font-black tracking-tighter text-white  uppercase'>
              Seismic Monitor
            </h1>
            <p className='text-xs font-medium tracking-[0.2em] text-teal-400 uppercase mt-1'>
              Live Global Activity Report
            </p>
          </div>

          <div className='flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/10 backdrop-blur-md'>
            <div className='flex flex-col px-2'>
              <span className='text-[10px] uppercase opacity-40 font-bold'>
                Start Range
              </span>
              <input
                type='datetime-local'
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className='bg-transparent text-xs focus:outline-none'
              />
            </div>
            <div className='h-8 w-px bg-white/10' />
            <button
              onClick={fetchQuakes}
              disabled={loading}
              className='bg-white text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-teal-400 transition-colors disabled:opacity-50'
            >
              {loading ? 'SYNCING...' : 'REFRESH'}
            </button>
          </div>
        </div>
      </header>

      <div className='flex flex-1 overflow-hidden'>
        <aside className='w-full md:w-[380px] flex flex-col border-r border-white/5 bg-[#0a0a0a]'>
          <div className='p-4 flex justify-between items-center bg-white/5'>
            <span className='text-[10px] font-black tracking-widest uppercase text-neutral-500'>
              Recent Events ({quakes.length})
            </span>
          </div>

          <div className='flex-1 overflow-y-auto custom-scrollbar'>
            {quakes.map((quake) => {
              const isSelected = selected?.id === quake.id
              const color = getColor(quake.properties.mag)
              return (
                <div
                  key={quake.id}
                  onClick={() => setSelected(quake)}
                  className={`group relative flex items-center p-4 cursor-pointer border-b border-white/5 transition-all
                    ${isSelected ? 'bg-teal-500/10' : 'hover:bg-white/[0.02]'}`}
                >
                  {isSelected && (
                    <div className='absolute left-0 w-1 h-full bg-teal-400' />
                  )}

                  <div
                    className='w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0 transition-transform group-hover:scale-110'
                    style={{ borderColor: `${color}44`, color: color }}
                  >
                    <span className='font-black text-sm'>
                      {quake.properties.mag.toFixed(1)}
                    </span>
                  </div>

                  <div className='ml-4 flex-1'>
                    <div
                      className={`text-sm font-bold transition-colors ${isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}
                    >
                      {quake.properties.place.split('of ').pop()}
                    </div>
                    <div className='flex justify-between mt-1 items-center'>
                      <span className='text-[10px] font-mono opacity-40 uppercase'>
                        {new Date(quake.properties.time).toLocaleTimeString(
                          [],
                          { hour: '2-digit', minute: '2-digit' },
                        )}
                      </span>
                      <span className='text-[10px] px-2 py-0.5 rounded bg-white/5 text-neutral-500'>
                        {quake.geometry.coordinates[2].toFixed(0)}km
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </aside>

        <main className='flex-1 relative bg-neutral-900'>
          <MapContainer
            center={[20, 0]}
            zoom={3}
            className='h-full w-full grayscale-[0.5] contrast-[1.1]'
            zoomControl={false}
          >
            <TileLayer
              url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              noWrap
            />

            <LayersControl position='topright'>
              <LayersControl.Overlay name='Tectonic Plates'>
                <TileLayer
                  url='https://earthquake.usgs.gov/basemap/tiles/plates/{z}/{x}/{y}.png'
                  opacity={0.4}
                  noWrap
                />
              </LayersControl.Overlay>
            </LayersControl>

            {markers}

            {selected && (
              <FlyToLocation
                coords={[
                  selected.geometry.coordinates[1],
                  selected.geometry.coordinates[0],
                ]}
              />
            )}
          </MapContainer>

          <div className='absolute bottom-6 right-6 p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl'>
            <h4 className='text-[10px] font-black uppercase tracking-widest mb-3 text-neutral-400'>
              Magnitude Intensity
            </h4>
            <div className='flex items-center gap-4'>
              {[3, 4, 5, 6].map((m) => (
                <div key={m} className='flex flex-col items-center gap-1'>
                  <div
                    className='w-2 rounded-full'
                    style={{
                      backgroundColor: getColor(m),
                      height: `${m * 4}px`,
                    }}
                  />
                  <span className='text-[9px] font-bold'>{m}+</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        .leaflet-container {
          background: #050505 !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .dark-popup .leaflet-popup-content-wrapper {
          background: #111 !important;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }
        .dark-popup .leaflet-popup-tip {
          background: #111 !important;
        }
      `}</style>
    </div>
  )
}
