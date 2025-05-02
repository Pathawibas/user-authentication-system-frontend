import { useEffect, useState, useRef } from 'react'
import UserCard from '../components/UserCard'
import InputField from '../components/InputField'

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
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    setUsers(storedUsers)
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
    <div className='flex items-center justify-center'>
      <div className='relative w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.10)] backdrop-blur-md'>
        {/* Decorative blurred shapes for skeuomorphic depth */}
        <div className='pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-100 to-transparent opacity-40 blur-2xl'></div>
        <div className='pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-gradient-to-br from-indigo-200 via-white to-transparent opacity-30 blur-2xl'></div>
        <div className='pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 opacity-20 blur-3xl'></div>
        {/* Content */}
        <div className='relative z-10'>
          <h1 className='mb-8 text-center text-3xl font-extrabold text-indigo-600 drop-shadow-sm'>
            User Management
          </h1>
          <div className='mb-6 flex flex-col items-center'>
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
            />
          </div>
          <div className='space-y-6'>
            {users.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-12'>
                <svg
                  width='64'
                  height='64'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='mb-4 text-indigo-200'
                >
                  <circle
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M8 15c1.333-2 6.667-2 8 0'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                  <circle cx='9' cy='10' r='1' fill='currentColor' />
                  <circle cx='15' cy='10' r='1' fill='currentColor' />
                </svg>
                <p className='text-center text-lg text-slate-400'>
                  No users registered yet.
                </p>
              </div>
            ) : displayedUsers.length > 0 ? (
              displayedUsers.map((user) => (
                <UserCard key={user.id} user={user} onDelete={handleDelete} />
              ))
            ) : (
              <div className='flex flex-col items-center justify-center py-12'>
                <svg
                  width='64'
                  height='64'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='mb-4 text-indigo-200'
                >
                  <circle
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M8 15c1.333-2 6.667-2 8 0'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                  <circle cx='9' cy='10' r='1' fill='currentColor' />
                  <circle cx='15' cy='10' r='1' fill='currentColor' />
                </svg>
                <p className='text-center text-lg text-slate-400'>
                  No users found.
                  <br />
                  Try a different search.
                </p>
              </div>
            )}
          </div>
          <div className='mt-8 flex flex-wrap justify-center gap-2'>
            {totalPages > 1 &&
              Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[40px] rounded-lg border px-4 py-2 text-sm font-medium shadow-inner backdrop-blur transition-all duration-200 select-none focus:ring-2 focus:ring-indigo-400/40 focus:outline-none ${
                      currentPage === page
                        ? 'scale-105 border-indigo-400 bg-indigo-500/90 text-white shadow-md'
                        : 'border-indigo-200/40 bg-white/70 text-slate-700 hover:bg-indigo-100/70 hover:text-indigo-900'
                    } `}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                ),
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
