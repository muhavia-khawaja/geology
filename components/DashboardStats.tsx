import prisma from '@/prisma/script'
import {
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Flame,
  Shield,
} from 'lucide-react'

export default async function DashboardStats() {
  const [articleCount, reviewCount, contactCount, categoryCount, itemCount] =
    await Promise.all([
      prisma.article.count(),
      prisma.review.count(),
      prisma.contact.count(),
      prisma.category.count(),
      prisma.item.count(),
    ])

  const dynamicStats = [
    {
      id: 1,
      title: 'Intelligence Logs',
      value: articleCount,
      icon: BookOpen,
      bg: 'from-[#6A1E55] to-[#A64D79]',
    },
    {
      id: 2,
      title: 'Field Reports',
      value: reviewCount,
      icon: CheckCircle,
      bg: 'from-blue-600 to-indigo-600',
    },
    {
      id: 3,
      title: 'Inbound Uplinks',
      value: contactCount,
      icon: Clock,
      bg: 'from-emerald-600 to-teal-600',
    },
    {
      id: 4,
      title: 'Data Sectors',
      value: categoryCount,
      icon: AlertTriangle,
      bg: 'from-orange-600 to-amber-600',
    },
    {
      id: 5,
      title: 'Sub-Surface Units',
      value: itemCount,
      icon: Flame,
      bg: 'from-pink-600 to-rose-600',
    },
    {
      id: 6,
      title: 'System Health',
      value: '100%',
      icon: Shield,
      bg: 'from-zinc-700 to-zinc-900',
    },
  ]

  return (
    <div className='grid gap-6 md:grid-cols-3'>
      {dynamicStats.map((item) => {
        const Icon = item.icon

        return (
          <div
            key={item.id}
            className='relative overflow-hidden group rounded-3xl bg-[#0D0D0F] border border-white/5 p-6 shadow-2xl transition-all hover:border-[#6A1E55]/50'
          >
            <div
              className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${item.bg} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
            />

            <div className='flex items-center gap-5 relative z-10'>
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${item.bg} shadow-lg shadow-black/50`}
              >
                <Icon className='w-7 h-7 text-white' />
              </div>

              {/* Data Labels */}
              <div className='flex flex-col'>
                <span className='text-3xl font-black text-white italic tracking-tighter'>
                  {item.value.toLocaleString()}
                </span>
                <span className='text-[10px] font-black uppercase tracking-[0.2em] text-white/30'>
                  {item.title}
                </span>
              </div>
            </div>

            {/* Terminal Decoration */}
            <div className='mt-4 pt-4 border-t border-white/5 flex justify-between items-center'>
              <span className='text-[8px] font-mono text-white/10 uppercase tracking-widest'>
                Sector_{item.id.toString().padStart(2, '0')}
              </span>
              <div className='h-1 w-1 rounded-full bg-white/20 animate-pulse' />
            </div>
          </div>
        )
      })}
    </div>
  )
}
