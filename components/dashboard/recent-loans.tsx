'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Loan {
  id: string
  client: {
    firstName: string
    lastName: string
  }
  amount: number
  status: 'pending' | 'approved' | 'active' | 'completed' | 'defaulted'
  createdAt: string
}

interface RecentLoansProps {
  loans: Loan[]
}

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  approved: 'Approuvé',
  active: 'Actif',
  completed: 'Terminé',
  defaulted: 'En défaut'
}

const statusVariants: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'destructive'> = {
  pending: 'warning',
  approved: 'secondary',
  active: 'success',
  completed: 'default',
  defaulted: 'destructive'
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  approved: 'bg-blue-100 text-blue-800 border-blue-200',
  active: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-gray-100 text-gray-800 border-gray-200',
  defaulted: 'bg-red-100 text-red-800 border-red-200'
}

export function RecentLoans({ loans }: RecentLoansProps) {
  return (
    <div className="banking-card h-full">
      <div className="banking-card-header">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Prêts Récents</h3>
            <p className="text-sm text-gray-600 mt-1">Derniers prêts créés dans le système</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{loans.length}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {loans.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">Aucun prêt récent</p>
              <p className="text-sm text-gray-400 mt-1">Les nouveaux prêts apparaîtront ici</p>
            </div>
          ) : (
            loans.map((loan) => (
              <div
                key={loan.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {loan.client.firstName.charAt(0)}{loan.client.lastName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {loan.client.firstName} {loan.client.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Créé le {formatDate(loan.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">{formatCurrency(loan.amount)}</p>
                    <p className="text-xs text-gray-500">Montant du prêt</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[loan.status]}`}>
                    {statusLabels[loan.status]}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {loans.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Voir tous les prêts →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
