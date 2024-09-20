import prisma from '@/lib/db';
import { getSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const session = await getSession();
  const userId = session.id!;

  try {
    const addLikes = await prisma.like.create({
      data: {
        tweet: {
          connect: {
            id: Number(id),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json(addLikes, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to Add Likes',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const session = await getSession();
  const userId = session.id!;

  try {
    await prisma.like.delete({
      where: {
        id: {
          tweetId: Number(id),
          userId,
        },
      },
    });

    return NextResponse.json({ status: 204 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to Delete Likes',
      },
      { status: 500 }
    );
  }
}
