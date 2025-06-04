// app/comments/add/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost, User, Comment } from '../../types';

export default function AddCommentPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [userId, setUserId] = useState('');
  const [postId, setPostId] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/users').then(res => res.json()).then(setUsers);
    fetch('/api/blog').then(res => res.json()).then(setPosts);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !postId || !body) {
      return alert('All fields are required.');
    }

    const newComment: Omit<Comment, 'id' | 'createdAt'> = {
      userId,
      postId,
      body,
    };

    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(newComment),
    });

    alert('Comment added!');
    router.push('/blog'); // redirect or wherever you want
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Comment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={userId}
          onChange={e => setUserId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select User</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>

        <select
          value={postId}
          onChange={e => setPostId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Blog Post</option>
          {posts.map(p => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>

        <textarea
          placeholder="Comment body"
          value={body}
          onChange={e => setBody(e.target.value)}
          className="w-full border p-2 rounded h-24"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
}
