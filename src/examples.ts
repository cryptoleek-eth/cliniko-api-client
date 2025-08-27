import { ClinikoClient } from './client';
import {
  CreatePatientRequest,
  CreateAppointmentRequest,
  CreatePractitionerRequest,
  CreateTreatmentNoteRequest,
  QueryFilter
} from './types';

async function runExamples() {
  console.log('🏥 Cliniko API TypeScript Examples\n');

  // Initialize client
  const client = new ClinikoClient();

  // Test connection
  console.log('1. Testing API connection...');
  const connected = await client.testConnection();
  if (!connected) {
    console.log('Failed to connect. Please check your credentials.');
    return;
  }

  // Get account information
  console.log('\n2. Fetching account information...');
  await client.getAccountInfo();

  // Example 1: List all patients
  console.log('\n3. 👥 Fetching all patients...');
  try {
    const patients = await client.getPatients();
    console.log(`Found ${patients.total_entries} patients`);
    
    if (patients.patients && patients.patients.length > 0) {
      console.log('First few patients:');
      patients.patients.slice(0, 3).forEach((patient: any, index: number) => {
        console.log(`  ${index + 1}. ${patient.first_name} ${patient.last_name} (ID: ${patient.id})`);
      });
    }
  } catch (error) {
    console.error('Error fetching patients:', error);
  }

  // Example 2: Search for patients
  console.log('\n4. 🔍 Searching for patients with name "John"...');
  try {
    const searchResults = await client.searchPatients('John');
    console.log(`Found ${searchResults.total_entries} patients named John`);
  } catch (error) {
    console.error('Error searching patients:', error);
  }

  // Example 3: Create a new patient
  console.log('\n5. ➕ Creating a new patient...');
  try {
    const newPatientData: CreatePatientRequest = {
      first_name: 'Test',
      last_name: 'Patient',
      date_of_birth: '1990-01-01',
      gender: 'Other',
      email: 'test.patient@example.com',
      phone_number: '+61 400 123 456',
      address_1: '123 Test Street',
      city: 'Sydney',
      state: 'NSW',
      post_code: '2000',
      country: 'Australia',
      notes: 'Created via TypeScript API client for testing'
    };

    const newPatient = await client.createPatient(newPatientData);
    console.log(`✅ Created patient: ${newPatient.first_name} ${newPatient.last_name} (ID: ${newPatient.id})`);

    // Update the patient
    console.log('\n6. 📝 Updating patient...');
    const updatedPatient = await client.updatePatient(newPatient.id!, {
      phone_number: '+61 400 987 654',
      notes: 'Updated via TypeScript API client'
    });
    console.log(`✅ Updated patient phone: ${updatedPatient.phone_number}`);

  } catch (error) {
    console.error('Error creating/updating patient:', error);
  }

  // Example 4: List practitioners
  console.log('\n7. 👨‍⚕️ Fetching practitioners...');
  try {
    const practitioners = await client.getPractitioners();
    console.log(`Found ${practitioners.total_entries} practitioners`);
    
    if (practitioners.practitioners && practitioners.practitioners.length > 0) {
      console.log('Practitioners:');
      practitioners.practitioners.forEach((practitioner: any, index: number) => {
        console.log(`  ${index + 1}. ${practitioner.title || ''} ${practitioner.first_name} ${practitioner.last_name} (ID: ${practitioner.id})`);
      });
    }
  } catch (error) {
    console.error('Error fetching practitioners:', error);
  }

  // Example 5: List appointment types
  console.log('\n8. 📅 Fetching appointment types...');
  try {
    const appointmentTypes = await client.getAppointmentTypes();
    console.log(`Found ${appointmentTypes.total_entries} appointment types`);
    
    if (appointmentTypes.appointment_types && appointmentTypes.appointment_types.length > 0) {
      console.log('Appointment types:');
      appointmentTypes.appointment_types.forEach((type: any, index: number) => {
        console.log(`  ${index + 1}. ${type.name} (${type.duration_in_minutes} mins) - ID: ${type.id}`);
      });
    }
  } catch (error) {
    console.error('Error fetching appointment types:', error);
  }

  // Example 6: Get today's appointments
  console.log('\n9. 📋 Fetching today\'s appointments...');
  try {
    const todaysAppointments = await client.getTodaysAppointments();
    console.log(`Found ${todaysAppointments.total_entries} appointments today`);
    
    if (todaysAppointments.individual_appointments && todaysAppointments.individual_appointments.length > 0) {
      console.log('Today\'s appointments:');
      todaysAppointments.individual_appointments.forEach((appointment: any, index: number) => {
        const startTime = new Date(appointment.starts_at).toLocaleTimeString();
        const endTime = new Date(appointment.ends_at).toLocaleTimeString();
        console.log(`  ${index + 1}. ${startTime} - ${endTime} (Patient ID: ${appointment.patient_id}, Practitioner ID: ${appointment.practitioner_id})`);
      });
    }
  } catch (error) {
    console.error('Error fetching today\'s appointments:', error);
  }

  // Example 7: Get appointments in date range
  console.log('\n10. 📆 Fetching appointments for next 7 days...');
  try {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7);

    const weekAppointments = await client.getAppointmentsByDateRange(startDate, endDate);
    console.log(`Found ${weekAppointments.total_entries} appointments in the next 7 days`);
  } catch (error) {
    console.error('Error fetching week appointments:', error);
  }

  // Example 8: Advanced filtering
  console.log('\n11. 🔍 Advanced filtering - Patients born in 1990s...');
  try {
    const filters: QueryFilter[] = [
      { field: 'date_of_birth', operator: '>=', value: '1990-01-01' },
      { field: 'date_of_birth', operator: '<', value: '2000-01-01' }
    ];

    const filteredPatients = await client.getPatients(filters);
    console.log(`Found ${filteredPatients.total_entries} patients born in the 1990s`);
  } catch (error) {
    console.error('Error with advanced filtering:', error);
  }

  console.log('\n✅ Examples completed!');
}

async function createAppointmentExample() {
  console.log('\n🔧 Creating appointment example (requires existing patient, practitioner, appointment type, and business)...');
  
  const client = new ClinikoClient();

  try {
    // First, get available resources
    const patients = await client.getPatients();
    const practitioners = await client.getPractitioners();
    const appointmentTypes = await client.getAppointmentTypes();
    const businesses = await client.getBusinesses();

    if (!patients.patients || patients.patients.length === 0) {
      console.log('❌ No patients found. Create a patient first.');
      return;
    }

    if (!practitioners.practitioners || practitioners.practitioners.length === 0) {
      console.log('❌ No practitioners found. Create a practitioner first.');
      return;
    }

    if (!appointmentTypes.appointment_types || appointmentTypes.appointment_types.length === 0) {
      console.log('❌ No appointment types found. Create an appointment type first.');
      return;
    }

    if (!businesses.businesses || businesses.businesses.length === 0) {
      console.log('❌ No businesses found.');
      return;
    }

    // Create appointment
    const appointmentData: CreateAppointmentRequest = {
      patient_id: patients.patients[0].id!,
      practitioner_id: practitioners.practitioners[0].id!,
      appointment_type_id: appointmentTypes.appointment_types[0].id!,
      business_id: businesses.businesses[0].id!,
      starts_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      ends_at: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), // Tomorrow + 1 hour
      notes: 'Appointment created via TypeScript API client'
    };

    console.log('Creating appointment with data:', {
      patient_name: `${patients.patients[0].first_name} ${patients.patients[0].last_name}`,
      practitioner_name: `${practitioners.practitioners[0].first_name} ${practitioners.practitioners[0].last_name}`,
      appointment_type: appointmentTypes.appointment_types[0].name,
      business_name: businesses.businesses[0].name,
      start_time: appointmentData.starts_at,
      end_time: appointmentData.ends_at
    });

    const newAppointment = await client.createAppointment(appointmentData);
    console.log(`✅ Created appointment ID: ${newAppointment.id}`);

    // Get the created appointment details
    const appointmentDetails = await client.getAppointment(newAppointment.id!);
    console.log('📋 Appointment details:', {
      id: appointmentDetails.id,
      starts_at: appointmentDetails.starts_at,
      ends_at: appointmentDetails.ends_at,
      notes: appointmentDetails.notes
    });

  } catch (error) {
    console.error('Error creating appointment:', error);
  }
}

// Run examples if this file is executed directly
if (require.main === module) {
  runExamples()
    .then(() => {
      console.log('\n🔧 Running appointment creation example...');
      return createAppointmentExample();
    })
    .catch(error => {
      console.error('Error running examples:', error);
      process.exit(1);
    });
}