import { describe, test, expect } from 'vitest';
import { slugify } from './slugify.js'

describe('slugify', () => {

    test('null retourne chaîne vide', () => {
        expect(slugify(null)).toBe('');
    })

    test('undefined retourne chaîne vide', () => {
        expect(slugify(undefined)).toBe('');
    })

    test('valeur non string retourne chaîne vide', () => {
        expect(slugify(123)).toBe('');
    })

    test('chaîne vide retourne chaîne vide', () => {
        expect(slugify('')).toBe('');
    })

    test('texte simple en minuscules', () => {
        expect(slugify('hello world')).toBe('hello-world');
    })

    test('texte avec majuscules', () => {
        expect(slugify('Hello World')).toBe('hello-world');
    })

    test('texte avec caractères spéciaux', () => {
        expect(slugify('Hello World!')).toBe('hello-world');
    })

    test('texte avec accents', () => {
        expect(slugify('café résumé')).toBe('cafe-resume');
    })

    test('texte avec plusieurs espaces', () => {
        expect(slugify('hello   world')).toBe('hello-world');
    })

    test('texte avec des tirets existants', () => {
        expect(slugify('hello--world')).toBe('hello-world');
    })

    test('texte avec espaces en début et fin', () => {
        expect(slugify('  hello world  ')).toBe('hello-world');
    })

    test('texte avec mélange espaces et tirets', () => {
        expect(slugify('hello - world')).toBe('hello-world');
    })

    test('texte uniquement avec des caractères spéciaux', () => {
        expect(slugify('!@#$%')).toBe('');
    })

    test('texte avec des chiffres', () => {
        expect(slugify('Article 42')).toBe('article-42');
    })

    test('titre de blog typique', () => {
        expect(slugify('Mon Premier Article de Blog!')).toBe('mon-premier-article-de-blog');
    })

});
