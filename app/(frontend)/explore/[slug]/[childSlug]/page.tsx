import Image from 'next/image'
import { getSubItem } from '@/utils/actions'
import parse from 'html-react-parser'
import { Home } from 'lucide-react'
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
  const token = cookies().get('token')?.value

  if (!item) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black px-4'>
        <div className='bg-black border border-gray-700 rounded-2xl shadow-lg p-12 text-center max-w-md'>
          <Home className='mx-auto mb-6 w-12 h-12 text-green-400 animate-bounce' />
          <h2 className='text-3xl font-bold text-white mb-4'>Not Found</h2>
          <p className='text-gray-400 mb-6'>
            Sorry, we couldn’t find the <strong>{slug}</strong> you’re looking
            for. It may have been removed or the URL is incorrect.
          </p>
          <Link href='/' className='btn btn-outline btn-success'>
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-black py-20 max-w-4xl mx-auto space-y-10'>
      <div className='card w-full bg-neutral text-neutral-content shadow-xl rounded-2xl overflow-hidden'>
        <div className='breadcrumbs text-sm p-4'>
          <ul className='flex gap-2 text-gray-400'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/explore'>Explore</Link>
            </li>
            <li className='text-white'>{item.title}</li>
          </ul>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
          <ModalImage src={item.image} alt={item.title} />

          <div className='card-body gap-4 p-6 flex flex-col justify-between'>
            <div className='space-y-2'>
              <h1 className='card-title text-2xl'>{item.title}</h1>
              <p className='text-sm opacity-70'>{item.short_desc}</p>
              <span className='badge'>{item.item.title}</span>
            </div>

            <div className='flex items-center gap-3 p-3 rounded-xl bg-neutral-focus mt-4'>
              <div className='avatar'>
                <div className='w-10 h-10 relative rounded-full overflow-hidden'>
                  <Image
                    src={item.image}
                    alt='Occurrence map'
                    fill
                    className='object-cover'
                  />
                </div>
              </div>
              <span className='flex-1 text-sm'>Occurrence map</span>
              <span className='text-lg'>›</span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex gap-6 flex-col md:flex-row'>
        {[1, 2].map((_, i) => (
          <div
            key={i}
            className='flex items-center gap-3 p-3 rounded-xl bg-neutral-focus shadow-sm shadow-white/20'
          >
            <div className='avatar'>
              <div className='w-10 h-10 relative rounded-full overflow-hidden'>
                <Image
                  src={item.image}
                  alt='map'
                  fill
                  className='object-cover'
                />
              </div>
            </div>
            <span className='flex-1 text-sm'>Occurrence map</span>
            <span className='text-lg'>›</span>
          </div>
        ))}
      </div>

      <div className='prose prose-invert mt-4 border-l-2 border-primary pl-6'>
        {parse(item.long_desc || '')}
      </div>

      {token && (
        <Link
          href={`/control/sub-items/${item.slug}`}
          className='fixed bottom-10 left-10 btn btn-primary'
        >
          Edit Item
        </Link>
      )}
    </div>
  )
}
