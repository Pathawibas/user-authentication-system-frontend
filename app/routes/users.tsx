import { useEffect, useState, useRef } from 'react'
import UserCard from '../components/UserCard'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { Search, Users as UsersIcon } from 'lucide-react'

interface User {
  id: string
  fullName: string
  email: string
  password: string
  phone?: string
  bio?: string
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    setUsers(storedUsers)
    setTimeout(() => setLoading(false), 500) // Simulate loading
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search)
    }, 350)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [search])

  const filteredUsers = users.filter((user) => {
    const term = debouncedSearch.trim().toLowerCase()
    return (
      user.fullName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    )
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter((user) => user.id !== userId)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      setUsers(updatedUsers)
    }
  }

  return (
    <div className='my-8 flex items-center justify-center'>
      <div className='relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-b from-white/90 to-white/80 shadow-xl backdrop-blur-md'>
        {/* Decorative Elements */}
        <div className='pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-indigo-200/30 blur-3xl'></div>
        <div className='pointer-events-none absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-indigo-300/20 blur-3xl'></div>
        <div className='pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 opacity-30 blur-3xl'></div>

        {/* Top Highlight - Skeuomorphic Effect */}
        <div className='absolute top-0 right-0 left-0 h-20 rounded-t-3xl bg-gradient-to-b from-white/60 to-transparent'></div>

        {/* Content */}
        <div className='relative z-10 p-8'>
          {/* Loading Spinner Overlay */}
          {loading && (
            <div className='absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-sm'>
              <div className='relative h-10 w-10'>
                <div className='absolute inset-0 rounded-full border-4 border-indigo-100 opacity-80'></div>
                <div className='absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600'></div>
              </div>
            </div>
          )}

          {/* Header Section */}
          <div className='mb-8 flex flex-col items-center'>
            <div className='mb-4 rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-200 via-white to-indigo-100 p-4 shadow-lg backdrop-blur-sm'>
              <div className='rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 text-white shadow-inner'>
                <UsersIcon
                  size={32}
                  strokeWidth={2}
                  className='drop-shadow-sm'
                />
              </div>
            </div>
            <h1 className='bg-gradient-to-b from-indigo-700 to-indigo-900 bg-clip-text text-center text-3xl font-extrabold text-transparent drop-shadow-sm'>
              User Management
            </h1>
            <p className='mt-2 max-w-lg text-center text-slate-600'>
              View and manage all registered users in the system
            </p>
          </div>

          {/* Search Section */}
          <div className='mb-8 flex flex-col items-center'>
            <div className='w-full max-w-md'>
              <InputField
                type='text'
                placeholder='Search by name or email'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                label={''}
                name={'search'}
                icon={<Search size={18} className='text-indigo-500' />}
              />
            </div>
          </div>

          {/* Delete All Users Button */}
          {users.length > 0 && (
            <div className='mb-6 flex justify-end'>
              <Button
                variant='danger'
                size='sm'
                className='transition-transform duration-150 hover:scale-105 hover:shadow-lg active:scale-95'
                onClick={() => {
                  if (confirm('Are you sure you want to delete ALL users?')) {
                    localStorage.removeItem('users')
                    setUsers([])
                  }
                }}
              >
                Delete All Users
              </Button>
            </div>
          )}

          {/* Users List */}
          <div className='space-y-6'>
            {users.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-12'>
                <div className='mb-4 rounded-full bg-indigo-50/80 p-6 shadow-inner'>
                  <UsersIcon size={48} className='text-indigo-200' />
                </div>
                <p className='text-center text-lg font-medium text-slate-500'>
                  No users registered yet.
                </p>
                <p className='mt-2 text-center text-slate-400'>
                  Create an account to get started
                </p>
              </div>
            ) : displayedUsers.length > 0 ? (
              displayedUsers.map((user) => (
                <UserCard key={user.id} user={user} onDelete={handleDelete} />
              ))
            ) : (
              <div className='flex flex-col items-center justify-center py-12'>
                <div className='mb-4 rounded-full bg-indigo-50/80 p-6 shadow-inner'>
                  <Search size={48} className='text-indigo-200' />
                </div>
                <p className='text-center text-lg font-medium text-slate-500'>
                  No users found.
                </p>
                <p className='mt-2 text-center text-slate-400'>
                  Try a different search term
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className='mt-8 flex flex-wrap justify-center gap-2'>
            {totalPages > 1 &&
              Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    variant={currentPage === page ? 'primary' : 'secondary'}
                    size='sm'
                    className={`min-w-[40px] ${currentPage === page ? 'scale-105 shadow-md' : ''}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </Button>
                ),
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
