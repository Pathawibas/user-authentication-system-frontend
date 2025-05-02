import { NavLink, Outlet } from 'react-router'

interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 text-gray-800'>
      <header className='sticky top-0 z-10 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-md'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4'>
          <h1 className='text-xl font-bold text-gray-800'>🔐 Auth System</h1>
          <nav className='space-x-4 text-sm'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-gray-900'
                  : 'text-gray-700 hover:text-gray-900'
              }
            >
              Home
            </NavLink>
            <NavLink
              to='/register'
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-gray-900'
                  : 'text-gray-700 hover:text-gray-900'
              }
            >
              Register
            </NavLink>
            <NavLink
              to='/login'
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-gray-900'
                  : 'text-gray-700 hover:text-gray-900'
              }
            >
              Login
            </NavLink>
            <NavLink
              to='/users'
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-gray-900'
                  : 'text-gray-700 hover:text-gray-900'
              }
            >
              Users
            </NavLink>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-gray-900'
                  : 'text-gray-700 hover:text-gray-900'
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
