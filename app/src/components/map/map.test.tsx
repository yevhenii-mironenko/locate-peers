import '../../test/mocks/leaflet.mock'

import { act, render, renderHook, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { mockUsers } from '../../test/mocks/users.mock'
import type { User } from '../../types/user'
import { useMap } from './hooks/use-map'
import { Map } from './map'

const fetchMock = vi.fn<typeof fetch>()
globalThis.fetch = fetchMock

const createMockResponse = (data: User[]): Promise<Response> => {
  return Promise.resolve({
    json: async () => data,
    ok: true,
    status: 200,
  } as Response)
}

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  useMap: () => ({
    getBounds: vi.fn(() => ({
      contains: vi.fn(() => true),
      getNorth: () => 51,
      getSouth: () => 49,
      getEast: () => 31,
      getWest: () => 29,
    })),
    addLayer: vi.fn(),
    removeLayer: vi.fn(),
    setView: vi.fn(),
    getZoom: vi.fn(() => 10),
    getCenter: vi.fn(() => ({ lat: 50.4501, lng: 30.5234 })),
  }),
  useMapEvents: () => null,
}))

describe('Map Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('should show loading screen initially', () => {
    fetchMock.mockImplementation(() => new Promise(() => {}))

    render(<Map />)

    expect(screen.getByText('Loading users...')).toBeInTheDocument()
  })

  it('should load and display map with users', async () => {
    fetchMock.mockReturnValueOnce(createMockResponse(mockUsers))

    render(<Map />)

    await waitFor(() => {
      expect(screen.getByTestId('map-container')).toBeInTheDocument()
    })
  })

  it('should display error screen on fetch failure', async () => {
    fetchMock.mockRejectedValueOnce(new Error('Network error'))

    render(<Map />)

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(
        screen.getByText(
          "We couldn't load the users data. Please try again later or reload the page."
        )
      ).toBeInTheDocument()
    })
  })
})

describe('useMap hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('should initialize with loading state', () => {
    fetchMock.mockImplementation(() => new Promise(() => {}))

    const { result } = renderHook(() => useMap())

    expect(result.current.state.loading).toBe(true)
    expect(result.current.state.allUsers).toEqual([])
  })

  it('should load users successfully', async () => {
    fetchMock.mockReturnValueOnce(createMockResponse(mockUsers))

    const { result } = renderHook(() => useMap())

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false)
    })

    expect(result.current.state.allUsers).toEqual(mockUsers)
    expect(result.current.state.error).toBeNull()
  })

  it('should handle fetch error', async () => {
    const error = new Error('Network error')
    fetchMock.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useMap())

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false)
    })

    expect(result.current.state.error).toEqual(error)
  })

  it('should filter users by interest', async () => {
    fetchMock.mockReturnValueOnce(createMockResponse(mockUsers))

    const { result } = renderHook(() => useMap())

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false)
    })

    await act(async () => {
      result.current.actions.setInterestFilter('coding')
    })

    await waitFor(() => {
      const filtered = result.current.state.visibleUsers.filter(user =>
        user.interests.some(interest => interest.toLowerCase().includes('coding'))
      )
      expect(filtered.length).toBeGreaterThan(0)
    })
  })

  it('should filter users case-insensitively', async () => {
    fetchMock.mockReturnValueOnce(createMockResponse(mockUsers))

    const { result } = renderHook(() => useMap())

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false)
    })

    await act(async () => {
      result.current.actions.setInterestFilter('CODING')
    })

    await waitFor(() => {
      const visibleUsers = result.current.state.visibleUsers
      const allHaveCoding = visibleUsers.every(user =>
        user.interests.some(interest => interest.toLowerCase().includes('coding'))
      )
      expect(visibleUsers.length).toBeGreaterThan(0)
      expect(allHaveCoding).toBe(true)
    })
  })
})
