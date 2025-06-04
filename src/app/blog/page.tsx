// app/blog/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { BlogPost, User } from '../types';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/blog').then(res => res.json()).then(setPosts);
    fetch('/api/users').then(res => res.json()).then(setUsers);
  }, []);

  const getAuthorName = (id: string) =>
    users.find(user => user.id === id)?.name || 'Unknown';

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map(post => (
          <a
            key={post.id}
            href={`/blog/${post.id}`}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden"
          >
            <img
              src="/thumbnail.png"
              alt="Blog thumbnail"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">
                By {getAuthorName(post.authorId)} on {new Date(post.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2 line-clamp-3">{post.content}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
