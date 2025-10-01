'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatCurrency, formatDate } from '@/lib/utils'
import { 
  Download, 
  FileText, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Calendar,
  Filter,
  Eye
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts'

const mockMonthlyData = [
  { month: 'Jan', loans: 45, amount: 2250000, commissions: 56250 },
  { month: 'Fév', loans: 52, amount: 2600000, commissions: 65000 },
  { month: 'Mar', loans: 48, amount: 2400000, commissions: 60000 },
  { month: 'Avr', loans: 58, amount: 2900000, commissions: 72500 },
  { month: 'Mai', loans: 63, amount: 3150000, commissions: 78750 },
  { month: 'Jun', loans: 55, amount: 2750000, commissions: 68750 }
]

const mockPortfolioData = [
  { name: 'Prêts Actifs', value: 65, color: '#3B82F6' },
  { name: 'Prêts Terminés', value: 28, color: '#10B981' },
  { name: 'En Retard', value: 5, color: '#EF4444' },
  { name: 'En Défaut', value: 2, color: '#6B7280' }
]

const mockReports = [
  {
    id: 1,
    name: 'Rapport Mensuel Janvier 2024',
    type: 'monthly',
    createdAt: '2024-02-01',
    status: 'completed',
    fileSize: '2.4 MB'
  },
  {
    id: 2,
    name: 'Analyse des Commissions Q1 2024',
    type: 'commission',
    createdAt: '2024-01-31',
    status: 'completed',
    fileSize: '1.8 MB'
  },
  {
    id: 3,
    name: 'Portfolio de Prêts - Vue d\'ensemble',
    type: 'portfolio',
    createdAt: '2024-01-30',
    status: 'completed',
    fileSize: '3.2 MB'
  }
]

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={mockUser} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* En-tête */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Rapports Financiers</h1>
                <p className="text-gray-600 mt-1">
                  Générez et consultez vos rapports d'activité
                </p>
              </div>
              <Button className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Nouveau Rapport</span>
              </Button>
            </div>

            {/* Générateur de rapport */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Générateur de Rapport</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Type de rapport</Label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une période" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Mensuel</SelectItem>
                        <SelectItem value="quarterly">Trimestriel</SelectItem>
                        <SelectItem value="annual">Annuel</SelectItem>
                        <SelectItem value="custom">Personnalisé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date de début</Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date de fin</Label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>&nbsp;</Label>
                    <Button className="w-full flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Générer</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Graphiques et métriques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Évolution mensuelle */}
              <Card>
                <CardHeader>
                  <CardTitle>Évolution Mensuelle des Prêts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockMonthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => {
                            if (name === 'loans') return [value, 'Prêts']
                            if (name === 'amount') return [formatCurrency(value as number), 'Montant']
                            if (name === 'commissions') return [formatCurrency(value as number), 'Commissions']
                            return [value, name]
                          }}
                        />
                        <Bar dataKey="loans" fill="#3B82F6" name="loans" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Répartition du portfolio */}
              <Card>
                <CardHeader>
                  <CardTitle>Répartition du Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <RechartsPieChart data={mockPortfolioData} cx="50%" cy="50%" outerRadius={80}>
                          {mockPortfolioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                        <Tooltip formatter={(value) => [`${value}%`, 'Pourcentage']} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {mockPortfolioData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Métriques clés */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Revenus ce Mois
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(456750)}</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15.3% vs mois dernier
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Nouveaux Clients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">34</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8.7% vs mois dernier
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Taux de Recouvrement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2.1% vs mois dernier
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Prêts en Défaut
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.3%</div>
                  <div className="flex items-center text-xs text-red-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                    -0.5% vs mois dernier
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Historique des rapports */}
            <Card>
              <CardHeader>
                <CardTitle>Rapports Générés</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom du Rapport</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date de Création</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Taille</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>
                          <span className="capitalize">{report.type}</span>
                        </TableCell>
                        <TableCell>{formatDate(report.createdAt)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            report.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {report.status === 'completed' ? 'Terminé' : 'En cours'}
                          </span>
                        </TableCell>
                        <TableCell>{report.fileSize}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
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
