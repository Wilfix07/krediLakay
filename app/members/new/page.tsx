'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { MemberRegistrationForm } from '@/components/members/member-registration-form'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function NewMemberPage() {
  const handleSubmit = async (memberData: any) => {
    console.log('Submitting member data:', memberData)

    // Here you would typically:
    // 1. Validate the data
    // 2. Submit to your API
    // 3. Handle success/error responses
    // 4. Redirect to member list or show success message

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      alert('✅ Membre enregistré avec succès!')
      // Redirect to members list or member profile
      window.location.href = '/members'
    } catch (error) {
      console.error('Error creating member:', error)
      alert('❌ Erreur lors de l\'enregistrement du membre')
    }
  }

  const handleCancel = () => {
    window.location.href = '/members'
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Nouveau Membre</h1>
              <p className="text-gray-600">
                Enregistrer un nouveau membre avec vérification KYC complète
              </p>
            </div>

            <MemberRegistrationForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
