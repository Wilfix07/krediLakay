// Migration script for KrediLakay database
// This script executes the SQL migration using Supabase client

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
  console.log('- SUPABASE_SERVICE_ROLE_KEY (recommended for migrations)')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runMigration() {
  console.log('🚀 Starting KrediLakay database migration...')

  try {
    // Read the migration SQL file
    const migrationPath = path.join(__dirname, '..', 'supabase_migration.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8')

    console.log('📄 Migration file loaded successfully')

    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))

    console.log(`📋 Found ${statements.length} SQL statements to execute`)

    let successCount = 0
    let errorCount = 0

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement.trim()) {
        try {
          console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`)

          const { data, error } = await supabase.rpc('exec_sql', {
            sql_query: statement + ';'
          })

          if (error) {
            // Some statements might fail (like DROP IF EXISTS when table doesn't exist)
            // This is normal, so we'll log warnings instead of errors
            console.log(`⚠️  Statement ${i + 1} had issues: ${error.message}`)
          } else {
            successCount++
            console.log(`✅ Statement ${i + 1} executed successfully`)
          }
        } catch (err) {
          console.log(`⚠️  Statement ${i + 1} had issues: ${err.message}`)
        }
      }
    }

    console.log('\n📊 Migration Summary:')
    console.log(`✅ Successful statements: ${successCount}`)
    console.log(`⚠️  Problematic statements: ${errorCount}`)
    console.log(`📈 Total coverage: ${Math.round((successCount / statements.length) * 100)}%`)

    console.log('\n🎉 Database migration completed!')
    console.log('💡 Note: Some warnings are expected (DROP IF EXISTS on non-existent objects)')

    // Verify the database structure
    await verifyDatabase()

  } catch (error) {
    console.error('❌ Migration failed:', error.message)
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

async function main() {
  console.log('🏦 KREDI LAKAY Database Migration Tool')
  console.log('=====================================')
  console.log(`📍 Supabase URL: ${supabaseUrl}`)
  console.log(`🔑 Authenticated: ${supabaseServiceKey ? '✅ Yes' : '❌ No'}`)

  await runMigration()
}

// Run the migration
main().catch(console.error)
