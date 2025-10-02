// Complete database seeding script for KrediLakay
// This script inserts comprehensive sample data for testing

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.log('Please check your .env.local file has:')
  console.log('- NEXT_PUBLIC_SUPABASE_URL')
  console.log('- SUPABASE_SERVICE_ROLE_KEY (recommended for seeding)')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function seedDatabase() {
  console.log('🏦 Starting KrediLakay database seeding...')

  try {
    // 1. Create sample institution
    const { data: institution, error: instError } = await supabase
      .from('institutions')
      .insert({
        name: 'KrediLakay Demo Institution',
        address: '123 Demo Street, Port-au-Prince, Haiti',
        phone: '+509-1234-5678',
        email: 'demo@kredilakay.com',
        license_number: 'LIC-DEMO-001',
        registration_number: 'REG-DEMO-001',
        tax_id: 'TAX-DEMO-001',
        website: 'https://kredilakay.com',
        settings: {
          default_interest_rate: 15,
          default_commission_rate: 5,
          max_loan_amount: 500000,
          min_loan_amount: 1000
        }
      })
      .select()
      .single()

    if (instError) {
      console.error('❌ Failed to create institution:', instError.message)
      return
    }

    console.log('✅ Institution created:', institution.name)

    // 2. Create sample users
    const users = [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'admin@kredilakay.com',
        full_name: 'Administrateur Principal',
        role: 'admin',
        institution_id: institution.id,
        employee_id: 'EMP001',
        hire_date: '2024-01-01',
        salary: 50000,
        commission_rate: 0,
        department: 'Administration',
        position: 'Directeur Général'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        email: 'agent@kredilakay.com',
        full_name: 'Agent de Crédit',
        role: 'agent',
        institution_id: institution.id,
        employee_id: 'EMP002',
        hire_date: '2024-01-02',
        salary: 30000,
        commission_rate: 5,
        department: 'Crédit',
        position: 'Agent Senior'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        email: 'cashier@kredilakay.com',
        full_name: 'Caissier Principal',
        role: 'cashier',
        institution_id: institution.id,
        employee_id: 'EMP003',
        hire_date: '2024-01-03',
        salary: 25000,
        commission_rate: 2,
        department: 'Finance',
        position: 'Caissier Principal'
      }
    ]

    const { data: createdUsers, error: usersError } = await supabase
      .from('profiles')
      .upsert(users, { onConflict: 'id' })
      .select()

    if (usersError) {
      console.error('❌ Failed to create users:', usersError.message)
    } else {
      console.log(`✅ Created ${createdUsers.length} users`)
    }

    // 3. Create sample clients
    const clients = [
      {
        first_name: 'Marie',
        last_name: 'Dupont',
        email: 'marie.dupont@email.com',
        phone: '+509-1234-5678',
        address: 'Port-au-Prince, Pétion-Ville',
        date_of_birth: '1985-03-15',
        national_id: 'ID123456789',
        marital_status: 'married',
        employment_status: 'employed',
        employer_name: 'Banque Nationale',
        monthly_income: 45000,
        institution_id: institution.id,
        agent_id: users[1].id,
        kyc_status: 'approved',
        risk_level: 'low',
        credit_score: 750
      },
      {
        first_name: 'Jean',
        last_name: 'Baptiste',
        email: 'jean.baptiste@email.com',
        phone: '+509-2345-6789',
        address: 'Cap-Haïtien, Centre-ville',
        date_of_birth: '1978-08-22',
        national_id: 'ID987654321',
        marital_status: 'married',
        employment_status: 'self_employed',
        employer_name: 'Entreprise individuelle',
        monthly_income: 35000,
        institution_id: institution.id,
        agent_id: users[1].id,
        kyc_status: 'pending',
        risk_level: 'medium',
        credit_score: 680
      },
      {
        first_name: 'Claire',
        last_name: 'Michel',
        email: 'claire.michel@email.com',
        phone: '+509-3456-7890',
        address: 'Gonaïves, Raboteau',
        date_of_birth: '1990-12-05',
        national_id: 'ID456789123',
        marital_status: 'single',
        employment_status: 'employed',
        employer_name: 'Hôpital Général',
        monthly_income: 55000,
        institution_id: institution.id,
        agent_id: users[2].id,
        kyc_status: 'approved',
        risk_level: 'low',
        credit_score: 820
      }
    ]

    const { data: createdClients, error: clientsError } = await supabase
      .from('clients')
      .upsert(clients, { onConflict: 'national_id' })
      .select()

    if (clientsError) {
      console.error('❌ Failed to create clients:', clientsError.message)
    } else {
      console.log(`✅ Created ${createdClients.length} clients`)
    }

    // 4. Create sample loans
    const loans = [
      {
        loan_number: 'LN-2024-0001',
        client_id: createdClients[0].id,
        agent_id: users[1].id,
        institution_id: institution.id,
        loan_type_id: '550e8400-e29b-41d4-a716-446655440100', // This would be a real loan type ID
        amount: 50000,
        interest_rate: 15,
        term_days: 90,
        payment_frequency: 'monthly',
        status: 'active',
        application_date: '2024-01-01',
        principal_amount: 50000,
        interest_amount: 7500,
        total_amount: 57500,
        paid_amount: 10000,
        remaining_balance: 47500,
        commission_rate: 5,
        commission_amount: 2500,
        next_payment_date: '2024-02-01',
        next_payment_amount: 6375,
        risk_rating: 'low'
      },
      {
        loan_number: 'LN-2024-0002',
        client_id: createdClients[1].id,
        agent_id: users[1].id,
        institution_id: institution.id,
        loan_type_id: '550e8400-e29b-41d4-a716-446655440101',
        amount: 75000,
        interest_rate: 12,
        term_days: 180,
        payment_frequency: 'weekly',
        status: 'active',
        application_date: '2024-01-02',
        principal_amount: 75000,
        interest_amount: 9000,
        total_amount: 84000,
        paid_amount: 20000,
        remaining_balance: 64000,
        commission_rate: 4,
        commission_amount: 3000,
        next_payment_date: '2024-01-25',
        next_payment_amount: 4800,
        days_overdue: 5,
        risk_rating: 'medium'
      }
    ]

    const { data: createdLoans, error: loansError } = await supabase
      .from('loans')
      .upsert(loans, { onConflict: 'loan_number' })
      .select()

    if (loansError) {
      console.error('❌ Failed to create loans:', loansError.message)
    } else {
      console.log(`✅ Created ${createdLoans.length} loans`)
    }

    // 5. Create sample payments
    const payments = [
      {
        loan_id: createdLoans[0].id,
        amount: 6375,
        principal_paid: 5000,
        interest_paid: 1375,
        penalty_paid: 0,
        payment_date: '2024-01-20',
        payment_method: 'cash',
        payment_channel: 'cashier',
        reference_number: 'REC-2024-001',
        receipt_number: 'RCP-001',
        agent_id: users[1].id,
        notes: 'Paiement mensuel régulier'
      },
      {
        loan_id: createdLoans[0].id,
        amount: 5200,
        principal_paid: 4000,
        interest_paid: 1200,
        penalty_paid: 0,
        payment_date: '2024-01-19',
        payment_method: 'bank_transfer',
        payment_channel: 'agent',
        reference_number: 'TRF-789123',
        receipt_number: 'RCP-002',
        agent_id: users[1].id,
        notes: 'Virement bancaire automatique'
      },
      {
        loan_id: createdLoans[1].id,
        amount: 5100,
        principal_paid: 3800,
        interest_paid: 1300,
        penalty_paid: 0,
        payment_date: '2024-01-18',
        payment_method: 'mobile_money',
        payment_channel: 'agent',
        reference_number: 'MOB-456789',
        receipt_number: 'RCP-003',
        agent_id: users[1].id,
        notes: 'Paiement via Moncash'
      }
    ]

    const { data: createdPayments, error: paymentsError } = await supabase
      .from('payments')
      .upsert(payments, { onConflict: 'reference_number' })
      .select()

    if (paymentsError) {
      console.error('❌ Failed to create payments:', paymentsError.message)
    } else {
      console.log(`✅ Created ${createdPayments.length} payments`)
    }

    // 6. Create sample expenses
    const expenses = [
      {
        amount: 2500,
        category: 'transport',
        description: 'Transport pour visite client',
        expense_date: '2024-01-20',
        agent_id: users[1].id,
        status: 'approved'
      },
      {
        amount: 1500,
        category: 'office_supplies',
        description: 'Achat de fournitures de bureau',
        expense_date: '2024-01-19',
        agent_id: users[1].id,
        status: 'pending'
      },
      {
        amount: 5000,
        category: 'marketing',
        description: 'Campagne publicitaire locale',
        expense_date: '2024-01-18',
        status: 'approved'
      }
    ]

    // Note: Expenses table may not exist in the migration yet
    // We'll skip this for now as it might cause errors

    console.log('\n📊 Database seeding completed!')
    console.log(`✅ Institution: ${institution.name}`)
    console.log(`✅ Users: ${createdUsers.length}`)
    console.log(`✅ Clients: ${createdClients.length}`)
    console.log(`✅ Loans: ${createdLoans.length}`)
    console.log(`✅ Payments: ${createdPayments.length}`)

    // Verify the database structure
    await verifyDatabase()

  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
    process.exit(1)
  }
}

async function verifyDatabase() {
  console.log('\n🔍 Verifying database structure...')

  const tables = [
    'institutions',
    'loan_types',
    'profiles',
    'clients',
    'loans',
    'payment_schedules',
    'payments',
    'kyc_documents',
    'kyc_verifications',
    'commissions',
    'notifications',
    'reports'
  ]

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })

      if (error) {
        console.log(`❌ Table '${table}': ${error.message}`)
      } else {
        console.log(`✅ Table '${table}': ${data?.count || 0} rows`)
      }
    } catch (err) {
      console.log(`❌ Table '${table}': Verification failed`)
    }
  }

  console.log('\n🎯 Database verification complete!')
}

// Run the seeding
seedDatabase().catch(console.error)
