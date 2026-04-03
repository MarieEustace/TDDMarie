import { describe, test, expect } from 'vitest';
import { isValidEmail } from './isValidEmail.js'

describe('isValidEmail', () => {
  describe('happy path', () => {
    test('simple valid email', () => {
      expect(isValidEmail('test@example.com')).toEqual({ valid: true, reason: null })
    })

    test('valid email with subdomain', () => {
      expect(isValidEmail('user@mail.example.com')).toEqual({ valid: true, reason: null })
    })

    test('valid email with plus sign', () => {
      expect(isValidEmail('user+tag@domain.org')).toEqual({ valid: true, reason: null })
    })

    test('short domain', () => {
      expect(isValidEmail('a@b.co')).toEqual({ valid: true, reason: null })
    })
  })

  describe('error handling - type validation', () => {
    test('null input', () => {
      expect(isValidEmail(null)).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('undefined input', () => {
      expect(isValidEmail(undefined)).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('number input', () => {
      expect(isValidEmail(123)).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('object input', () => {
      expect(isValidEmail({})).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('array input', () => {
      expect(isValidEmail([])).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('empty string', () => {
      expect(isValidEmail('')).toEqual({ valid: false, reason: expect.any(String) })
    })
  })

  describe('error handling - @ symbol rules', () => {
    test('missing @', () => {
      expect(isValidEmail('testexample.com')).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('multiple @', () => {
      expect(isValidEmail('test@@example.com')).toEqual({ valid: false, reason: expect.any(String) })
    })
  })

  describe('error handling - empty parts', () => {
    test('empty local part', () => {
      expect(isValidEmail('@example.com')).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('empty domain part', () => {
      expect(isValidEmail('test@')).toEqual({ valid: false, reason: expect.any(String) })
    })
  })

  describe('error handling - whitespace', () => {
    test('leading space', () => {
      expect(isValidEmail(' test@example.com')).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('trailing space', () => {
      expect(isValidEmail('test@example.com ')).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('space in local', () => {
      expect(isValidEmail('test user@example.com')).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('space in domain', () => {
      expect(isValidEmail('test@example .com')).toEqual({ valid: false, reason: expect.any(String) })
    })
  })

  describe('boundary - domain dot rules', () => {
    test('domain starts with dot', () => {
      expect(isValidEmail('test@.com')).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('domain ends with dot', () => {
      expect(isValidEmail('test@example.')).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('domain has consecutive dots', () => {
      expect(isValidEmail('test@example..com')).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('domain without dot', () => {
      expect(isValidEmail('test@examplecom')).toEqual({ valid: false, reason: expect.any(String) })
    })
  })

  describe('boundary - local part dot rules', () => {
    test('local starts with dot', () => {
      expect(isValidEmail('.test@example.com')).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('local ends with dot', () => {
      expect(isValidEmail('test.@example.com')).toEqual({ valid: false, reason: expect.any(String) })
    })

    test('local has consecutive dots', () => {
      expect(isValidEmail('te..st@example.com')).toEqual({ valid: false, reason: expect.any(String) })
    })
  })
})