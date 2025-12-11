export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CLINICAL = 'CLINICAL',
  FINANCIAL = 'FINANCIAL',
  SEARCH = 'SEARCH'
}

// Simplified FHIR-like Patient Resource
export interface Patient {
  id: string;
  resourceType: 'Patient';
  name: {
    given: string[];
    family: string;
  }[];
  gender: 'male' | 'female' | 'other';
  birthDate: string;
  condition?: string[]; // Simplified from Condition resource
  lastVisit?: string;
  status: 'active' | 'discharged' | 'critical';
}

export interface FinancialMetric {
  month: string;
  revenue: number;
  expenses: number;
  payroll: number;
}

export interface ClinicalNote {
  id: string;
  patientId: string;
  timestamp: string;
  rawText: string;
  summary?: string;
  soap?: {
    s: string;
    o: string;
    a: string;
    p: string;
  };
}

export interface AIResponseState {
  loading: boolean;
  error: string | null;
  data: string | null;
}
