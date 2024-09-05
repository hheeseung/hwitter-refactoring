import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
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

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;
  const { tweet } = await req.json();
  const editedTweet = await prisma.tweet.update({
    where: {
      id: Number(id),
    },
    data: {
      tweet,
    },
    select: {
      tweet: true,
    },
  });
  return NextResponse.json(editedTweet, { status: 200 });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await prisma.tweet.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({ status: 204 });
}
