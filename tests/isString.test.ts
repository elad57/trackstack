import { isString } from '../utils/string-utils';

describe('isString', () => {
    // Valid string inputs
    test('returns true for valid string input "Hello, World!"', () => {
      expect(isString('Hello, World!')).toBe(true);
    });
  
    test('returns true for valid string input "123"', () => {
      expect(isString('123')).toBe(true);
    });
  
    test('returns true for valid string input ""', () => {
      expect(isString('')).toBe(true);
    });
  
    // Invalid string inputs
    test('returns false for invalid string input 123', () => {
      expect(isString(123 as any as any)).toBe(false);
    });
  
    test('returns false for invalid string input true', () => {
      expect(isString(true as any)).toBe(false);
    });
  
    test('returns false for invalid string input null', () => {
      expect(isString(null as any)).toBe(false);
    });
  
    test('returns false for invalid string input undefined', () => {
      expect(isString(undefined as any)).toBe(false);
    });
  
    test('returns false for invalid string input {}', () => {
      expect(isString({} as any)).toBe(false);
    });
  
    test('returns false for invalid string input []', () => {
      expect(isString([] as any)).toBe(false);
    });
  
    test('returns false for invalid string input () => {}', () => {
      expect(isString((() => {}) as any)).toBe(false);
    });
  });