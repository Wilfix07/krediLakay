'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { UserManagement } from '@/components/admin/user-management'

const mockUser = {
  name: 'Administrateur',
  role: 'admin'
}

export default function AdminUsersPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <UserManagement />
          </div>
        </main>
      </div>
    </div>
  )
}
