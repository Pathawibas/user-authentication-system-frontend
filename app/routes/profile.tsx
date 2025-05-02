import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

interface User {
  id: string
  fullName: string
  email: string
  phone: string
  password: string
  bio: string
  profilePicture: string
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token =
      sessionStorage.getItem('authToken') || localStorage.getItem('authToken')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      const decoded = JSON.parse(atob(token))
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const currentUser = users.find((u: User) => u.email === decoded.email)
      if (!currentUser) throw new Error('User not found')
      setUser(currentUser)
    } catch {
      sessionStorage.removeItem('authToken')
      localStorage.removeItem('authToken')
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className='mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg'>
      <div className='flex flex-col items-center'>
        <img
          src={`https://placehold.co/200x200?text=${user.fullName}`}
          alt='Profile'
          className='mb-4 h-32 w-32 rounded-full border-2 border-gray-300 object-cover'
        />
        <h1 className='mb-2 text-center text-3xl font-bold'>{user.fullName}</h1>
        <p className='mb-4 text-center text-gray-600'>{user.email}</p>
      </div>
      <div className='mt-6 space-y-4'>
        <p>
          <strong>Hash password:</strong> {user.password}
        </p>
        <p>
          <strong>Phone Number:</strong> {user.phone}
        </p>
        <p>
          <strong>Bio:</strong> {user.bio}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className='mt-6 w-full cursor-pointer rounded-md bg-red-500 px-4 py-2 font-bold text-white shadow-sm select-none hover:bg-red-600'
      >
        Logout
      </button>
    </div>
  )
}
