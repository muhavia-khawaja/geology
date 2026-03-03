import Image from 'next/image'
import { getItem } from '@/utils/actions'
import parse from 'html-react-parser'
import {
  Home,
  ShieldAlert,
  ChevronRight,
  Map,
  Edit3,
  Globe,
} from 'lucide-react'
import Link from 'next/link'
import ModalImage from '@/components/Modal'
import { cookies } from 'next/headers'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const item = await getItem(params.slug)
  if (!item) {
    notFound()
  }

  return {
    title: {
      absolute: item.title || 'item',
    },
    description:
      item.short_desc ||
      `Download the ${item.title} item for comprehensive educational resources.`,
    keywords: item.title
      ? `${item.title}, geology, earth science, rocks, minerals, fossils, geology education, geology resources, geology items, geology news`
      : 'geology, earth science, rocks, minerals, fossils, geology education, geology resources, geology items, geology news',
    authors: [
      {
        name: 'Khawaja Ameer Muhavia',
        url: 'https://geology-stone.vercel.app',
      },
    ],
    creator: 'Khawaja Ameer Muhavia',
    publisher: 'Geology Stone',
    openGraph: {
      title: item.title || 'item',
      description:
        item.short_desc ||
        `Download the ${item.title} item for comprehensive educational resources.`,
      url: `https://geology-stone.vercel.app/explore/${item.slug}`,
      siteName: 'Geology Stone',
      images: [
        {
          url: item.image,
          width: 1080,
          height: 1080,
          alt: item.title,
        },
      ],
      locale: 'en_US',
    },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const item = await getItem(slug)
  const token = (await cookies()).get('token')?.value

  if (!item) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#0A0A0B] px-4'>
        <div className='bg-[#111114] border border-[#6A1E55]/30 rounded-[2rem] shadow-2xl p-12 text-center max-w-md animate-in fade-in zoom-in duration-500'>
          <ShieldAlert className='mx-auto mb-6 w-16 h-16 text-[#A64D79] animate-pulse' />
          <h2 className='text-3xl font-black text-white mb-4 tracking-tighter uppercase italic'>
            Registry Null
          </h2>
          <p className='text-white/40 mb-8 text-sm leading-relaxed'>
            The requested sector <strong>{slug}</strong> has no active data
            logs. It may have been redacted or the uplink is broken.
          </p>
          <Link
            href='/explore'
            className='inline-flex items-center gap-2 bg-[#6A1E55] hover:bg-[#A64D79] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all'
          >
            <Home size={14} /> Return to Archives
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen  py-24 px-6 max-w-5xl mx-auto space-y-12'>
      <div className='relative bg-[#111114] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl'>
        <nav className='px-8 py-4 bg-white/[0.02] border-b border-white/5'>
          <ul className='flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/30'>
            <li>
              <Link href='/' className='hover:text-[#A64D79]'>
                Home
              </Link>
            </li>
            <li>
              <ChevronRight size={10} />
            </li>
            <li>
              <Link href='/explore' className='hover:text-[#A64D79]'>
                Explore
              </Link>
            </li>
            <li>
              <ChevronRight size={10} />
            </li>
            <li className='text-[#6A1E55]'>{item.title}</li>
          </ul>
        </nav>

        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div className='p-4'>
            <div className='rounded-2xl overflow-hidden border border-white/5 shadow-inner'>
              <ModalImage src={item.image} alt={item.title} />
            </div>
          </div>

          <div className='p-8 flex flex-col justify-between'>
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <span className='px-3 py-1 bg-[#6A1E55]/20 border border-[#6A1E55]/40 text-[#A64D79] text-[9px] font-black uppercase tracking-widest rounded-full'>
                  {item.category.title}
                </span>
                <span className='text-white/10 text-[10px] font-mono'>
                  ID: {item.id.slice(0, 8)}
                </span>
              </div>
              <h1 className='text-4xl font-black tracking-tighter text-white uppercase italic'>
                {item.title}
              </h1>
              <p className='text-sm text-white/40 leading-relaxed font-medium'>
                {item.short_desc}
              </p>
            </div>

            <div className='flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 mt-8 group cursor-pointer hover:border-[#6A1E55]/50 transition-all'>
              <div className='w-12 h-12 relative rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all'>
                <Image
                  src={item.image}
                  alt='Map'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='flex-1'>
                <p className='text-[10px] font-black uppercase tracking-widest text-[#A64D79]'>
                  Interactive
                </p>
                <h4 className='text-sm font-bold text-white'>Occurrence Map</h4>
              </div>
              <Globe className='text-white/20 group-hover:text-[#6A1E55] transition-colors' />
            </div>
          </div>
        </div>
      </div>

      <section className='mt-20'>
        <div className='flex items-center gap-4 mb-10'>
          <div className='h-px flex-1 bg-gradient-to-r from-transparent to-white/10' />
          <h2 className='text-xl font-black tracking-tighter text-white uppercase italic text-center'>
            Secondary <span className='text-[#6A1E55]'>Variants</span>
          </h2>
          <div className='h-px flex-1 bg-gradient-to-l from-transparent to-white/10' />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {item.subItem?.map((sub: any) => (
            <Link
              href={`/explore/${item.slug}/${sub.slug}`}
              key={sub.id}
              className='group relative bg-[#111114] border border-white/5 hover:border-[#6A1E55]/50 rounded-[2rem] overflow-hidden transition-all duration-500 shadow-xl'
            >
              <div className='relative w-full h-56 overflow-hidden'>
                <Image
                  src={sub.image}
                  alt={sub.title}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent' />
              </div>

              <div className='p-6 text-center'>
                <h3 className='text-md font-bold text-white group-hover:text-[#A64D79] transition-colors mb-1'>
                  {sub.title}
                </h3>
                <span className='text-[8px] font-black uppercase tracking-[0.3em] text-white/20'>
                  Sector Archiving
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className='prose prose-invert max-w-none bg-white/[0.01] p-10 rounded-[2rem] border border-white/5 border-l-[#6A1E55] border-l-4'>
        {parse(item.long_desc || '')}
      </div>

      {token && (
        <Link
          href={`/control/categories/items/${item.slug}`}
          className='fixed bottom-10 left-10 flex items-center gap-3 bg-[#A64D79] hover:bg-[#6A1E55] text-white px-6 py-3 rounded-2xl font-bold text-xs tracking-widest uppercase transition-all shadow-2xl z-50'
        >
          <Edit3 size={16} />
          Modify Registry
        </Link>
      )}
    </div>
  )
}
