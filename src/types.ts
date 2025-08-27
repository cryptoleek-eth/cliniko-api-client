// Cliniko API Type Definitions

export interface Patient {
  id?: number;
  accepted_email_marketing?: boolean;
  accepted_privacy_policy?: boolean;
  accepted_sms_marketing?: boolean;
  address_1?: string;
  address_2?: string;
  address_3?: string;
  archived_at?: string;
  city?: string;
  country?: string;
  created_at?: string;
  date_of_birth?: string;
  deleted_at?: string;
  email?: string;
  emergency_contact?: string;
  first_name: string;
  gender?: string;
  invoice_default_to?: string;
  invoice_email?: string;
  invoice_extra_information?: string;
  last_name: string;
  medicare_reference_number?: string;
  notes?: string;
  occupation?: string;
  old_reference_id?: string;
  phone_number?: string;
  post_code?: string;
  preferred_first_name?: string;
  referral_source?: string;
  reminder_type?: string;
  state?: string;
  time_zone?: string;
  title?: string;
  updated_at?: string;
  links?: {
    self: string;
  };
}

export interface Practitioner {
  id?: number;
  active?: boolean;
  created_at?: string;
  designation?: string;
  email?: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  provider_number?: string;
  show_in_online_bookings?: boolean;
  title?: string;
  updated_at?: string;
  user_id?: number;
  links?: {
    self: string;
  };
}

export interface AppointmentType {
  id?: number;
  active?: boolean;
  bookable_online?: boolean;
  color?: string;
  created_at?: string;
  duration_in_minutes: number;
  max_attendees?: number;
  name: string;
  show_in_online_bookings?: boolean;
  updated_at?: string;
  links?: {
    self: string;
  };
}

export interface IndividualAppointment {
  id?: number;
  appointment_end?: string;
  appointment_start?: string;
  appointment_type_id: number;
  arrived_at?: string;
  business_id: number;
  cancellation_note?: string;
  cancellation_reason?: string;
  cancelled_at?: string;
  created_at?: string;
  did_not_arrive?: boolean;
  ends_at: string;
  notes?: string;
  online_booking_policy_accepted?: string;
  patient_arrived?: boolean;
  patient_id: number;
  practitioner_id: number;
  recurring_appointment_id?: number;
  starts_at: string;
  treatment_note_id?: number;
  updated_at?: string;
  links?: {
    self: string;
    patient: string;
    practitioner: string;
    appointment_type: string;
    business: string;
    attendees: string;
    treatment_note?: string;
  };
}

export interface Business {
  id?: number;
  address_1?: string;
  address_2?: string;
  address_3?: string;
  city?: string;
  contact_information?: string;
  country?: string;
  created_at?: string;
  name: string;
  phone_number?: string;
  post_code?: string;
  state?: string;
  time_zone?: string;
  updated_at?: string;
  website_address?: string;
  links?: {
    self: string;
  };
}

export interface TreatmentNote {
  id?: number;
  body: string;
  created_at?: string;
  deleted_at?: string;
  draft?: boolean;
  individual_appointment_id?: number;
  patient_id: number;
  practitioner_id: number;
  treatment_note_template_id?: number;
  updated_at?: string;
  links?: {
    self: string;
    patient: string;
    practitioner: string;
    individual_appointment?: string;
  };
}

export interface PaginatedResponse<T> {
  total_entries: number;
  links: {
    self: string;
    next?: string;
    previous?: string;
  };
  [key: string]: T[] | number | any; // Dynamic key based on resource type
}

export interface QueryFilter {
  field: string;
  operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | '~';
  value: string | number | boolean;
}

export interface ApiError {
  errors: string[];
}

export interface CreatePatientRequest {
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: string;
  email?: string;
  phone_number?: string;
  address_1?: string;
  city?: string;
  state?: string;
  post_code?: string;
  country?: string;
  notes?: string;
  emergency_contact?: string;
}

export interface CreateAppointmentRequest {
  patient_id: number;
  practitioner_id: number;
  appointment_type_id: number;
  business_id: number;
  starts_at: string;
  ends_at: string;
  notes?: string;
}

export interface CreatePractitionerRequest {
  first_name: string;
  last_name: string;
  title?: string;
  email?: string;
  phone_number?: string;
  show_in_online_bookings?: boolean;
  designation?: string;
}

export interface CreateTreatmentNoteRequest {
  patient_id: number;
  practitioner_id: number;
  body: string;
  individual_appointment_id?: number;
}