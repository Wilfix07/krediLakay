'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, Send, Phone, AlertTriangle, CheckCircle } from 'lucide-react'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function PaymentRemindersPage() {
  const overduePayments = [
    {
      id: '1',
      clientName: 'Marie Dupont',
      loanNumber: 'LN-2024-0123',
      amount: 4500,
      dueDate: '2024-01-15',
      daysOverdue: 5,
      lastContact: '2024-01-18',
      priority: 'high'
    },
    {
      id: '2',
      clientName: 'Jean Baptiste',
      loanNumber: 'LN-2024-0124',
      amount: 5200,
      dueDate: '2024-01-12',
      daysOverdue: 8,
      lastContact: '2024-01-16',
      priority: 'medium'
    },
    {
      id: '3',
      clientName: 'Claire Michel',
      loanNumber: 'LN-2024-0125',
      amount: 3800,
      dueDate: '2024-01-10',
      daysOverdue: 10,
      lastContact: '2024-01-14',
      priority: 'high'
    }
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Moyen</Badge>
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Faible</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Rappels de Paiement</h1>
              <p className="text-gray-600">
                Gestion des rappels automatiques pour les paiements en retard
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Total en Retard</p>
                    <p className="banking-stat-value">{overduePayments.length}</p>
                  </div>
                  <Bell className="h-8 w-8 text-red-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Urgents</p>
                    <p className="banking-stat-value">
                      {overduePayments.filter(p => p.priority === 'high').length}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Montant Total</p>
                    <p className="banking-stat-value">
                      {new Intl.NumberFormat('fr-HT', {
                        style: 'currency',
                        currency: 'HTG'
                      }).format(overduePayments.reduce((sum, p) => sum + p.amount, 0))}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Taux de Recouvrement</p>
                    <p className="banking-stat-value">87.3%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </Card>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Paiements en Retard Requerant un Rappel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {overduePayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{payment.clientName}</h4>
                          {getPriorityBadge(payment.priority)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Prêt:</span> {payment.loanNumber}
                          </div>
                          <div>
                            <span className="font-medium">Montant:</span> HTG {payment.amount.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Échéance:</span> {payment.dueDate}
                          </div>
                          <div>
                            <span className="font-medium">Dernier contact:</span> {payment.lastContact}
                          </div>
                        </div>
                        <div className="mt-2">
                          <Badge className="bg-red-100 text-red-800">
                            {payment.daysOverdue} jours de retard
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Appeler
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="h-4 w-4 mr-1" />
                          SMS
                        </Button>
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-1" />
                          Rappel Email
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