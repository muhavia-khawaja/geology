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
    if (coords) map.flyTo(coords, 7, { duration: 1.2 })
  }, [coords, map])
  return null
}

export default function EarthQuakeMap() {
  const [quakes, setQuakes] = useState<EarthquakeFeature[]>([])
  const [selected, setSelected] = useState<EarthquakeFeature | null>(null)
  const [loading, setLoading] = useState(false)
  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')

  const MAX_DISPLAY = 50

  const fetchQuakes = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (from) params.append('starttime', from)
      if (to) params.append('endtime', to)
      params.append('format', 'geojson')
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
    const interval = setInterval(fetchQuakes, 60000)
    return () => clearInterval(interval)
  }, [from, to])

  const getColor = (mag: number) => {
    if (mag >= 6) return '#7a0177'
    if (mag >= 5) return '#d73027'
    if (mag >= 4) return '#fc8d59'
    if (mag >= 2.5) return '#fee08b'
    return '#91bfdb'
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
            radius={isSelected ? mag * 6 : mag * 4}
            pathOptions={{
              color: isSelected ? '#000' : getColor(mag),
              fillColor: getColor(mag),
              fillOpacity: 0.6,
              weight: isSelected ? 3 : 1,
            }}
            eventHandlers={{ click: () => setSelected(quake) }}
          >
            <Popup>
              <div className='text-sm'>
                <div className='font-bold border-b mb-1 pb-1'>
                  {quake.properties.place}
                </div>
                <div>
                  <b>Magnitude:</b> {mag}
                </div>
                <div>
                  <b>Time:</b>{' '}
                  {new Date(quake.properties.time).toLocaleString()}
                </div>
                <a
                  href={`https://earthquake.usgs.gov/earthquakes/eventpage/${quake.id}`}
                  target='_blank'
                  className='text-blue-600 underline mt-2 block text-xs'
                >
                  More Details
                </a>
              </div>
            </Popup>
          </CircleMarker>
        )
      }),
    [quakes, selected],
  )

  return (
    <div className='flex flex-col h-screen w-full overflow-hidden font-sans antialiased my-36'>
      {/* Header */}
      <div className='mx-auto max-w-3xl text-center mb-6 px-4'>
        <h2 className='text-3xl md:text-5xl font-semibold mb-2 text-white'>
          Real-Time Earthquake Data
        </h2>
        <p className='text-sm text-white/50'>
          Showing real-time earthquake data
        </p>
      </div>

      {/* Filter Bar */}
      <div className='bg-black/80 px-4 py-2 flex flex-col md:flex-row items-center gap-2 text-white'>
        <div className='flex items-center gap-2'>
          <label className='text-[11px] uppercase tracking-widest'>From:</label>
          <input
            type='datetime-local'
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className='input input-xs input-bordered bg-white text-black'
          />
        </div>
        <div className='flex items-center gap-2'>
          <label className='text-[11px] uppercase tracking-widest'>To:</label>
          <input
            type='datetime-local'
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className='input input-xs input-bordered bg-white text-black'
          />
        </div>
        <button
          className='btn btn-xs btn-primary'
          onClick={fetchQuakes}
          disabled={loading}
        >
          {loading ? (
            <span className='loading loading-spinner loading-xs'></span>
          ) : (
            'Apply'
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className='flex flex-1 flex-col md:flex-row overflow-hidden'>
        {/* Sidebar */}
        <aside className='w-full md:w-[350px] flex flex-col bg-black/80 shadow-2xl border-r border-gray-200'>
          <div className='px-4 py-2 flex justify-between items-center text-white font-bold text-xs border-b border-gray-200'>
            <span>{quakes.length} EARTHQUAKES</span>
            <span>SORT: NEWEST</span>
          </div>
          <div className='flex-1 overflow-y-auto bg-black/90 custom-scrollbar'>
            {quakes.map((quake) => {
              const isSelected = selected?.id === quake.id
              const color = getColor(quake.properties.mag)
              return (
                <div
                  key={quake.id}
                  onClick={() => setSelected(quake)}
                  className={`flex items-stretch border-b border-gray-100 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-green-500 text-black border-l-4 border-l-blue-600'
                      : 'border-l-4 border-l-transparent'
                  }`}
                >
                  <div
                    className='w-16 flex items-center justify-center font-bold text-lg border-r border-gray-50'
                    style={{ color: color }}
                  >
                    {quake.properties.mag.toFixed(1)}
                  </div>
                  <div className='p-3 flex-1'>
                    <div className='text-[13px] font-semibold text-white line-clamp-1'>
                      {quake.properties.place}
                    </div>
                    <div className='text-[11px] text-white mt-1 flex justify-between'>
                      <span>
                        {new Date(quake.properties.time).toLocaleTimeString()}
                      </span>
                      <span>
                        {quake.geometry.coordinates[2].toFixed(1)} km depth
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </aside>

        {/* Map */}
        <main className='flex-1 relative h-[400px] md:h-auto'>
          <MapContainer
            center={[20, 0]}
            zoom={3}
            className='h-full w-full'
            zoomControl={false}
          >
            <LayersControl position='topright'>
              <LayersControl.BaseLayer checked name='Terrain'>
                <TileLayer
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  noWrap
                />
              </LayersControl.BaseLayer>
              <LayersControl.Overlay checked name='Tectonic Plates'>
                <TileLayer
                  url='https://earthquake.usgs.gov/basemap/tiles/plates/{z}/{x}/{y}.png'
                  opacity={0.6}
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

          <div className='absolute bottom-4 right-4 bg-white/90 p-3 rounded shadow-xl border border-gray-300 backdrop-blur-sm text-xs'>
            <h4 className='font-bold uppercase mb-1'>Magnitude Scale</h4>
            <div className='flex gap-1 items-end h-6 md:h-8'>
              {[2, 3, 4, 5, 6, 7].map((m) => (
                <div key={m} className='flex flex-col items-center'>
                  <div
                    style={{
                      backgroundColor: getColor(m),
                      height: `${m * 3}px`,
                      width: '10px',
                    }}
                    className='rounded-t-sm'
                  />
                  <span className='mt-1'>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
