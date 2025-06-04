// app/users/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { User } from '../types';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="p-4 bg-gray-100 rounded shadow">
            <a href={`/users/${user.id}`} className="text-blue-600 hover:underline">
              {user.name}
            </a> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
 