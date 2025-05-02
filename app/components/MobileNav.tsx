import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router'

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

  return (
    <>
      {/* Overlay rendered at the root level, not inside any flex/grid container */}
      {navOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/60 transition-opacity duration-200 md:hidden'
          onClick={() => setNavOpen(false)}
          aria-hidden='true'
        ></div>
      )}
      {/* Mobile Nav */}
      {navOpen && (
        <nav
          ref={navRef}
          className={`fixed top-0 right-0 z-50 flex h-full w-72 flex-col gap-2 border-l border-slate-200 bg-white/95 p-8 shadow-2xl transition-transform duration-500 focus:outline-none md:hidden ${navOpen ? 'translate-x-0' : 'translate-x-full'}`}
          aria-label='Mobile navigation'
          tabIndex={-1}
        >
          <button
            className='mb-6 self-end rounded-md p-2 text-slate-700 hover:bg-indigo-100/60 focus:ring-2 focus:ring-indigo-300 focus:outline-none'
            aria-label='Close navigation menu'
            onClick={() => setNavOpen(false)}
          >
            <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
              <path
                d='M6 6l12 12M6 18L18 6'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </button>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 font-semibold ${isActive ? 'bg-indigo-200/70 text-indigo-900' : 'text-slate-700 hover:bg-indigo-100/70'}`
            }
            onClick={() => setNavOpen(false)}
          >
            <span className='text-indigo-500'>
              <svg width='20' height='20' fill='none' viewBox='0 0 24 24'>
                <path
                  d='M3 12l9-9 9 9'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
                <path
                  d='M4 10v10h16V10'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
              </svg>
            </span>{' '}
            Home
          </NavLink>
          <NavLink
            to='/register'
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 font-semibold ${isActive ? 'bg-indigo-200/70 text-indigo-900' : 'text-slate-700 hover:bg-indigo-100/70'}`
            }
            onClick={() => setNavOpen(false)}
          >
            <span className='text-indigo-500'>
              <svg width='20' height='20' fill='none' viewBox='0 0 24 24'>
                <circle
                  cx='12'
                  cy='8'
                  r='4'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
                <path
                  d='M12 12v4m0 0h2m-2 0H10'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
              </svg>
            </span>{' '}
            Register
          </NavLink>
          <NavLink
            to='/login'
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 font-semibold ${isActive ? 'bg-indigo-200/70 text-indigo-900' : 'text-slate-700 hover:bg-indigo-100/70'}`
            }
            onClick={() => setNavOpen(false)}
          >
            <span className='text-indigo-500'>
              <svg width='20' height='20' fill='none' viewBox='0 0 24 24'>
                <path
                  d='M15 12H3m0 0l4-4m-4 4l4 4'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
                <rect
                  x='9'
                  y='4'
                  width='12'
                  height='16'
                  rx='2'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
              </svg>
            </span>{' '}
            Login
          </NavLink>
          <NavLink
            to='/users'
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 font-semibold ${isActive ? 'bg-indigo-200/70 text-indigo-900' : 'text-slate-700 hover:bg-indigo-100/70'}`
            }
            onClick={() => setNavOpen(false)}
          >
            <span className='text-indigo-500'>
              <svg width='20' height='20' fill='none' viewBox='0 0 24 24'>
                <circle
                  cx='8'
                  cy='8'
                  r='4'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
                <circle
                  cx='16'
                  cy='8'
                  r='4'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
                <path
                  d='M2 20c0-2.21 3.58-4 8-4s8 1.79 8 4'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
              </svg>
            </span>{' '}
            Users
          </NavLink>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 font-semibold ${isActive ? 'bg-indigo-200/70 text-indigo-900' : 'text-slate-700 hover:bg-indigo-100/70'}`
            }
            onClick={() => setNavOpen(false)}
          >
            <span className='text-indigo-500'>
              <svg width='20' height='20' fill='none' viewBox='0 0 24 24'>
                <circle
                  cx='12'
                  cy='8'
                  r='4'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
                <path
                  d='M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
              </svg>
            </span>{' '}
            Profile
          </NavLink>
          {/* Show avatar only if logged in (mobile) */}
          {/* {isLoggedIn && (
            <div className='mt-8 flex items-center justify-center'>
              <span className='flex h-12 w-12 items-center justify-center rounded-full bg-indigo-200 text-indigo-700'>
                <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
                  <circle
                    cx='12'
                    cy='8'
                    r='4'
                    stroke='currentColor'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4'
                    stroke='currentColor'
                    strokeWidth='1.5'
                  />
                </svg>
              </span>
            </div>
          )} */}
        </nav>
      )}
    </>
  )
}
