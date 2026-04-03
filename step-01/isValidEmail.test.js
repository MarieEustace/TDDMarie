import { describe, test, expect } from 'vitest';
import { isValidEmail } from './isValidEmail.js'

describe('isValidEmail', () => {

    test('email valide simple', () => {
        expect(isValidEmail('user@example.com')).toBe(true);
    })

    test('null retourne false', () => {
        expect(isValidEmail(null)).toBe(false);
    })

    test('undefined retourne false', () => {
        expect(isValidEmail(undefined)).toBe(false);
    })

    test('valeur non string retourne false', () => {
        expect(isValidEmail(42)).toBe(false);
    })

    test('chaîne vide retourne false', () => {
        expect(isValidEmail('')).toBe(false);
    })

    test('sans arobase retourne false', () => {
        expect(isValidEmail('userexample.com')).toBe(false);
    })

    test('plusieurs arobases retourne false', () => {
        expect(isValidEmail('user@@example.com')).toBe(false);
    })

    test('partie locale vide retourne false', () => {
        expect(isValidEmail('@example.com')).toBe(false);
    })

    test('domaine vide retourne false', () => {
        expect(isValidEmail('user@')).toBe(false);
    })

    test('domaine sans point retourne false', () => {
        expect(isValidEmail('user@example')).toBe(false);
    })

    test('domaine commence par un point retourne false', () => {
        expect(isValidEmail('user@.example.com')).toBe(false);
    })

    test('domaine finit par un point retourne false', () => {
        expect(isValidEmail('user@example.com.')).toBe(false);
    })

    test('partie locale commence par un point retourne false', () => {
        expect(isValidEmail('.user@example.com')).toBe(false);
    })

    test('partie locale finit par un point retourne false', () => {
        expect(isValidEmail('user.@example.com')).toBe(false);
    })

    test('double point dans la partie locale retourne false', () => {
        expect(isValidEmail('us..er@example.com')).toBe(false);
    })

    test('double point dans le domaine retourne false', () => {
        expect(isValidEmail('user@example..com')).toBe(false);
    })

    test('espaces autour retourne false', () => {
        expect(isValidEmail(' user@example.com ')).toBe(false);
    })

    test('espace au milieu retourne false', () => {
        expect(isValidEmail('us er@example.com')).toBe(false);
    })

    test('email avec sous-domaine est valide', () => {
        expect(isValidEmail('user@mail.example.com')).toBe(true);
    })

    test('email avec des points dans la partie locale est valide', () => {
        expect(isValidEmail('first.last@example.com')).toBe(true);
    })

});
