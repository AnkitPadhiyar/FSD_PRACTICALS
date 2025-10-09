# Calculator App (React + TypeScript + Vite)

A simple, accessible calculator supporting basic arithmetic: addition, subtraction, multiplication, division, percent, sign toggle, and clear.

## Features
- React + TypeScript with a small custom hook (`useCalculator`) encapsulating state transitions
- Basic operations: +, −, ×, ÷
- Additional: AC (clear), ± (toggle sign), % (percentage), decimal input
- Graceful handling of divide-by-zero (shows `Error`)
- Keyboard-friendly buttons with ARIA labels
- Unit tests via Vitest + React Testing Library

## Project Structure
```
calculator-app/
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  vitest.config.ts
  src/
    main.tsx
    App.tsx
    styles.css
    hooks/
      useCalculator.ts
    components/
      Display.tsx
      Keypad.tsx
    __tests__/
      useCalculator.test.ts
    setupTests.ts
```

## Getting Started
Install dependencies:
```powershell
npm install
```
Run development server:
```powershell
npm run dev
```
Run tests:
```powershell
npm test
```
Build for production:
```powershell
npm run build
```
Preview production build:
```powershell
npm run preview
```

## Implementation Notes
- The hook maintains `current`, `previous`, `operation`, and an `overwrite` flag for next-digit logic.
- Chain operations by pressing another operator before equals; it computes intermediate results.
- Percentage divides the current entry by 100.
- Divide-by-zero returns `Error` and sets overwrite on next input.

## Possible Improvements
- Add keyboard input mapping.
- Add memory functions (M+, M-, MR, MC).
- Support scientific operations (sqrt, power, etc.).
- Improve responsive layout for wider screens.
- Internationalization of decimal separators.

## License
MIT
