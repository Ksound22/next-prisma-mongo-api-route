import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { title, description, date } = await req.json();

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        createdAt: new Date(date),
      },
    });

    return NextResponse.json(newTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}

// export function OPTIONS() {
//   return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
// }
