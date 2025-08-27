#!/usr/bin/env ts-node

import { ClinikoClient } from './client';
import { CreatePatientRequest, QueryFilter } from './types';

async function quickStart() {
  console.log('🚀 Cliniko API Quick Start\n');

  // Initialize the client
  const client = new ClinikoClient();

  try {
    // 1. Test connection
    console.log('1. Testing connection...');
    const connected = await client.testConnection();
    if (!connected) {
      console.log('❌ Connection failed. Check your credentials.');
      return;
    }

    // 2. Get account summary
    console.log('\n2. Account Summary:');
    await client.getAccountInfo();

    // 3. List first 5 patients
    console.log('\n3. Recent Patients:');
    const patients = await client.getPatients([], 1);
    console.log(`📋 Total: ${patients.total_entries} patients`);
    
    if (patients.patients && patients.patients.length > 0) {
      patients.patients.slice(0, 5).forEach((patient: any, i: number) => {
        console.log(`   ${i + 1}. ${patient.first_name} ${patient.last_name} (${patient.email || 'no email'})`);
      });
    }

    // 4. Today's appointments
    console.log('\n4. Today\'s Appointments:');
    const todayAppointments = await client.getTodaysAppointments();
    console.log(`📅 Found ${todayAppointments.total_entries} appointments today`);

    // 5. Quick operations demo
    console.log('\n5. Quick Demo - Creating Test Patient:');
    const testPatient: CreatePatientRequest = {
      first_name: 'Demo',
      last_name: `User-${Date.now()}`,
      email: `demo${Date.now()}@example.com`,
      phone_number: '+61 400 000 000',
      notes: 'Created by quick-start script'
    };

    const newPatient = await client.createPatient(testPatient);
    console.log(`✅ Created: ${newPatient.first_name} ${newPatient.last_name} (ID: ${newPatient.id})`);

    // 6. Search example
    console.log('\n6. Search Demo:');
    const demoPatients = await client.searchPatients('Demo');
    console.log(`🔍 Found ${demoPatients.total_entries} demo patients`);

    console.log('\n✅ Quick start completed! Ready to use the API.');

  } catch (error: any) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'test':
      quickStart();
      break;
    case 'patients':
      listPatients();
      break;
    case 'appointments':
      listAppointments();
      break;
    default:
      console.log(`
🏥 Cliniko API TypeScript Client

Usage:
  npm run dev                    # Run quick start demo
  ts-node src/quick-start.ts test        # Test connection and basic operations
  ts-node src/quick-start.ts patients    # List all patients
  ts-node src/quick-start.ts appointments # List appointments

Available scripts:
  npm run test     # Run comprehensive examples
  npm run build    # Build the project
  npm run dev      # Run quick start
      `);
  }
}

async function listPatients() {
  const client = new ClinikoClient();
  try {
    const patients = await client.getPatients();
    console.log(`📋 ${patients.total_entries} Patients:`);
    
    if (patients.patients) {
      patients.patients.forEach((patient: any, i: number) => {
        console.log(`${i + 1}. ${patient.first_name} ${patient.last_name}`);
        console.log(`   Email: ${patient.email || 'N/A'}`);
        console.log(`   Phone: ${patient.phone_number || 'N/A'}`);
        console.log(`   DOB: ${patient.date_of_birth || 'N/A'}`);
        console.log('');
      });
    }
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

async function listAppointments() {
  const client = new ClinikoClient();
  try {
    const appointments = await client.getAppointments();
    console.log(`📅 ${appointments.total_entries} Appointments:`);
    
    if (appointments.individual_appointments) {
      appointments.individual_appointments.forEach((apt: any, i: number) => {
        const start = new Date(apt.starts_at);
        const end = new Date(apt.ends_at);
        console.log(`${i + 1}. ${start.toLocaleDateString()} ${start.toLocaleTimeString()} - ${end.toLocaleTimeString()}`);
        console.log(`   Patient ID: ${apt.patient_id}`);
        console.log(`   Practitioner ID: ${apt.practitioner_id}`);
        console.log(`   Notes: ${apt.notes || 'None'}`);
        console.log('');
      });
    }
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

export default quickStart;