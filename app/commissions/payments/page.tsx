'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Clock, DollarSign } from 'lucide-react'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function CommissionPaymentsPage() {
  const commissionPayments = [
    {
      id: '1',
      agentName: 'Jean Claude',
      period: 'Janvier 2024',
      amount: 7500,
      status: 'paid',
      paidDate: '2024-02-01',
      paymentMethod: 'bank_transfer'
    },
    {
      id: '2',
      agentName: 'Marie Claire',
      period: 'Janvier 2024',
      amount: 5625,
      status: 'pending',
      paidDate: null,
      paymentMethod: null
    },
    {
      id: '3',
      agentName: 'Pierre Louis',
      period: 'Janvier 2024',
      amount: 10800,
      status: 'paid',
      paidDate: '2024-02-01',
      paymentMethod: 'cash'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Payé</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Paiements de Commissions</h1>
              <p className="text-gray-600">
                Suivi et gestion des paiements de commissions aux agents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Total Payé</p>
                    <p className="banking-stat-value">HTG 18,300</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">En Attente</p>
                    <p className="banking-stat-value">HTG 5,625</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Commissions du Mois</p>
                    <p className="banking-stat-value">HTG 23,925</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-500" />
                </div>
              </Card>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle>Paiements de Commissions - Janvier 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commissionPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{payment.agentName}</h4>
                          {getStatusBadge(payment.status)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Période:</span> {payment.period}
                          </div>
                          <div>
                            <span className="font-medium">Montant:</span> HTG {payment.amount.toLocaleString()}
                          </div>
                          {payment.paidDate && (
                            <div>
                              <span className="font-medium">Payé le:</span> {payment.paidDate}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {payment.status === 'pending' && (
                          <Button size="sm">
                            Marquer comme Payé
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
