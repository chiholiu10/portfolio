# Styling conventions

- Keep the current visual design and responsive layouts intact when refactoring styles.
- Write mobile-first CSS: use the smallest-screen layout as the base and only `min-width` for viewport-width media queries. Apply the same convention to `matchMedia` and image `sizes`.
- Never use HTML/SVG tag selectors in CSS, including global styles and resets. Use explicit classes, styled-component references, attributes or pseudo-selectors instead. Keep semantic HTML in the markup.
- Preserve intrinsic sizing and reading widths. Prefer `width: min(...)` for bounded full-width blocks; use logical `max-inline-size` when an intrinsic size limit is needed, such as images and fit-content message bubbles. Do not use `max-width`.

- Define viewport thresholds in `apps/web/styles/breakpoint-values.ts`. Use `breakpoint.<name>` in styled-components, `mediaQuery.<name>` for `matchMedia`, and `responsiveImageSizes` for image sizes. Do not hardcode viewport-width media queries in components.
- Prettier owns formatting (two spaces). Run `yarn format` after editing; `yarn dev` and staged-file commit hooks format automatically; `yarn build` checks formatting without rewriting source. Editor format-on-save requires the recommended Prettier extension.

- Use only the shared size scale: `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`. Avoid numbered, device or component-specific breakpoint names.
