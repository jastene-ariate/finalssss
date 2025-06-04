// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { User } from '../../types';

let users: User[] = [];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newUser: User = { id: Date.now().toString(), ...body };
  users.push(newUser);
  return NextResponse.json(newUser);
}
