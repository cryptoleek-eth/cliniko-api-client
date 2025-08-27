import axios, { AxiosInstance, AxiosError } from 'axios';
import * as dotenv from 'dotenv';
import {
  Patient,
  Practitioner,
  AppointmentType,
  IndividualAppointment,
  Business,
  TreatmentNote,
  PaginatedResponse,
  QueryFilter,
  ApiError,
  CreatePatientRequest,
  CreateAppointmentRequest,
  CreatePractitionerRequest,
  CreateTreatmentNoteRequest
} from './types';

dotenv.config();

export class ClinikoClient {
  private client: AxiosInstance;

  constructor(
    apiKey?: string,
    baseUrl?: string,
    userEmail?: string
  ) {
    const key = apiKey || process.env.CLINIKO_API_KEY;
    const url = baseUrl || process.env.CLINIKO_BASE_URL;
    const email = userEmail || process.env.CLINIKO_EMAIL;

    if (!key) {
      throw new Error('API key is required');
    }

    if (!url) {
      throw new Error('Base URL is required');
    }

    this.client = axios.create({
      baseURL: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': `Cliniko TypeScript Client (${email || 'no-email-provided'})`
      },
      auth: {
        username: key,
        password: ''
      }
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const apiError: ApiError = error.response.data as ApiError;
          console.error('API Error:', apiError.errors || error.response.data);
        }
        return Promise.reject(error);
      }
    );
  }

  // Helper method to build query parameters
  private buildQueryParams(filters: QueryFilter[] = [], page?: number): Record<string, any> {
    const params: Record<string, any> = {};
    
    if (filters.length > 0) {
      params['q[]'] = filters.map(filter => `${filter.field}:${filter.operator}${filter.value}`);
    }
    
    if (page) {
      params.page = page;
    }
    
    return params;
  }

  // PATIENTS
  async getPatients(filters: QueryFilter[] = [], page?: number): Promise<PaginatedResponse<Patient>> {
    const params = this.buildQueryParams(filters, page);
    const response = await this.client.get('/patients', { params });
    return response.data;
  }

  async getPatient(id: number): Promise<Patient> {
    const response = await this.client.get(`/patients/${id}`);
    return response.data;
  }

  async createPatient(patientData: CreatePatientRequest): Promise<Patient> {
    const response = await this.client.post('/patients', patientData);
    return response.data;
  }

  async updatePatient(id: number, patientData: Partial<Patient>): Promise<Patient> {
    const response = await this.client.put(`/patients/${id}`, patientData);
    return response.data;
  }

  async deletePatient(id: number): Promise<void> {
    await this.client.delete(`/patients/${id}`);
  }

  async searchPatients(firstName?: string, lastName?: string, email?: string): Promise<PaginatedResponse<Patient>> {
    const filters: QueryFilter[] = [];
    
    if (firstName) filters.push({ field: 'first_name', operator: '~', value: firstName });
    if (lastName) filters.push({ field: 'last_name', operator: '~', value: lastName });
    if (email) filters.push({ field: 'email', operator: '~', value: email });
    
    return this.getPatients(filters);
  }

  // PRACTITIONERS
  async getPractitioners(filters: QueryFilter[] = [], page?: number): Promise<PaginatedResponse<Practitioner>> {
    const params = this.buildQueryParams(filters, page);
    const response = await this.client.get('/practitioners', { params });
    return response.data;
  }

  async getPractitioner(id: number): Promise<Practitioner> {
    const response = await this.client.get(`/practitioners/${id}`);
    return response.data;
  }

  async createPractitioner(practitionerData: CreatePractitionerRequest): Promise<Practitioner> {
    const response = await this.client.post('/practitioners', practitionerData);
    return response.data;
  }

  async updatePractitioner(id: number, practitionerData: Partial<Practitioner>): Promise<Practitioner> {
    const response = await this.client.put(`/practitioners/${id}`, practitionerData);
    return response.data;
  }

  // APPOINTMENTS
  async getAppointments(filters: QueryFilter[] = [], page?: number): Promise<PaginatedResponse<IndividualAppointment>> {
    const params = this.buildQueryParams(filters, page);
    const response = await this.client.get('/individual_appointments', { params });
    return response.data;
  }

  async getAppointment(id: number): Promise<IndividualAppointment> {
    const response = await this.client.get(`/individual_appointments/${id}`);
    return response.data;
  }

  async createAppointment(appointmentData: CreateAppointmentRequest): Promise<IndividualAppointment> {
    const response = await this.client.post('/individual_appointments', appointmentData);
    return response.data;
  }

  async updateAppointment(id: number, appointmentData: Partial<IndividualAppointment>): Promise<IndividualAppointment> {
    const response = await this.client.put(`/individual_appointments/${id}`, appointmentData);
    return response.data;
  }

  async cancelAppointment(id: number, reason?: string): Promise<void> {
    const data = reason ? { cancellation_reason: reason } : {};
    await this.client.delete(`/individual_appointments/${id}`, { data });
  }

  async getTodaysAppointments(): Promise<PaginatedResponse<IndividualAppointment>> {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const filters: QueryFilter[] = [
      { field: 'starts_at', operator: '>=', value: startOfDay.toISOString() },
      { field: 'starts_at', operator: '<', value: endOfDay.toISOString() }
    ];

    return this.getAppointments(filters);
  }

  async getAppointmentsByDateRange(startDate: Date, endDate: Date): Promise<PaginatedResponse<IndividualAppointment>> {
    const filters: QueryFilter[] = [
      { field: 'starts_at', operator: '>=', value: startDate.toISOString() },
      { field: 'starts_at', operator: '<=', value: endDate.toISOString() }
    ];

    return this.getAppointments(filters);
  }

  // APPOINTMENT TYPES
  async getAppointmentTypes(filters: QueryFilter[] = []): Promise<PaginatedResponse<AppointmentType>> {
    const params = this.buildQueryParams(filters);
    const response = await this.client.get('/appointment_types', { params });
    return response.data;
  }

  async getAppointmentType(id: number): Promise<AppointmentType> {
    const response = await this.client.get(`/appointment_types/${id}`);
    return response.data;
  }

  async createAppointmentType(appointmentTypeData: Partial<AppointmentType>): Promise<AppointmentType> {
    const response = await this.client.post('/appointment_types', appointmentTypeData);
    return response.data;
  }

  // BUSINESSES
  async getBusinesses(): Promise<PaginatedResponse<Business>> {
    const response = await this.client.get('/businesses');
    return response.data;
  }

  async getBusiness(id: number): Promise<Business> {
    const response = await this.client.get(`/businesses/${id}`);
    return response.data;
  }

  // TREATMENT NOTES
  async getTreatmentNotes(filters: QueryFilter[] = [], page?: number): Promise<PaginatedResponse<TreatmentNote>> {
    const params = this.buildQueryParams(filters, page);
    const response = await this.client.get('/treatment_notes', { params });
    return response.data;
  }

  async getTreatmentNote(id: number): Promise<TreatmentNote> {
    const response = await this.client.get(`/treatment_notes/${id}`);
    return response.data;
  }

  async createTreatmentNote(noteData: CreateTreatmentNoteRequest): Promise<TreatmentNote> {
    const response = await this.client.post('/treatment_notes', noteData);
    return response.data;
  }

  async updateTreatmentNote(id: number, noteData: Partial<TreatmentNote>): Promise<TreatmentNote> {
    const response = await this.client.put(`/treatment_notes/${id}`, noteData);
    return response.data;
  }

  async getTreatmentNotesForPatient(patientId: number): Promise<PaginatedResponse<TreatmentNote>> {
    const filters: QueryFilter[] = [
      { field: 'patient_id', operator: '=', value: patientId }
    ];
    return this.getTreatmentNotes(filters);
  }

  // UTILITY METHODS
  async testConnection(): Promise<boolean> {
    try {
      await this.getBusinesses();
      console.log('✅ Successfully connected to Cliniko API');
      return true;
    } catch (error) {
      console.error('❌ Failed to connect to Cliniko API:', error);
      return false;
    }
  }

  async getAccountInfo(): Promise<void> {
    try {
      const businesses = await this.getBusinesses();
      const practitioners = await this.getPractitioners();
      
      console.log('\n📊 Account Information:');
      console.log(`Businesses: ${businesses.total_entries}`);
      if (businesses.businesses && businesses.businesses.length > 0) {
        businesses.businesses.forEach((business: Business, index: number) => {
          console.log(`  ${index + 1}. ${business.name} (ID: ${business.id})`);
        });
      }
      
      console.log(`Practitioners: ${practitioners.total_entries}`);
      if (practitioners.practitioners && practitioners.practitioners.length > 0) {
        practitioners.practitioners.forEach((practitioner: Practitioner, index: number) => {
          console.log(`  ${index + 1}. ${practitioner.first_name} ${practitioner.last_name} (ID: ${practitioner.id})`);
        });
      }
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  }
}