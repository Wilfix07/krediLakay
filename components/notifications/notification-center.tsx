'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, CheckCircle, AlertTriangle, Info, X, Settings, Volume2, VolumeX } from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionRequired?: boolean
  actionUrl?: string
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  useEffect(() => {
    loadNotifications()
    setupRealtimeListener()
  }, [])

  const loadNotifications = async () => {
    // Simulate loading notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'Paiement reçu',
        message: 'Marie Dupont a effectué un paiement de HTG 4,500',
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        read: false,
        actionRequired: false
      },
      {
        id: '2',
        type: 'warning',
        title: 'Prêt en retard',
        message: 'Le prêt #LN-2024-0123 présente 3 jours de retard',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        read: false,
        actionRequired: true,
        actionUrl: '/loans/LN-2024-0123'
      },
      {
        id: '3',
        type: 'info',
        title: 'Nouveau prêt approuvé',
        message: 'Le prêt de Jean Baptiste a été approuvé automatiquement',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        read: true,
        actionRequired: false
      },
      {
        id: '4',
        type: 'error',
        title: 'Échec de paiement',
        message: 'Le paiement mobile de Claire Michel a échoué',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionRequired: true,
        actionUrl: '/payments/retry/PMT-456'
      }
    ]
    setNotifications(mockNotifications)
  }

  const setupRealtimeListener = () => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 10 seconds
        addRandomNotification()
      }
    }, 10000)

    return () => clearInterval(interval)
  }

  const addRandomNotification = () => {
    const types: Array<'success' | 'warning' | 'error' | 'info'> = ['success', 'warning', 'error', 'info']
    const messages = [
      { title: 'Nouveau paiement', message: 'Un paiement vient d\'être reçu', type: 'success' as const },
      { title: 'Prêt en retard', message: 'Un prêt présente du retard', type: 'warning' as const },
      { title: 'Erreur système', message: 'Une erreur s\'est produite', type: 'error' as const },
      { title: 'Information', message: 'Mise à jour système disponible', type: 'info' as const }
    ]

    const randomMessage = messages[Math.floor(Math.random() * messages.length)]

    const newNotification: Notification = {
      id: Date.now().toString(),
      type: randomMessage.type,
      title: randomMessage.title,
      message: randomMessage.message,
      timestamp: new Date().toISOString(),
      read: false,
      actionRequired: randomMessage.type === 'warning' || randomMessage.type === 'error'
    }

    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]) // Keep only 10 latest

    if (soundEnabled) {
      // Play notification sound
      try {
        const audio = new Audio('/notification.mp3')
        audio.volume = 0.3
        audio.play().catch(() => {}) // Ignore errors if file doesn't exist
      } catch (e) {
        // Fallback to browser notification if available
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(randomMessage.title, { body: randomMessage.message })
        }
      }
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-96 max-h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1"
                >
                  {soundEnabled ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-sm"
                  >
                    Tout marquer comme lu
                  </Button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Aucune notification</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      }`}
                      onClick={() => {
                        if (notification.actionRequired && notification.actionUrl) {
                          window.location.href = notification.actionUrl
                          setIsOpen(false)
                        }
                        markAsRead(notification.id)
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 h-auto text-gray-400 hover:text-gray-600"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNotification(notification.id)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-gray-500">
                              {new Date(notification.timestamp).toLocaleString('fr-HT')}
                            </p>
                            {notification.actionRequired && (
                              <Badge variant="outline" className="text-xs">
                                Action requise
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-sm"
                  onClick={() => setNotifications([])}
                >
                  Effacer toutes les notifications
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
