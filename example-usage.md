# How to Use in Other Projects

## Method 1: NPM Package (Easiest for distribution)

### If you want to share this with others or use across multiple projects:

1. **Publish to NPM:**
```bash
# In this directory
npm run build
npm login  # You need an NPM account
npm publish
```

2. **Use in any project:**
```bash
npm install cliniko-api-client
```

```typescript
import { ClinikoClient } from 'cliniko-api-client';

const client = new ClinikoClient(
  'your-api-key',
  'https://api.au4.cliniko.com/v1',
  'your-email'
);

const patients = await client.getPatients();
```

## Method 2: Copy Files (Simplest for personal use)

### Just copy the source files to your project:

1. **Copy these files to your new project:**
```bash
# Create a new project
mkdir my-cliniko-app
cd my-cliniko-app
npm init -y

# Copy the client files
mkdir -p src/cliniko
cp /home/dev/coding/ai/clinikoAPI/src/client.ts src/cliniko/
cp /home/dev/coding/ai/clinikoAPI/src/types.ts src/cliniko/
cp /home/dev/coding/ai/clinikoAPI/src/index.ts src/cliniko/

# Copy environment file
cp /home/dev/coding/ai/clinikoAPI/.env ./
```

2. **Add dependencies:**
```json
// package.json
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

3. **Install and use:**
```bash
npm install
```

```typescript
// your-app.ts
import { ClinikoClient } from './src/cliniko/client';

const client = new ClinikoClient();
const patients = await client.getPatients();
console.log(`Found ${patients.total_entries} patients`);
```

## Method 3: Direct Import (For single project)

### If you want to keep everything in this project:

```typescript
// In any file in this project
import { ClinikoClient } from './src/client';

const client = new ClinikoClient();

// Your app logic here
async function myApp() {
  const patients = await client.getPatients();
  
  // Create a new patient
  const newPatient = await client.createPatient({
    first_name: 'New',
    last_name: 'Patient',
    email: 'new@example.com'
  });
  
  // Get appointments for next week
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const appointments = await client.getAppointmentsByDateRange(
    new Date(), 
    nextWeek
  );
  
  console.log('Appointments next week:', appointments.total_entries);
}

myApp();
```

## Recommended Approach

**For personal/single use:** Method 2 (Copy Files)  
**For sharing/multiple projects:** Method 1 (NPM Package)  
**For development/testing:** Method 3 (Direct Import)

## Example Integration

Here's how it would look in a real Next.js/Express app:

```typescript
// pages/api/patients.ts (Next.js API route)
import { ClinikoClient } from 'cliniko-api-client'; // if published
// OR
import { ClinikoClient } from '../../lib/cliniko/client'; // if copied

export default async function handler(req, res) {
  const client = new ClinikoClient(
    process.env.CLINIKO_API_KEY,
    process.env.CLINIKO_BASE_URL,
    process.env.CLINIKO_EMAIL
  );

  if (req.method === 'GET') {
    const patients = await client.getPatients();
    res.json(patients);
  } else if (req.method === 'POST') {
    const newPatient = await client.createPatient(req.body);
    res.json(newPatient);
  }
}
```

Your choice depends on whether you want to:
- **Share it publicly** → NPM package
- **Use it privately** → Copy files
- **Develop quickly** → Direct import