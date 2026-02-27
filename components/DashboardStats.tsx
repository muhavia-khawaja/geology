import {
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Flame,
} from 'lucide-react'

const stats = [
  {
    id: 1,
    title: 'Articles',
    value: 27,
    icon: BookOpen,
    bg: 'from-pink-500 to-red-500',
  },
  {
    id: 2,
    title: 'Solved',
    value: 18,
    icon: CheckCircle,
    bg: 'from-blue-500 to-indigo-500',
  },
  {
    id: 3,
    title: 'Closed',
    value: 12,
    icon: XCircle,
    bg: 'from-green-500 to-emerald-500',
  },
  {
    id: 4,
    title: 'Open',
    value: 3,
    icon: Clock,
    bg: 'from-purple-500 to-violet-500',
  },
  {
    id: 5,
    title: 'Critical',
    value: 5,
    icon: AlertTriangle,
    bg: 'from-orange-500 to-amber-500',
  },
  {
    id: 6,
    title: 'High',
    value: 7,
    icon: Flame,
    bg: 'from-pink-500 to-fuchsia-500',
  },
]

export default function DashboardStats() {
  return (
    <div className='grid gap-6 md:grid-cols-3'>
      {stats.map((item) => {
        const Icon = item.icon

        return (
          <div
            key={item.id}
            className='card bg-black border border-gray-800 shadow-md'
          >
            <div className='card-body flex flex-row items-center gap-4'>
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.bg}`}
              >
                <Icon className='w-6 h-6 text-white' />
              </div>

              {/* Text */}
              <div>
                <h2 className='text-2xl font-bold text-white'>{item.value}</h2>
                <p className='text-gray-400 text-sm'>{item.title}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
