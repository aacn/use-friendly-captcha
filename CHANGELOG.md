## Changelog

### Unreleased

#### Added

- Add framework-safe `/client` and `/server` package entrypoints while keeping
  the existing root entrypoint compatible.

#### Fixed

- Recreate the widget when runtime configuration changes, including language.
- Correct the Friendly Captcha v1 verification request and reject unsuccessful
  or unavailable responses.
- Keep React Strict Mode cleanup from removing React-owned DOM nodes.

#### Changed

- Replace the legacy Yarn, Rollup, and SWC toolchain with pnpm, tsup, Vitest,
  current TypeScript, formatting, hooks, and CI configuration.
- Consolidate public types and endpoint helpers.
- Document that site keys are public and API secrets must remain server-side.
- Convert the playground to the pnpm workspace with Vite, Vitest, React 19, and
  Tailwind CSS 4.
- Update the React example to React 19 and Vite, and migrate the Next.js example
  to Next 16 App Router with a native-fetch verification route.

### v1.0.1

- Fix naming of typeScript module declaration

### v1.0.2

- Fix a bug, where the widget instantly destroyed itself, caused by reactStrictMode

### v1.1.0

- Add a feature to be able to add custom css to specific widget parts

### v1.1.1

- Add a debug mode

### v1.1.2

- Update react & react-dom peer dependencies

### v1.1.3

- Update more peer dependencies

### v1.2.0

- Add support for next 13

### v1.2.1

- Update range of possible css attributes to style the captcha widget

### v1.2.2

- Fix nextjs hydration error, that occurs when rendering the css for the captcha widget

### v1.2.3

- Adjust nextjs hydration for style tags

### v1.3.0

- Add a function that resets the widget after a form submission without a page
  refresh.
