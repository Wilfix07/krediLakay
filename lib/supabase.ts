import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create Supabase client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabase)
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          role: 'admin' | 'agent' | 'manager'
          institution_id: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'agent' | 'manager'
          institution_id?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'agent' | 'manager'
          institution_id?: string | null
          avatar_url?: string | null
        }
      }
      institutions: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          address: string | null
          phone: string | null
          email: string | null
          license_number: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          address?: string | null
          phone?: string | null
          email?: string | null
          license_number?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          address?: string | null
          phone?: string | null
          email?: string | null
          license_number?: string | null
        }
      }
      clients: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          first_name: string
          last_name: string
          email: string | null
          phone: string
          address: string | null
          date_of_birth: string | null
          national_id: string | null
          institution_id: string
          agent_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name: string
          last_name: string
          email?: string | null
          phone: string
          address?: string | null
          date_of_birth?: string | null
          national_id?: string | null
          institution_id: string
          agent_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string
          address?: string | null
          date_of_birth?: string | null
          national_id?: string | null
          institution_id?: string
          agent_id?: string
        }
      }
      loans: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          client_id: string
          agent_id: string
          institution_id: string
          amount: number
          interest_rate: number
          term_months: number
          status: 'pending' | 'approved' | 'active' | 'completed' | 'defaulted'
          disbursed_at: string | null
          maturity_date: string | null
          monthly_payment: number
          total_amount: number
          remaining_balance: number
          commission_rate: number
          commission_amount: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          client_id: string
          agent_id: string
          institution_id: string
          amount: number
          interest_rate: number
          term_months: number
          status?: 'pending' | 'approved' | 'active' | 'completed' | 'defaulted'
          disbursed_at?: string | null
          maturity_date?: string | null
          monthly_payment: number
          total_amount: number
          remaining_balance: number
          commission_rate: number
          commission_amount: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          client_id?: string
          agent_id?: string
          institution_id?: string
          amount?: number
          interest_rate?: number
          term_months?: number
          status?: 'pending' | 'approved' | 'active' | 'completed' | 'defaulted'
          disbursed_at?: string | null
          maturity_date?: string | null
          monthly_payment?: number
          total_amount?: number
          remaining_balance?: number
          commission_rate?: number
          commission_amount?: number
        }
      }
      payments: {
        Row: {
          id: string
          created_at: string
          loan_id: string
          amount: number
          payment_date: string
          payment_method: 'cash' | 'bank_transfer' | 'mobile_money'
          reference_number: string | null
          notes: string | null
          agent_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          loan_id: string
          amount: number
          payment_date: string
          payment_method: 'cash' | 'bank_transfer' | 'mobile_money'
          reference_number?: string | null
          notes?: string | null
          agent_id: string
        }
        Update: {
          id?: string
          created_at?: string
          loan_id?: string
          amount?: number
          payment_date?: string
          payment_method?: 'cash' | 'bank_transfer' | 'mobile_money'
          reference_number?: string | null
          notes?: string | null
          agent_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
