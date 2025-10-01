'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, Send, Phone } from 'lucide-react'

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
      lastContact: '2024-01-18'
    },
    {
      id: '2',
      clientName: 'Jean Baptiste',
      loanNumber: 'LN-2024-0124',
      amount: 5200,
      dueDate: '2024-01-12',
      daysOverdue: 8,
      lastContact: '2024-01-16'
    }
  ]

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

            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Paiements en Retard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {overduePayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{payment.clientName}</h4>
                          <Badge className="bg-red-100 text-red-800">
                            {payment.daysOverdue} jours de retard
                          </Badge>
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
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Appeler
                        </Button>
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-1" />
                          Envoyer Rappel
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
