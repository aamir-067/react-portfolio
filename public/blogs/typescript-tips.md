---
title: TypeScript Tips for React Developers
author: Muhammad Aamir Khan
date: 2024-09-01
coverImage: /profile_white.webp
---

# TypeScript Tips for React Developers

Level up your React apps with practical TypeScript techniques that keep your codebase robust and maintainable.

## Props and Components

- Prefer explicit prop interfaces. Annotate component return types.
- Use union types with discriminants for variant components.

## Hooks and Utilities

- Type generics for reusable hooks (e.g., `useFetch<T>`).
- Prefer `unknown` over `any`; narrow at the usage site.

## API Models

- Create types per endpoint response; avoid one mega type.
- Transform API responses into view models at boundaries.
