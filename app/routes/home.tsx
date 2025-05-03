import type { Route } from './+types/home'
import { NavLink } from 'react-router'
import {
  UserCog,
  Users,
  LogIn,
  UserPlus2,
  Contact2,
  Shield,
  Code,
  ArrowRight,
  Lock,
} from 'lucide-react'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'User Authentication System' },
    {
      name: 'description',
      content: 'Modern React Authentication System with Skeuomorphic UI',
    },
  ]
}

export default function Home() {
  return (
    <main className='relative flex flex-col items-center justify-center overflow-hidden px-4 py-8'>
      {/* Hero Section - Skeuomorphic Style */}
      <section className='relative mb-16 flex w-full max-w-3xl flex-col items-center text-center'>
        <div className='mb-6 flex items-center justify-center'>
          <span className='rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-200 via-white to-indigo-100 p-4 shadow-lg backdrop-blur-sm'>
            <span className='flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 text-white shadow-inner'>
              <UserCog size={42} />
            </span>
          </span>
        </div>
        <h1 className='mb-4 text-5xl font-extrabold text-slate-900 drop-shadow-sm'>
          User Authentication System
        </h1>
        <p className='mb-6 max-w-xl text-lg font-medium text-indigo-700'>
          A modern authentication platform with skeuomorphic design elements
        </p>
        <p className='mb-8 max-w-2xl text-base text-slate-600'>
          Built with React Router, TypeScript, and Tailwind CSS featuring a
          modern skeuomorphic interface inspired by the latest UI/UX trends.
        </p>
      </section>

      {/* Bento Grid - Modern Skeuomorphic */}
      <section className='mb-16 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-12'>
        {/* Main Card - Skeuomorphic Style */}
        <div className='group relative col-span-full row-span-3 flex flex-col overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-white to-indigo-50 p-8 shadow-xl backdrop-blur-lg md:col-span-6'>
          {/* Decorative Elements */}
          <div className='absolute top-0 left-0 z-0 h-full w-full bg-white/40 backdrop-blur-xl'></div>
          <div className='absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-br from-white/10 to-indigo-100/20'></div>
          <div className='absolute -top-20 -right-20 z-0 h-40 w-40 rounded-full bg-indigo-200/30 blur-2xl transition-colors duration-500 group-hover:bg-indigo-300/30'></div>

          <div className='relative z-10 flex h-full flex-col items-center text-center'>
            <div className='mb-6 flex items-center justify-center'>
              {/* UPDATED: Changed to circular icon container */}
              <div className='rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-50 to-white p-4 shadow-inner'>
                <Lock
                  size={40}
                  className='text-indigo-500 transition-transform group-hover:scale-110'
                />
              </div>
            </div>
            <h2 className='mb-3 text-3xl font-extrabold text-slate-900'>
              Modern Authentication
            </h2>
            <p className='mb-6 max-w-md text-base text-indigo-700'>
              A complete system featuring user registration, login, profiles,
              and protected routes with modern skeuomorphic UI.
            </p>

            {/* Primary Action Buttons - Skeuomorphic */}
            <div className='mt-auto flex w-full max-w-xs flex-col gap-4 sm:flex-row'>
              <a
                href='/register'
                className='text-md group flex items-center justify-center rounded-xl border border-indigo-400/30 bg-gradient-to-br from-indigo-500 to-indigo-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:translate-y-[-2px] hover:shadow-xl focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none'
              >
                <UserPlus2
                  className='mr-2 transition-transform group-hover:scale-110'
                  size={20}
                />
                <span>Register</span>
              </a>
              <a
                href='/login'
                className='text-md group flex items-center justify-center rounded-xl border border-indigo-200 bg-white/80 px-6 py-3 font-bold text-indigo-600 shadow backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:bg-white hover:shadow-md focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none'
              >
                <LogIn
                  className='mr-2 transition-transform group-hover:scale-110'
                  size={20}
                />
                <span>Sign In</span>
              </a>
            </div>

            {/* GitHub Link - Skeuomorphic */}
            <a
              href='https://github.com/Pathawibas/user-authentication-system-frontend'
              target='_blank'
              rel='noopener noreferrer'
              className='mt-6 flex items-center justify-center gap-2 rounded-xl border border-slate-700/30 bg-slate-900/90 px-4 py-2 font-semibold text-white shadow backdrop-blur transition-all hover:translate-y-[-2px] hover:shadow-md'
            >
              <svg
                height='18'
                width='18'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z' />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Register Card - Skeuomorphic */}
        <div className='group relative col-span-full row-span-1 flex items-center overflow-hidden rounded-3xl border border-indigo-400/30 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg transition-all hover:translate-y-[-2px] hover:shadow-xl md:col-span-6'>
          <a
            href='/register'
            className='flex h-full w-full items-center p-6'
            aria-label='Register'
          >
            <div className='mr-6 rounded-full bg-white/20 p-3 shadow-inner backdrop-blur-sm'>
              <UserPlus2
                size={28}
                className='transition-transform group-hover:scale-110'
                aria-hidden='true'
              />
            </div>
            <div className='flex-1 text-left'>
              <span className='mb-1 block text-xl font-bold'>
                Register Account
              </span>
              <span className='block text-xs text-white/80'>
                Create a free account in seconds
              </span>
            </div>
            <div className='ml-4 flex items-center justify-center rounded-full bg-white/10 p-2'>
              <ArrowRight
                size={20}
                className='text-white transition-transform group-hover:translate-x-1'
              />
            </div>
          </a>
          <div className='absolute -top-10 -right-10 h-32 w-32 rounded-full bg-indigo-400/30 blur-2xl'></div>
        </div>

        {/* Bento Grid Cards - Skeuomorphic */}
        <div className='group col-span-full row-span-2 flex flex-col overflow-hidden rounded-3xl border border-indigo-100/50 bg-white/80 shadow-lg backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-xl md:col-span-3'>
          <a
            href='/users'
            className='flex h-full flex-col items-center justify-center p-6 text-center'
          >
            {/* UPDATED: Changed to circular icon container */}
            <div className='mb-4 rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-50 to-white p-4 shadow-inner'>
              <Users
                size={32}
                className='text-indigo-500 transition-transform group-hover:scale-110'
              />
            </div>
            <h3 className='mb-2 text-lg font-bold text-slate-900'>
              User Management
            </h3>
            <p className='text-sm text-slate-600'>
              Browse, search, and manage all registered users
            </p>
            <div className='mt-4 flex items-center text-sm font-medium text-indigo-500'>
              <span>Explore users</span>
              <ArrowRight
                size={16}
                className='ml-1 transition-transform group-hover:translate-x-1'
              />
            </div>
          </a>
        </div>

        <div className='group col-span-full row-span-2 flex flex-col overflow-hidden rounded-3xl border border-indigo-100/50 bg-white/80 shadow-lg backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-xl md:col-span-3'>
          <a
            href='/profile'
            className='flex h-full flex-col items-center justify-center p-6 text-center'
          >
            {/* UPDATED: Changed to circular icon container */}
            <div className='mb-4 rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-50 to-white p-4 shadow-inner'>
              <Contact2
                size={32}
                className='text-indigo-500 transition-transform group-hover:scale-110'
              />
            </div>
            <h3 className='mb-2 text-lg font-bold text-slate-900'>
              User Profile
            </h3>
            <p className='text-sm text-slate-600'>
              View and edit your personal information
            </p>
            <div className='mt-4 flex items-center text-sm font-medium text-indigo-500'>
              <span>View profile</span>
              <ArrowRight
                size={16}
                className='ml-1 transition-transform group-hover:translate-x-1'
              />
            </div>
          </a>
        </div>

        <div className='group relative col-span-full row-span-1 flex flex-col overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-indigo-100/80 to-white/90 shadow-lg backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-xl md:col-span-6'>
          <a
            href='/login'
            className='flex h-full items-center p-6'
            aria-label='Sign In'
          >
            <div className='mr-6 rounded-full bg-white/80 p-3 shadow-inner backdrop-blur-sm'>
              <LogIn
                size={28}
                className='text-indigo-500 transition-transform group-hover:scale-110'
              />
            </div>
            <div className='flex-1 text-left'>
              <span className='mb-1 block text-lg font-bold text-slate-900'>
                Secure Login
              </span>
              <span className='block text-sm text-slate-600'>
                Access your protected dashboard
              </span>
            </div>
            <div className='flex items-center justify-center rounded-full bg-indigo-100/80 p-2'>
              <ArrowRight
                size={20}
                className='text-indigo-500 transition-transform group-hover:translate-x-1'
              />
            </div>
          </a>
          <div className='absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-indigo-200/30 blur-2xl'></div>
        </div>
      </section>

      {/* Features Section - Skeuomorphic Style */}
      <section className='mb-16 w-full max-w-5xl'>
        <h2 className='mb-8 text-center text-2xl font-bold text-slate-800'>
          Key Features
        </h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='group relative col-span-full flex flex-col overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-white/90 to-indigo-50/80 p-6 shadow-lg backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-xl md:col-span-6'>
            <div className='absolute -top-12 -right-12 h-32 w-32 rounded-full bg-indigo-200/30 blur-2xl transition-colors duration-500 group-hover:bg-indigo-300/30'></div>
            <div className='relative z-10'>
              {/* UPDATED: Changed to circular icon container */}
              <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-50 to-white shadow-inner'>
                <Shield
                  size={28}
                  className='text-indigo-500 transition-transform group-hover:scale-110'
                />
              </div>
              <div>
                <h3 className='mb-2 text-xl font-bold text-slate-900'>
                  Protected Routes
                </h3>
                <p className='text-slate-600'>
                  Secure token-based authentication with localStorage storage
                  and comprehensive route protection mechanisms.
                </p>
              </div>
            </div>
          </div>

          <div className='group relative col-span-full flex flex-col overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-white/90 to-indigo-50/80 p-6 shadow-lg backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-xl md:col-span-6'>
            <div className='absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-indigo-200/30 blur-2xl transition-colors duration-500 group-hover:bg-indigo-300/30'></div>
            <div className='relative z-10'>
              {/* UPDATED: Changed to circular icon container */}
              <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-50 to-white shadow-inner'>
                <Code
                  size={28}
                  className='text-indigo-500 transition-transform group-hover:scale-110'
                />
              </div>
              <div>
                <h3 className='mb-2 text-xl font-bold text-slate-900'>
                  Modern Tech Stack
                </h3>
                <p className='text-slate-600'>
                  Built with React Router v7, TypeScript, Tailwind CSS v4, and
                  includes bcryptjs for secure password hashing.
                </p>
              </div>
            </div>
          </div>

          <div className='group relative col-span-full flex flex-col overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-white/90 to-indigo-50/80 p-6 shadow-lg backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-xl md:col-span-6'>
            <div className='absolute -top-12 -left-12 h-32 w-32 rounded-full bg-indigo-200/30 blur-2xl transition-colors duration-500 group-hover:bg-indigo-300/30'></div>
            <div className='relative z-10'>
              {/* UPDATED: Changed to circular icon container */}
              <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-50 to-white shadow-inner'>
                <UserCog
                  size={28}
                  className='text-indigo-500 transition-transform group-hover:scale-110'
                />
              </div>
              <div>
                <h3 className='mb-2 text-xl font-bold text-slate-900'>
                  Easy Extensibility
                </h3>
                <p className='text-slate-600'>
                  Designed for learning and experimentation with clear component
                  structure and thorough documentation.
                </p>
              </div>
            </div>
          </div>

          <div className='group relative col-span-full flex flex-col overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-white/90 to-indigo-50/80 p-6 shadow-lg backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-xl md:col-span-6'>
            <div className='absolute -right-12 -bottom-12 h-32 w-32 rounded-full bg-indigo-200/30 blur-2xl transition-colors duration-500 group-hover:bg-indigo-300/30'></div>
            <div className='relative z-10'>
              {/* UPDATED: Changed to circular icon container */}
              <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-50 to-white shadow-inner'>
                <Contact2
                  size={28}
                  className='text-indigo-500 transition-transform group-hover:scale-110'
                />
              </div>
              <div>
                <h3 className='mb-2 text-xl font-bold text-slate-900'>
                  Skeuomorphic UI
                </h3>
                <p className='text-slate-600'>
                  Features realistic textures, soft shadows, and subtle depth
                  effects that blend digital interfaces with real-world tactile
                  elements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
