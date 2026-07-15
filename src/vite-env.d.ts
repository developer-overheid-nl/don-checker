// Example fixtures are imported as raw text via Vite's `?raw` suffix (Vitest
// shares that pipeline; the CLI build resolves them via tsdown.config.ts).
declare module '*?raw' {
  const content: string;
  export default content;
}
