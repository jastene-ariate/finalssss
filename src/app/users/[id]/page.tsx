// app/users/[id]/page.tsx
import { User, Comment, BlogPost } from '../../types';

async function getUserData(id: string): Promise<{
  user: User | null;
  comments: Comment[];
  posts: BlogPost[];
}> {
  const [usersRes, commentsRes, postsRes] = await Promise.all([
    fetch('http://localhost:3000/api/users'),
    fetch('http://localhost:3000/api/comments'),
    fetch('http://localhost:3000/api/blog'),
  ]);

  const users: User[] = await usersRes.json();
  const comments: Comment[] = await commentsRes.json();
  const posts: BlogPost[] = await postsRes.json();

  return {
    user: users.find(user => user.id === id) || null,
    comments,
    posts,
  };
}

export default async function UserDetail({ params }: { params: { id: string } }) {
  const { user, comments, posts } = await getUserData(params.id);

  if (!user) return <p className="p-6">User not found.</p>;

  const userComments = comments.filter(c => c.userId === user.id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p>Email: {user.email}</p>

      <hr className="my-4" />
      <h2 className="text-xl font-semibold mb-2">User's Comments</h2>

      {userComments.length === 0 ? (
        <p>No comments made yet.</p>
      ) : (
        <ul className="space-y-2">
          {userComments.map(comment => {
            const post = posts.find(p => p.id === comment.postId);
            return (
              <li key={comment.id} className="border p-2 rounded">
                <p className="text-sm text-gray-700">
                  <strong>On "{post?.title || 'Unknown Post'}":</strong> {comment.body}
                </p>
                <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
