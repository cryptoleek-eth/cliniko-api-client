# Cliniko API TypeScript Client

A comprehensive TypeScript client for the Cliniko API with full type safety and easy-to-use methods.

## Features

- 🔒 **Type-safe** - Full TypeScript support with comprehensive type definitions
- 🚀 **Easy to use** - Intuitive API with promise-based methods
- 🔄 **Complete coverage** - All major Cliniko API endpoints supported
- 🛡️ **Error handling** - Built-in error handling and validation
- 📝 **Well documented** - Extensive examples and documentation
- ⚡ **Modern** - Uses async/await and modern JavaScript features

## Installation

```bash
npm install
```

## Setup

1. Copy your API credentials to `.env` file (already configured):
   ```
   CLINIKO_API_KEY=your_api_key
   CLINIKO_EMAIL=your_email
   CLINIKO_BASE_URL=https://api.au4.cliniko.com/v1
   ```

2. Build the project:
   ```bash
   npm run build
   ```

## Usage

### Quick Start

```typescript
import { ClinikoClient } from './src/client';

const client = new ClinikoClient();

// Test connection
await client.testConnection();

// Get all patients
const patients = await client.getPatients();
console.log(`Found ${patients.total_entries} patients`);
```

### Running Examples

Run the comprehensive examples:

```bash
npm run test
```

This will demonstrate:
- ✅ API connection testing
- 👥 Patient management (CRUD operations)
- 👨‍⚕️ Practitioner management
- 📅 Appointment management
- 📋 Treatment notes
- 🔍 Advanced filtering and searching

## Available Methods

### Patients
- `getPatients(filters?, page?)` - Get all patients with optional filtering
- `getPatient(id)` - Get specific patient by ID
- `createPatient(data)` - Create new patient
- `updatePatient(id, data)` - Update existing patient
- `deletePatient(id)` - Delete patient
- `searchPatients(firstName?, lastName?, email?)` - Search patients

### Practitioners
- `getPractitioners(filters?, page?)` - Get all practitioners
- `getPractitioner(id)` - Get specific practitioner
- `createPractitioner(data)` - Create new practitioner
- `updatePractitioner(id, data)` - Update practitioner

### Appointments
- `getAppointments(filters?, page?)` - Get appointments
- `getAppointment(id)` - Get specific appointment
- `createAppointment(data)` - Create new appointment
- `updateAppointment(id, data)` - Update appointment
- `cancelAppointment(id, reason?)` - Cancel appointment
- `getTodaysAppointments()` - Get today's appointments
- `getAppointmentsByDateRange(start, end)` - Get appointments in date range

### Appointment Types
- `getAppointmentTypes()` - Get all appointment types
- `getAppointmentType(id)` - Get specific appointment type
- `createAppointmentType(data)` - Create new appointment type

### Businesses
- `getBusinesses()` - Get all businesses/locations
- `getBusiness(id)` - Get specific business

### Treatment Notes
- `getTreatmentNotes(filters?, page?)` - Get treatment notes
- `getTreatmentNote(id)` - Get specific treatment note
- `createTreatmentNote(data)` - Create new treatment note
- `updateTreatmentNote(id, data)` - Update treatment note
- `getTreatmentNotesForPatient(patientId)` - Get notes for specific patient

### Utility Methods
- `testConnection()` - Test API connectivity
- `getAccountInfo()` - Get account information summary

## Filtering

Use the `QueryFilter` type for advanced filtering:

```typescript
import { QueryFilter } from './src/types';

const filters: QueryFilter[] = [
  { field: 'first_name', operator: '~', value: 'John' },
  { field: 'date_of_birth', operator: '>=', value: '1990-01-01' }
];

const patients = await client.getPatients(filters);
```

### Available Operators
- `=` - Equals
- `!=` - Not equals
- `>` - Greater than
- `<` - Less than
- `>=` - Greater than or equal
- `<=` - Less than or equal
- `~` - Contains (for text search)

## Examples

### Create a Patient

```typescript
const newPatient = await client.createPatient({
  first_name: 'John',
  last_name: 'Doe',
  date_of_birth: '1985-06-15',
  email: 'john.doe@example.com',
  phone_number: '+61 400 123 456'
});
```

### Create an Appointment

```typescript
const appointment = await client.createAppointment({
  patient_id: 123,
  practitioner_id: 456,
  appointment_type_id: 789,
  business_id: 1,
  starts_at: '2024-01-15T10:00:00Z',
  ends_at: '2024-01-15T11:00:00Z',
  notes: 'Initial consultation'
});
```

### Search Patients

```typescript
// Search by name
const results = await client.searchPatients('John', 'Doe');

// Advanced filtering
const filters: QueryFilter[] = [
  { field: 'city', operator: '=', value: 'Sydney' },
  { field: 'date_of_birth', operator: '>=', value: '1980-01-01' }
];
const filteredPatients = await client.getPatients(filters);
```

### Get Today's Appointments

```typescript
const todaysAppointments = await client.getTodaysAppointments();
console.log(`${todaysAppointments.total_entries} appointments today`);
```

## Error Handling

The client includes built-in error handling:

```typescript
try {
  const patient = await client.getPatient(123);
} catch (error) {
  if (error.response?.status === 404) {
    console.log('Patient not found');
  } else {
    console.error('API Error:', error);
  }
}
```

## Development

### Build
```bash
npm run build
```

### Run Examples
```bash
npm run test
```

### Development Mode (with auto-reload)
```bash
npm run dev
```

## API Reference

For complete API documentation, visit: https://docs.api.cliniko.com/

## Type Definitions

All API responses and requests are fully typed. Key types include:

- `Patient` - Patient data structure
- `Practitioner` - Practitioner data structure  
- `IndividualAppointment` - Appointment data structure
- `AppointmentType` - Appointment type configuration
- `TreatmentNote` - Treatment note data structure
- `PaginatedResponse<T>` - Paginated API response wrapper
- `QueryFilter` - Filtering configuration

## License

MIT