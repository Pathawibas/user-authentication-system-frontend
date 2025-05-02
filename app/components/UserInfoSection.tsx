import ProfileInfoCard from './ProfileInfoCard'
import { userInfoConfig } from './userInfoConfig'

interface UserInfoSectionProps {
  user: any
  className?: string
  children?: React.ReactNode
}

export default function UserInfoSection({
  user,
  className = '',
  children,
}: UserInfoSectionProps) {
  return (
    <div className={`w-full space-y-4 ${className}`}>
      {userInfoConfig.map((field) => (
        <ProfileInfoCard
          key={field.key}
          icon={field.icon}
          label={field.label}
          isSpoiler={field.isSpoiler}
          spoilerLabel={field.spoilerLabel}
          value={field.render ? field.render(user) : user[field.key]}
        />
      ))}
      {children}
    </div>
  )
}
