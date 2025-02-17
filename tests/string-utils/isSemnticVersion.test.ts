import { isSemanticVersion } from '../../src/utils/string-utils'

describe('isSemanticVersion', () => {
    // Valid semantic versions
    test('returns true for valid semantic version "1.0.0.json"', () => {
      expect(isSemanticVersion('1.0.0.json')).toBe(true);
    });
    
    test('returns true for valid semantic version "1.0.0"', () => {
      expect(isSemanticVersion('1.0.0')).toBe(true);
    });
  
    test('returns true for valid semantic version "2.3.4-alpha.1.json"', () => {
      expect(isSemanticVersion('2.3.4-alpha.1.json')).toBe(true);
    });
    
    test('returns true for valid semantic version "2.3.4-alpha.1"', () => {
      expect(isSemanticVersion('2.3.4-alpha.1')).toBe(true);
    });
  
    test('returns true for valid semantic version "1.0.0+build-123.json"', () => {
      expect(isSemanticVersion('1.0.0+build-123.json')).toBe(true);
    });
    
    test('returns true for valid semantic version "1.0.0+build-123"', () => {
      expect(isSemanticVersion('1.0.0+build-123')).toBe(true);
    });
  
    test('returns true for valid semantic version "1.0.0-alpha+build-123.json"', () => {
      expect(isSemanticVersion('1.0.0-alpha+build-123.json')).toBe(true);
    });
    
    test('returns true for valid semantic version "1.0.0-alpha+build-123"', () => {
      expect(isSemanticVersion('1.0.0-alpha+build-123')).toBe(true);
    });
  
    // Invalid semantic versions
    test('returns false for invalid semantic version "1.json"', () => {
      expect(isSemanticVersion('1.json')).toBe(false);
    });
  
    test('returns false for invalid semantic version "1.0.json"', () => {
      expect(isSemanticVersion('1.0.json')).toBe(false);
    });
  
    test('returns false for invalid semantic version "1.0.0-alpha+.json"', () => {
      expect(isSemanticVersion('1.0.0-alpha+.json')).toBe(false);
    });
  
    test('returns false for invalid semantic version "1.0.0+.json"', () => {
      expect(isSemanticVersion('1.0.0+.json')).toBe(false);
    });
  
    test('returns false for invalid semantic version "1"', () => {
      expect(isSemanticVersion('1')).toBe(false);
    });
  
    test('returns false for invalid semantic version "1.0"', () => {
      expect(isSemanticVersion('1.0')).toBe(false);
    });
  
    test('returns false for invalid semantic version "1.0.0-alpha+"', () => {
      expect(isSemanticVersion('1.0.0-alpha+')).toBe(false);
    });
  
    test('returns false for invalid semantic version "1.0.0+"', () => {
      expect(isSemanticVersion('1.0.0+')).toBe(false);
    });
    
    test('returns false for invalid semantic version "test"', () => {
      expect(isSemanticVersion('test')).toBe(false);
    });
    
    test('returns false for invalid semantic version "test.json"', () => {
      expect(isSemanticVersion('test.json')).toBe(false);
    });
});

