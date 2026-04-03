import { describe, test, expect } from 'vitest';
import { formatPrice } from './formatPrice.js'

describe('formatPrice', () => {

    test('valeur null retourne $0.00', () => {
        expect(formatPrice(null)).toBe('$0.00');
    })

    test('valeur undefined retourne $0.00', () => {
        expect(formatPrice(undefined)).toBe('$0.00');
    })

    test('valeur non numérique retourne $0.00', () => {
        expect(formatPrice('abc')).toBe('$0.00');
    })

    test('NaN retourne $0.00', () => {
        expect(formatPrice(NaN)).toBe('$0.00');
    })

    test('zéro centimes', () => {
        expect(formatPrice(0)).toBe('$0.00');
    })

    test('prix simple en centimes', () => {
        expect(formatPrice(1499)).toBe('$14.99');
    })

    test('prix avec centimes inférieurs à 10', () => {
        expect(formatPrice(1005)).toBe('$10.05');
    })

    test('prix sans centimes', () => {
        expect(formatPrice(1000)).toBe('$10.00');
    })

    test('moins de un dollar', () => {
        expect(formatPrice(99)).toBe('$0.99');
    })

    test('un seul centime', () => {
        expect(formatPrice(1)).toBe('$0.01');
    })

    test('prix négatif', () => {
        expect(formatPrice(-1499)).toBe('-$14.99');
    })

    test('prix négatif petit', () => {
        expect(formatPrice(-5)).toBe('-$0.05');
    })

    test('arrondi d\'un prix décimal', () => {
        expect(formatPrice(1499.7)).toBe('$15.00');
    })

    test('grand montant', () => {
        expect(formatPrice(999999)).toBe('$9999.99');
    })

});
