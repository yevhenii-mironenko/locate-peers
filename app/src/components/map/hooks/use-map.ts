import type { LatLngBounds } from 'leaflet'
import L from 'leaflet'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { INITIAL_BOUNDS } from '../../../constants/map.constants'
import type { User } from '../../../types/user'
import { isUsersArray } from '../../../utils/validate-users/validate-users'

export function useMap() {
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [bounds, setBounds] = useState<LatLngBounds | null>(null)
  const [interestFilter, setInterestFilter] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch('/users.json', { signal: controller.signal })
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

    const activeBounds =
      bounds ??
      L.latLngBounds(
        [INITIAL_BOUNDS.LAT_MIN, INITIAL_BOUNDS.LON_MIN],
        [INITIAL_BOUNDS.LAT_MAX, INITIAL_BOUNDS.LON_MAX]
      )

    return allUsers.filter(user => {
      if (normalizedFilter) {
        const hasInterest = user.interests.some(interest =>
          interest.toLowerCase().includes(normalizedFilter)
        )
        if (!hasInterest) return false
      }

      return activeBounds.contains([user.lat, user.lon])
    })
  }, [bounds, allUsers, interestFilter])

  const clearFilter = useCallback(() => {
    setInterestFilter('')
  }, [])

  return {
    state: {
      allUsers,
      loading,
      error,
      bounds,
      visibleUsers,
      interestFilter,
    },
    actions: {
      setBounds,
      setInterestFilter,
      clearFilter,
    },
  }
}
