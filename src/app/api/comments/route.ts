// app/api/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Comment } from '../../types';

let comments: Comment[] = [];

export async function GET(req: NextRequest) {
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newComment: Comment = {
    id: Date.now().toString(),
    postId: body.postId,
    userId: body.userId,
    body: body.body,
    createdAt: new Date().toISOString(),
  };
  comments.push(newComment);
  return NextResponse.json(newComment);
}
