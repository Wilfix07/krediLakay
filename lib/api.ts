// API functions for KrediLakay loan management system

import { supabase, isSupabaseConfigured } from './supabase'
import type {
  Institution,
  LoanType,
  Profile,
  Client,
  Loan,
  Payment,
  PaymentSchedule,
  KycDocument,
  KycVerification,
  Commission,
  Notification,
  Report,
  CreateLoanTypeData,
  CreateClientData,
  CreateLoanData,
  ApiResponse,
  PaginatedResponse,
  DashboardStats,
  LoanSummary,
  PaymentSummary,
  LoanFilters,
  ClientFilters,
  PaymentFilters
} from './types'

// Generic API response wrapper
async function handleApiResponse<T>(response: any): Promise<ApiResponse<T>> {
  if (response.error) {
    return { error: response.error.message || 'An error occurred' }
  }
  return { data: response.data }
}

// Check if Supabase is configured
function checkSupabaseConfigured(): boolean {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Please check your environment variables.')
    return false
  }
  return true
}

// Institution API
export const institutionApi = {
  async getCurrent(): Promise<ApiResponse<Institution>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const { data: { user } } = await supabase!.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const { data, error } = await supabase!
      .from('profiles')
      .select('institution_id')
      .eq('id', user.id)
      .single()

    if (error || !data?.institution_id) {
      return { error: 'Institution not found' }
    }

    return await this.getById(data.institution_id)
  },

  async getById(id: string): Promise<ApiResponse<Institution>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!!
      .from('institutions')
      .select('*')
      .eq('id', id)
      .single()

    return handleApiResponse<Institution>(response)
  },

  async update(id: string, data: Partial<Institution>): Promise<ApiResponse<Institution>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!!
      .from('institutions')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    return handleApiResponse<Institution>(response)
  }
}

// Loan Types API
export const loanTypesApi = {
  async getAll(): Promise<ApiResponse<LoanType[]>> {
    const institution = await institutionApi.getCurrent()
    if (institution.error) return { error: institution.error }

    const response = await supabase!
      .from('loan_types')
      .select('*')
      .eq('institution_id', institution.data!.id)
      .eq('is_active', true)
      .order('name')

    return handleApiResponse<LoanType[]>(response)
  },

  async getById(id: string): Promise<ApiResponse<LoanType>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('loan_types')
      .select('*')
      .eq('id', id)
      .single()

    return handleApiResponse<LoanType>(response)
  },

  async create(data: CreateLoanTypeData): Promise<ApiResponse<LoanType>> {
    const institution = await institutionApi.getCurrent()
    if (institution.error) return { error: institution.error }

    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('loan_types')
      .insert({
        ...data,
        institution_id: institution.data!.id
      })
      .select()
      .single()

    return handleApiResponse<LoanType>(response)
  },

  async update(id: string, data: Partial<CreateLoanTypeData>): Promise<ApiResponse<LoanType>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('loan_types')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    return handleApiResponse<LoanType>(response)
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('loan_types')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id)

    return handleApiResponse<void>(response)
  }
}

// Clients API
export const clientsApi = {
  async getAll(filters?: ClientFilters): Promise<ApiResponse<Client[]>> {
    const institution = await institutionApi.getCurrent()
    if (institution.error) return { error: institution.error }

    let query = supabase!
      .from('clients')
      .select('*')
      .eq('institution_id', institution.data!.id)

    if (filters?.kyc_status?.length) {
      query = query.in('kyc_status', filters.kyc_status)
    }

    if (filters?.risk_level?.length) {
      query = query.in('risk_level', filters.risk_level)
    }

    if (filters?.agent_id) {
      query = query.eq('agent_id', filters.agent_id)
    }

    if (filters?.search) {
      query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`)
    }

    const response = await query.order('created_at', { ascending: false })
    return handleApiResponse<Client[]>(response)
  },

  async getById(id: string): Promise<ApiResponse<Client>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('clients')
      .select('*')
      .eq('id', id)
      .single()

    return handleApiResponse<Client>(response)
  },

  async create(data: CreateClientData): Promise<ApiResponse<Client>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const { data: { user } } = await supabase!.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const institution = await institutionApi.getCurrent()
    if (institution.error) return { error: institution.error }

    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('clients')
      .insert({
        ...data,
        institution_id: institution.data!.id,
        agent_id: user.id
      })
      .select()
      .single()

    return handleApiResponse<Client>(response)
  },

  async update(id: string, data: Partial<CreateClientData>): Promise<ApiResponse<Client>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('clients')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    return handleApiResponse<Client>(response)
  }
}

// Loans API
export const loansApi = {
  async getAll(filters?: LoanFilters): Promise<ApiResponse<Loan[]>> {
    const institution = await institutionApi.getCurrent()
    if (institution.error) return { error: institution.error }

    let query = supabase!
      .from('loans')
      .select(`
        *,
        client:clients(first_name, last_name),
        loan_type:loan_types(name, payment_frequency)
      `)
      .eq('institution_id', institution.data!.id)

    if (filters?.status?.length) {
      query = query.in('status', filters.status)
    }

    if (filters?.payment_frequency?.length) {
      query = query.in('payment_frequency', filters.payment_frequency)
    }

    if (filters?.agent_id) {
      query = query.eq('agent_id', filters.agent_id)
    }

    if (filters?.client_id) {
      query = query.eq('client_id', filters.client_id)
    }

    if (filters?.date_from) {
      query = query.gte('created_at', filters.date_from)
    }

    if (filters?.date_to) {
      query = query.lte('created_at', filters.date_to)
    }

    if (filters?.amount_min) {
      query = query.gte('amount', filters.amount_min)
    }

    if (filters?.amount_max) {
      query = query.lte('amount', filters.amount_max)
    }

    const response = await query.order('created_at', { ascending: false })
    return handleApiResponse<Loan[]>(response)
  },

  async getById(id: string): Promise<ApiResponse<Loan>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('loans')
      .select(`
        *,
        client:clients(*),
        loan_type:loan_types(*),
        payment_schedules(*)
      `)
      .eq('id', id)
      .single()

    return handleApiResponse<Loan>(response)
  },

  async create(data: CreateLoanData): Promise<ApiResponse<Loan>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const { data: { user } } = await supabase!.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const institution = await institutionApi.getCurrent()
    if (institution.error) return { error: institution.error }

    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('loans')
      .insert({
        ...data,
        institution_id: institution.data!.id,
        agent_id: user.id,
        status: 'draft'
      })
      .select()
      .single()

    return handleApiResponse<Loan>(response)
  },

  async updateStatus(id: string, status: string, notes?: string): Promise<ApiResponse<Loan>> {
    const updateData: any = { status, updated_at: new Date().toISOString() }

    if (notes) updateData.notes = notes

    if (status === 'approved') {
      updateData.approved_date = new Date().toISOString()
    } else if (status === 'disbursed') {
      updateData.disbursed_date = new Date().toISOString()
    }

    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('loans')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    return handleApiResponse<Loan>(response)
  },

  async generateSchedule(loanId: string): Promise<ApiResponse<void>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const { error } = await supabase!.rpc('generate_payment_schedule', {
      loan_id: loanId
    })

    if (error) return { error: error.message }
    return { data: undefined }
  }
}

// Payment Schedules API
export const paymentSchedulesApi = {
  async getByLoanId(loanId: string): Promise<ApiResponse<PaymentSchedule[]>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('payment_schedules')
      .select('*')
      .eq('loan_id', loanId)
      .order('installment_number')

    return handleApiResponse<PaymentSchedule[]>(response)
  }
}

// Payments API
export const paymentsApi = {
  async getAll(filters?: PaymentFilters): Promise<ApiResponse<Payment[]>> {
    const institution = await institutionApi.getCurrent()
    if (institution.error) return { error: institution.error }

    // Get loan IDs for institution first
    const { data: loanIds } = await supabase!
      .from('loans')
      .select('id')
      .eq('institution_id', institution.data!.id)

    if (!loanIds || loanIds.length === 0) {
      return { data: [] }
    }

    let query = supabase!
      .from('payments')
      .select(`
        *,
        loan:loans(loan_number, client:clients(first_name, last_name))
      `)
      .in('loan_id', loanIds.map(l => l.id))

    if (filters?.payment_method?.length) {
      query = query.in('payment_method', filters.payment_method)
    }

    if (filters?.payment_channel?.length) {
      query = query.in('payment_channel', filters.payment_channel)
    }

    if (filters?.agent_id) {
      query = query.eq('agent_id', filters.agent_id)
    }

    if (filters?.date_from) {
      query = query.gte('payment_date', filters.date_from)
    }

    if (filters?.date_to) {
      query = query.lte('payment_date', filters.date_to)
    }

    if (filters?.amount_min) {
      query = query.gte('amount', filters.amount_min)
    }

    if (filters?.amount_max) {
      query = query.lte('amount', filters.amount_max)
    }

    const response = await query.order('created_at', { ascending: false })
    return handleApiResponse<Payment[]>(response)
  },

  async create(data: {
    loan_id: string
    payment_schedule_id?: string
    amount: number
    principal_paid: number
    interest_paid: number
    penalty_paid?: number
    payment_date: string
    payment_method: string
    payment_channel: string
    reference_number?: string
    notes?: string
  }): Promise<ApiResponse<Payment>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const { data: { user } } = await supabase!.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('payments')
      .insert({
        ...data,
        agent_id: user.id
      })
      .select()
      .single()

    return handleApiResponse<Payment>(response)
  }
}

// Dashboard API
export const dashboardApi = {
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    const institution = await institutionApi.getCurrent()
    if (institution.error) return { error: institution.error }

    const { data, error } = await supabase!
      .rpc('get_dashboard_stats', {
        institution_id: institution.data!.id
      })

    if (error) return { error: error.message }
    return { data: data as DashboardStats }
  },

  async getRecentLoans(limit = 10): Promise<ApiResponse<LoanSummary[]>> {
    const institution = await institutionApi.getCurrent()
    if (institution.error) return { error: institution.error }

    const { data, error } = await supabase!
      .rpc('get_recent_loans', {
        institution_id: institution.data!.id,
        limit_count: limit
      })

    if (error) return { error: error.message }
    return { data: data as LoanSummary[] }
  },

  async getRecentPayments(limit = 10): Promise<ApiResponse<PaymentSummary[]>> {
    const institution = await institutionApi.getCurrent()
    if (institution.error) return { error: institution.error }

    const { data, error } = await supabase
      .rpc('get_recent_payments', {
        institution_id: institution.data!.id,
        limit_count: limit
      })

    if (error) return { error: error.message }
    return { data: data as PaymentSummary[] }
  }
}

// Notifications API
export const notificationsApi = {
  async getAll(): Promise<ApiResponse<Notification[]>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const { data: { user } } = await supabase!.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('notifications')
      .select('*')
      .eq('recipient_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    return handleApiResponse<Notification[]>(response)
  },

  async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    return handleApiResponse<Notification>(response)
  },

  async markAllAsRead(): Promise<ApiResponse<void>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const { data: { user } } = await supabase!.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('notifications')
      .update({
        is_read: true,
        read_at: new Date().toISOString()
      })
      .eq('recipient_id', user.id)
      .eq('is_read', false)

    return handleApiResponse<void>(response)
  }
}

// KYC API
export const kycApi = {
  async uploadDocument(data: {
    client_id: string
    document_type: string
    file: File
  }): Promise<ApiResponse<KycDocument>> {
    // This would typically upload to Supabase Storage first
    // then create the database record
    return { error: 'Not implemented' }
  },

  async getClientDocuments(clientId: string): Promise<ApiResponse<KycDocument[]>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('kyc_documents')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })

    return handleApiResponse<KycDocument[]>(response)
  }
}

// Reports API
export const reportsApi = {
  async generateReport(data: {
    title: string
    report_type: string
    parameters: Record<string, any>
  }): Promise<ApiResponse<Report>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const { data: { user } } = await supabase!.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const institution = await institutionApi.getCurrent()
    if (institution.error) return { error: institution.error }

    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('reports')
      .insert({
        ...data,
        generated_by: user.id,
        institution_id: institution.data!.id
      })
      .select()
      .single()

    return handleApiResponse<Report>(response)
  },

  async getAll(): Promise<ApiResponse<Report[]>> {
    const institution = await institutionApi.getCurrent()
    if (institution.error) return { error: institution.error }

    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const response = await supabase!
      .from('reports')
      .select('*')
      .eq('institution_id', institution.data!.id)
      .order('created_at', { ascending: false })

    return handleApiResponse<Report[]>(response)
  }
}

// Commission API
export const commissionsApi = {
  async getAgentCommissions(agentId?: string): Promise<ApiResponse<Commission[]>> {
    if (!checkSupabaseConfigured()) return { error: 'Supabase not configured' }

    const { data: { user } } = await supabase!.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    let query = supabase!
      .from('commissions')
      .select(`
        *,
        loan:loans(loan_number, amount, client:clients(first_name, last_name))
      `)

    if (agentId) {
      query = query.eq('agent_id', agentId)
    } else {
      query = query.eq('agent_id', user.id)
    }

    const response = await query.order('created_at', { ascending: false })
    return handleApiResponse<Commission[]>(response)
  }
}
