import { stringSort } from '../utils/string-utils';

describe('stringSort', () => {
    test('returns -1 when first char is greater than second char', () => {
      expect(stringSort('b', 'a')).toBe(-1);
    });
  
    test('returns 1 when first char is less than second char', () => {
      expect(stringSort('a', 'b')).toBe(1);
    });
    
    test('returns -1 when first string is greater than second string', () => {
      expect(stringSort('ab', 'ac')).toBe(1);
    });
  
    test('returns 1 when first string is less than second string', () => {
      expect(stringSort('ac', 'ab')).toBe(-1);
    });
    
    test('returns 1 when first number is less than second number', () => {
        expect(stringSort('1', '2')).toBe(1);
    });
    
    test('returns -1 when first char is less than second char', () => {
      expect(stringSort('2', '1')).toBe(-1);
    });

    test('returns -1 when first version is more advanced than second version major', () => {
      expect(stringSort('2.0.0', '1.0.0')).toBe(-1);
    });
    
    test('returns -1 when first version is more advanced than second version minor', () => {
      expect(stringSort('1.1.0', '1.0.0')).toBe(-1);
    });
    
    test('returns -1 when first version is more advanced than second version patch', () => {
      expect(stringSort('1.0.1', '1.0.0')).toBe(-1);
    });
    
    test('returns -1 when first version is more advanced than second version pre-release and not pre-releas', () => {
      expect(stringSort('1.0.0-alpha', '1.0.0')).toBe(-1);
    });
    
    test('returns -1 when first version is more advanced than second version pre-release and pre-releas', () => {
      expect(stringSort('1.0.0-beta', '1.0.0-alpha')).toBe(-1);
    });
    
    test('returns -1 when first version is more advanced than second version build and not build', () => {
      expect(stringSort('1.0.0-alpha.1', '1.0.0-alpha')).toBe(-1);
    });
    
    test('returns -1 when first version is more advanced than second version build and build', () => {
      expect(stringSort('1.0.0-alpha.2', '1.0.0-alpha.1')).toBe(-1);
    });
    
    test('returns 1 when first version is less advanced than second version major', () => {
      expect(stringSort('1.0.0', '1.1.0')).toBe(1);
    });
    
    test('returns 1 when first version is less advanced than second version minor', () => {
      expect(stringSort('1.0.0', '1.1.0')).toBe(1);
    });
    
    test('returns 1 when first version is less advanced than second version patch', () => {
      expect(stringSort('1.0.0', '1.0.1')).toBe(1);
    });
    
    test('returns 1 when first version is less advanced than second version pre-release and not pre-releas', () => {
      expect(stringSort('1.0.0', '1.0.0-alpha')).toBe(1);
    });
    
    test('returns 1 when first version is less advanced than second version pre-release and pre-releas', () => {
      expect(stringSort('1.0.0-alpha', '1.0.0-beta')).toBe(1);
    });
    
    test('returns 1 when first version is less advanced than second version build and not build', () => {
      expect(stringSort('1.0.0-alpha', '1.0.0-alpha.1')).toBe(1);
    });
    
    test('returns 1 when first version is less advanced than second version build and build', () => {
      expect(stringSort('1.0.0-alpha.1', '1.0.0-alpha.2')).toBe(1);
    });
});