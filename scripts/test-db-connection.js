// Simple database connection test script
const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  console.log('Please check your .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🔍 Testing Supabase connection...')

  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('institutions')
      .select('count')
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      throw error
    }

    console.log('✅ Supabase connection successful')

    // Test if tables exist
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

    console.log('📋 Checking tables...')

    for (const table of tables) {
      const { data: tableData, error: tableError } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })

      if (tableError) {
        console.log(`❌ Table '${table}': ${tableError.message}`)
      } else {
        console.log(`✅ Table '${table}': ${tableData?.count || 0} rows`)
      }
    }

    console.log('🎉 Database setup verification complete!')

  } catch (error) {
    console.error('❌ Database connection test failed:', error.message)
    console.log('💡 Make sure to run the SQL migration in Supabase first')
    process.exit(1)
  }
}

testConnection()
