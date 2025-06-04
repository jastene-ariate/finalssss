// app/blog/[id]/page.tsx
import { BlogPost, User, Comment } from '../../types';

async function getData(id: string): Promise<{
  post: BlogPost | null;
  users: User[];
  comments: Comment[];
}> {
  const [postsRes, usersRes, commentsRes] = await Promise.all([
    fetch('http://localhost:3000/api/blog'),
    fetch('http://localhost:3000/api/users'),
    fetch('http://localhost:3000/api/comments'),
  ]);
  const posts: BlogPost[] = await postsRes.json();
  const users: User[] = await usersRes.json();
  const comments: Comment[] = await commentsRes.json();
  return {
    post: posts.find(p => p.id === id) || null,
    users,
    comments,
  };
}

export default async function BlogDetail({ params }: { params: { id: string } }) {
  const { post, users, comments } = await getData(params.id);

  if (!post) return <p className="p-6">Post not found.</p>;

  const author = users.find(u => u.id === post.authorId);
  const postComments = comments.filter(c => c.postId === post.id);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        By {author?.name} on {new Date(post.date).toLocaleDateString()}
      </p>
      <p className="whitespace-pre-wrap mb-6">{post.content}</p>

      <hr className="my-4" />
      <h2 className="text-xl font-semibold mb-2">Comments</h2>

      {postComments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="space-y-2">
          {postComments.map(comment => {
            const commenter = users.find(u => u.id === comment.userId);
            return (
              <li key={comment.id} className="border p-2 rounded">
                <p className="text-sm text-gray-700">
                  <strong>{commenter?.name || 'Unknown'}:</strong> {comment.body}
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
