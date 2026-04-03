import { describe, test, expect } from 'vitest';
import { truncate } from './truncate.js'

describe('truncate', () => {

    test('null retourne chaîne vide', () => {
        expect(truncate(null, 10)).toBe('');
    })

    test('undefined retourne chaîne vide', () => {
        expect(truncate(undefined, 10)).toBe('');
    })

    test('valeur non string retourne chaîne vide', () => {
        expect(truncate(42, 10)).toBe('');
    })

    test('maxLength négatif retourne chaîne vide', () => {
        expect(truncate('hello', -1)).toBe('');
    })

    test('texte plus court que maxLength reste inchangé', () => {
        expect(truncate('hello', 10)).toBe('hello');
    })

    test('texte de même longueur que maxLength reste inchangé', () => {
        expect(truncate('hello', 5)).toBe('hello');
    })

    test('texte plus long est tronqué avec ...', () => {
        expect(truncate('hello world', 8)).toBe('hello...');
    })

    test('maxLength de 3 retourne ...', () => {
        expect(truncate('hello world', 3)).toBe('...');
    })

    test('maxLength de 2 retourne ..', () => {
        expect(truncate('hello world', 2)).toBe('..');
    })

    test('maxLength de 1 retourne .', () => {
        expect(truncate('hello world', 1)).toBe('.');
    })

    test('maxLength de 0 retourne chaîne vide', () => {
        expect(truncate('hello world', 0)).toBe('');
    })

    test('texte vide reste vide', () => {
        expect(truncate('', 5)).toBe('');
    })

    test('troncature à 4 caractères', () => {
        expect(truncate('hello world', 4)).toBe('h...');
    })

    test('longue phrase tronquée', () => {
        expect(truncate('Ceci est une phrase très longue', 15)).toBe('Ceci est une...');
    })

});
