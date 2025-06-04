// app/users/add/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../../types';

export default function AddUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return alert('All fields are required');

    const newUser: Omit<User, 'id'> = { name, email };

    await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
    });

    router.push('/users');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add User
        </button>
      </form>
    </div>
  );
}
