# Quick Usage Guide

## Getting Started

Your Cliniko API TypeScript client is ready to use! Here's how to get started quickly.

## Quick Commands

```bash
# Test connection and basic operations
npm run quick

# Run comprehensive examples  
npm run test

# Build the project
npm run build

# List all patients
ts-node src/quick-start.ts patients

# List all appointments
ts-node src/quick-start.ts appointments
```

## Basic Usage in Your Code

```typescript
import { ClinikoClient } from './src/client';

// Initialize client (uses .env file)
const client = new ClinikoClient();

// Test connection
await client.testConnection();

// Get all patients
const patients = await client.getPatients();
console.log(`Found ${patients.total_entries} patients`);

// Create a patient
const newPatient = await client.createPatient({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  phone_number: '+61 400 123 456'
});

// Get today's appointments
const appointments = await client.getTodaysAppointments();

// Search patients
const results = await client.searchPatients('John', 'Doe');
```

## Your API Configuration

✅ **Already Configured:**
- API Key: `MS0x...` (from your .env file)
- Email: `seabook1024@gmail.com`  
- Base URL: `https://api.au4.cliniko.com/v1`
- Shard: Australia 4 (au4)

## What's Available

### Patients
- ✅ List, create, update, delete
- ✅ Search by name, email
- ✅ Advanced filtering

### Appointments  
- ✅ List, create, update, cancel
- ✅ Today's appointments
- ✅ Date range filtering

### Practitioners
- ✅ List and manage practitioners

### Appointment Types
- ✅ List and create appointment types

### Treatment Notes
- ✅ Create and manage clinical notes

### Businesses
- ✅ List business locations

## Test Results ✅

**Connection:** Working  
**Account:** 1 business, 1 practitioner  
**Patients:** 3 patients found (including test patients created)  
**Appointments:** Ready to create (example successfully created appointment ID: 1761377973170087864)

## Next Steps

1. **Use in your application:**
   ```typescript
   import { ClinikoClient } from './path/to/client';
   const client = new ClinikoClient();
   ```

2. **Create real patients/appointments:**
   - Replace example data with real information
   - Use the provided TypeScript types for safety

3. **Handle errors:**
   ```typescript
   try {
     const patient = await client.getPatient(123);
   } catch (error) {
     console.error('Patient not found:', error);
   }
   ```

4. **Add to your project:**
   - Copy the `src/` folder to your project
   - Install dependencies: `npm install axios dotenv`
   - Update your .env file with credentials

## Support

- Full type safety with TypeScript
- Comprehensive error handling
- All major Cliniko API endpoints covered
- Real-world tested with your API credentials

**Ready to integrate into your application!** 🚀