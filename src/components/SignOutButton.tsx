'use client';

import { useState } from 'react';

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = () => {
    setIsLoading(true);
    // Direct link to sign out
    window.location.href = `${window.location.origin}/api/auth/signout?callbackUrl=/`;
  };

  return (
    <button 
      onClick={handleSignOut}
      disabled={isLoading}
      className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-70"
    >
      {isLoading ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}
