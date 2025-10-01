'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Eye, Search } from 'lucide-react'

const mockUser = {
  name: 'Caissier Principal',
  role: 'cashier'
}

export default function PaymentReceiptsPage() {
  const receipts = [
    {
      id: '1',
      receiptNumber: 'RCP-2024-001',
      clientName: 'Marie Dupont',
      loanNumber: 'LN-2024-0123',
      amount: 4500,
      paymentDate: '2024-01-20',
      paymentMethod: 'cash',
      status: 'generated'
    },
    {
      id: '2',
      receiptNumber: 'RCP-2024-002',
      clientName: 'Jean Baptiste',
      loanNumber: 'LN-2024-0124',
      amount: 5200,
      paymentDate: '2024-01-19',
      paymentMethod: 'bank_transfer',
      status: 'sent'
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Reçus de Paiement</h1>
              <p className="text-gray-600">
                Gestion et téléchargement des reçus de paiement
              </p>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle>Reçus Générés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {receipts.map((receipt) => (
                    <div key={receipt.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{receipt.receiptNumber}</h4>
                          <Badge variant="outline">{receipt.clientName}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Prêt:</span> {receipt.loanNumber}
                          </div>
                          <div>
                            <span className="font-medium">Montant:</span> HTG {receipt.amount.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {receipt.paymentDate}
                          </div>
                          <div>
                            <span className="font-medium">Méthode:</span> {receipt.paymentMethod}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Aperçu
                        </Button>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Télécharger
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
