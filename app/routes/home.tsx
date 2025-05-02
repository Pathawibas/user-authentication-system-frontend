import type { Route } from './+types/home'
import { NavLink } from 'react-router'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'User Authentication System' },
    { name: 'description', content: 'Simple React Vite Authentication App' },
  ]
}

export default function Home() {
  return (
    <div className='flex items-center justify-center px-4'>
      <div className='max-w-md rounded-lg bg-white p-8 text-center shadow-lg'>
        <h1 className='mb-6 text-4xl font-extrabold text-gray-900'>
          Welcome to{' '}
          <span className='text-indigo-600'>User Authentication System</span>
        </h1>
        <p className='mb-6 text-gray-700'>
          A simple and secure way to manage user authentication.
        </p>
        <nav className='space-y-4'>
          <NavLink
            to='/register'
            className='block w-full rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700'
          >
            ➕ Register
          </NavLink>
          <NavLink
            to='/users'
            className='block w-full rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700'
          >
            👥 Users
          </NavLink>
          <NavLink
            to='/login'
            className='block w-full rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700'
          >
            🔐 Login
          </NavLink>
          <NavLink
            to='/profile'
            className='block w-full rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700'
          >
            👤 Profile
          </NavLink>
        </nav>
      </div>
    </div>
  )
}
