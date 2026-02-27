import SearchModal from '@/components/SearchModal'
import Tab from '@/components/Tab'
import { getALlCategories } from '@/utils/actions'
import { Search } from 'lucide-react'
import { cookies } from 'next/headers'

export default async function Page() {
  const categories = await getALlCategories()
  const token = cookies().get('token')?.value

  return (
    <div className='py-20 max-w-7xl mx-auto px-4'>
      <div className='flex justify-between items-center my-10'>
        <h2 className='text-4xl md:text-5xl font-semibold'>Explore</h2>

        <SearchModal cat={categories} />
      </div>

      <Tab categories={categories} token={token} />
    </div>
  )
}
