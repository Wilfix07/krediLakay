// Seed script for payments table in KrediLakay database
// This script inserts sample payment data for testing

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

async function seedPayments() {
  console.log('💰 Seeding payments table...')

  try {
    // Sample payments data
    const payments = [
      {
        loan_id: '550e8400-e29b-41d4-a716-446655440000', // This would be a real loan ID
        amount: 6375,
        principal_paid: 5000,
        interest_paid: 1375,
        penalty_paid: 0,
        payment_date: '2024-01-20',
        payment_method: 'cash',
        payment_channel: 'cashier',
        reference_number: 'REC-2024-001',
        receipt_number: 'RCP-001',
        agent_id: '550e8400-e29b-41d4-a716-446655440001', // This would be a real agent ID
        notes: 'Paiement mensuel régulier'
      },
      {
        loan_id: '550e8400-e29b-41d4-a716-446655440001',
        amount: 5200,
        principal_paid: 4000,
        interest_paid: 1200,
        penalty_paid: 0,
        payment_date: '2024-01-19',
        payment_method: 'bank_transfer',
        payment_channel: 'agent',
        reference_number: 'TRF-789123',
        receipt_number: 'RCP-002',
        agent_id: '550e8400-e29b-41d4-a716-446655440001',
        notes: 'Virement bancaire automatique'
      },
      {
        loan_id: '550e8400-e29b-41d4-a716-446655440002',
        amount: 5100,
        principal_paid: 3800,
        interest_paid: 1300,
        penalty_paid: 0,
        payment_date: '2024-01-18',
        payment_method: 'mobile_money',
        payment_channel: 'agent',
        reference_number: 'MOB-456789',
        receipt_number: 'RCP-003',
        agent_id: '550e8400-e29b-41d4-a716-446655440002',
        notes: 'Paiement via Moncash'
      },
      {
        loan_id: '550e8400-e29b-41d4-a716-446655440000',
        amount: 6375,
        principal_paid: 5000,
        interest_paid: 1375,
        penalty_paid: 500,
        payment_date: '2024-01-15',
        payment_method: 'cash',
        payment_channel: 'cashier',
        reference_number: 'REC-2024-004',
        receipt_number: 'RCP-004',
        agent_id: '550e8400-e29b-41d4-a716-446655440001',
        notes: 'Paiement avec pénalité de retard'
      }
    ]

    console.log(`📝 Inserting ${payments.length} payments...`)

    for (const payment of payments) {
      const { data, error } = await supabase
        .from('payments')
        .insert({
          ...payment,
          created_at: new Date().toISOString(),
          is_reversal: false
        })
        .select()

      if (error) {
        console.error(`❌ Failed to insert payment:`, error.message)
      } else {
        console.log(`✅ Payment inserted: ${payment.reference_number} - HTG ${payment.amount}`)
      }
    }

    console.log('\n📊 Payment seeding completed!')

    // Verify the data
    const { data: insertedPayments, error: fetchError } = await supabase
      .from('payments')
      .select('count')
      .single()

    if (fetchError) {
      console.error('❌ Failed to verify payments:', fetchError.message)
    } else {
      console.log(`✅ Total payments in database: ${insertedPayments.count}`)
    }

  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
    process.exit(1)
  }
}

// Run the seeding
seedPayments()
