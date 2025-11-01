import type { User } from '../../types/user'

export const mockUsers: User[] = [
  {
    id: 'user_1',
    name: 'Oleksandr Shevchenko',
    lat: 50.4501,
    lon: 30.5234,
    interests: ['coding', 'react', 'music'],
    sex: 'male',
  },
  {
    id: 'user_2',
    name: 'Olena Kovalenko',
    lat: 50.4656,
    lon: 30.5169,
    interests: ['travel', 'photography', 'yoga'],
    sex: 'female',
  },
  {
    id: 'user_3',
    name: 'Dmytro Bondarenko',
    lat: 49.8383,
    lon: 24.0232,
    interests: ['music', 'sports', 'gaming'],
    sex: 'male',
  },
  {
    id: 'user_4',
    name: 'Iryna Tkachenko',
    lat: 49.8397,
    lon: 24.0297,
    interests: ['coding', 'typescript', 'hiking'],
    sex: 'female',
  },
  {
    id: 'user_5',
    name: 'Ivan Moroz',
    lat: 50.0047,
    lon: 36.2305,
    interests: ['react', 'nodejs', 'fitness'],
    sex: 'male',
  },
]
