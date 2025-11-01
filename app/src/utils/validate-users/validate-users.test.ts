import { describe, expect, it } from 'vitest'

import { omit } from '../../test/helpers/omit'
import type { User } from '../../types/user'
import { isUser, isUsersArray } from './validate-users'

describe('validate-users', () => {
  describe('isUser', () => {
    const validUser: User = {
      id: 'user_1',
      name: 'John Doe',
      lat: 50.4501,
      lon: 30.5234,
      interests: ['coding', 'music'],
      sex: 'male',
    }

    it('should return true for valid user object', () => {
      expect(isUser(validUser)).toBe(true)
    })

    it('should return true for female user', () => {
      const femaleUser = { ...validUser, sex: 'female' }
      expect(isUser(femaleUser)).toBe(true)
    })

    it('should return false for null', () => {
      expect(isUser(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isUser(undefined)).toBe(false)
    })

    it('should return false for non-object types', () => {
      expect(isUser('string')).toBe(false)
      expect(isUser(123)).toBe(false)
      expect(isUser(true)).toBe(false)
    })

    it('should return false when id is missing', () => {
      const userWithoutId = omit(validUser, 'id')
      expect(isUser(userWithoutId)).toBe(false)
    })

    it('should return false when name is missing', () => {
      const userWithoutName = omit(validUser, 'name')
      expect(isUser(userWithoutName)).toBe(false)
    })

    it('should return false when lat is missing', () => {
      const userWithoutLat = omit(validUser, 'lat')
      expect(isUser(userWithoutLat)).toBe(false)
    })

    it('should return false when lon is missing', () => {
      const userWithoutLon = omit(validUser, 'lon')
      expect(isUser(userWithoutLon)).toBe(false)
    })

    it('should return false when interests is missing', () => {
      const userWithoutInterests = omit(validUser, 'interests')
      expect(isUser(userWithoutInterests)).toBe(false)
    })

    it('should return false when sex is missing', () => {
      const userWithoutSex = omit(validUser, 'sex')
      expect(isUser(userWithoutSex)).toBe(false)
    })

    it('should return false when id is not a string', () => {
      expect(isUser({ ...validUser, id: 123 })).toBe(false)
    })

    it('should return false when name is not a string', () => {
      expect(isUser({ ...validUser, name: 123 })).toBe(false)
    })

    it('should return false when lat is not a number', () => {
      expect(isUser({ ...validUser, lat: '50.4501' })).toBe(false)
    })

    it('should return false when lon is not a number', () => {
      expect(isUser({ ...validUser, lon: '30.5234' })).toBe(false)
    })

    it('should return false when interests is not an array', () => {
      expect(isUser({ ...validUser, interests: 'coding' })).toBe(false)
    })

    it('should return false when interests contains non-string values', () => {
      expect(isUser({ ...validUser, interests: ['coding', 123, 'music'] })).toBe(false)
    })

    it('should return false when sex is invalid value', () => {
      expect(isUser({ ...validUser, sex: 'unknown' })).toBe(false)
      expect(isUser({ ...validUser, sex: 'other' })).toBe(false)
      expect(isUser({ ...validUser, sex: '' })).toBe(false)
    })

    it('should return true for user with empty interests array', () => {
      expect(isUser({ ...validUser, interests: [] })).toBe(true)
    })
  })

  describe('isUsersArray', () => {
    const validUser1: User = {
      id: 'user_1',
      name: 'John Doe',
      lat: 50.4501,
      lon: 30.5234,
      interests: ['coding'],
      sex: 'male',
    }

    const validUser2: User = {
      id: 'user_2',
      name: 'Jane Smith',
      lat: 49.8383,
      lon: 24.0232,
      interests: ['music', 'travel'],
      sex: 'female',
    }

    it('should return true for empty array', () => {
      expect(isUsersArray([])).toBe(true)
    })

    it('should return true for array with one valid user', () => {
      expect(isUsersArray([validUser1])).toBe(true)
    })

    it('should return true for array with multiple valid users', () => {
      expect(isUsersArray([validUser1, validUser2])).toBe(true)
    })

    it('should return false for non-array', () => {
      expect(isUsersArray(null)).toBe(false)
      expect(isUsersArray(undefined)).toBe(false)
      expect(isUsersArray('string')).toBe(false)
      expect(isUsersArray(123)).toBe(false)
      expect(isUsersArray({})).toBe(false)
    })

    it('should return false if any user in array is invalid', () => {
      const invalidUser = { ...validUser1, lat: 'invalid' }
      expect(isUsersArray([validUser1, invalidUser])).toBe(false)
    })

    it('should return false for array with mixed valid and invalid users', () => {
      expect(isUsersArray([validUser1, { invalid: 'user' }, validUser2])).toBe(false)
    })

    it('should return false for array with non-object elements', () => {
      expect(isUsersArray([validUser1, 'not a user'])).toBe(false)
      expect(isUsersArray([123, validUser1])).toBe(false)
    })
  })
})
