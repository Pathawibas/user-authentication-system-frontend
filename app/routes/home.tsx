import type { Route } from './+types/home'
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <h1 className='text-3xl font-bold text-gray-900'>
        Welcome to User Authentication System
      </h1>
    </div>
  )
}
