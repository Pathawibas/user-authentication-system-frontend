import {
  Mail,
  Phone,
  KeyRound,
  FileText,
  Trash2,
  User as UserIcon,
  AlertTriangle,
} from 'lucide-react'
import ProfileInfoCard from './ProfileInfoCard'
import type { User } from '../types/User'
import { useNavigate } from 'react-router'
import UserInfoSection from './UserInfoSection'
import Button from './Button'

interface UserCardProps {
  user: User
  onDelete: (id: string) => void
}

export default function UserCard({ user, onDelete }: UserCardProps) {
  const navigate = useNavigate()

  return (
    <div className='relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_4px_32px_0_rgba(99,102,241,0.10)] backdrop-blur-md sm:flex-row sm:gap-8'>
      {/* Skeuomorphic blurred highlights */}
      <div className='pointer-events-none absolute -top-8 -left-8 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-100 to-transparent opacity-40 blur-2xl'></div>
      <div className='pointer-events-none absolute -right-8 -bottom-8 h-16 w-16 rounded-full bg-gradient-to-br from-indigo-100 via-white to-transparent opacity-30 blur-xl'></div>
      {/* Avatar */}
      <div className='relative z-10 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-200 via-white to-indigo-100 shadow-inner'>
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt='Profile'
            className='h-20 w-20 rounded-full object-cover'
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        ) : (
          <UserIcon size={40} strokeWidth={1.5} className='text-indigo-400' />
        )}
      </div>
      {/* Info Cards */}
      <div className='relative z-10 w-full flex-1 space-y-3'>
        <UserInfoSection user={user} defaultExpanded={false} />
        {/* Delete button and Login as this user button */}
        <div className='flex justify-end gap-2'>
          <Button
            onClick={() =>
              navigate(`/login?email=${encodeURIComponent(user.email)}`)
            }
            variant='secondary'
            className='text-xs'
            title='Login as this user'
          >
            <UserIcon size={16} className='text-indigo-500' /> Login as this
            user
          </Button>
          <Button
            onClick={() => onDelete(user.id)}
            variant='danger'
            className='text-xs'
            title='Delete user'
          >
            <Trash2 size={16} className='text-white' /> Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
