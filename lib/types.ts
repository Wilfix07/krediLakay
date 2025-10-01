// Database table types for KrediLakay loan management system

export interface Institution {
  id: string
  created_at: string
  updated_at: string
  name: string
  address?: string
  phone?: string
  email?: string
  license_number?: string
  registration_number?: string
  tax_id?: string
  website?: string
  logo_url?: string
  settings?: Record<string, any>
}

export interface LoanType {
  id: string
  created_at: string
  name: string
  code: string
  description?: string
  payment_frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly'
  min_amount: number
  max_amount: number
  min_term_days: number
  max_term_days: number
  interest_rate: number
  penalty_rate?: number
  is_active: boolean
  institution_id: string
}

export interface Profile {
  id: string
  created_at: string
  updated_at: string
  email: string
  full_name: string
  phone?: string
  role: 'super_admin' | 'admin' | 'manager' | 'agent' | 'cashier'
  institution_id: string
  avatar_url?: string
  employee_id?: string
  hire_date?: string
  salary?: number
  commission_rate?: number
  is_active: boolean
  department?: string
  position?: string
  manager_id?: string
}

export interface Client {
  id: string
  created_at: string
  updated_at: string
  first_name: string
  last_name: string
  email?: string
  phone: string
  phone_secondary?: string
  address?: string
  address_work?: string
  date_of_birth?: string
  national_id?: string
  passport_number?: string
  driver_license?: string
  marital_status?: 'single' | 'married' | 'divorced' | 'widowed'
  employment_status?: 'employed' | 'self_employed' | 'unemployed' | 'student' | 'retired'
  employer_name?: string
  monthly_income?: number
  credit_score?: number
  institution_id: string
  agent_id: string
  kyc_status: 'pending' | 'in_review' | 'approved' | 'rejected'
  risk_level: 'low' | 'medium' | 'high'
  notes?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  emergency_contact_relationship?: string
}

export interface Loan {
  id: string
  created_at: string
  updated_at: string
  loan_number: string
  client_id: string
  agent_id: string
  institution_id: string
  loan_type_id: string
  amount: number
  interest_rate: number
  term_days: number
  payment_frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly'
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'disbursed' | 'active' | 'completed' | 'defaulted' | 'written_off'
  purpose?: string
  collateral_description?: string
  collateral_value?: number
  guarantor_name?: string
  guarantor_phone?: string
  guarantor_relationship?: string
  application_date: string
  submitted_date?: string
  approved_date?: string
  disbursed_date?: string
  first_payment_date?: string
  maturity_date?: string
  principal_amount: number
  interest_amount: number
  total_amount: number
  paid_amount: number
  remaining_balance: number
  commission_rate: number
  commission_amount: number
  penalty_amount: number
  fees_amount: number
  insurance_amount: number
  disbursement_method?: 'cash' | 'bank_transfer' | 'check' | 'mobile_money'
  bank_account_number?: string
  bank_name?: string
  branch_name?: string
  next_payment_date?: string
  next_payment_amount?: number
  days_overdue: number
  risk_rating: 'low' | 'medium' | 'high'
  notes?: string
  approved_by?: string
  reviewed_by?: string
}

export interface PaymentSchedule {
  id: string
  created_at: string
  loan_id: string
  installment_number: number
  maturity_date: string
  principal_amount: number
  interest_amount: number
  total_amount: number
  status: 'pending' | 'paid' | 'overdue' | 'partially_paid'
  paid_date?: string
  paid_amount: number
  penalty_amount: number
  notes?: string
}

export interface Payment {
  id: string
  created_at: string
  loan_id: string
  payment_schedule_id?: string
  amount: number
  principal_paid: number
  interest_paid: number
  penalty_paid: number
  payment_date: string
  payment_method: 'cash' | 'bank_transfer' | 'check' | 'mobile_money' | 'card'
  payment_channel: 'cashier' | 'agent' | 'online' | 'mobile_app' | 'atm'
  reference_number?: string
  transaction_id?: string
  receipt_number?: string
  notes?: string
  agent_id: string
  cashier_id?: string
  processed_by?: string
  bank_reference?: string
  check_number?: string
  card_last_four?: string
  is_reversal: boolean
  reversal_reason?: string
  reversal_date?: string
}

export interface KycDocument {
  id: string
  created_at: string
  client_id: string
  document_type: 'national_id' | 'passport' | 'driver_license' | 'utility_bill' | 'bank_statement' | 'payslip' | 'other'
  document_number?: string
  file_name: string
  file_path: string
  file_size?: number
  mime_type?: string
  uploaded_by: string
  verified_at?: string
  verified_by?: string
  status: 'pending' | 'approved' | 'rejected'
  rejection_reason?: string
  expiry_date?: string
  notes?: string
}

export interface KycVerification {
  id: string
  created_at: string
  client_id: string
  verified_by: string
  verification_date: string
  verification_method: 'document_review' | 'physical_verification' | 'biometric' | 'database_check'
  verification_result: 'approved' | 'rejected' | 'requires_additional_info'
  risk_score?: number
  notes?: string
  documents_verified?: Record<string, any>
  biometric_data?: Record<string, any>
}

export interface Commission {
  id: string
  created_at: string
  agent_id: string
  loan_id: string
  institution_id: string
  commission_type: 'origination' | 'monthly' | 'early_payment' | 'performance'
  amount: number
  percentage?: number
  calculation_basis: 'loan_amount' | 'interest' | 'profit' | 'performance'
  period_start?: string
  period_end?: string
  status: 'calculated' | 'approved' | 'paid' | 'cancelled'
  approved_by?: string
  approved_at?: string
  paid_at?: string
  payment_reference?: string
  notes?: string
}

export interface Notification {
  id: string
  created_at: string
  recipient_id: string
  title: string
  message: string
  type: 'loan_approved' | 'loan_rejected' | 'payment_due' | 'payment_received' | 'payment_overdue' | 'kyc_required' | 'system_alert'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  related_entity_type: 'loan' | 'payment' | 'client' | 'system'
  related_entity_id?: string
  is_read: boolean
  read_at?: string
  action_required: boolean
  action_url?: string
  expires_at?: string
}

export interface Report {
  id: string
  created_at: string
  title: string
  description?: string
  report_type: 'financial' | 'portfolio' | 'agent_performance' | 'client_analysis' | 'kyc_status' | 'risk_assessment'
  generated_by: string
  institution_id: string
  parameters: Record<string, any>
  data?: Record<string, any>
  file_path?: string
  file_format?: 'pdf' | 'excel' | 'csv'
  status: 'generating' | 'completed' | 'failed'
  completed_at?: string
  download_count: number
  expires_at?: string
  is_public: boolean
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  total: number
  page: number
  totalPages: number
}

// Form types for creating/updating records
export interface CreateLoanTypeData {
  name: string
  code: string
  description?: string
  payment_frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly'
  min_amount: number
  max_amount: number
  min_term_days: number
  max_term_days: number
  interest_rate: number
  penalty_rate?: number
}

export interface CreateClientData {
  first_name: string
  last_name: string
  email?: string
  phone: string
  phone_secondary?: string
  address?: string
  address_work?: string
  date_of_birth?: string
  national_id?: string
  passport_number?: string
  driver_license?: string
  marital_status?: 'single' | 'married' | 'divorced' | 'widowed'
  employment_status?: 'employed' | 'self_employed' | 'unemployed' | 'student' | 'retired'
  employer_name?: string
  monthly_income?: number
  emergency_contact_name?: string
  emergency_contact_phone?: string
  emergency_contact_relationship?: string
  notes?: string
}

export interface CreateLoanData {
  client_id: string
  loan_type_id: string
  amount: number
  term_days: number
  purpose?: string
  collateral_description?: string
  collateral_value?: number
  guarantor_name?: string
  guarantor_phone?: string
  guarantor_relationship?: string
  disbursement_method?: 'cash' | 'bank_transfer' | 'check' | 'mobile_money'
  bank_account_number?: string
  bank_name?: string
  branch_name?: string
  notes?: string
}

// Dashboard and analytics types
export interface DashboardStats {
  totalLoans: number
  totalAmount: number
  totalClients: number
  activeLoans: number
  totalPayments: number
  overdueLoans: number
  totalCommissions: number
  monthlyGrowth: number
}

export interface LoanSummary {
  id: string
  loan_number: string
  client_name: string
  amount: number
  status: string
  remaining_balance: number
  next_payment_date?: string
  days_overdue: number
}

export interface PaymentSummary {
  id: string
  loan_number: string
  client_name: string
  amount: number
  payment_date: string
  status: string
}

// Filter and search types
export interface LoanFilters {
  status?: string[]
  payment_frequency?: string[]
  agent_id?: string
  client_id?: string
  date_from?: string
  date_to?: string
  amount_min?: number
  amount_max?: number
}

export interface ClientFilters {
  kyc_status?: string[]
  risk_level?: string[]
  agent_id?: string
  search?: string
}

export interface PaymentFilters {
  payment_method?: string[]
  payment_channel?: string[]
  agent_id?: string
  date_from?: string
  date_to?: string
  amount_min?: number
  amount_max?: number
}
