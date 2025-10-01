'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { EnhancedDashboard } from '@/components/dashboard/enhanced-dashboard'
import { formatCurrency } from '@/lib/utils'

// Données de démonstration
const mockStats = {
  totalLoans: 1247,
  totalAmount: 12450000,
  totalClients: 892,
  activeLoans: 634,
  totalPayments: 8900000,
  overdue: 23
}

const mockRecentLoans = [
  {
    id: '1',
    client: { firstName: 'Marie', lastName: 'Dupont' },
    amount: 50000,
    status: 'pending' as const,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    client: { firstName: 'Jean', lastName: 'Baptiste' },
    amount: 75000,
    status: 'approved' as const,
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    client: { firstName: 'Claire', lastName: 'Michel' },
    amount: 100000,
    status: 'active' as const,
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    client: { firstName: 'Pierre', lastName: 'Louis' },
    amount: 30000,
    status: 'completed' as const,
    createdAt: '2024-01-12'
  }
]

const mockChartData = [
  { month: 'Jan', payments: 650000, target: 700000 },
  { month: 'Fév', payments: 720000, target: 750000 },
  { month: 'Mar', payments: 890000, target: 800000 },
  { month: 'Avr', payments: 780000, target: 850000 },
  { month: 'Mai', payments: 950000, target: 900000 },
  { month: 'Jun', payments: 1020000, target: 950000 }
]

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          user={mockUser}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <EnhancedDashboard />
          </div>
        </main>
      </div>
    </div>
  )
}
