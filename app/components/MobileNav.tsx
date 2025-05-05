import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router' // Import useNavigate instead of NavLink
import { Home, UserPlus2, LogIn, Users, Contact2, X } from 'lucide-react'

export default function MobileNav({
  isLoggedIn,
  navOpen,
  setNavOpen,
}: {
  isLoggedIn: boolean
  navOpen: boolean
  setNavOpen: (open: boolean) => void
}) {
  const navRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate() // Initialize the navigate function

  // Navigation handler function
  const handleNavigation = (path: string) => {
    navigate(path)
    setNavOpen(false)
  }

  // Prevent body scroll when nav is open
  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = 'hidden'
      // Focus the first focusable element in nav (cast to HTMLElement for .focus())
      const el = navRef.current?.querySelector('button, a')
      if (
        el &&
        'focus' in el &&
        typeof (el as HTMLElement).focus === 'function'
      ) {
        ;(el as HTMLElement).focus()
      }
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [navOpen])

  // Trap focus inside nav when open
  useEffect(() => {
    if (!navOpen) return
    const handleTab = (e: KeyboardEvent) => {
      const focusable = navRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
      if (e.key === 'Escape') setNavOpen(false)
    }
    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [navOpen])

  // Helper function to create nav buttons with consistent styling
  const renderNavButton = (
    path: string,
    icon: React.ReactNode,
    label: string,
    isActive: boolean = false,
  ) => {
    return (
      <button
        onClick={() => handleNavigation(path)}
        className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-left font-medium transition-all duration-200 ${
          isActive
            ? 'border border-indigo-200/40 bg-gradient-to-br from-indigo-300/50 via-indigo-200/70 to-indigo-100/60 text-indigo-900 shadow-inner'
            : 'text-slate-700 hover:border hover:border-indigo-100/30 hover:bg-white/60 hover:shadow-md'
        }`}
      >
        <span className='flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-indigo-500 shadow-inner'>
          {icon}
        </span>
        <span>{label}</span>

        {/* Decorative elements */}
        <span className='pointer-events-none absolute -top-8 -right-8 h-16 w-16 rounded-full bg-indigo-200/20 blur-xl'></span>
        <span className='pointer-events-none absolute -bottom-8 -left-8 h-16 w-16 rounded-full bg-indigo-100/20 blur-xl'></span>
      </button>
    )
  }

  // Get current path to highlight active link
  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : ''

  return (
    <>
      {/* Overlay with blur effect */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          navOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setNavOpen(false)}
        aria-hidden='true'
      ></div>

      {/* Mobile Nav with Skeuomorphic Styling */}
      <div
        ref={navRef}
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 overflow-y-auto transition-transform duration-500 focus:outline-none md:hidden ${
          navOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        tabIndex={-1}
        style={{ willChange: 'transform' }}
      >
        {/* Skeuomorphic Panel with Depth */}
        <nav
          className='h-full w-full border-l border-white/50 bg-gradient-to-br from-white/90 to-indigo-50/90 p-6 shadow-lg backdrop-blur-lg focus:outline-none'
          aria-label='Mobile navigation'
        >
          {/* Top Section with Close Button */}
          <div className='mb-8 flex items-center justify-between'>
            <div className='bg-gradient-to-b from-indigo-700 to-indigo-800 bg-clip-text text-xl font-bold text-transparent'>
              Menu
            </div>
            <button
              className='rounded-full border border-indigo-100/30 bg-white/70 p-2 shadow-sm backdrop-blur-sm transition-all hover:translate-y-[-1px] hover:bg-white/90 hover:shadow focus:ring-2 focus:ring-indigo-300 focus:outline-none active:translate-y-[1px] active:shadow-inner'
              onClick={() => setNavOpen(false)}
              aria-label='Close navigation menu'
            >
              <X size={20} className='text-indigo-700' />
            </button>
          </div>

          {/* Navigation Buttons with Skeuomorphic Style */}
          <div className='flex flex-col gap-3'>
            {renderNavButton(
              '/',
              <Home size={20} strokeWidth={1.5} />,
              'Home',
              currentPath === '/',
            )}
            {renderNavButton(
              '/register',
              <UserPlus2 size={20} strokeWidth={1.5} />,
              'Register',
              currentPath === '/register',
            )}
            {renderNavButton(
              '/login',
              <LogIn size={20} strokeWidth={1.5} />,
              'Login',
              currentPath === '/login',
            )}
            {renderNavButton(
              '/users',
              <Users size={20} strokeWidth={1.5} />,
              'Users',
              currentPath === '/users',
            )}
            {renderNavButton(
              '/profile',
              <Contact2 size={20} strokeWidth={1.5} />,
              'Profile',
              currentPath === '/profile',
            )}
          </div>

          {/* Decorative Elements */}
          <div className='absolute top-[20%] right-[-50px] h-48 w-48 rounded-full bg-indigo-200/30 blur-3xl'></div>
          <div className='absolute bottom-[30%] left-[-30px] h-40 w-40 rounded-full bg-indigo-300/20 blur-3xl'></div>

          {/* Footer with Version */}
          <div className='absolute right-0 bottom-6 left-0 text-center'>
            <div className='text-xs font-medium text-indigo-400/70'>
              Auth System v1.0
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
