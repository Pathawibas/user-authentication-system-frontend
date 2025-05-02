interface User {
  id: string
  fullName: string
  email: string
  password: string
  phone?: string
  bio?: string
}

interface UserCardProps {
  user: User
  onDelete: (id: string) => void
}

export default function UserCard({ user, onDelete }: UserCardProps) {
  return (
    <div className='relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-[0_4px_32px_0_rgba(99,102,241,0.10)] backdrop-blur-md transition-shadow duration-200 hover:shadow-[0_8px_32px_0_rgba(99,102,241,0.18)] sm:flex-row sm:gap-6 sm:p-6'>
      {/* Skeuomorphic blurred highlights */}
      <div className='pointer-events-none absolute -top-8 -left-8 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-100 to-transparent opacity-40 blur-2xl'></div>
      <div className='pointer-events-none absolute -right-8 -bottom-8 h-16 w-16 rounded-full bg-gradient-to-br from-indigo-100 via-white to-transparent opacity-30 blur-xl'></div>
      {/* Avatar Circle */}
      <div className='relative z-10 mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-100/60 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 shadow-inner sm:mb-0'>
        <svg
          width='28'
          height='28'
          fill='none'
          viewBox='0 0 24 24'
          className='text-indigo-500'
        >
          <path
            d='M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-8 2.015-8 4.5V21a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2.5c0-2.485-3.582-4.5-8-4.5Z'
            fill='currentColor'
          />
        </svg>
      </div>
      {/* User Info */}
      <div className='relative z-10 w-full flex-1 space-y-1'>
        <div className='flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center'>
          <h2 className='text-lg font-bold text-slate-900 drop-shadow-sm'>
            {user.fullName}
          </h2>
          {/* Delete button for desktop */}
          <button
            onClick={() => onDelete(user.id)}
            className='ml-0 hidden cursor-pointer items-center gap-1 rounded-xl border border-red-200/40 bg-gradient-to-br from-red-400/80 via-red-500/80 to-red-600/80 px-4 py-2 text-xs font-semibold text-white shadow-[0_2px_8px_0_rgba(239,68,68,0.10)] backdrop-blur transition-all duration-150 hover:scale-105 hover:bg-red-600/90 focus:ring-2 focus:ring-red-300/40 focus:outline-none active:scale-100 sm:ml-2 sm:flex'
            title='Delete user'
          >
            <svg
              width='16'
              height='16'
              fill='none'
              viewBox='0 0 24 24'
              className='text-white'
            >
              <path
                d='M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            Delete
          </button>
        </div>
        <p className='text-sm leading-relaxed break-all text-slate-500'>
          {user.email}
        </p>
        {user.phone && (
          <p className='flex items-center gap-1 text-sm leading-relaxed text-slate-500'>
            <svg
              width='16'
              height='16'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block text-indigo-400'
            >
              <path
                d='M22 16.92v3a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3.08 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.72c.13.97.37 1.91.72 2.81a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.9.35 1.84.59 2.81.72A2 2 0 0 1 22 16.92Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            {user.phone}
          </p>
        )}
        {user.bio && (
          <p className='mt-2 text-sm leading-relaxed text-slate-600 italic'>
            "{user.bio}"
          </p>
        )}
        <div className='mt-3 max-w-full overflow-x-auto rounded-xl bg-slate-100/60 px-3 py-2 text-xs leading-relaxed break-all text-slate-400 shadow-inner select-all'>
          <span className='font-semibold text-slate-400'>Hashed Password:</span>{' '}
          <code>{user.password}</code>
        </div>
        {/* Delete button for mobile */}
        <button
          onClick={() => onDelete(user.id)}
          className='mt-4 flex w-full cursor-pointer items-center justify-center gap-1 rounded-xl border border-red-200/40 bg-gradient-to-br from-red-400/80 via-red-500/80 to-red-600/80 px-4 py-2 text-xs font-semibold text-white shadow-[0_2px_8px_0_rgba(239,68,68,0.10)] backdrop-blur transition-all duration-150 hover:scale-105 hover:bg-red-600/90 focus:ring-2 focus:ring-red-300/40 focus:outline-none active:scale-100 sm:hidden'
          title='Delete user'
        >
          <svg
            width='16'
            height='16'
            fill='none'
            viewBox='0 0 24 24'
            className='text-white'
          >
            <path
              d='M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  )
}
