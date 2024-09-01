import prisma from '@/lib/db';
import { getSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const tweetSchema = z.object({
  tweet: z.string().trim().min(1, '트윗은 반드시 입력해야 합니다.'),
  image: z.string().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = tweetSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const { tweet, image } = result.data;
    const session = await getSession();
    if (!session || !session.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const createTweet = await prisma.tweet.create({
      data: {
        tweet,
        image,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: {
        id: true,
        tweet: true,
        image: true,
        userId: true,
      },
    });

    return NextResponse.json(createTweet, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to Create Tweet' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const tweets = await prisma.tweet.findMany({
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
    orderBy: {
      createdAt: 'desc',
    },
  });
  return NextResponse.json(tweets, { status: 200 });
}
