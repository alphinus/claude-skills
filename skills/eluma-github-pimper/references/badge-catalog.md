# Badge Catalog

All badges use `style=flat-square` for consistency with Eluma aesthetic.
Replace `USER` and `REPO` with actual values.

## Priority Badges (always include)

### Build Status
```markdown
[![Build](https://img.shields.io/github/actions/workflow/status/USER/REPO/ci.yml?style=flat-square&color=4fd1c5&label=build)](https://github.com/USER/REPO/actions)
```

### Version
```markdown
[![Version](https://img.shields.io/github/package-json/v/USER/REPO?style=flat-square&color=4fd1c5)](https://github.com/USER/REPO/releases)
```

### License
```markdown
[![License](https://img.shields.io/github/license/USER/REPO?style=flat-square&color=38b2ac)](LICENSE)
```

### Stars
```markdown
[![Stars](https://img.shields.io/github/stars/USER/REPO?style=flat-square&color=4fd1c5)](https://github.com/USER/REPO/stargazers)
```

## Language/Framework Badges

### TypeScript
```markdown
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
```

### React
```markdown
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
```

### Node.js
```markdown
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
```

### Python
```markdown
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
```

### Rust
```markdown
![Rust](https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white)
```

### Vite
```markdown
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
```

### Express
```markdown
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
```

### Tailwind CSS
```markdown
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
```

### Next.js
```markdown
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
```

### Vercel
```markdown
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
```

## Status Badges

### npm Downloads
```markdown
[![Downloads](https://img.shields.io/npm/dm/PACKAGE?style=flat-square&color=4fd1c5)](https://www.npmjs.com/package/PACKAGE)
```

### Test Coverage
```markdown
[![Coverage](https://img.shields.io/codecov/c/github/USER/REPO?style=flat-square&color=4fd1c5)](https://codecov.io/gh/USER/REPO)
```

### Bundle Size
```markdown
[![Bundle](https://img.shields.io/bundlephobia/minzip/PACKAGE?style=flat-square&color=4fd1c5)](https://bundlephobia.com/package/PACKAGE)
```

## Custom Eluma Badge
```markdown
![Eluma](https://img.shields.io/badge/Eluma-Powered-4fd1c5?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBvbHlnb24gcG9pbnRzPSIxMCwxIDE5LDYgMTksMTYgMTAsMjEgMSwxNiAxLDYiIGZpbGw9IiM0ZmQxYzUiLz48L3N2Zz4=)
```

## Arrangement Rules
1. Max 5 badges in hero section
2. Order: Build → Version → License → Language → Stars
3. All same style (`flat-square`)
4. All use Eluma colors (#4fd1c5 primary, #38b2ac dark)
5. Separate tech stack badges go in their own section below
