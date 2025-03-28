import { auth } from '@/auth';
import Link from 'next/link';
import SignInButton from '@/components/SignInButton';

export default async function Home() {
  const session = await auth();
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Feast Weaver</h1>
        <p className="text-xl">Your ultimate meal planning companion</p>
        
        <div className="flex gap-4 mt-6">
          {session ? (
            <Link 
              href="/dashboard" 
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <SignInButton />
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
