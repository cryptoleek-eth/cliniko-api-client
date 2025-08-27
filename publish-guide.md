# Publishing as NPM Package

## Option 1: Public NPM Package

### 1. Prepare for publishing
```bash
# Update package.json
npm version patch  # or minor/major

# Login to npm (you'll need an npm account)
npm login

# Publish
npm publish
```

### 2. Use in other projects
```bash
npm install cliniko-api-client
```

```typescript
import { ClinikoClient } from 'cliniko-api-client';

const client = new ClinikoClient(
  'your-api-key',
  'https://api.au4.cliniko.com/v1',
  'your-email@example.com'
);
```

## Option 2: Private NPM Package (Scoped)

### 1. Update package.json
```json
{
  "name": "@your-username/cliniko-api-client",
  "private": true
}
```

### 2. Publish privately
```bash
npm publish --access restricted
```

## Option 3: GitHub Package Registry

### 1. Add to package.json
```json
{
  "name": "@your-github-username/cliniko-api-client",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### 2. Publish to GitHub
```bash
npm publish
```

### 3. Use in other projects
```bash
npm install @your-github-username/cliniko-api-client
```