import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const tweet = await prisma.tweet.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      tweet: true,
      image: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          username: true,
          profileImg: true,
        },
      },
    },
  });

  return NextResponse.json(tweet, { status: 200 });
}

export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params;
  await prisma.tweet.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({ status: 200 });
}
