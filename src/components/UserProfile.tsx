'use client';

import { User } from 'next-auth';

interface UserProfileProps {
  user: User | undefined;
}

export default function UserProfile({ user }: UserProfileProps) {
  if (!user) return null;
  
  return (
    <div className="flex items-center gap-4 mb-6">
      {user.image && (
        <img 
          src={user.image} 
          alt={user.name || 'User'} 
          className="w-12 h-12 rounded-full"
        />
      )}
      <div>
        <h2 className="text-xl font-semibold">{user.name || 'User'}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
}
