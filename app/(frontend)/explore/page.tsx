import SearchModal from '@/components/SearchModal'
import Tab from '@/components/Tab'
import { getALlCategories } from '@/utils/actions'
import { cookies } from 'next/headers'

export default async function Page() {
  const categories = await getALlCategories()
  const token = cookies()?.get('token')?.value

  return (
    <div className='relative min-h-screen bg-[#0A0A0B] text-white selection:bg-[#6A1E55]/30'>
      
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#6A1E55]/10 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-[10%] w-[300px] h-[300px] bg-[#A64D79]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className='relative z-10 py-24 max-w-7xl mx-auto px-6 lg:px-8'>
        
        <header className='flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16'>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-[2px] bg-[#6A1E55]" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#A64D79]">
                Global Archive
              </span>
            </div>
            <h1 className='text-5xl md:text-7xl font-black tracking-tighter uppercase italic'>
              Explore<span className="text-[#6A1E55] group-hover:text-[#A64D79] transition-colors">.</span>
            </h1>
            <p className="text-white/30 text-sm max-w-md font-medium leading-relaxed">
              Access decrypted seismic logs and tectonic shifting data across all protected sectors.
            </p>
          </div>

          <div className="flex items-center gap-4">
             <SearchModal cat={categories} />
          </div>
        </header>

        <div className="bg-[#111114]/40 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-2 md:p-8 shadow-2xl">
          <Tab categories={categories} token={token} />
        </div>

      </div>

      <div className="py-12 flex justify-center opacity-20">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#6A1E55] to-transparent" />
      </div>
    </div>
  )
}