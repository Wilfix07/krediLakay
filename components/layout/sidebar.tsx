'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Home,
  Users,
  CreditCard,
  DollarSign,
  Calculator,
  Percent,
  BarChart3,
  Settings,
  Shield,
  Bell,
  FileText,
  ChevronDown,
  ChevronRight,
  X,
  Receipt,
  TrendingUp,
  Activity,
  Database
} from 'lucide-react'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const menuItems = [
  // Front Office
  { icon: Home, label: 'Tableau de bord', href: '/', category: 'front' },
  {
    icon: Users,
    label: 'Membres',
    href: '/members',
    category: 'front',
    subItems: [
      { label: 'Liste des membres', href: '/members' },
      { label: 'Recherche avancée', href: '/members/search' },
      { label: 'Profils détaillés', href: '/members/profiles' },
      { label: 'Gestion KYC', href: '/members/kyc' }
    ]
  },
  {
    icon: CreditCard,
    label: 'Prêts',
    href: '/loans',
    category: 'front',
    subItems: [
      { label: 'Nouveau prêt', href: '/loans/new' },
      { label: 'Gestion des prêts', href: '/loans' },
      { label: 'Échéanciers', href: '/loans/schedules' },
      { label: 'Historique', href: '/loans/history' }
    ]
  },
  {
    icon: DollarSign,
    label: 'Paiements',
    href: '/payments',
    category: 'front',
    subItems: [
      { label: 'Enregistrement', href: '/payments/record' },
      { label: 'Reçus automatiques', href: '/payments/receipts' },
      { label: 'Historique', href: '/payments/history' },
      { label: 'Rappels', href: '/payments/reminders' }
    ]
  },

  // Back Office
  {
    icon: Calculator,
    label: 'Dépenses',
    href: '/expenses',
    category: 'back',
    subItems: [
      { label: 'Ajouter dépense', href: '/expenses/add' },
      { label: 'Suivi des dépenses', href: '/expenses' },
      { label: 'Rapports de dépenses', href: '/expenses/reports' },
      { label: 'Budgets', href: '/expenses/budgets' }
    ]
  },
  {
    icon: Percent,
    label: 'Commissions',
    href: '/commissions',
    category: 'back',
    subItems: [
      { label: 'Calculs automatiques', href: '/commissions/calculations' },
      { label: 'Historique', href: '/commissions/history' },
      { label: 'Paiements', href: '/commissions/payments' },
      { label: 'Performance agents', href: '/commissions/performance' }
    ]
  },

  // Analytics & Reports
  {
    icon: BarChart3,
    label: 'Rapports & Analytics',
    href: '/analytics',
    category: 'analytics',
    subItems: [
      { label: 'Portefeuille', href: '/analytics/portfolio' },
      { label: 'Cash Flow', href: '/analytics/cashflow' },
      { label: 'P&L', href: '/analytics/pl' },
      { label: 'Comparatifs agents', href: '/analytics/agents' },
      { label: 'Tendances', href: '/analytics/trends' }
    ]
  },

  // Administration
  {
    icon: Shield,
    label: 'Administration',
    href: '/admin',
    category: 'admin',
    subItems: [
      { label: 'Gestion utilisateurs', href: '/admin/users' },
      { label: 'Rôles et permissions', href: '/admin/roles' },
      { label: 'Paramètres système', href: '/admin/parameters' },
      { label: 'Configurations', href: '/admin/config' }
    ]
  },

  // System
  {
    icon: Settings,
    label: 'Paramètres',
    href: '/settings',
    category: 'system',
    subItems: [
      { label: 'Taux d\'intérêt', href: '/settings/rates' },
      { label: 'Commissions', href: '/settings/commissions' },
      { label: 'Rôles utilisateurs', href: '/settings/roles' },
      { label: 'Configuration système', href: '/settings/system' }
    ]
  },

  // Audit & Support
  {
    icon: FileText,
    label: 'Audit & Logs',
    href: '/audit',
    category: 'system',
    subItems: [
      { label: 'Logs d\'activité', href: '/audit/logs' },
      { label: 'Traçabilité', href: '/audit/trail' },
      { label: 'Rapports d\'audit', href: '/audit/reports' }
    ]
  },
  {
    icon: Bell,
    label: 'Support & Notifications',
    href: '/support',
    category: 'system',
    subItems: [
      { label: 'Centre de support', href: '/support' },
      { label: 'Notifications', href: '/support/notifications' },
      { label: 'Messages', href: '/support/messages' },
      { label: 'Base de connaissances', href: '/support/kb' }
    ]
  }
]

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev =>
      prev.includes(href)
        ? prev.filter(item => item !== href)
        : [...prev, href]
    )
  }

  const isItemActive = (item: any) => {
    if (pathname === item.href) return true
    if (item.subItems) {
      return item.subItems.some((subItem: any) => pathname === subItem.href)
    }
    return false
  }

  const isSubItemActive = (href: string) => {
    return pathname === href
  }

  const getCategoryTitle = (category: string) => {
    const titles = {
      front: 'Front Office',
      back: 'Back Office',
      analytics: 'Analyses',
      admin: 'Administration',
      system: 'Système'
    }
    return titles[category as keyof typeof titles] || category
  }

  // Group menu items by category
  const categorizedMenuItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'other'
    if (!acc[category]) acc[category] = []
    acc[category].push(item)
    return acc
  }, {} as Record<string, typeof menuItems>)

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 banking-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:w-80",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold text-lg">KL</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">KREDI LAKAY</h1>
                <p className="text-white/70 text-sm">Gestion de Portefeuille</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
            {Object.entries(categorizedMenuItems).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    {getCategoryTitle(category)}
                  </h3>
                </div>

                {items.map((item) => {
                  const Icon = item.icon
                  const isActive = isItemActive(item)
                  const isExpanded = expandedItems.includes(item.href)

                  return (
                    <div key={item.href} className="space-y-1">
                      <div
                        className={cn(
                          "banking-nav-item cursor-pointer",
                          isActive && "banking-nav-item active"
                        )}
                        onClick={() => {
                          if (item.subItems && item.subItems.length > 0) {
                            toggleExpanded(item.href)
                          } else {
                            // Navigate to main item
                            window.location.href = item.href
                            onClose?.()
                          }
                        }}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        <span className="font-medium flex-1">{item.label}</span>
                        {item.subItems && item.subItems.length > 0 && (
                          <div className="ml-auto">
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Sub-items */}
                      {item.subItems && item.subItems.length > 0 && isExpanded && (
                        <div className="ml-6 space-y-1">
                          {item.subItems.map((subItem) => (
                            <Link key={subItem.href} href={subItem.href} className="block">
                              <div
                                className={cn(
                                  "px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
                                  isSubItemActive(subItem.href)
                                    ? "bg-white/20 text-white font-medium"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                )}
                                onClick={onClose || (() => {})}
                              >
                                {subItem.label}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/20">
            <div className="text-xs text-white/60 text-center">
              <p>© 2024 KREDI LAKAY</p>
              <p className="mt-1">Version 1.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
