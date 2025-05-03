import { NavLink, Outlet } from 'react-router'
import { useEffect, useState } from 'react'
import NavButton from './NavButton'
import MobileNav from './MobileNav'
import {
  UserPlus2,
  Home,
  LogIn,
  Users,
  Contact2,
  Fingerprint,
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  const [navOpen, setNavOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    const token =
      sessionStorage.getItem('authToken') || localStorage.getItem('authToken')
    setIsLoggedIn(!!token)
    setHasHydrated(true)
  }, [])

  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 to-slate-300 text-gray-800'>
      {/* Modern Skeuomorphic Background Elements */}
      <div className='fixed top-20 -left-32 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl'></div>
      <div className='fixed top-1/3 right-1/4 h-96 w-96 rounded-full bg-indigo-100/20 blur-3xl'></div>
      <div className='fixed -right-32 bottom-20 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl'></div>
      <div className='fixed -bottom-20 left-1/4 h-80 w-80 rounded-full bg-indigo-200/10 blur-3xl'></div>

      <a
        href='#main-content'
        className='sr-only absolute top-2 left-2 z-50 rounded bg-indigo-700 px-4 py-2 text-white focus:not-sr-only focus:ring-2 focus:ring-indigo-400 focus:outline-none'
      >
        Skip to main content
      </a>

      {/* Skeuomorphic Header */}
      <header className='sticky top-0 z-30 w-full border-b border-white/20 bg-white/30 shadow-lg backdrop-blur-lg'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
          {/* Logo - Skeuomorphic Style */}
          <NavLink
            to='/'
            className='group flex items-center gap-3 rounded-2xl border border-white/70 bg-gradient-to-br from-indigo-200/90 via-white/90 to-indigo-100/90 p-2 text-2xl font-extrabold text-indigo-700 shadow-md backdrop-blur-sm transition-all hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px] active:shadow-inner'
          >
            {/* Logo Icon with Enhanced Skeuomorphic Styling */}
            <span className='relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-200 via-white to-indigo-100 p-4 shadow-lg backdrop-blur-sm'>
              <span className='flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 text-white shadow-inner'>
                <Fingerprint size={22} strokeWidth={2} />
              </span>
            </span>

            {/* Text with Subtle Shadow */}
            <span className='bg-gradient-to-b from-indigo-700 to-indigo-800 bg-clip-text text-transparent drop-shadow-sm transition-colors group-hover:from-indigo-600 group-hover:to-indigo-700'>
              Auth System
            </span>
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
          {/* Skeuomorphic Hamburger Button */}
          <button
            className='rounded-full border border-indigo-100/30 bg-white/70 p-2.5 shadow-sm backdrop-blur-sm transition-all hover:translate-y-[-1px] hover:bg-white/90 hover:shadow focus:ring-2 focus:ring-indigo-300 focus:outline-none active:translate-y-[1px] active:shadow-inner md:hidden'
            aria-label='Toggle navigation menu'
            onClick={() => setNavOpen((open) => !open)}
          >
            <svg
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
              className='text-indigo-700'
            >
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
      {hasHydrated && (
        <MobileNav
          isLoggedIn={isLoggedIn}
          navOpen={navOpen}
          setNavOpen={setNavOpen}
        />
      )}

      {/* Main Content with Skeuomorphic Card Effect */}
      <main
        id='main-content'
        className='relative z-10 mx-auto max-w-6xl px-4 py-8'
      >
        <div className='relative'>{children ?? <Outlet />}</div>
      </main>
    </div>
  )
}
