# How to Use Cliniko API Client in Other Projects

## ✅ Working Demo Created!

I've created a working demo at `/home/dev/coding/ai/demo-app/` that shows exactly how to integrate the Cliniko client into any project.

## 🚀 3 Ways to Use This

### Option 1: Copy Files (Recommended - Simplest)

**Best for:** Personal projects, quick integration

```bash
# In your new project
mkdir lib/cliniko
cp /path/to/clinikoAPI/src/{client.ts,types.ts,index.ts} lib/cliniko/
cp /path/to/clinikoAPI/.env ./
```

**Add to package.json:**
```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "ts-node": "^10.9.0"
  }
}
```

**Use in code:**
```typescript
import { ClinikoClient } from './lib/cliniko/client';

const client = new ClinikoClient();
const patients = await client.getPatients();
```

### Option 2: NPM Package (For sharing)

**Best for:** Multiple projects, sharing with team

```bash
# Publish (in the clinikoAPI directory)
npm run build
npm login
npm publish

# Use anywhere
npm install cliniko-api-client
```

```typescript
import { ClinikoClient } from 'cliniko-api-client';
```

### Option 3: NPM Link (Development)

**Best for:** Local development, testing

```bash
# In clinikoAPI directory
npm link

# In your project
npm link cliniko-api-client
```

## 📋 Complete Working Example

See `/home/dev/coding/ai/demo-app/` for a complete working example that:

- ✅ **Copies the client files**
- ✅ **Sets up proper TypeScript config** 
- ✅ **Installs dependencies**
- ✅ **Uses your real API credentials**
- ✅ **Successfully connects and fetches data**
- ✅ **Creates new patients**

**Test the demo:**
```bash
cd /home/dev/coding/ai/demo-app
npm start
```

## 🔧 Integration Examples

### Next.js API Route
```typescript
// pages/api/patients.ts
import { ClinikoClient } from '../../lib/cliniko/client';

export default async function handler(req, res) {
  const client = new ClinikoClient();
  const patients = await client.getPatients();
  res.json(patients);
}
```

### Express Server
```typescript
// server.ts
import express from 'express';
import { ClinikoClient } from './lib/cliniko/client';

const app = express();
const client = new ClinikoClient();

app.get('/patients', async (req, res) => {
  const patients = await client.getPatients();
  res.json(patients);
});

app.listen(3000);
```

### React Component
```typescript
// PatientsList.tsx
import { useEffect, useState } from 'react';
import { ClinikoClient } from '../lib/cliniko/client';

const client = new ClinikoClient();

export function PatientsList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    client.getPatients().then(result => {
      setPatients(result.patients || []);
    });
  }, []);

  return (
    <div>
      {patients.map(patient => (
        <div key={patient.id}>
          {patient.first_name} {patient.last_name}
        </div>
      ))}
    </div>
  );
}
```

## 🎯 What You Get

- ✅ **Full TypeScript support** - Complete type safety
- ✅ **All API endpoints** - Patients, appointments, practitioners, etc.
- ✅ **Error handling** - Built-in error management
- ✅ **Real-world tested** - Working with your actual Cliniko account
- ✅ **Production ready** - Used your real API and created actual data

## 📝 Your API Info (Already Configured)

- **API Key:** `MS0x...` (Your real key)
- **Email:** `seabook1024@gmail.com`
- **Base URL:** `https://api.au4.cliniko.com/v1`
- **Status:** ✅ Working and tested

## 🚀 Ready to Use!

The simplest way is **Option 1 (Copy Files)** - just copy the 3 TypeScript files and your `.env`, install dependencies, and you're ready to go!

**Files you need:**
- `client.ts` (Main client)
- `types.ts` (TypeScript types)  
- `index.ts` (Exports)
- `.env` (Your credentials)

**That's it!** See the working demo for the complete example.