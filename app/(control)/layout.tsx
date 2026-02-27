'use client'

import React from 'react'
import {
  PanelTopOpen,
  FileText,
  MessageSquare,
  Users,
  Menu,
  User,
  FileStack,
  SquareStack,
  LogOutIcon,
  UserStar,
  SquareStackIcon,
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
    {
      id: 1,
      name: 'Panel',
      link: '/control',
      icon: <PanelTopOpen className='w-4 h-4 ' />,
    },
    {
      id: 2,
      name: 'Articles',
      link: '/control/articles',
      icon: <FileText className='w-4 h-4 ' />,
    },
    {
      id: 3,
      name: 'Comments',
      link: '/control/contact',
      icon: <MessageSquare className='w-4 h-4 ' />,
    },
    {
      id: 4,
      name: 'Categories',
      link: '/control/categories',
      icon: <FileStack className='w-4 h-4 ' />,
    },
    {
      id: 5,
      name: 'Items',
      link: '/control/categories/items',
      icon: <SquareStack className='w-4 h-4 ' />,
    },
    {
      id: 6,
      name: 'Sub Items',
      link: '/control/sub-items',
      icon: <SquareStackIcon className='w-4 h-4 ' />,
    },
    {
      id: 6,
      name: 'Reviews',
      link: '/control/reviews',
      icon: <UserStar className='w-4 h-4 ' />,
    },
  ]

  if (hideLayout) {
    return <>{children}</>
  }

  return (
    <div className='drawer lg:drawer-open min-h-screen bg-black'>
      <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />

      <div className='drawer-content flex flex-col'>
        <nav className='navbar bg-black border-b border-gray-800'>
          <label
            htmlFor='my-drawer-4'
            className='btn btn-square btn-ghost lg:hidden'
          >
            <Menu className='w-6 h-6 text-white' />
          </label>

          <div className='px-4 text-white font-semibold uppercase'>
            gravestone Panel
          </div>

          <div className='navbar-end flex-1 place-items-end mx-6'>
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-outline bg-transparent btn-circle avatar'
              >
                <div className='w-10 rounded-full  border place-items-center place-content-center'>
                  <User className='w-3 h-3 text-center text-white' />
                </div>
              </div>
              <ul className='menu menu-sm dropdown-content bg-black rounded-box z-1 mt-3 w-52 p-2 shadow'>
                <li>
                  <Link
                    href={'/control/profile'}
                    className='justify-between border-b mb-2'
                  >
                    Profile
                    <span className='badge'>New</span>
                  </Link>
                </li>
                <li>
                  <form action={logout}>
                    <button
                      type='submit'
                      className='flex items-center gap-2 text-white hover:text-red-400 transition'
                    >
                      <LogOutIcon className='w-4 h-4' />
                      Logout
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className='flex-1 p-6 text-white'>{children}</main>
      </div>

      <div className='drawer-side'>
        <label htmlFor='my-drawer-4' className='drawer-overlay'></label>

        <aside className='w-64 bg-black border-r border-gray-800 min-h-full pt-12 overflow-hidden'>
          <ul className='menu p-4 text-white space-y-4'>
            {links.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className={`flex items-center gap-2 ${pathname === item.link ? 'bg-green-400 text-black' : 'bg-transparent'}`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
