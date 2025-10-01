-- KREDI LAKAY - Comprehensive Loan Management System
-- Execute this script in your Supabase SQL Editor
-- This migration creates a complete microfinance management system

-- Drop existing tables if they exist (for clean migration)
-- Uncomment these lines if you want to start fresh:
-- DROP TABLE IF EXISTS notifications CASCADE;
-- DROP TABLE IF EXISTS reports CASCADE;
-- DROP TABLE IF EXISTS commissions CASCADE;
-- DROP TABLE IF EXISTS payment_schedules CASCADE;
-- DROP TABLE IF EXISTS kyc_documents CASCADE;
-- DROP TABLE IF EXISTS kyc_verifications CASCADE;
-- DROP TABLE IF EXISTS payments CASCADE;
-- DROP TABLE IF EXISTS loans CASCADE;
-- DROP TABLE IF EXISTS clients CASCADE;
-- DROP TABLE IF EXISTS loan_types CASCADE;
-- DROP TABLE IF EXISTS profiles CASCADE;
-- DROP TABLE IF EXISTS institutions CASCADE;

-- Create institutions table
CREATE TABLE IF NOT EXISTS institutions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  address text,
  phone text,
  email text,
  license_number text,
  registration_number text,
  tax_id text,
  website text,
  logo_url text,
  settings jsonb DEFAULT '{}'
);

-- Create loan_types table (for different loan types)
CREATE TABLE IF NOT EXISTS loan_types (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  payment_frequency text CHECK (payment_frequency IN ('daily', 'weekly', 'biweekly', 'monthly')) NOT NULL,
  min_amount numeric(15,2) NOT NULL,
  max_amount numeric(15,2) NOT NULL,
  min_term_days integer NOT NULL,
  max_term_days integer NOT NULL,
  interest_rate numeric(5,2) NOT NULL,
  penalty_rate numeric(5,2) DEFAULT 0,
  is_active boolean DEFAULT true,
  institution_id uuid REFERENCES institutions(id) NOT NULL
);

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  email text NOT NULL,
  full_name text NOT NULL,
  phone text,
  role text CHECK (role IN ('super_admin', 'admin', 'manager', 'agent', 'cashier')) DEFAULT 'agent',
  institution_id uuid REFERENCES institutions(id) NOT NULL,
  avatar_url text,
  employee_id text,
  hire_date date,
  salary numeric(15,2),
  commission_rate numeric(5,2) DEFAULT 0,
  is_active boolean DEFAULT true,
  department text,
  position text,
  manager_id uuid REFERENCES profiles(id)
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text,
  phone text NOT NULL,
  phone_secondary text,
  address text,
  address_work text,
  date_of_birth date,
  national_id text UNIQUE,
  passport_number text,
  driver_license text,
  marital_status text CHECK (marital_status IN ('single', 'married', 'divorced', 'widowed')),
  employment_status text CHECK (employment_status IN ('employed', 'self_employed', 'unemployed', 'student', 'retired')),
  employer_name text,
  monthly_income numeric(15,2),
  credit_score integer CHECK (credit_score >= 0 AND credit_score <= 1000),
  institution_id uuid REFERENCES institutions(id) NOT NULL,
  agent_id uuid REFERENCES profiles(id) NOT NULL,
  kyc_status text CHECK (kyc_status IN ('pending', 'in_review', 'approved', 'rejected')) DEFAULT 'pending',
  risk_level text CHECK (risk_level IN ('low', 'medium', 'high')) DEFAULT 'medium',
  notes text,
  emergency_contact_name text,
  emergency_contact_phone text,
  emergency_contact_relationship text
);

-- Create loans table
CREATE TABLE IF NOT EXISTS loans (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  loan_number text UNIQUE NOT NULL,
  client_id uuid REFERENCES clients(id) NOT NULL,
  agent_id uuid REFERENCES profiles(id) NOT NULL,
  institution_id uuid REFERENCES institutions(id) NOT NULL,
  loan_type_id uuid REFERENCES loan_types(id) NOT NULL,
  amount numeric(15,2) NOT NULL,
  interest_rate numeric(5,2) NOT NULL,
  term_days integer NOT NULL,
  payment_frequency text CHECK (payment_frequency IN ('daily', 'weekly', 'biweekly', 'monthly')) NOT NULL,
  status text CHECK (status IN ('draft', 'submitted', 'under_review', 'approved', 'rejected', 'disbursed', 'active', 'completed', 'defaulted', 'written_off')) DEFAULT 'draft',
  purpose text,
  collateral_description text,
  collateral_value numeric(15,2),
  guarantor_name text,
  guarantor_phone text,
  guarantor_relationship text,
  application_date date NOT NULL DEFAULT CURRENT_DATE,
  submitted_date date,
  approved_date date,
  disbursed_date date,
  first_payment_date date,
  maturity_date date,
  principal_amount numeric(15,2) NOT NULL,
  interest_amount numeric(15,2) NOT NULL,
  total_amount numeric(15,2) NOT NULL,
  paid_amount numeric(15,2) DEFAULT 0,
  remaining_balance numeric(15,2) NOT NULL,
  commission_rate numeric(5,2) NOT NULL DEFAULT 0,
  commission_amount numeric(15,2) NOT NULL DEFAULT 0,
  penalty_amount numeric(15,2) DEFAULT 0,
  fees_amount numeric(15,2) DEFAULT 0,
  insurance_amount numeric(15,2) DEFAULT 0,
  disbursement_method text CHECK (disbursement_method IN ('cash', 'bank_transfer', 'check', 'mobile_money')),
  bank_account_number text,
  bank_name text,
  branch_name text,
  next_payment_date date,
  next_payment_amount numeric(15,2),
  days_overdue integer DEFAULT 0,
  risk_rating text CHECK (risk_rating IN ('low', 'medium', 'high')) DEFAULT 'medium',
  notes text,
  approved_by uuid REFERENCES profiles(id),
  reviewed_by uuid REFERENCES profiles(id)
);

-- Create payment_schedules table
CREATE TABLE IF NOT EXISTS payment_schedules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  loan_id uuid REFERENCES loans(id) NOT NULL,
  installment_number integer NOT NULL,
  due_date date NOT NULL,
  principal_amount numeric(15,2) NOT NULL,
  interest_amount numeric(15,2) NOT NULL,
  total_amount numeric(15,2) NOT NULL,
  status text CHECK (status IN ('pending', 'paid', 'overdue', 'partially_paid')) DEFAULT 'pending',
  paid_date date,
  paid_amount numeric(15,2) DEFAULT 0,
  penalty_amount numeric(15,2) DEFAULT 0,
  notes text
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  loan_id uuid REFERENCES loans(id) NOT NULL,
  payment_schedule_id uuid REFERENCES payment_schedules(id),
  amount numeric(15,2) NOT NULL,
  principal_paid numeric(15,2) NOT NULL,
  interest_paid numeric(15,2) NOT NULL,
  penalty_paid numeric(15,2) DEFAULT 0,
  payment_date date NOT NULL,
  payment_method text CHECK (payment_method IN ('cash', 'bank_transfer', 'check', 'mobile_money', 'card')) NOT NULL,
  payment_channel text CHECK (payment_channel IN ('cashier', 'agent', 'online', 'mobile_app', 'atm')) NOT NULL,
  reference_number text UNIQUE,
  transaction_id text,
  receipt_number text,
  notes text,
  agent_id uuid REFERENCES profiles(id) NOT NULL,
  cashier_id uuid REFERENCES profiles(id),
  processed_by uuid REFERENCES profiles(id),
  bank_reference text,
  check_number text,
  card_last_four text,
  is_reversal boolean DEFAULT false,
  reversal_reason text,
  reversal_date date
);

-- Create kyc_documents table
CREATE TABLE IF NOT EXISTS kyc_documents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  client_id uuid REFERENCES clients(id) NOT NULL,
  document_type text CHECK (document_type IN ('national_id', 'passport', 'driver_license', 'utility_bill', 'bank_statement', 'payslip', 'other')) NOT NULL,
  document_number text,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size integer,
  mime_type text,
  uploaded_by uuid REFERENCES profiles(id) NOT NULL,
  verified_at timestamp with time zone,
  verified_by uuid REFERENCES profiles(id),
  status text CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  rejection_reason text,
  expiry_date date,
  notes text
);

-- Create kyc_verifications table
CREATE TABLE IF NOT EXISTS kyc_verifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  client_id uuid REFERENCES clients(id) NOT NULL,
  verified_by uuid REFERENCES profiles(id) NOT NULL,
  verification_date date NOT NULL,
  verification_method text CHECK (verification_method IN ('document_review', 'physical_verification', 'biometric', 'database_check')) NOT NULL,
  verification_result text CHECK (verification_result IN ('approved', 'rejected', 'requires_additional_info')) NOT NULL,
  risk_score numeric(3,2),
  notes text,
  documents_verified jsonb,
  biometric_data jsonb
);

-- Create commissions table
CREATE TABLE IF NOT EXISTS commissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  agent_id uuid REFERENCES profiles(id) NOT NULL,
  loan_id uuid REFERENCES loans(id) NOT NULL,
  institution_id uuid REFERENCES institutions(id) NOT NULL,
  commission_type text CHECK (commission_type IN ('origination', 'monthly', 'early_payment', 'performance')) NOT NULL,
  amount numeric(15,2) NOT NULL,
  percentage numeric(5,2),
  calculation_basis text CHECK (calculation_basis IN ('loan_amount', 'interest', 'profit', 'performance')) NOT NULL,
  period_start date,
  period_end date,
  status text CHECK (status IN ('calculated', 'approved', 'paid', 'cancelled')) DEFAULT 'calculated',
  approved_by uuid REFERENCES profiles(id),
  approved_at timestamp with time zone,
  paid_at timestamp with time zone,
  payment_reference text,
  notes text
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  recipient_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text CHECK (type IN ('loan_approved', 'loan_rejected', 'payment_due', 'payment_received', 'payment_overdue', 'kyc_required', 'system_alert')) NOT NULL,
  priority text CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  related_entity_type text CHECK (related_entity_type IN ('loan', 'payment', 'client', 'system')) NOT NULL,
  related_entity_id uuid,
  is_read boolean DEFAULT false,
  read_at timestamp with time zone,
  action_required boolean DEFAULT false,
  action_url text,
  expires_at timestamp with time zone
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  description text,
  report_type text CHECK (report_type IN ('financial', 'portfolio', 'agent_performance', 'client_analysis', 'kyc_status', 'risk_assessment')) NOT NULL,
  generated_by uuid REFERENCES profiles(id) NOT NULL,
  institution_id uuid REFERENCES institutions(id) NOT NULL,
  parameters jsonb NOT NULL,
  data jsonb,
  file_path text,
  file_format text CHECK (file_format IN ('pdf', 'excel', 'csv')) DEFAULT 'pdf',
  status text CHECK (status IN ('generating', 'completed', 'failed')) DEFAULT 'generating',
  completed_at timestamp with time zone,
  download_count integer DEFAULT 0,
  expires_at timestamp with time zone,
  is_public boolean DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE loan_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for institutions (drop existing first)
DROP POLICY IF EXISTS "Users can view institutions" ON institutions;
DROP POLICY IF EXISTS "Authenticated users can insert institutions" ON institutions;
DROP POLICY IF EXISTS "Institution admins can update their institution" ON institutions;

CREATE POLICY "Users can view institutions" ON institutions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert institutions" ON institutions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Institution admins can update their institution" ON institutions FOR UPDATE USING (
  id IN (SELECT institution_id FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Create RLS policies for loan_types (drop existing first)
DROP POLICY IF EXISTS "Users can view loan types from their institution" ON loan_types;
DROP POLICY IF EXISTS "Institution admins can manage loan types" ON loan_types;

CREATE POLICY "Users can view loan types from their institution" ON loan_types FOR SELECT USING (
  institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "Institution admins can manage loan types" ON loan_types FOR ALL USING (
  institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Create RLS policies for profiles (drop existing first)
DROP POLICY IF EXISTS "Users can view profiles in their institution" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can update profiles in their institution" ON profiles;

CREATE POLICY "Users can view profiles in their institution" ON profiles FOR SELECT USING (
  institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update profiles in their institution" ON profiles FOR UPDATE USING (
  institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Create RLS policies for clients (drop existing first)
DROP POLICY IF EXISTS "Users can view clients from their institution" ON clients;
DROP POLICY IF EXISTS "Agents can insert clients for their institution" ON clients;
DROP POLICY IF EXISTS "Users can update clients from their institution" ON clients;

CREATE POLICY "Users can view clients from their institution" ON clients FOR SELECT USING (
  institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "Agents can insert clients for their institution" ON clients FOR INSERT WITH CHECK (
  institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid()) AND
  agent_id = auth.uid()
);
CREATE POLICY "Users can update clients from their institution" ON clients FOR UPDATE USING (
  institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid())
);

-- Create RLS policies for loans (drop existing first)
DROP POLICY IF EXISTS "Users can view loans from their institution" ON loans;
DROP POLICY IF EXISTS "Agents can insert loans for their institution" ON loans;
DROP POLICY IF EXISTS "Users can update loans from their institution" ON loans;

CREATE POLICY "Users can view loans from their institution" ON loans FOR SELECT USING (
  institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "Agents can insert loans for their institution" ON loans FOR INSERT WITH CHECK (
  institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid()) AND
  agent_id = auth.uid()
);
CREATE POLICY "Users can update loans from their institution" ON loans FOR UPDATE USING (
  institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid())
);

-- Create RLS policies for payment_schedules (drop existing first)
DROP POLICY IF EXISTS "Users can view payment schedules from their institution" ON payment_schedules;
DROP POLICY IF EXISTS "System can manage payment schedules" ON payment_schedules;

CREATE POLICY "Users can view payment schedules from their institution" ON payment_schedules FOR SELECT USING (
  loan_id IN (SELECT id FROM loans WHERE institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid()))
);
CREATE POLICY "System can manage payment schedules" ON payment_schedules FOR ALL USING (true);

-- Create RLS policies for payments (drop existing first)
DROP POLICY IF EXISTS "Users can view payments from their institution" ON payments;
DROP POLICY IF EXISTS "Agents and cashiers can insert payments" ON payments;
DROP POLICY IF EXISTS "Users can update payments from their institution" ON payments;

CREATE POLICY "Users can view payments from their institution" ON payments FOR SELECT USING (
  loan_id IN (SELECT id FROM loans WHERE institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid()))
);
CREATE POLICY "Agents and cashiers can insert payments" ON payments FOR INSERT WITH CHECK (
  agent_id = auth.uid() OR cashier_id = auth.uid()
);
CREATE POLICY "Users can update payments from their institution" ON payments FOR UPDATE USING (
  loan_id IN (SELECT id FROM loans WHERE institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid()))
);

-- Create RLS policies for kyc_documents (drop existing first)
DROP POLICY IF EXISTS "Users can view KYC documents from their institution" ON kyc_documents;
DROP POLICY IF EXISTS "Agents can manage KYC documents for their clients" ON kyc_documents;

CREATE POLICY "Users can view KYC documents from their institution" ON kyc_documents FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid()))
);
CREATE POLICY "Agents can manage KYC documents for their clients" ON kyc_documents FOR ALL USING (
  client_id IN (SELECT id FROM clients WHERE agent_id = auth.uid() OR institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid()))
);

-- Create RLS policies for kyc_verifications (drop existing first)
DROP POLICY IF EXISTS "Users can view KYC verifications from their institution" ON kyc_verifications;
DROP POLICY IF EXISTS "Authorized users can create KYC verifications" ON kyc_verifications;

CREATE POLICY "Users can view KYC verifications from their institution" ON kyc_verifications FOR SELECT USING (
  client_id IN (SELECT id FROM clients WHERE institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid()))
);
CREATE POLICY "Authorized users can create KYC verifications" ON kyc_verifications FOR INSERT WITH CHECK (
  verified_by = auth.uid() AND
  client_id IN (SELECT id FROM clients WHERE institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid()))
);

-- Create RLS policies for commissions (drop existing first)
DROP POLICY IF EXISTS "Users can view commissions from their institution" ON commissions;
DROP POLICY IF EXISTS "System can calculate commissions" ON commissions;
DROP POLICY IF EXISTS "Admins can approve commissions" ON commissions;

CREATE POLICY "Users can view commissions from their institution" ON commissions FOR SELECT USING (
  institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "System can calculate commissions" ON commissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can approve commissions" ON commissions FOR UPDATE USING (
  institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);

-- Create RLS policies for notifications (drop existing first)
DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;
DROP POLICY IF EXISTS "System can create notifications" ON notifications;

CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (recipient_id = auth.uid());
CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (recipient_id = auth.uid());
CREATE POLICY "System can create notifications" ON notifications FOR INSERT WITH CHECK (true);

-- Create RLS policies for reports (drop existing first)
DROP POLICY IF EXISTS "Users can view reports from their institution" ON reports;
DROP POLICY IF EXISTS "Users can create reports for their institution" ON reports;

CREATE POLICY "Users can view reports from their institution" ON reports FOR SELECT USING (
  institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "Users can create reports for their institution" ON reports FOR INSERT WITH CHECK (
  generated_by = auth.uid() AND
  institution_id IN (SELECT institution_id FROM profiles WHERE id = auth.uid())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_loan_types_institution_id ON loan_types(institution_id);
CREATE INDEX IF NOT EXISTS idx_loan_types_code ON loan_types(code);
CREATE INDEX IF NOT EXISTS idx_profiles_institution_id ON profiles(institution_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_employee_id ON profiles(employee_id);
CREATE INDEX IF NOT EXISTS idx_clients_institution_id ON clients(institution_id);
CREATE INDEX IF NOT EXISTS idx_clients_agent_id ON clients(agent_id);
CREATE INDEX IF NOT EXISTS idx_clients_national_id ON clients(national_id);
CREATE INDEX IF NOT EXISTS idx_clients_kyc_status ON clients(kyc_status);
CREATE INDEX IF NOT EXISTS idx_loans_client_id ON loans(client_id);
CREATE INDEX IF NOT EXISTS idx_loans_agent_id ON loans(agent_id);
CREATE INDEX IF NOT EXISTS idx_loans_institution_id ON loans(institution_id);
CREATE INDEX IF NOT EXISTS idx_loans_loan_type_id ON loans(loan_type_id);
CREATE INDEX IF NOT EXISTS idx_loans_status ON loans(status);
CREATE INDEX IF NOT EXISTS idx_loans_loan_number ON loans(loan_number);
CREATE INDEX IF NOT EXISTS idx_loans_maturity_date ON loans(maturity_date);
CREATE INDEX IF NOT EXISTS idx_loans_next_payment_date ON loans(next_payment_date);
CREATE INDEX IF NOT EXISTS idx_payment_schedules_loan_id ON payment_schedules(loan_id);
CREATE INDEX IF NOT EXISTS idx_payment_schedules_due_date ON payment_schedules(due_date);
CREATE INDEX IF NOT EXISTS idx_payment_schedules_status ON payment_schedules(status);
CREATE INDEX IF NOT EXISTS idx_payments_loan_id ON payments(loan_id);
CREATE INDEX IF NOT EXISTS idx_payments_agent_id ON payments(agent_id);
CREATE INDEX IF NOT EXISTS idx_payments_cashier_id ON payments(cashier_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date);
CREATE INDEX IF NOT EXISTS idx_payments_reference_number ON payments(reference_number);
CREATE INDEX IF NOT EXISTS idx_kyc_documents_client_id ON kyc_documents(client_id);
CREATE INDEX IF NOT EXISTS idx_kyc_documents_status ON kyc_documents(status);
CREATE INDEX IF NOT EXISTS idx_kyc_verifications_client_id ON kyc_verifications(client_id);
CREATE INDEX IF NOT EXISTS idx_commissions_agent_id ON commissions(agent_id);
CREATE INDEX IF NOT EXISTS idx_commissions_loan_id ON commissions(loan_id);
CREATE INDEX IF NOT EXISTS idx_commissions_status ON commissions(status);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient_id ON notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_reports_institution_id ON reports(institution_id);
CREATE INDEX IF NOT EXISTS idx_reports_generated_by ON reports(generated_by);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_institutions_updated_at BEFORE UPDATE ON institutions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loan_types_updated_at BEFORE UPDATE ON loan_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loans_updated_at BEFORE UPDATE ON loans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to generate loan numbers
CREATE OR REPLACE FUNCTION generate_loan_number()
RETURNS TRIGGER AS $$
DECLARE
  current_year text;
  sequence_number text;
  loan_number text;
BEGIN
  current_year := EXTRACT(YEAR FROM CURRENT_DATE)::text;
  SELECT COALESCE(MAX(SPLIT_PART(loan_number, '-', 2)::integer), 0) + 1
  INTO sequence_number
  FROM loans
  WHERE loan_number LIKE 'LN-' || current_year || '-%';

  loan_number := 'LN-' || current_year || '-' || LPAD(sequence_number::text, 6, '0');

  NEW.loan_number := loan_number;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for loan number generation
CREATE TRIGGER generate_loan_number_trigger
  BEFORE INSERT ON loans
  FOR EACH ROW
  EXECUTE FUNCTION generate_loan_number();

-- Create function to calculate loan amounts and schedule
CREATE OR REPLACE FUNCTION calculate_loan_details()
RETURNS TRIGGER AS $$
DECLARE
  loan_type_record RECORD;
  total_months integer;
  monthly_rate numeric;
  monthly_payment numeric;
BEGIN
  -- Get loan type details
  SELECT * INTO loan_type_record
  FROM loan_types
  WHERE id = NEW.loan_type_id;

  -- Calculate term in months based on frequency
  CASE NEW.payment_frequency
    WHEN 'daily' THEN total_months := NEW.term_days / 30;
    WHEN 'weekly' THEN total_months := NEW.term_days / 4;
    WHEN 'biweekly' THEN total_months := NEW.term_days / 2;
    ELSE total_months := NEW.term_days / 30; -- monthly
  END CASE;

  -- Calculate monthly interest rate
  monthly_rate := loan_type_record.interest_rate / 100 / 12;

  -- Calculate monthly payment using standard loan formula
  IF monthly_rate > 0 THEN
    monthly_payment := NEW.amount * (monthly_rate * POWER(1 + monthly_rate, total_months)) /
                     (POWER(1 + monthly_rate, total_months) - 1);
  ELSE
    monthly_payment := NEW.amount / total_months;
  END IF;

  -- Update loan with calculated values
  NEW.interest_rate := loan_type_record.interest_rate;
  NEW.total_amount := NEW.amount + (NEW.amount * loan_type_record.interest_rate / 100);
  NEW.monthly_payment := ROUND(monthly_payment::numeric, 2);
  NEW.remaining_balance := NEW.total_amount;
  NEW.maturity_date := CURRENT_DATE + INTERVAL '1 day' * NEW.term_days;
  NEW.first_payment_date := CURRENT_DATE + INTERVAL '1 month';

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for loan calculations
CREATE TRIGGER calculate_loan_details_trigger
  BEFORE INSERT OR UPDATE ON loans
  FOR EACH ROW
  EXECUTE FUNCTION calculate_loan_details();

-- Insert default loan types for demo purposes
INSERT INTO loan_types (name, code, description, payment_frequency, min_amount, max_amount, min_term_days, max_term_days, interest_rate, institution_id)
SELECT
  'Prêt Journalier', 'DAILY', 'Prêt remboursable quotidiennement', 'daily', 1000, 50000, 30, 90, 15.0,
  (SELECT id FROM institutions WHERE name = 'Demo Institution' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM institutions WHERE name = 'Demo Institution');

INSERT INTO loan_types (name, code, description, payment_frequency, min_amount, max_amount, min_term_days, max_term_days, interest_rate, institution_id)
SELECT
  'Prêt Hebdomadaire', 'WEEKLY', 'Prêt remboursable hebdomadairement', 'weekly', 5000, 100000, 60, 180, 12.0,
  (SELECT id FROM institutions WHERE name = 'Demo Institution' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM institutions WHERE name = 'Demo Institution');

INSERT INTO loan_types (name, code, description, payment_frequency, min_amount, max_amount, min_term_days, max_term_days, interest_rate, institution_id)
SELECT
  'Prêt Mensuel', 'MONTHLY', 'Prêt remboursable mensuellement', 'monthly', 10000, 500000, 90, 365, 10.0,
  (SELECT id FROM institutions WHERE name = 'Demo Institution' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM institutions WHERE name = 'Demo Institution');

-- Create a demo institution if none exists
INSERT INTO institutions (name, address, phone, email, license_number)
SELECT 'Demo Institution', '123 Demo Street, Demo City', '+509-1234-5678', 'demo@kredilakay.com', 'LIC-DEMO-001'
WHERE NOT EXISTS (SELECT 1 FROM institutions WHERE name = 'Demo Institution');

-- Insert sample data for testing (optional)
-- Uncomment these lines if you want sample data
/*
-- Sample agent profile
INSERT INTO profiles (id, email, full_name, role, institution_id, commission_rate)
SELECT
  '00000000-0000-0000-0000-000000000001'::uuid,
  'agent@kredilakay.com',
  'Agent Demo',
  'agent',
  id,
  5.0
FROM institutions
WHERE name = 'Demo Institution'
AND NOT EXISTS (SELECT 1 FROM profiles WHERE email = 'agent@kredilakay.com');

-- Sample client
INSERT INTO clients (first_name, last_name, email, phone, national_id, institution_id, agent_id)
SELECT
  'Jean',
  'Pierre',
  'jean.pierre@email.com',
  '+509-9876-5432',
  '123456789',
  i.id,
  p.id
FROM institutions i, profiles p
WHERE i.name = 'Demo Institution'
AND p.email = 'agent@kredilakay.com'
AND NOT EXISTS (SELECT 1 FROM clients WHERE national_id = '123456789');
*/

-- Create function to update loan balance when payment is made
CREATE OR REPLACE FUNCTION update_loan_balance_on_payment()
RETURNS TRIGGER AS $$
BEGIN
  -- Update loan paid amount and remaining balance
  UPDATE loans
  SET
    paid_amount = COALESCE(paid_amount, 0) + NEW.principal_paid + NEW.interest_paid + COALESCE(NEW.penalty_paid, 0),
    remaining_balance = total_amount - (COALESCE(paid_amount, 0) + NEW.principal_paid + NEW.interest_paid + COALESCE(NEW.penalty_paid, 0)),
    updated_at = NOW()
  WHERE id = NEW.loan_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for loan balance updates
CREATE TRIGGER update_loan_balance_on_payment_trigger
  AFTER INSERT ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_loan_balance_on_payment();

-- Create function to generate payment schedule
CREATE OR REPLACE FUNCTION generate_payment_schedule(loan_id uuid)
RETURNS void AS $$
DECLARE
  loan_record RECORD;
  payment_date date;
  installment_amount numeric;
  principal_per_payment numeric;
  interest_per_payment numeric;
  total_installments integer;
BEGIN
  -- Get loan details
  SELECT * INTO loan_record FROM loans WHERE id = loan_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Loan not found';
  END IF;

  -- Calculate number of installments based on frequency
  CASE loan_record.payment_frequency
    WHEN 'daily' THEN total_installments := loan_record.term_days;
    WHEN 'weekly' THEN total_installments := loan_record.term_days / 7;
    WHEN 'biweekly' THEN total_installments := loan_record.term_days / 14;
    ELSE total_installments := loan_record.term_days / 30; -- monthly
  END CASE;

  -- Calculate amounts per installment
  principal_per_payment := loan_record.principal_amount / total_installments;
  interest_per_payment := loan_record.interest_amount / total_installments;
  installment_amount := loan_record.monthly_payment;

  -- Generate payment schedule
  FOR i IN 1..total_installments LOOP
    CASE loan_record.payment_frequency
      WHEN 'daily' THEN payment_date := loan_record.first_payment_date + INTERVAL '1 day' * (i - 1);
      WHEN 'weekly' THEN payment_date := loan_record.first_payment_date + INTERVAL '1 week' * (i - 1);
      WHEN 'biweekly' THEN payment_date := loan_record.first_payment_date + INTERVAL '2 weeks' * (i - 1);
      ELSE payment_date := loan_record.first_payment_date + INTERVAL '1 month' * (i - 1); -- monthly
    END CASE;

    INSERT INTO payment_schedules (
      loan_id,
      installment_number,
      due_date,
      principal_amount,
      interest_amount,
      total_amount
    ) VALUES (
      loan_id,
      i,
      payment_date,
      principal_per_payment,
      interest_per_payment,
      installment_amount
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to send notifications
CREATE OR REPLACE FUNCTION send_notification(
  recipient_id uuid,
  title text,
  message text,
  notification_type text,
  priority text DEFAULT 'medium',
  related_entity_type text DEFAULT NULL,
  related_entity_id uuid DEFAULT NULL,
  action_required boolean DEFAULT false,
  action_url text DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO notifications (
    recipient_id,
    title,
    message,
    type,
    priority,
    related_entity_type,
    related_entity_id,
    action_required,
    action_url
  ) VALUES (
    recipient_id,
    title,
    message,
    notification_type,
    priority,
    related_entity_type,
    related_entity_id,
    action_required,
    action_url
  ) RETURNING id INTO notification_id;

  RETURN notification_id;
END;
$$ LANGUAGE plpgsql;
