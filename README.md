# Mohammad Muzamil A · Portfolio

A résumé-grounded developer portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, Motion, GSAP, Lenis, React Three Fiber, and Lucide. Fonts are bundled locally; rendering never depends on an external font or 3D asset service.

## Development

Node.js 24 and npm are recommended (validated with Node 24.22.1 / npm 11.9.0).

```sh
npm ci
npm run dev
```

The development server listens on port 3000. No environment variables, database, API credentials, or third-party services are required.

In the managed cloud workspace, use the writable cache when installing:

```sh
cd /workspace/muzamil-portfolio
npm ci --cache /workspace/.npm-cache
```

Use this existing checkout. Cloud tasks are already isolated; creating another Git worktree is unnecessary unless explicitly requested.

## Validation and production

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm run start
```

The browser suite starts the **built production app** on port 3002. Build before testing. It checks navigation, chart controls, dialog focus and dismissal, skill tabs, downloads, clipboard success/failure, motion preferences, credentials, responsive overflow, and automated WCAG checks. Chromium is taken from `/usr/bin/chromium` when available. On another machine, run `npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to your Chromium executable. Test artifacts are ignored by Git.

The site is ready for a Next.js-compatible Node host. It has not been deployed. Configure the final production domain in metadata when one is available.

## Deploy with Vercel

Import `mehindrakarr11/muzamil-portfolio` in Vercel and select the `main` branch. Use the **Next.js** framework preset and leave the root directory at the repository root (`.`). The app uses Vercel's standard Next.js output settings; no custom output directory is needed.

Use Node.js **24.x**, `npm ci` as the install command, and `npm run build` as the build command. No environment variables are required. Click **Deploy**; subsequent pushes to `main` can trigger Vercel's automatic production deployments.

## Content and missing assets

Edit `src/lib/content.ts` for professional content. The source analysis and editorial decisions are recorded in `docs/resume-content.md`.

- `profile.linkedin`: pending verification. The résumé’s visible LinkedIn name differs from its embedded link; that link is intentionally not used.
- `profile.github`: no personal GitHub URL was supplied.
- `project.repository` and `project.demo`: use actual HTTPS URLs when available; the dialog switches from labeled placeholders to working links.
- `project.screenshot`: put a real screenshot in `public/` and provide its path (for example `/projects/supply-chain.png`). It replaces the illustrated dashboard. Configure Next.js `images.remotePatterns` explicitly if using a remote image host instead.
- Certification links are visibly marked as pending; add verified credential URLs before turning those placeholders into links.
- `public/Mohammad-Muzamil-A-Resume.pdf` is the original uploaded résumé. Download buttons serve that exact file. Its original project-title discrepancy and LinkedIn annotation are preserved in the downloadable source; replace it with a corrected PDF when available.

The dashboard is an interactive **concept illustration**, clearly labeled as sample data and not project output. It makes no claim about measured accuracy, commercial results, employment, or project screenshots. “Signal” is an illustrative dashboard label, not a claimed project brand. The confirmed portfolio project name is **Supply Chain Intelligence**.

## Structure and motion

- `src/app/`: route, global styles, metadata, and icon.
- `src/components/`: one component per section and shared interaction primitives.
- `src/lib/content.ts`: résumé-derived data and explicit missing-link placeholders.
- `tests/`: desktop and mobile Playwright scenarios.

Motion owns entrance reveals and UI transitions. GSAP ScrollTrigger owns the About word reveal and separate hero scroll wrappers. Lenis owns wheel and anchor scrolling. React Three Fiber owns only the decorative sculpture, with a capped pixel ratio, 30 fps demand rendering, visibility pausing, lazy loading, and a CSS fallback for unavailable WebGL. These libraries do not write to the same animated element properties.

The header animation control and operating-system reduced-motion preference stop continuous motion. Core text and contact/download links remain readable with JavaScript disabled. Navigation and dialogs support keyboard interaction, visible focus, Escape, and focus return. The contact action opens the visitor’s email app; no message is sent or stored by the website.
