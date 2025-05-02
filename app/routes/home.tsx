import type { Route } from './+types/home'
import { NavLink } from 'react-router'
import { UserCog, Users, LogIn, UserPlus2, Contact2 } from 'lucide-react'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'User Authentication System' },
    { name: 'description', content: 'Simple React Vite Authentication App' },
  ]
}

export default function Home() {
  return (
    <div className='flex items-center justify-center'>
      <div className='relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md'>
        {/* Decorative blurred shapes for skeuomorphic depth */}
        <div className='pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full bg-gradient-to-tr from-indigo-300 via-indigo-100 to-transparent opacity-60 blur-2xl'></div>
        <div className='pointer-events-none absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-200 via-white to-transparent opacity-50 blur-2xl'></div>
        <div className='pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 opacity-30 blur-3xl'></div>
        {/* Content */}
        <div className='relative z-10 flex flex-col items-center'>
          <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-200 via-white to-indigo-100 shadow-inner'>
            <UserCog size={48} strokeWidth={1.5} className='text-indigo-500' />
          </div>
          <h1 className='mb-2 text-center text-3xl font-extrabold text-slate-900 drop-shadow-sm'>
            User Authentication System
          </h1>
          <p className='mb-2 text-center text-base font-semibold text-indigo-600'>
            Modern Skeuomorphism design for a soft, tactile web experience.
          </p>
          <p className='mb-4 text-center text-sm text-slate-500 italic'>
            This project is for learning and demonstration purposes only. Do not
            use real credentials.
          </p>
          <p className='mb-8 text-center text-base font-medium text-slate-700'>
            Effortless and secure authentication for modern web apps.
            <br />
            Experience a tactile, modern interface.
          </p>
          <a
            href='https://github.com/Pathawibas/user-authentication-system-frontend'
            target='_blank'
            rel='noopener noreferrer'
            className='mb-6 flex items-center justify-center gap-2 rounded-xl border border-slate-800/30 bg-slate-900/80 px-4 py-2 font-semibold text-white shadow backdrop-blur transition-colors duration-150 hover:bg-slate-900/90'
          >
            <svg height='20' width='20' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z' />
            </svg>
            View on GitHub
          </a>
          <div className='w-full space-y-3'>
            <NavLink
              to='/register'
              className='block w-full rounded-xl border border-indigo-300/30 bg-indigo-500/80 px-4 py-2 text-center font-semibold text-white shadow-inner backdrop-blur transition-colors duration-150 hover:bg-indigo-600/90'
            >
              <span className='inline-flex items-center justify-center align-middle'>
                <UserPlus2
                  size={20}
                  strokeWidth={2}
                  className='mr-1 inline-block text-white'
                />
                Register
              </span>
            </NavLink>
            <NavLink
              to='/users'
              className='block w-full rounded-xl border border-indigo-200/30 bg-indigo-400/80 px-4 py-2 text-center font-semibold text-white shadow-inner backdrop-blur transition-colors duration-150 hover:bg-indigo-500/90'
            >
              <span className='inline-flex items-center justify-center align-middle'>
                <Users
                  size={20}
                  strokeWidth={2}
                  className='mr-1 inline-block text-white'
                />
                Users
              </span>
            </NavLink>
            <NavLink
              to='/login'
              className='block w-full rounded-xl border border-indigo-100/30 bg-indigo-300/80 px-4 py-2 text-center font-semibold text-white shadow-inner backdrop-blur transition-colors duration-150 hover:bg-indigo-400/90'
            >
              <span className='inline-flex items-center justify-center align-middle'>
                <LogIn
                  size={20}
                  strokeWidth={2}
                  className='mr-1 inline-block text-white'
                />
                Login
              </span>
            </NavLink>
            <NavLink
              to='/profile'
              className='block w-full rounded-xl border border-indigo-50/30 bg-indigo-200/80 px-4 py-2 text-center font-semibold text-indigo-900 shadow-inner backdrop-blur transition-colors duration-150 hover:bg-indigo-300/90'
            >
              <span className='inline-flex items-center justify-center align-middle'>
                <Contact2
                  size={20}
                  strokeWidth={2}
                  className='mr-1 inline-block text-indigo-900'
                />
                Profile
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
