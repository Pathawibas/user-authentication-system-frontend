import type { Route } from './+types/home'
import { NavLink } from 'react-router'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>
          Welcome to User Authentication System
        </h1>
        <nav className='mt-4 space-x-4'>
          <NavLink to='/register' className='text-blue-500 underline'>
            Register
          </NavLink>
          <NavLink to='/users' className='text-blue-500 underline'>
            Users
          </NavLink>
          <NavLink to='/login' className='text-blue-500 underline'>
            Logins
          </NavLink>
          <NavLink to='/profile' className='text-blue-500 underline'>
            Profile
          </NavLink>
        </nav>
      </div>
    </div>
  )
}
