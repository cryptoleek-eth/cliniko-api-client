# Integration Guide - Copy Files Method

## Simplest Approach: Copy Source Files

### 1. Copy these files to your project:
```
your-project/
├── src/
│   └── cliniko/
│       ├── client.ts
│       ├── types.ts
│       └── index.ts
├── .env (add your credentials)
└── package.json (add dependencies)
```

### 2. Add dependencies to your package.json:
```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/node": "^20.0.0"
  }
}
```

### 3. Install dependencies:
```bash
npm install
```

### 4. Add to your .env:
```env
CLINIKO_API_KEY=MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4
CLINIKO_EMAIL=seabook1024@gmail.com
CLINIKO_BASE_URL=https://api.au4.cliniko.com/v1
```

### 5. Use in your code:
```typescript
import { ClinikoClient } from './cliniko/client';

const client = new ClinikoClient();
const patients = await client.getPatients();
```

## Option 3: Git Submodule

### 1. Add as submodule in your project:
```bash
git submodule add https://github.com/yourusername/cliniko-api.git lib/cliniko
```

### 2. Install and use:
```typescript
import { ClinikoClient } from './lib/cliniko/src/client';
```

## Option 4: Local NPM Link (Development)

### 1. In this project directory:
```bash
npm link
```

### 2. In your other project:
```bash
npm link cliniko-api-client
```

### 3. Use normally:
```typescript
import { ClinikoClient } from 'cliniko-api-client';
```