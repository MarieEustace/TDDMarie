import { describe, test, expect } from 'vitest';
import { checkPasswordStrength } from './passwordStrength.js'

describe('checkPasswordStrength', () => {

    test('password trop courte', () => {
        const result = checkPasswordStrength('123');
        expect(result.score).toBe(1);
        expect(result.strength).toBe('weak');
    })

    test('password null', () => {
        const result = checkPasswordStrength(null);
        expect(result.score).toBe(0);
        expect(result.strength).toBe('weak');
        expect(result.missing).toContain('password is required');
    })

    test('password undefined', () => {
        const result = checkPasswordStrength(undefined);
        expect(result.score).toBe(0);
        expect(result.strength).toBe('weak');
        expect(result.missing).toContain('password is required');
    })

    test('password vide', () => {
        const result = checkPasswordStrength('');
        expect(result.score).toBe(0);
        expect(result.strength).toBe('weak');
        expect(result.missing).toEqual(['min length', 'uppercase', 'lowercase', 'number', 'special char']);
    })

    test('password avec uniquement des minuscules', () => {
        const result = checkPasswordStrength('abcdefgh');
        expect(result.score).toBe(2);
        expect(result.strength).toBe('fair');
        expect(result.missing).toContain('uppercase');
        expect(result.missing).toContain('number');
        expect(result.missing).toContain('special char');
    })

    test('password avec uniquement des majuscules', () => {
        const result = checkPasswordStrength('ABCDEFGH');
        expect(result.score).toBe(2);
        expect(result.strength).toBe('fair');
        expect(result.missing).toContain('lowercase');
        expect(result.missing).toContain('number');
        expect(result.missing).toContain('special char');
    })

    test('password avec minuscules et majuscules', () => {
        const result = checkPasswordStrength('AbCdEfGh');
        expect(result.score).toBe(3);
        expect(result.strength).toBe('good');
        expect(result.missing).toContain('number');
        expect(result.missing).toContain('special char');
    })

    test('password avec lettres et chiffres', () => {
        const result = checkPasswordStrength('Abcdef12');
        expect(result.score).toBe(4);
        expect(result.strength).toBe('strong');
        expect(result.missing).toEqual(['special char']);
    })

    test('password forte avec tous les critères', () => {
        const result = checkPasswordStrength('Abcdef1!');
        expect(result.score).toBe(5);
        expect(result.strength).toBe('strong');
        expect(result.missing).toEqual([]);
    })

    test('password courte mais avec tous les types de caractères', () => {
        const result = checkPasswordStrength('A1a!');
        expect(result.score).toBe(4);
        expect(result.strength).toBe('strong');
        expect(result.missing).toEqual(['min length']);
    })

    test('password avec uniquement des caractères spéciaux', () => {
        const result = checkPasswordStrength('!@#$%^&*');
        expect(result.score).toBe(2);
        expect(result.strength).toBe('fair');
        expect(result.missing).toContain('uppercase');
        expect(result.missing).toContain('lowercase');
        expect(result.missing).toContain('number');
    })

    test('password avec uniquement des chiffres devrait être weak', () => {
        const result = checkPasswordStrength('12345678');
        expect(result.strength).toBe('weak'); // This will fail - actual is 'fair'
    })

});