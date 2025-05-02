interface User {
  id: string
  fullName: string
  email: string
  password: string
  phone?: string
  bio?: string
}

export default function UserCard({ user }: { user: User }) {
  return (
    <div className='rounded-md border p-4 shadow-sm'>
      <h2 className='text-lg font-semibold text-gray-900'>{user.fullName}</h2>
      <p className='text-sm text-gray-600'>{user.email}</p>
      {user.phone && <p className='text-sm text-gray-600'>📞 {user.phone}</p>}
      {user.bio && <p className='text-sm text-gray-600 italic'>"{user.bio}"</p>}
      <p className='mt-2 text-xs break-all text-gray-500'>
        Hashed Password: <code>{user.password}</code>
      </p>
    </div>
  )
}
