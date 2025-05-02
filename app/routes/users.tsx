import { useEffect, useState } from 'react'
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
  const [searchName, setSearchName] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    setUsers(storedUsers)
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesName = user.fullName
      .toLowerCase()
      .includes(searchName.toLowerCase())
    const matchesEmail = user.email === searchEmail
    return matchesName && (!searchEmail || matchesEmail)
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
          <div className='mb-6 flex flex-col md:flex-row md:space-x-4'>
            <InputField
              type='text'
              placeholder='Search by name'
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value)
                setCurrentPage(1)
              }}
              label={''}
              name={'Search by name'}
            />
            <InputField
              type='text'
              placeholder='Search by email (exact)'
              value={searchEmail}
              onChange={(e) => {
                setSearchEmail(e.target.value)
                setCurrentPage(1)
              }}
              label={''}
              name={'Search by email (exact)'}
            />
          </div>
          <div className='space-y-6'>
            {displayedUsers.length > 0 ? (
              displayedUsers.map((user) => (
                <UserCard key={user.id} user={user} onDelete={handleDelete} />
              ))
            ) : (
              <p className='text-center text-slate-400'>No users found.</p>
            )}
          </div>
          <div className='mt-8 flex justify-center space-x-2'>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`cursor-pointer rounded-lg border border-indigo-200/40 bg-white/70 px-4 py-2 text-sm font-medium shadow-inner backdrop-blur transition-all duration-200 select-none hover:bg-indigo-100/70 hover:text-indigo-900 ${
                    currentPage === page
                      ? 'border-indigo-300/60 bg-indigo-500/80 shadow-md'
                      : 'text-slate-700'
                  }`}
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
