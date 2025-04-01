'use client';

import { DinerCard } from '@/components/molecules/diner-card';
import { useGetDiners } from '@/hooks/diners/useGetDiners';
import { Diner } from '@/types/Diner';
import { useRouter } from 'next/navigation';
import NewEntityButton from '@/components/atoms/new-entity-button';
import { UserPlusIcon, UserGroupIcon, UserIcon } from '@/components/icons';

export default function DinersPage() {
  const { diners, isLoading, error, isNewUser } = useGetDiners();
  const router = useRouter();

  const handleEditDiner = (diner: Diner) => {
    router.push(`/diners/${diner.id}/edit`);
  };

  // New user onboarding content
  const renderNewUserContent = () => (
    <div className="min-h-[400px] bg-white/30 rounded-xl border border-gray-200 shadow-lg p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-blue-100 p-4 rounded-full">
            <UserGroupIcon className="h-16 w-16 text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Diner Management!</h2>
        <p className="text-gray-600 text-lg mb-8">
          This is where you&apos;ll add the people you&apos;re cooking for. Adding diners helps you track dietary preferences, 
          allergies, and favorite meals for everyone in your household.
        </p>
        
        <div className="bg-white/50 rounded-lg p-6 mb-8 border border-gray-200">
          <h3 className="font-semibold text-xl mb-4 text-gray-800">Getting Started</h3>
          <ul className="text-left space-y-4">
            <li className="flex items-start">
              <div className="mr-3 mt-1 bg-blue-100 p-1 rounded-full">
                <UserPlusIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Add your first diner</p>
                <p className="text-gray-600">Start by adding yourself or someone in your household</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-3 mt-1 bg-blue-100 p-1 rounded-full">
                <UserIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Set dietary preferences</p>
                <p className="text-gray-600">Add allergies, likes, dislikes, and other important information</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="flex justify-center">
          <NewEntityButton entityType="Diner" className="px-6 py-3 text-lg" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">
              Diner Management
            </h1>
            <p className="text-gray-600 text-lg">
              Create and manage dietary preferences for your household members
            </p>
          </div>
          {!isNewUser && <NewEntityButton entityType="Diner" />}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px] bg-white/20 rounded-xl border border-gray-200 shadow-lg">
            <div className="text-gray-700 font-medium">Loading diners...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[400px] bg-rose-50/50 rounded-xl border border-rose-200 shadow-lg">
            <div className="text-rose-700 font-medium">Error loading diners: {error}</div>
          </div>
        ) : isNewUser || diners.length === 0 ? (
          renderNewUserContent()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diners?.map((diner, index) => (
              <div
                key={diner.id}
              >
                <DinerCard
                  diner={diner}
                  onEditClick={handleEditDiner}
                  onClick={() => router.push(`/diners/${diner.id}`)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
