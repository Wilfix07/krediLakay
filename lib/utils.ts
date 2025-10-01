import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-HT', {
    style: 'currency',
    currency: 'HTG',
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function calculateLoanPayment(
  principal: number,
  annualRate: number,
  termMonths: number
): number {
  const monthlyRate = annualRate / 100 / 12
  const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)
  return Math.round(payment * 100) / 100
}

export function calculateTotalAmount(
  principal: number,
  annualRate: number,
  termMonths: number
): number {
  const monthlyPayment = calculateLoanPayment(principal, annualRate, termMonths)
  return Math.round(monthlyPayment * termMonths * 100) / 100
}

// Loan frequency types
export type LoanFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly'

export type LoanStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'disbursed'
  | 'active'
  | 'completed'
  | 'defaulted'
  | 'written_off'

export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'partially_paid'

export type UserRole = 'super_admin' | 'admin' | 'manager' | 'agent' | 'cashier'

export type KycStatus = 'pending' | 'in_review' | 'approved' | 'rejected'

export type CommissionType = 'origination' | 'monthly' | 'early_payment' | 'performance'

// Calculate payment schedule based on loan type and frequency
export function calculatePaymentSchedule(
  principal: number,
  interestRate: number,
  termDays: number,
  frequency: LoanFrequency,
  firstPaymentDate: Date = new Date()
): Array<{
  installmentNumber: number
  dueDate: Date
  principalAmount: number
  interestAmount: number
  totalAmount: number
}> {
  const totalAmount = principal + (principal * interestRate / 100)
  let totalInstallments: number
  let intervalDays: number

  switch (frequency) {
    case 'daily':
      totalInstallments = termDays
      intervalDays = 1
      break
    case 'weekly':
      totalInstallments = Math.ceil(termDays / 7)
      intervalDays = 7
      break
    case 'biweekly':
      totalInstallments = Math.ceil(termDays / 14)
      intervalDays = 14
      break
    case 'monthly':
      totalInstallments = Math.ceil(termDays / 30)
      intervalDays = 30
      break
    default:
      totalInstallments = Math.ceil(termDays / 30)
      intervalDays = 30
  }

  const principalPerPayment = principal / totalInstallments
  const interestPerPayment = (principal * interestRate / 100) / totalInstallments

  const schedule = []

  for (let i = 1; i <= totalInstallments; i++) {
    const dueDate = new Date(firstPaymentDate)
    dueDate.setDate(dueDate.getDate() + (intervalDays * (i - 1)))

    schedule.push({
      installmentNumber: i,
      dueDate,
      principalAmount: Math.round(principalPerPayment * 100) / 100,
      interestAmount: Math.round(interestPerPayment * 100) / 100,
      totalAmount: Math.round((principalPerPayment + interestPerPayment) * 100) / 100
    })
  }

  return schedule
}

// Format loan frequency for display
export function formatLoanFrequency(frequency: LoanFrequency): string {
  const formats = {
    daily: 'Quotidien',
    weekly: 'Hebdomadaire',
    biweekly: 'Bi-hebdomadaire',
    monthly: 'Mensuel'
  }
  return formats[frequency] || frequency
}

// Calculate days between two dates
export function daysBetween(startDate: Date, endDate: Date): number {
  const timeDiff = endDate.getTime() - startDate.getTime()
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}