// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { BlogPost } from '../../types';

let posts: BlogPost[] = [];

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newPost: BlogPost = { id: Date.now().toString(), ...body };
  posts.push(newPost);
  return NextResponse.json(newPost);
}
