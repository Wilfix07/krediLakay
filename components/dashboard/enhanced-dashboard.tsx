'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Activity,
  PieChart as PieChartIcon
} from 'lucide-react'

interface DashboardData {
  stats: {
    totalLoans: number
    totalAmount: number
    totalClients: number
    activeLoans: number
    totalPayments: number
    overdueLoans: number
    collectionRate: number
    averageLoanSize: number
  }
  chartData: {
    monthlyTrends: Array<{
      month: string
      loans: number
      payments: number
      disbursements: number
    }>
    agentPerformance: Array<{
      agent: string
      loans: number
      collections: number
      target: number
    }>
    loanDistribution: Array<{
      name: string
      value: number
      color: string
    }>
    paymentMethods: Array<{
      method: string
      count: number
      amount: number
    }>
  }
}

export function EnhancedDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [timeRange, setTimeRange] = useState('30d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [timeRange])

  const loadDashboardData = async () => {
    setLoading(true)

    // Simulate API call with mock data
    const mockData: DashboardData = {
      stats: {
        totalLoans: 1247,
        totalAmount: 12450000,
        totalClients: 892,
        activeLoans: 634,
        totalPayments: 8900000,
        overdueLoans: 23,
        collectionRate: 94.2,
        averageLoanSize: 9850
      },
      chartData: {
        monthlyTrends: [
          { month: 'Jan', loans: 45, payments: 38000, disbursements: 42000 },
          { month: 'Fév', payments: 42000, disbursements: 45000, loans: 52 },
          { month: 'Mar', payments: 48000, disbursements: 52000, loans: 48 },
          { month: 'Avr', payments: 52000, disbursements: 48000, loans: 55 },
          { month: 'Mai', payments: 58000, disbursements: 61000, loans: 61 },
          { month: 'Jun', payments: 62000, disbursements: 59000, loans: 58 }
        ],
        agentPerformance: [
          { agent: 'Jean Claude', loans: 45, collections: 42000, target: 50000 },
          { agent: 'Marie Claire', loans: 38, collections: 38000, target: 45000 },
          { agent: 'Pierre Louis', loans: 52, collections: 51000, target: 55000 },
          { agent: 'Sophie Martin', loans: 41, collections: 39000, target: 42000 },
          { agent: 'Luc Dubois', loans: 35, collections: 33000, target: 38000 }
        ],
        loanDistribution: [
          { name: 'Prêts Actifs', value: 634, color: '#3b82f6' },
          { name: 'Prêts en Attente', value: 156, color: '#f59e0b' },
          { name: 'Prêts Terminés', value: 457, color: '#10b981' }
        ],
        paymentMethods: [
          { method: 'Espèces', count: 245, amount: 1850000 },
          { method: 'Virement', count: 189, amount: 1420000 },
          { method: 'Mobile Money', count: 156, amount: 1180000 },
          { method: 'Chèque', count: 67, amount: 520000 }
        ]
      }
    }

    setTimeout(() => {
      setData(mockData)
      setLoading(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tableau de Bord Analytique</h2>
          <p className="text-gray-600">Vue d'ensemble des performances et tendances</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 jours</SelectItem>
            <SelectItem value="30d">30 jours</SelectItem>
            <SelectItem value="90d">90 jours</SelectItem>
            <SelectItem value="1y">1 an</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Prêts Actifs</p>
              <p className="banking-stat-value">{data.stats.activeLoans.toLocaleString()}</p>
            </div>
            <CreditCard className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+8.2%</span>
            <span className="text-gray-500 ml-1">ce mois</span>
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
                }).format(data.stats.totalAmount)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+12.5%</span>
            <span className="text-gray-500 ml-1">ce mois</span>
          </div>
        </Card>

        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Taux de Recouvrement</p>
              <p className="banking-stat-value">{data.stats.collectionRate}%</p>
            </div>
            <Target className="h-8 w-8 text-purple-500" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">Excellent</span>
          </div>
        </Card>

        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Prêts en Retard</p>
              <p className="banking-stat-value">{data.stats.overdueLoans}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-red-600">-2.1%</span>
            <span className="text-gray-500 ml-1">ce mois</span>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card className="banking-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Tendances Mensuelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.chartData.monthlyTrends}>
                <defs>
                  <linearGradient id="loansGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="paymentsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    new Intl.NumberFormat('fr-HT', {
                      style: 'currency',
                      currency: 'HTG'
                    }).format(value as number),
                    name === 'loans' ? 'Nouveaux prêts' : name === 'payments' ? 'Paiements reçus' : 'Décaissements'
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="loans"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="url(#loansGradient)"
                  name="Nouveaux prêts"
                />
                <Area
                  type="monotone"
                  dataKey="payments"
                  stackId="2"
                  stroke="#10b981"
                  fill="url(#paymentsGradient)"
                  name="Paiements reçus"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Agent Performance */}
        <Card className="banking-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Performance des Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.chartData.agentPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="agent" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    new Intl.NumberFormat('fr-HT', {
                      style: 'currency',
                      currency: 'HTG'
                    }).format(value as number),
                    name === 'collections' ? 'Collections' : 'Objectif'
                  ]}
                />
                <Legend />
                <Bar dataKey="collections" fill="#3b82f6" name="Collections Réalisées" />
                <Bar dataKey="target" fill="#e5e7eb" name="Objectif" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loan Distribution */}
        <Card className="banking-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="h-5 w-5 mr-2" />
              Répartition des Prêts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.chartData.loanDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.chartData.loanDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="banking-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Méthodes de Paiement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.chartData.paymentMethods} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" />
                <YAxis dataKey="method" type="category" width={80} />
                <Tooltip
                  formatter={(value, name) => [
                    name === 'count' ? `${value} paiements` : new Intl.NumberFormat('fr-HT', {
                      style: 'currency',
                      currency: 'HTG'
                    }).format(value as number),
                    name === 'count' ? 'Nombre' : 'Montant'
                  ]}
                />
                <Legend />
                <Bar dataKey="count" fill="#8b5cf6" name="Nombre de paiements" />
                <Bar dataKey="amount" fill="#06b6d4" name="Montant total" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity Feed */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Activité en Temps Réel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nouveau paiement reçu</p>
                <p className="text-xs text-gray-500">Il y a 2 minutes - Marie Dupont (HTG 4,500)</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nouveau prêt approuvé</p>
                <p className="text-xs text-gray-500">Il y a 5 minutes - Jean Baptiste (HTG 75,000)</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Prêt en retard détecté</p>
                <p className="text-xs text-gray-500">Il y a 15 minutes - Client #CL-0456</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
