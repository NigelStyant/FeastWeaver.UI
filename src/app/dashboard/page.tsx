import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton';
import UserProfile from '@/components/UserProfile';

export default async function Dashboard() {
  const session = await auth();
  
  // Redirect to home if not authenticated
  if (!session?.user) {
    redirect('/');
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold">Feast Weaver</h2>
        <SignOutButton />
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <UserProfile user={session.user} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-medium mb-2">Recent Meals</h3>
                <p className="text-gray-500">No meals planned yet. Start creating your meal plan!</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-medium mb-2">Upcoming Events</h3>
                <p className="text-gray-500">No upcoming events. Create your first event!</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
