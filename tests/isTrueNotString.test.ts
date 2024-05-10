import { isTrueAndNotString } from "../utils/string-utils";

describe('isTrueNotString', () => {
    // Valid inputs
    test('returns true for valid input true', () => {
      expect(isTrueAndNotString(true)).toBe(true);
    });
  
    // Invalid inputs
    test('returns false for invalid input false', () => {
      expect(isTrueAndNotString(false)).toBe(false);
    });
  
    test('returns false for invalid string input "Hello, World!"', () => {
      expect(isTrueAndNotString('Hello, World!')).toBe(false);
    });
    
    test('returns false for invalid string input "true"', () => {
      expect(isTrueAndNotString('true')).toBe(false);
    });

  });