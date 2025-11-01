import { useCallback, useEffect, useMemo, useState } from 'react'

import type { User } from '../../../types/user'
import { isUsersArray } from '../../../utils/validate-users/validate-users'

export function useMap() {
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [interestFilter, setInterestFilter] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${import.meta.env.BASE_URL}users.json`, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch users')
        return response.json()
      })
      .then((data: unknown) => {
        if (!isUsersArray(data)) {
          throw new Error('Invalid users data format')
        }
        setAllUsers(data)
        setLoading(false)
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Error loading users:', error)
          setError(error)
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [])

  const visibleUsers = useMemo(() => {
    if (allUsers.length === 0) return []

    const normalizedFilter = interestFilter ? interestFilter.toLowerCase().trim() : null

    return allUsers.filter(user => {
      if (normalizedFilter) {
        return user.interests.some(interest => interest.toLowerCase().includes(normalizedFilter))
      }
      return true
    })
  }, [allUsers, interestFilter])

  const clearFilter = useCallback(() => {
    setInterestFilter('')
  }, [])

  return {
    state: {
      allUsers,
      loading,
      error,
      visibleUsers,
      interestFilter,
    },
    actions: {
      setInterestFilter,
      clearFilter,
    },
  }
}
