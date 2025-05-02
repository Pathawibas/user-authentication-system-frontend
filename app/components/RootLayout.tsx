import { NavLink, Outlet } from 'react-router'

interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 text-gray-800'>
      <header className='sticky top-0 z-10 w-full border-b border-slate-200 bg-white/60 shadow-[0_2px_16px_0_rgba(31,38,135,0.07)] backdrop-blur-md'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4'>
          <NavLink
            to='/'
            className='flex items-center gap-2 rounded-xl border border-slate-100/60 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 px-3 py-2 font-bold text-gray-800 shadow-inner transition-colors duration-150 hover:bg-indigo-50/80'
          >
            <svg
              width='22'
              height='22'
              fill='none'
              viewBox='0 0 24 24'
              className='text-indigo-500'
            >
              <path
                d='M16 12a4 4 0 1 0-8 0v3a4 4 0 0 0 8 0v-3ZM12 3v2M6.34 6.34l1.42 1.42M3 12h2m12.24-4.24-1.42 1.42M21 12h-2'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='hidden sm:inline'>Auth System</span>
          </NavLink>
          <nav className='flex gap-2'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `rounded-lg border border-slate-100/60 px-3 py-2 font-medium shadow-inner backdrop-blur transition-colors duration-150 ${
                  isActive
                    ? 'bg-indigo-200/60 text-indigo-900'
                    : 'bg-white/60 text-gray-700 hover:bg-indigo-100/60 hover:text-indigo-900'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to='/register'
              className={({ isActive }) =>
                `rounded-lg border border-slate-100/60 px-3 py-2 font-medium shadow-inner backdrop-blur transition-colors duration-150 ${
                  isActive
                    ? 'bg-indigo-200/60 text-indigo-900'
                    : 'bg-white/60 text-gray-700 hover:bg-indigo-100/60 hover:text-indigo-900'
                }`
              }
            >
              Register
            </NavLink>
            <NavLink
              to='/login'
              className={({ isActive }) =>
                `rounded-lg border border-slate-100/60 px-3 py-2 font-medium shadow-inner backdrop-blur transition-colors duration-150 ${
                  isActive
                    ? 'bg-indigo-200/60 text-indigo-900'
                    : 'bg-white/60 text-gray-700 hover:bg-indigo-100/60 hover:text-indigo-900'
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to='/users'
              className={({ isActive }) =>
                `rounded-lg border border-slate-100/60 px-3 py-2 font-medium shadow-inner backdrop-blur transition-colors duration-150 ${
                  isActive
                    ? 'bg-indigo-200/60 text-indigo-900'
                    : 'bg-white/60 text-gray-700 hover:bg-indigo-100/60 hover:text-indigo-900'
                }`
              }
            >
              Users
            </NavLink>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                `rounded-lg border border-slate-100/60 px-3 py-2 font-medium shadow-inner backdrop-blur transition-colors duration-150 ${
                  isActive
                    ? 'bg-indigo-200/60 text-indigo-900'
                    : 'bg-white/60 text-gray-700 hover:bg-indigo-100/60 hover:text-indigo-900'
                }`
              }
            >
              Profile
            </NavLink>
          </nav>
        </div>
      </header>
      <main className='mx-auto max-w-4xl px-4 py-8'>
        {children ?? <Outlet />}
      </main>
    </div>
  )
}
