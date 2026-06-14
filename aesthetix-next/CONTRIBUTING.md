# CONTRIBUTING.md

## Branching Strategy

We follow a **feature‑branch workflow** to keep `main` stable and enable safe collaboration:

1. **Create a feature branch** from `develop` (or `main` for hot‑fixes) using the pattern:
   ```
   git checkout -b feature/<short‑description>
   ```
2. **Develop** your changes, committing often.  Each commit should be atomic and include a clear message.
3. **Open a Pull Request** targeting `develop` (or `main` for releases).  The PR template includes a checklist:
   - [ ] Lint passes (`npm run lint`).
   - [ ] Type‑check passes (`npm run type-check`).
   - [ ] Tests pass (`npm test`).
   - [ ] Design‑system compliance (run `code‑review‑graph` tools).
4. **Code‑review‑graph** automatically analyses the impact of the change and adds a risk score.
5. After approval, **merge** the PR into `develop`.  Periodically, we create a **release branch** (`release/vX.Y`) from `develop` for coordinated deployments to production.
6. **Hot‑fixes** are branched directly from `main` (`hotfix/<desc>`), merged into both `main` and `develop`.

## Commit Message Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

- `type`: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- `scope`: optional component or area, e.g., `admin`, `client`, `schema`
- `subject`: short description (max 72 chars)
- `body`: optional, explains *why*.
- `footer`: optional, includes breaking changes or issue refs.

## Development Setup

```bash
npm install          # install dependencies
npm run dev          # start Next.js dev server
npm run lint         # lint the codebase
npm run type-check   # TypeScript type‑check
npm test             # run Jest unit tests
```

## Pull‑Request Checklist

- [ ] Code follows the project's coding style (prettier, eslint).
- [ ] All new code is covered by tests.
- [ ] Updated documentation where applicable.
- [ ] Design‑system tokens referenced correctly.
- [ ] No new lint warnings.

---

Feel free to adapt this guide as the project evolves.
