export interface CommissionRate {
  minAmount: number
  maxAmount: number
  rate: number // Pourcentage
  fixedAmount?: number // Montant fixe optionnel
}

export interface CommissionCalculation {
  loanAmount: number
  commissionRate: number
  commissionAmount: number
  netAmount: number // Montant après déduction de la commission
  agentCommission: number
  institutionShare: number
}

// Barème de commissions par défaut
export const DEFAULT_COMMISSION_RATES: CommissionRate[] = [
  { minAmount: 0, maxAmount: 50000, rate: 3.0 },
  { minAmount: 50001, maxAmount: 100000, rate: 2.5 },
  { minAmount: 100001, maxAmount: 200000, rate: 2.0 },
  { minAmount: 200001, maxAmount: 500000, rate: 1.5 },
  { minAmount: 500001, maxAmount: Infinity, rate: 1.0 }
]

/**
 * Calcule la commission basée sur le montant du prêt
 */
export function calculateCommission(
  loanAmount: number,
  customRates?: CommissionRate[]
): CommissionCalculation {
  const rates = customRates || DEFAULT_COMMISSION_RATES
  
  // Trouve le taux applicable
  const applicableRate = rates.find(
    rate => loanAmount >= rate.minAmount && loanAmount <= rate.maxAmount
  )
  
  if (!applicableRate) {
    throw new Error('Aucun taux de commission applicable trouvé')
  }
  
  // Calcule la commission
  let commissionAmount = 0
  
  if (applicableRate.fixedAmount) {
    commissionAmount = applicableRate.fixedAmount
  } else {
    commissionAmount = (loanAmount * applicableRate.rate) / 100
  }
  
  // Répartition standard : 60% agent, 40% institution
  const agentCommission = commissionAmount * 0.6
  const institutionShare = commissionAmount * 0.4
  
  return {
    loanAmount,
    commissionRate: applicableRate.rate,
    commissionAmount: Math.round(commissionAmount * 100) / 100,
    netAmount: Math.round((loanAmount - commissionAmount) * 100) / 100,
    agentCommission: Math.round(agentCommission * 100) / 100,
    institutionShare: Math.round(institutionShare * 100) / 100
  }
}

/**
 * Calcule les commissions totales pour un agent sur une période
 */
export function calculateAgentCommissions(
  loans: Array<{
    amount: number
    disbursedAt: string | null
    commissionRate: number
    commissionAmount: number
  }>,
  startDate: Date,
  endDate: Date
): {
  totalLoans: number
  totalLoanAmount: number
  totalCommission: number
  averageCommissionRate: number
} {
  const filteredLoans = loans.filter(loan => {
    if (!loan.disbursedAt) return false
    const disbursedDate = new Date(loan.disbursedAt)
    return disbursedDate >= startDate && disbursedDate <= endDate
  })
  
  const totalLoans = filteredLoans.length
  const totalLoanAmount = filteredLoans.reduce((sum, loan) => sum + loan.amount, 0)
  const totalCommission = filteredLoans.reduce((sum, loan) => sum + loan.commissionAmount, 0)
  const averageCommissionRate = totalLoanAmount > 0 
    ? (totalCommission / totalLoanAmount) * 100 
    : 0
  
  return {
    totalLoans,
    totalLoanAmount: Math.round(totalLoanAmount * 100) / 100,
    totalCommission: Math.round(totalCommission * 100) / 100,
    averageCommissionRate: Math.round(averageCommissionRate * 100) / 100
  }
}

/**
 * Calcule les projections de commission pour un nouveau prêt
 */
export function projectCommission(
  loanAmount: number,
  termMonths: number,
  customRates?: CommissionRate[]
): {
  upfrontCommission: CommissionCalculation
  monthlyProjection: number
  totalProjection: number
} {
  const upfrontCommission = calculateCommission(loanAmount, customRates)
  const monthlyProjection = upfrontCommission.agentCommission / termMonths
  
  return {
    upfrontCommission,
    monthlyProjection: Math.round(monthlyProjection * 100) / 100,
    totalProjection: upfrontCommission.agentCommission
  }
}
