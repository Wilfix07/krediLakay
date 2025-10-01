'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react'

const mockUser = {
  name: 'Auditeur',
  role: 'admin'
}

export default function AuditPage() {
  const auditLogs = [
    {
      id: '1',
      timestamp: '2024-01-20T10:30:00Z',
      user: 'admin@kredilakay.com',
      action: 'Utilisateur créé',
      entity: 'User',
      entityId: 'user_123',
      status: 'success',
      ip: '192.168.1.100',
      details: 'Création du compte utilisateur pour Jean Dupont'
    },
    {
      id: '2',
      timestamp: '2024-01-20T09:15:00Z',
      user: 'agent@kredilakay.com',
      action: 'Prêt approuvé',
      entity: 'Loan',
      entityId: 'loan_456',
      status: 'success',
      ip: '192.168.1.101',
      details: 'Approbation du prêt #LN-2024-0123'
    },
    {
      id: '3',
      timestamp: '2024-01-19T16:45:00Z',
      user: 'system',
      action: 'Sauvegarde automatique',
      entity: 'System',
      entityId: 'backup_789',
      status: 'success',
      ip: 'localhost',
      details: 'Sauvegarde quotidienne exécutée avec succès'
    },
    {
      id: '4',
      timestamp: '2024-01-19T14:20:00Z',
      user: 'cashier@kredilakay.com',
      action: 'Paiement enregistré',
      entity: 'Payment',
      entityId: 'payment_321',
      status: 'warning',
      ip: '192.168.1.102',
      details: 'Paiement enregistré avec retard de 2 jours'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Succès</Badge>
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="h-3 w-3 mr-1" />Avertissement</Badge>
      case 'error':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />Erreur</Badge>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit & Logs</h1>
              <p className="text-gray-600">
                Suivi complet des activités système et traçabilité des opérations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Actions du Jour</p>
                    <p className="banking-stat-value">247</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Actions Réussies</p>
                    <p className="banking-stat-value">98.2%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Avertissements</p>
                    <p className="banking-stat-value">4</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Sécurité</p>
                    <p className="banking-stat-value">OK</p>
                  </div>
                  <Shield className="h-8 w-8 text-emerald-500" />
                </div>
              </Card>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle>Logs d'Activité Système</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Entité</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Détails</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-sm">
                          {new Date(log.timestamp).toLocaleString('fr-HT')}
                        </TableCell>
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.entity}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                        <TableCell className="text-sm font-mono">{log.ip}</TableCell>
                        <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                          {log.details}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
