import { NavLink, Outlet } from 'react-router'
import { useEffect, useState } from 'react'
import NavButton from './NavButton'
import MobileNav from './MobileNav'
import { UserPlus2, Home, LogIn, Users, Contact2 } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  const [navOpen, setNavOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token =
      sessionStorage.getItem('authToken') || localStorage.getItem('authToken')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 text-gray-800'>
      <a
        href='#main-content'
        className='sr-only absolute top-2 left-2 z-50 rounded bg-indigo-700 px-4 py-2 text-white focus:not-sr-only focus:ring-2 focus:ring-indigo-400 focus:outline-none'
      >
        Skip to main content
      </a>
      <header className='sticky top-0 z-30 w-full border-b border-slate-200 bg-white/30 shadow-lg backdrop-blur-lg'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
          {/* Logo */}
          <NavLink
            to='/'
            className='flex items-center gap-3 rounded-2xl bg-gradient-to-br from-indigo-200 via-white to-indigo-100 p-2 text-2xl font-extrabold text-indigo-700 shadow-inner transition-colors hover:bg-indigo-200/80'
          >
            <span className='flex items-center justify-center rounded-xl p-1'>
              <svg
                width='32'
                height='32'
                fill='none'
                viewBox='0 0 24 24'
                className='text-indigo-400'
              >
                <path
                  d='M16 12a4 4 0 1 0-8 0v3a4 4 0 0 0 8 0v-3ZM12 3v2M6.34 6.34l1.42 1.42M3 12h2m12.24-4.24-1.42 1.42M21 12h-2'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </span>
            Auth System
          </NavLink>

          {/* Desktop Nav */}
          <nav className='ml-8 hidden items-center gap-2 md:flex'>
            <NavButton
              to='/'
              icon={<Home size={20} strokeWidth={1.5} />}
              label='Home'
              labelWidth='w-[60px]'
            />
            <NavButton
              to='/register'
              icon={<UserPlus2 size={20} strokeWidth={1.5} />}
              label='Register'
              labelWidth='w-[70px]'
            />
            <NavButton
              to='/login'
              icon={<LogIn size={20} strokeWidth={1.5} />}
              label='Login'
              labelWidth='w-[50px]'
            />
            <NavButton
              to='/users'
              icon={<Users size={20} strokeWidth={1.5} />}
              label='Users'
              labelWidth='w-[60px]'
            />
            <NavButton
              to='/profile'
              icon={<Contact2 size={20} strokeWidth={1.5} />}
              label='Profile'
              labelWidth='w-[65px]'
            />
          </nav>

          {/* Hamburger button for mobile nav */}
          <button
            className='rounded-lg border border-slate-200 bg-white/70 p-2 hover:bg-indigo-100/60 focus:ring-2 focus:ring-indigo-300 focus:outline-none md:hidden'
            aria-label='Toggle navigation menu'
            onClick={() => setNavOpen((open) => !open)}
          >
            <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
              <path
                d='M4 6h16M4 12h16M4 18h16'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </button>
        </div>
      </header>
      {/* Mobile Navigation rendered outside header for proper overlay */}
      <MobileNav
        isLoggedIn={isLoggedIn}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
      />
      <main id='main-content' className='mx-auto max-w-4xl px-4 py-8'>
        {children ?? <Outlet />}
      </main>
    </div>
  )
}
