// app/comments/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Comment, BlogPost, User } from '../types';

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/comments').then(res => res.json()).then(setComments);
    fetch('/api/blog').then(res => res.json()).then(setPosts);
    fetch('/api/users').then(res => res.json()).then(setUsers);
  }, []);

  const getUserName = (id: string) => users.find(u => u.id === id)?.name || 'Unknown';
  const getPostTitle = (id: string) => posts.find(p => p.id === id)?.title || 'Unknown';

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Comments</h1>
      {comments.length === 0 ? (
        <p className="text-gray-600">No comments found.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map(comment => (
            <li key={comment.id} className="border p-4 rounded-lg bg-white shadow-sm">
              <p className="text-gray-800">{comment.body}</p>
              <p className="text-sm text-gray-500 mt-2">
                By <strong>{getUserName(comment.userId)}</strong> on{' '}
                <strong>{getPostTitle(comment.postId)}</strong> ·{' '}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
