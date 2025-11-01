import type { User } from '../../types/user'

export function isUser(data: unknown): data is User {
  if (!data || typeof data !== 'object') return false

  const user = data as Record<string, unknown>

  return (
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.lat === 'number' &&
    typeof user.lon === 'number' &&
    Array.isArray(user.interests) &&
    user.interests.every(i => typeof i === 'string') &&
    (user.sex === 'male' || user.sex === 'female')
  )
}

export function isUsersArray(data: unknown): data is User[] {
  return Array.isArray(data) && data.every(isUser)
}
