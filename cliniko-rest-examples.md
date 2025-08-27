# Cliniko API REST Examples

## Authentication Setup

**API Key:** `MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4`  
**Email:** `seabook1024@gmail.com`  
**Base URL:** `https://api.au4.cliniko.com/v1` (based on -au4 suffix in API key)

## Authentication Header

All requests require Basic Authentication using your API key as username (no password needed):

```
Authorization: Basic TVM2eE56WXhNell6TmpRd01EQXpPVGN4T1RBeE5ERDBSUEJ5WkZFdE5EbG9UR05zWlVaalVHbHlXWFJYT1ZOcWQwcDZVRlZ6UTBSRGVYZ3RZWFEw
```

**Required Headers:**
- `Accept: application/json`
- `Content-Type: application/json` (for POST/PUT requests)
- `User-Agent: Your App Name (seabook1024@gmail.com)`

## 1. Patients

### Get All Patients
```bash
curl -X GET \
  "https://api.au4.cliniko.com/v1/patients" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

### Get Patient by ID
```bash
curl -X GET \
  "https://api.au4.cliniko.com/v1/patients/123" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

### Create New Patient
```bash
curl -X POST \
  "https://api.au4.cliniko.com/v1/patients" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "date_of_birth": "1985-06-15",
    "gender": "Male",
    "email": "john.doe@example.com",
    "phone_number": "+61 400 123 456",
    "address_1": "123 Main St",
    "city": "Sydney",
    "state": "NSW",
    "post_code": "2000",
    "country": "Australia"
  }'
```

### Update Patient
```bash
curl -X PUT \
  "https://api.au4.cliniko.com/v1/patients/123" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:" \
  -d '{
    "phone_number": "+61 400 987 654",
    "email": "john.updated@example.com"
  }'
```

### Search Patients by Name
```bash
curl -X GET \
  "https://api.au4.cliniko.com/v1/patients?q[]=first_name:John&q[]=last_name:Doe" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

## 2. Appointments

### Get All Appointments
```bash
curl -X GET \
  "https://api.au4.cliniko.com/v1/individual_appointments" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

### Get Appointments for Today
```bash
curl -X GET \
  "https://api.au4.cliniko.com/v1/individual_appointments?q[]=starts_at:>=2024-01-01T00:00:00Z&q[]=starts_at:<2024-01-02T00:00:00Z" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

### Create New Appointment
```bash
curl -X POST \
  "https://api.au4.cliniko.com/v1/individual_appointments" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:" \
  -d '{
    "patient_id": 123,
    "practitioner_id": 456,
    "appointment_type_id": 789,
    "business_id": 1,
    "starts_at": "2024-01-15T10:00:00Z",
    "ends_at": "2024-01-15T11:00:00Z",
    "notes": "Initial consultation"
  }'
```

### Update Appointment
```bash
curl -X PUT \
  "https://api.au4.cliniko.com/v1/individual_appointments/123" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:" \
  -d '{
    "notes": "Updated notes for appointment",
    "starts_at": "2024-01-15T10:30:00Z",
    "ends_at": "2024-01-15T11:30:00Z"
  }'
```

### Cancel Appointment
```bash
curl -X DELETE \
  "https://api.au4.cliniko.com/v1/individual_appointments/123" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

## 3. Practitioners

### Get All Practitioners
```bash
curl -X GET \
  "https://api.au4.cliniko.com/v1/practitioners" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

### Get Practitioner by ID
```bash
curl -X GET \
  "https://api.au4.cliniko.com/v1/practitioners/456" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

### Create New Practitioner
```bash
curl -X POST \
  "https://api.au4.cliniko.com/v1/practitioners" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:" \
  -d '{
    "first_name": "Dr. Sarah",
    "last_name": "Smith",
    "title": "Dr",
    "email": "sarah.smith@clinic.com",
    "phone_number": "+61 400 555 123",
    "show_in_online_bookings": true
  }'
```

## 4. Appointment Types

### Get All Appointment Types
```bash
curl -X GET \
  "https://api.au4.cliniko.com/v1/appointment_types" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

### Create Appointment Type
```bash
curl -X POST \
  "https://api.au4.cliniko.com/v1/appointment_types" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:" \
  -d '{
    "name": "Initial Consultation",
    "duration_in_minutes": 60,
    "color": "blue",
    "show_in_online_bookings": true
  }'
```

## 5. Businesses/Locations

### Get All Businesses
```bash
curl -X GET \
  "https://api.au4.cliniko.com/v1/businesses" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

### Get Business by ID
```bash
curl -X GET \
  "https://api.au4.cliniko.com/v1/businesses/1" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

## 6. Treatment Notes

### Get Treatment Notes for Patient
```bash
curl -X GET \
  "https://api.au4.cliniko.com/v1/treatment_notes?q[]=patient_id:123" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

### Create Treatment Note
```bash
curl -X POST \
  "https://api.au4.cliniko.com/v1/treatment_notes" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:" \
  -d '{
    "patient_id": 123,
    "practitioner_id": 456,
    "individual_appointment_id": 789,
    "body": "Patient reported improvement in mobility. Continued with prescribed exercises."
  }'
```

## 7. Filtering Examples

### Filter Appointments by Date Range
```bash
# Appointments for January 2024
curl -X GET \
  "https://api.au4.cliniko.com/v1/individual_appointments?q[]=starts_at:>=2024-01-01T00:00:00Z&q[]=starts_at:<2024-02-01T00:00:00Z" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

### Filter Patients by Birth Year
```bash
# Patients born in 1985
curl -X GET \
  "https://api.au4.cliniko.com/v1/patients?q[]=date_of_birth:1985-**-**" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

### Filter by Multiple Practitioners
```bash
# Appointments for practitioners with IDs 1, 2, or 3
curl -X GET \
  "https://api.au4.cliniko.com/v1/individual_appointments?q[]=practitioner_id:=1,2,3" \
  -H "Accept: application/json" \
  -H "User-Agent: My App (seabook1024@gmail.com)" \
  -u "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4:"
```

## Python Examples

### Basic Authentication Setup
```python
import requests
import base64
import json

API_KEY = "MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4"
BASE_URL = "https://api.au4.cliniko.com/v1"

# Create auth header
auth_string = f"{API_KEY}:"
auth_header = base64.b64encode(auth_string.encode()).decode()

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": f"Basic {auth_header}",
    "User-Agent": "My App (seabook1024@gmail.com)"
}
```

### Get Patients
```python
def get_patients():
    response = requests.get(f"{BASE_URL}/patients", headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

patients = get_patients()
print(json.dumps(patients, indent=2))
```

### Create Patient
```python
def create_patient(patient_data):
    response = requests.post(f"{BASE_URL}/patients", 
                           headers=headers, 
                           json=patient_data)
    if response.status_code == 201:
        return response.json()
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

new_patient = {
    "first_name": "Jane",
    "last_name": "Doe",
    "date_of_birth": "1990-03-15",
    "gender": "Female",
    "email": "jane.doe@example.com",
    "phone_number": "+61 400 123 789"
}

created_patient = create_patient(new_patient)
print(json.dumps(created_patient, indent=2))
```

### Get Today's Appointments
```python
from datetime import datetime, timezone

def get_todays_appointments():
    today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start.replace(hour=23, minute=59, second=59)
    
    params = {
        "q[]": [
            f"starts_at:>={today_start.isoformat()}",
            f"starts_at:<={today_end.isoformat()}"
        ]
    }
    
    response = requests.get(f"{BASE_URL}/individual_appointments", 
                           headers=headers, 
                           params=params)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

appointments = get_todays_appointments()
print(json.dumps(appointments, indent=2))
```

## JavaScript/Node.js Examples

### Basic Setup
```javascript
const axios = require('axios');

const API_KEY = 'MS0xNzYxMzY5ODQwMjk3MTkwOTE0LUZSdDJRTTQxaE1zbGVGcElyWXRXOVNqd0p6UHNDRGV4-au4';
const BASE_URL = 'https://api.au4.cliniko.com/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'My App (seabook1024@gmail.com)'
  },
  auth: {
    username: API_KEY,
    password: ''
  }
});
```

### Get All Practitioners
```javascript
async function getPractitioners() {
  try {
    const response = await api.get('/practitioners');
    return response.data;
  } catch (error) {
    console.error('Error fetching practitioners:', error.response?.data || error.message);
    return null;
  }
}

getPractitioners().then(practitioners => {
  console.log(JSON.stringify(practitioners, null, 2));
});
```

### Create Appointment
```javascript
async function createAppointment(appointmentData) {
  try {
    const response = await api.post('/individual_appointments', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error.response?.data || error.message);
    return null;
  }
}

const newAppointment = {
  patient_id: 123,
  practitioner_id: 456,
  appointment_type_id: 789,
  business_id: 1,
  starts_at: '2024-01-15T10:00:00Z',
  ends_at: '2024-01-15T11:00:00Z',
  notes: 'Follow-up consultation'
};

createAppointment(newAppointment).then(appointment => {
  console.log('Created appointment:', JSON.stringify(appointment, null, 2));
});
```

## Important Notes

1. **Shard Detection**: Your API key ends with `-au4`, indicating you're on the Australian 4 shard
2. **Date Format**: All dates must be in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)
3. **Rate Limiting**: Cliniko has rate limits - implement appropriate delays between requests
4. **Error Handling**: Always check response status codes and handle errors appropriately
5. **User-Agent**: Always include a User-Agent header with your app name and contact email
6. **Pagination**: Large result sets are paginated - check for `links` in the response

## Response Format

All successful responses follow this structure:
```json
{
  "patients": [...],  // or "appointments", "practitioners", etc.
  "total_entries": 150,
  "links": {
    "self": "https://api.au4.cliniko.com/v1/patients?page=1",
    "next": "https://api.au4.cliniko.com/v1/patients?page=2"
  }
}
```

Single resource responses:
```json
{
  "id": 123,
  "first_name": "John",
  "last_name": "Doe",
  // ... other fields
  "links": {
    "self": "https://api.au4.cliniko.com/v1/patients/123"
  }
}
```