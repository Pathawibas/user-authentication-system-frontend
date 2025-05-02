import type { Route } from './+types/home'
import { NavLink } from 'react-router'
import { UserCog, Users, LogIn, UserPlus2, Contact2 } from 'lucide-react'
import HomeDemoContent from '../components/HomeDemoContent'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'User Authentication System' },
    { name: 'description', content: 'Simple React Vite Authentication App' },
  ]
}

export default function Home() {
  return (
    <main className='relative flex flex-col items-center justify-center px-4 py-8'>
      {/* Hero Section */}
      <section className='mb-16 flex w-full max-w-3xl flex-col items-center text-center'>
        <div className='mb-6 flex items-center justify-center'>
          <span className='rounded-2xl bg-gradient-to-br from-indigo-200 via-white to-indigo-100 p-4 shadow-inner'>
            <UserCog size={48} className='text-indigo-400' />
          </span>
        </div>
        <h1 className='mb-4 text-5xl font-extrabold text-slate-900 drop-shadow-sm'>
          User Authentication System
        </h1>
        <p className='mb-2 text-lg font-medium text-indigo-700'>
          Secure, beautiful, and easy to extend for your next project.
        </p>
        <p className='mb-6 text-base text-slate-600'>
          Explore authentication flows, modern UI, and best practices.
          <br />
          This project is for learning and demonstration purposes only.
        </p>
        <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <a
            href='/register'
            className='rounded-xl bg-indigo-500 px-8 py-3 text-lg font-bold text-white shadow-lg transition-colors hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none'
          >
            <UserPlus2 className='-mt-1 mr-2 inline-block' size={22} />
            Get Started
          </a>
          <a
            href='/login'
            className='rounded-xl border border-indigo-300 bg-white px-8 py-3 text-lg font-bold text-indigo-600 shadow transition-colors hover:bg-indigo-50 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none'
          >
            <LogIn className='-mt-1 mr-2 inline-block' size={22} />
            Sign In
          </a>
        </div>
        <a
          href='https://github.com/Pathawibas/user-authentication-system-frontend'
          target='_blank'
          rel='noopener noreferrer'
          className='mx-auto mt-4 flex w-full max-w-xs items-center justify-center gap-2 rounded-xl border border-slate-800/30 bg-slate-900/80 px-4 py-2 font-semibold text-white shadow backdrop-blur transition-colors hover:bg-slate-900/90'
        >
          <svg height='20' width='20' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z' />
          </svg>
          GitHub
        </a>
      </section>

      {/* Features Grid */}
      <section className='grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2'>
        <div className='flex items-start gap-4 rounded-2xl border border-slate-200 bg-white/90 px-6 py-6 shadow-inner'>
          <Users size={32} className='mt-1 text-indigo-400' />
          <div>
            <div className='text-lg font-semibold text-slate-900'>
              Protected Routes
            </div>
            <div className='text-sm text-slate-500'>
              Learn about route protection and access control.
            </div>
          </div>
        </div>
        <div className='flex items-start gap-4 rounded-2xl border border-slate-200 bg-white/90 px-6 py-6 shadow-inner'>
          <Contact2 size={32} className='mt-1 text-indigo-400' />
          <div>
            <div className='text-lg font-semibold text-slate-900'>
              Modern UI/UX
            </div>
            <div className='text-sm text-slate-500'>
              Skeuomorphic, soft, and accessible design patterns.
            </div>
          </div>
        </div>
        <div className='flex items-start gap-4 rounded-2xl border border-slate-200 bg-white/90 px-6 py-6 shadow-inner'>
          <UserCog size={32} className='mt-1 text-indigo-400' />
          <div>
            <div className='text-lg font-semibold text-slate-900'>
              Easy Extensibility
            </div>
            <div className='text-sm text-slate-500'>
              Add new features, fields, and flows with ease.
            </div>
          </div>
        </div>
        <div className='flex items-start gap-4 rounded-2xl border border-slate-200 bg-white/90 px-6 py-6 shadow-inner'>
          <LogIn size={32} className='mt-1 text-indigo-400' />
          <div>
            <div className='text-lg font-semibold text-slate-900'>
              Practice & Learn
            </div>
            <div className='text-sm text-slate-500'>
              Experiment with auth, forms, and validation.
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
