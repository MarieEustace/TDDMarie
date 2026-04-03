# TDD Workshop - Apprendre le Test-Driven Development

Un atelier pratique pour découvrir le TDD (Test-Driven Development) en JavaScript avec [Vitest](https://vitest.dev/).

## Objectif

Apprendre à écrire des tests **avant** le code, en suivant le cycle TDD :

1. **Red** - Écrire un test qui échoue
2. **Green** - Écrire le minimum de code pour faire passer le test
3. **Refactor** - Améliorer le code en gardant les tests au vert

## Prérequis

- Node.js (v18+)
- npm

## Installation

```bash
npm install
```

## Lancer les tests

```bash
# Exécuter tous les tests une fois
npm test

# Mode watch (relance automatiquement à chaque modification)
npm run test:watch
```

## Structure du projet

```
.
├── step-01/                            # Étape 1 — Écrire des tests pour du code existant
│   ├── passwordStrength.js             # Exemple : implémentation
│   ├── passwordStrength.test.js        # Exemple : tests (à étudier)
│   ├── formatPrice.js                  # Exercice : formater un prix en centimes
│   ├── formatPrice.test.js             # Solution des tests
│   ├── isValidEmail.js                 # Exercice : valider une adresse email
│   ├── isValidEmail.test.js            # Solution des tests
│   ├── slugify.js                      # Exercice : convertir un titre en slug URL
│   ├── slugify.test.js                 # Solution des tests
│   ├── truncate.js                     # Exercice : tronquer un texte
│   └── truncate.test.js               # Solution des tests
│
├── step-02/                            # Étape 2 — TDD : les tests d'abord
│   ├── passwordStrength.js             # Implémentation de base (sans blacklist)
│   ├── passwordStrength.tdd.test.js    # Tests TDD : blacklist de mots de passe courants (3 red)
│   ├── passwordStrength.final.js       # Solution complète (ne pas montrer)
│   ├── formatPrice.js                  # Implémentation de base
│   ├── formatPrice.tdd.test.js         # Tests TDD : support multi-devise (5 red)
│   ├── formatPrice.final.js            # Solution complète
│   ├── isValidEmail.js                 # Implémentation de base
│   ├── isValidEmail.tdd.test.js        # Tests TDD : résultat structuré { valid, reason } (9 red)
│   ├── isValidEmail.final.js           # Solution complète
│   ├── slugify.js                      # Implémentation de base
│   ├── slugify.tdd.test.js             # Tests TDD : option maxLength (5 red)
│   ├── slugify.final.js                # Solution complète
│   ├── truncate.js                     # Implémentation de base
│   ├── truncate.tdd.test.js            # Tests TDD : suffixe personnalisé (3 red)
│   └── truncate.final.js              # Solution complète
```

## Step 01 - Premiers tests

### Exemple guidé : `checkPasswordStrength`

Étudiez `passwordStrength.js` et `passwordStrength.test.js` pour comprendre :

- Comment structurer un fichier de tests avec `describe` / `test` / `expect`
- Comment tester les cas limites (null, undefined, chaîne vide)
- Comment vérifier les différents chemins de la logique

### Exercices

Écrivez les tests pour les fonctions suivantes en appliquant le cycle TDD :

| Fonction | Description | Fichier |
|---|---|---|
| `formatPrice` | Convertit un prix en centimes vers un affichage (`1499` → `"$14.99"`) | `formatPrice.js` |
| `isValidEmail` | Vérifie si une chaîne ressemble à un email valide | `isValidEmail.js` |
| `slugify` | Transforme un titre en slug URL (`"Hello World!"` → `"hello-world"`) | `slugify.js` |
| `truncate` | Tronque un texte avec `...` si trop long | `truncate.js` |

**Approche recommandée :**

1. Lisez la JSDoc de la fonction pour comprendre le comportement attendu
2. Créez le fichier de test (ex : `formatPrice.test.js`)
3. Écrivez un premier test simple
4. Lancez-le en mode watch (`npm run test:watch`)
5. Ajoutez progressivement des tests pour couvrir :
   - Les cas normaux
   - Les cas limites (null, undefined, types invalides)
   - Les cas particuliers de chaque fonction

## Step 02 - TDD : les tests d'abord

Le vrai TDD : on écrit les tests **avant** le code. Chaque fonction a un fichier `.tdd.test.js` avec des tests qui échouent contre l'implémentation actuelle.

### Exemple guidé : `checkPasswordStrength` — blacklist

Nouvelle règle : rejeter les mots de passe courants (`Password1!`, `Qwerty123!`...) même s'ils passent les 5 règles.

```bash
# Lancer les tests TDD — 3 rouges, 1 vert
npx vitest run step-02/passwordStrength.tdd.test.js
```

1. Observez les tests rouges — ils définissent le comportement attendu
2. Implémentez la blacklist dans `passwordStrength.js` pour les faire passer au vert
3. Point clé : *"on a défini ce que la fonction ne doit PAS faire avant d'écrire une seule ligne d'implémentation"*

### Exercices TDD

Même fonction que le step 01 — cette fois, ajoutez une nouvelle fonctionnalité en TDD :

| Fonction | Nouvelle exigence | Tests rouges | Difficulté |
|---|---|---|---|
| `truncate` | Suffixe personnalisé (`{ suffix: '…' }`) | 3 | ⭐ |
| `slugify` | Longueur max (`{ max: 10 }`) sans tiret final | 5 | ⭐ |
| `formatPrice` | Multi-devise (`{ currency: 'EUR' }` → `"14,99 €"`) | 5 | ⭐⭐ |
| `isValidEmail` | Résultat structuré `{ valid, reason }` au lieu de boolean | 9 | ⭐⭐⭐ |

**Approche :**

1. Lancez les tests TDD de votre fonction — observez le rouge
2. Lisez les tests : ils sont la spécification
3. Modifiez l'implémentation pour faire passer les tests un par un
4. Ne touchez jamais aux tests — c'est le contrat

> **Question de debrief :** était-ce plus facile ou plus difficile d'implémenter quand les tests vous disaient déjà exactement quoi construire ?

### Note sur `isValidEmail` (breaking change)

Ce cas est particulier : la fonction change de type de retour (boolean → objet). Les tests du step 01 casseraient aussi. C'est intentionnel — cela ouvre la discussion : *"comment refactorer en sécurité quand le contrat change ?"*

## Bonnes pratiques TDD

- **Un test à la fois** : n'écrivez pas tous les tests d'un coup
- **Nommez clairement** : le nom du test doit décrire le comportement attendu
- **Testez les limites** : null, undefined, chaînes vides, valeurs négatives...
- **Gardez les tests indépendants** : chaque test doit pouvoir tourner seul
