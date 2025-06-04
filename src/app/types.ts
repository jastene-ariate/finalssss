// types.ts

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  date: string;
}
export interface Comment {
  id: string;
  postId: string;   // links to BlogPost
  userId: string;   // links to User
  body: string;
  createdAt: string;
}
