# uikit 🎨🔧

[![npm version](https://img.shields.io/npm/v/@crutchcrew/uikit)](https://www.npmjs.com/package/@crutchcrew/uikit)
[![gzip size](https://img.shields.io/endpoint?url=https://crutchcrew.github.io/uikit/badges/size.json)](https://www.npmjs.com/package/@crutchcrew/uikit)
[![coverage](https://img.shields.io/endpoint?url=https://crutchcrew.github.io/uikit/badges/coverage.json)](https://github.com/crutchcrew/uikit/actions)
[![provenance](https://img.shields.io/badge/provenance-verified-brightgreen)](https://www.npmjs.com/package/@crutchcrew/uikit)
[![license](https://img.shields.io/npm/l/@crutchcrew/uikit)](./LICENSE)

React component library and design system, built on [Base UI](https://base-ui.com) and Tailwind CSS.

**[Browse the component gallery →](https://crutchcrew.github.io/uikit/)**

## Install

Choose your fighter 🥊

```sh
pnpm add @crutchcrew/uikit
```

```sh
bun add @crutchcrew/uikit
```

```sh
yarn add @crutchcrew/uikit
```

```sh
npm add @crutchcrew/uikit
```

`react`, `react-dom`, and `tailwindcss` are peer dependencies — install them alongside this package.

## Usage

Import the stylesheet once (e.g. in your app's root CSS entry) and wrap your app in the provider:

```css
@import '@tailwindcss';
@import '@crutchcrew/uikit/theme.css';
```

## Development

```sh
bun install
bun run dev          # Ladle component gallery, http://localhost:61000
bun test             # bun run test
bun run check        # fmt:check + lint + lockfile:check in parallel
```

Stories live alongside each component (`*.stories.tsx`) and render in the [Ladle](https://ladle.dev) gallery, which is deployed to GitHub Pages on every push to `main`.
