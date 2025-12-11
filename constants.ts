import { Patient, FinancialMetric } from './types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'P-1001',
    resourceType: 'Patient',
    name: [{ given: ['Budi'], family: 'Santoso' }],
    gender: 'male',
    birthDate: '1980-05-12',
    condition: ['Hypertension', 'Type 2 Diabetes'],
    lastVisit: '2023-10-25',
    status: 'active'
  },
  {
    id: 'P-1002',
    resourceType: 'Patient',
    name: [{ given: ['Siti'], family: 'Aminah' }],
    gender: 'female',
    birthDate: '1992-08-15',
    condition: ['Pregnancy', 'Mild Anemia'],
    lastVisit: '2023-10-26',
    status: 'active'
  },
  {
    id: 'P-1003',
    resourceType: 'Patient',
    name: [{ given: ['Joko'], family: 'Widodo' }],
    gender: 'male',
    birthDate: '1975-02-20',
    condition: ['Chronic Kidney Disease'],
    lastVisit: '2023-10-20',
    status: 'critical'
  },
  {
    id: 'P-1004',
    resourceType: 'Patient',
    name: [{ given: ['Dewi'], family: 'Sartika' }],
    gender: 'female',
    birthDate: '1988-11-10',
    condition: ['Asthma'],
    lastVisit: '2023-09-15',
    status: 'discharged'
  },
  {
    id: 'P-1005',
    resourceType: 'Patient',
    name: [{ given: ['Rahmat'], family: 'Hidayat' }],
    gender: 'male',
    birthDate: '1965-06-30',
    condition: ['Post-Surgery Recovery', 'Infection'],
    lastVisit: '2023-10-27',
    status: 'active'
  }
];

export const MOCK_FINANCIALS: FinancialMetric[] = [
  { month: 'Jan', revenue: 450000, expenses: 320000, payroll: 150000 },
  { month: 'Feb', revenue: 470000, expenses: 310000, payroll: 150000 },
  { month: 'Mar', revenue: 520000, expenses: 340000, payroll: 160000 },
  { month: 'Apr', revenue: 490000, expenses: 330000, payroll: 155000 },
  { month: 'May', revenue: 580000, expenses: 350000, payroll: 165000 },
  { month: 'Jun', revenue: 610000, expenses: 360000, payroll: 170000 },
];
