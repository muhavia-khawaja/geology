'use client'

import React from 'react'
import {
  PanelTopOpen,
  FileText,
  MessageSquare,
  Menu,
  User,
  FileStack,
  SquareStack,
  LogOutIcon,
  UserStar,
  SquareStackIcon,
  Shield,
  Activity,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/utils/actions'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const hideLayout = pathname === '/control/login'

  const links = [
    { id: 1, name: 'Dashboard', link: '/control', icon: PanelTopOpen },
    {
      id: 2,
      name: 'Articles',
      link: '/control/articles',
      icon: FileText,
    },
    {
      id: 3,
      name: 'Contact Inbox',
      link: '/control/contact',
      icon: MessageSquare,
    },
    {
      id: 4,
      name: 'Registry Categories',
      link: '/control/categories',
      icon: FileStack,
    },
    {
      id: 5,
      name: 'Registry Items',
      link: '/control/categories/items',
      icon: SquareStack,
    },
    {
      id: 6,
      name: 'Registry Sub-Items',
      link: '/control/sub-items',
      icon: SquareStackIcon,
    },
    {
      id: 7,
      name: 'Personnel Reviews',
      link: '/control/reviews',
      icon: UserStar,
    },
  ]

  if (hideLayout) return <>{children}</>

  return (
    <div className='drawer lg:drawer-open min-h-screen bg-[#050505] selection:bg-[#6A1E55]/30'>
      <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />

      <div className='drawer-content flex flex-col'>
        <nav className='navbar bg-[#0D0D0F]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-30 px-6'>
          <div className='flex-1 gap-4'>
            <label
              htmlFor='my-drawer-4'
              className='btn btn-ghost lg:hidden text-white'
            >
              <Menu size={20} />
            </label>

            <div className='flex flex-col'>
              <span className='text-[10px] font-black uppercase tracking-[0.3em] text-[#A64D79] leading-none'>
                Registry Management
              </span>
              <span className='text-white font-black italic uppercase tracking-tighter text-lg'>
                Gravestone<span className='text-[#6A1E55]'>_OS</span>
              </span>
            </div>
          </div>

          <div className='navbar-end gap-4'>
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='group flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 p-1 pr-4 rounded-full transition-all'
              >
                <div className='w-8 h-8 rounded-full bg-gradient-to-tr from-[#6A1E55] to-[#A64D79] flex items-center justify-center shadow-lg shadow-[#6A1E55]/20'>
                  <User size={14} className='text-white' />
                </div>
                <span className='text-[10px] font-bold text-white uppercase tracking-widest hidden sm:block'>
                  Admin_Node
                </span>
              </div>

              <ul
                tabIndex={0}
                className='menu dropdown-content mt-4 z-[1] p-2 shadow-2xl bg-[#111114] border border-white/10 rounded-2xl w-52 overflow-hidden'
              >
                <div className='px-4 py-2 border-b border-white/5 mb-2'>
                  <p className='text-[8px] font-black text-white/20 uppercase tracking-widest'>
                    Authentication
                  </p>
                </div>
                <li>
                  <Link
                    href='/control/profile'
                    className='flex items-center gap-3 text-white/70 hover:text-white py-3'
                  >
                    <Shield size={14} /> Security Profile
                  </Link>
                </li>
                <li>
                  <form action={logout} className='w-full'>
                    <button
                      type='submit'
                      className='flex items-center gap-3 text-red-400 hover:bg-red-400/10 w-full py-3'
                    >
                      <LogOutIcon size={14} /> Terminate Session
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className='flex-1 p-6 lg:p-10 relative'>
          <div
            className='absolute inset-0 opacity-[0.01] pointer-events-none'
            style={{
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className='max-w-7xl mx-auto relative z-10'>{children}</div>
        </main>
      </div>

      <div className='drawer-side z-40'>
        <label htmlFor='my-drawer-4' className='drawer-overlay'></label>

        <aside className='w-72 bg-[#0D0D0F] border-r border-white/5 min-h-full flex flex-col'>
          <div className='p-8 pb-4'>
            <div className='flex items-center gap-3 px-4 py-3 bg-white/[0.02] border border-white/5 rounded-2xl'>
              <Activity size={16} className='text-[#6A1E55] animate-pulse' />
              <div className='flex flex-col'>
                <span className='text-[8px] font-black text-white/20 uppercase tracking-[0.2em]'>
                  Core Status
                </span>
                <span className='text-[9px] font-bold text-green-500 uppercase tracking-widest'>
                  Synchronized
                </span>
              </div>
            </div>
          </div>

          <nav className='flex-1 px-4 py-6'>
            <p className='px-4 text-[9px] font-black text-white/10 uppercase tracking-[0.4em] mb-6'>
              Navigation_Modules
            </p>
            <ul className='space-y-2'>
              {links.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.link
                return (
                  <li key={item.id}>
                    <Link
                      href={item.link}
                      className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all border ${
                        isActive
                          ? 'bg-[#6A1E55]/10 border-[#6A1E55]/50 text-white shadow-[0_0_20px_rgba(106,30,85,0.1)]'
                          : 'bg-transparent border-transparent text-white/40 hover:bg-white/[0.03] hover:text-white/80'
                      }`}
                    >
                      <div className='flex items-center gap-3'>
                        <Icon
                          size={18}
                          className={
                            isActive
                              ? 'text-[#A64D79]'
                              : 'group-hover:text-white transition-colors'
                          }
                        />
                        <span className='text-xs font-bold uppercase tracking-widest'>
                          {item.name}
                        </span>
                      </div>
                      {isActive && (
                        <ChevronRight size={14} className='text-[#6A1E55]' />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className='p-8 mt-auto border-t border-white/5'>
            <div className='flex flex-col gap-1'>
              <span className='text-[9px] font-mono text-white/10 tracking-widest uppercase'>
                Terminal_Build
              </span>
              <span className='text-[9px] font-mono text-white/30'>
                V_02.04_FINAL_LTS
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
