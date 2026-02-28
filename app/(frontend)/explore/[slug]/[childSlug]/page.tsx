import Image from 'next/image'
import { getSubItem } from '@/utils/actions'
import parse from 'html-react-parser'
import {
  Home,
  ChevronRight,
  FileSearch,
  Database,
  Edit3,
  MapPin,
} from 'lucide-react'
import Link from 'next/link'
import ModalImage from '@/components/Modal'
import { cookies } from 'next/headers'

export default async function Page({
  params,
}: {
  params: { childSlug: string }
}) {
  const slug = params.childSlug
  const item = await getSubItem(slug)
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  // --- ERROR: RECORD NOT FOUND ---
  if (!item) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#0A0A0B] px-4'>
        <div className='bg-[#111114] border border-[#6A1E55]/30 rounded-[2rem] shadow-2xl p-12 text-center max-w-md'>
          <FileSearch className='mx-auto mb-6 w-16 h-16 text-[#A64D79] animate-pulse' />
          <h2 className='text-2xl font-black text-white mb-4 tracking-widest uppercase italic'>
            Record Missing
          </h2>
          <p className='text-white/40 mb-8 text-sm leading-relaxed'>
            The sub-entry for <strong>{slug}</strong> does not exist in the
            current database partition.
          </p>
          <Link
            href='/explore'
            className='bg-[#6A1E55] hover:bg-[#A64D79] text-white px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-[#6A1E55]/20'
          >
            Back to Registry
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen  py-24 px-6 max-w-5xl mx-auto space-y-10'>
      <div className='w-full bg-[#111114] border border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden'>
        <nav className='px-8 py-4 bg-white/[0.02] border-b border-white/5'>
          <ul className='flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-white/20'>
            <li>
              <Link href='/' className='hover:text-white transition-colors'>
                Home
              </Link>
            </li>
            <li>
              <ChevronRight size={10} className='text-[#6A1E55]' />
            </li>
            <li>
              <Link
                href='/explore'
                className='hover:text-white transition-colors'
              >
                Explore
              </Link>
            </li>
            <li>
              <ChevronRight size={10} className='text-[#6A1E55]' />
            </li>
            <li>
              <Link
                href={`/explore/${item.item.slug}`}
                className='hover:text-white transition-colors'
              >
                {item.item.title}
              </Link>
            </li>
            <li>
              <ChevronRight size={10} className='text-[#6A1E55]' />
            </li>
            <li className='text-[#A64D79]'>{item.title}</li>
          </ul>
        </nav>

        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div className='p-4'>
            <ModalImage src={item.image} alt={item.title} />
          </div>

          <div className='p-8 flex flex-col justify-between'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Database size={12} className='text-[#6A1E55]' />
                <span className='text-[10px] font-black uppercase tracking-widest text-white/30'>
                  Sub-Item Entry
                </span>
              </div>
              <h1 className='text-4xl font-black tracking-tighter text-white uppercase italic leading-none'>
                {item.title}
              </h1>
              <p className='text-sm text-white/50 leading-relaxed'>
                {item.short_desc}
              </p>

              <div className='pt-2'>
                <span className='px-4 py-1.5 bg-[#6A1E55]/10 border border-[#6A1E55]/30 text-[#A64D79] text-[10px] font-bold uppercase tracking-widest rounded-lg'>
                  Ref: {item.item.title}
                </span>
              </div>
            </div>

            <div className='flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 mt-8 group hover:bg-[#6A1E55]/5 hover:border-[#6A1E55]/40 transition-all cursor-pointer'>
              <div className='w-12 h-12 relative rounded-xl overflow-hidden border border-white/10'>
                <Image
                  src={item.image}
                  alt='Map'
                  fill
                  className='object-cover grayscale group-hover:grayscale-0 transition-all'
                />
              </div>
              <div className='flex-1'>
                <p className='text-[10px] font-black uppercase tracking-widest text-[#A64D79]'>
                  Geo-Data
                </p>
                <h4 className='text-sm font-bold text-white'>
                  Interactive Occurrence Map
                </h4>
              </div>
              <MapPin
                size={18}
                className='text-white/20 group-hover:text-[#A64D79] transition-colors'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {[1, 2].map((_, i) => (
          <div
            key={i}
            className='flex items-center gap-4 p-4 rounded-[1.5rem] bg-[#111114] border border-white/5 hover:border-[#6A1E55]/30 transition-all'
          >
            <div className='w-12 h-12 relative rounded-full overflow-hidden border-2 border-[#6A1E55]/20'>
              <Image src={item.image} alt='map' fill className='object-cover' />
            </div>
            <div className='flex-1'>
              <p className='text-[9px] font-black text-[#A64D79] uppercase tracking-widest'>
                Linked Archive
              </p>
              <h4 className='text-white font-bold text-sm tracking-tight'>
                Seismic Mapping Node {i + 1}
              </h4>
            </div>
            <ChevronRight className='text-white/10' size={18} />
          </div>
        ))}
      </div>

      <div className='relative mt-12'>
        <div className='absolute top-0 left-0 w-1 h-full bg-[#6A1E55]' />
        <div className='prose prose-invert max-w-none pl-10 py-2'>
          <div className='text-[10px] font-black text-[#A64D79] uppercase tracking-[0.4em] mb-4'>
            Detailed Analysis Report
          </div>
          <div className='text-white/60 leading-relaxed selection:bg-[#6A1E55]'>
            {parse(item.long_desc || '')}
          </div>
        </div>
      </div>

      {token && (
        <Link
          href={`/control/sub-items/${item.slug}`}
          className='fixed bottom-10 right-10 flex items-center gap-3 bg-[#A64D79] hover:bg-[#6A1E55] text-white px-6 py-4 rounded-2xl font-bold text-xs tracking-widest uppercase transition-all shadow-2xl hover:scale-105 active:scale-95 z-50 border border-white/10'
        >
          <Edit3 size={16} />
          Edit Sub-Item
        </Link>
      )}
    </div>
  )
}
