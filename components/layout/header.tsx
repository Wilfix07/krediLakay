'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { User, Menu, X, Settings, LogOut } from 'lucide-react'
import { NotificationCenter } from '@/components/notifications/notification-center'

interface HeaderProps {
  user?: {
    name: string
    role: string
  }
  onMenuClick?: () => void
}

export function Header({ user, onMenuClick }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-gray-100"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 banking-gradient rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">KL</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                KREDI LAKAY
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                Gestion de Portefeuille de Prêts
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex">
            <NotificationCenter />
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              className="flex items-center space-x-3 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <User className="h-5 w-5 text-white" />
              </div>
              {user && (
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-600 capitalize">{user.role}</div>
                </div>
              )}
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-2">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <div className="py-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Paramètres du compte
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Se déconnecter
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
