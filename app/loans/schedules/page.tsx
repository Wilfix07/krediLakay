'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function LoanSchedulesPage() {
  const schedules = [
    {
      id: '1',
      clientName: 'Marie Dupont',
      loanNumber: 'LN-2024-0123',
      nextPayment: '2024-02-01',
      amount: 6375,
      status: 'upcoming',
      daysUntilDue: 12
    },
    {
      id: '2',
      clientName: 'Jean Baptiste',
      loanNumber: 'LN-2024-0124',
      nextPayment: '2024-01-25',
      amount: 4800,
      status: 'overdue',
      daysUntilDue: -5
    },
    {
      id: '3',
      clientName: 'Claire Michel',
      loanNumber: 'LN-2024-0125',
      nextPayment: '2024-02-15',
      amount: 5100,
      status: 'upcoming',
      daysUntilDue: 26
    }
  ]

  const getStatusBadge = (status: string, daysUntilDue: number) => {
    if (status === 'overdue') {
      return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />En retard</Badge>
    } else if (daysUntilDue <= 3) {
      return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Urgent</Badge>
    } else {
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />À venir</Badge>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Échéanciers de Prêts</h1>
              <p className="text-gray-600">
                Suivi et gestion des calendriers de remboursement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Paiements du Jour</p>
                    <p className="banking-stat-value">12</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">En Retard</p>
                    <p className="banking-stat-value">3</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Montant Total</p>
                    <p className="banking-stat-value">HTG 16,275</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Taux de Recouvrement</p>
                    <p className="banking-stat-value">94.2%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-emerald-500" />
                </div>
              </Card>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle>Calendrier des Prochains Paiements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{schedule.clientName}</h4>
                          {getStatusBadge(schedule.status, schedule.daysUntilDue)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Prêt:</span> {schedule.loanNumber}
                          </div>
                          <div>
                            <span className="font-medium">Montant:</span> HTG {schedule.amount.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Échéance:</span> {schedule.nextPayment}
                          </div>
                          <div>
                            <span className="font-medium">Jours:</span>
                            <span className={schedule.daysUntilDue < 0 ? 'text-red-600' : schedule.daysUntilDue <= 3 ? 'text-yellow-600' : 'text-green-600'}>
                              {schedule.daysUntilDue < 0 ? `${Math.abs(schedule.daysUntilDue)} en retard` : schedule.daysUntilDue === 0 ? 'Aujourd\'hui' : `Dans ${schedule.daysUntilDue} jours`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Voir Détails
                        </Button>
                        <Button size="sm">
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