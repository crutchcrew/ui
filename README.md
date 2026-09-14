# ui 🎨🔧

[![npm version](https://img.shields.io/npm/v/@crutchcrew/ui)](https://www.npmjs.com/package/@crutchcrew/ui)
[![gzip size](https://img.shields.io/endpoint?url=https://crutchcrew.github.io/ui/badges/size.json)](https://www.npmjs.com/package/@crutchcrew/ui)
[![coverage](https://img.shields.io/endpoint?url=https://crutchcrew.github.io/ui/badges/coverage.json)](https://github.com/crutchcrew/ui/actions)
[![provenance](https://img.shields.io/badge/provenance-verified-brightgreen)](https://www.npmjs.com/package/@crutchcrew/ui)
[![license](https://img.shields.io/npm/l/@crutchcrew/ui)](./LICENSE)

React component library and design system, built on [Base UI](https://base-ui.com) and Tailwind CSS.

**[Browse the component gallery →](https://crutchcrew.github.io/ui/)**

## Install

Choose your fighter 🥊

```sh
pnpm add @crutchcrew/ui
```

```sh
bun add @crutchcrew/ui
```

```sh
yarn add @crutchcrew/ui
```

```sh
npm add @crutchcrew/ui
```

`react`, `react-dom`, and `tailwindcss` are peer dependencies — install them alongside this package.

## Usage

Import the stylesheet once (e.g. in your app's root CSS entry) and wrap your app in the provider:

```css
@import '@tailwindcss';
@import '@crutchcrew/ui/theme.css';
```

## Development

```sh
bun install
bun run dev          # Ladle component gallery, http://localhost:61000
bun test             # bun run test
bun run check        # fmt:check + lint + lockfile:check in parallel
```

Stories live alongside each component (`*.stories.tsx`) and render in the [Ladle](https://ladle.dev) gallery, which is deployed to GitHub Pages on every push to `main`.
