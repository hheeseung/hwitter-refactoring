import prisma from '@/lib/db';
import { getSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

// export async function GET(_req: NextRequest, { params }: Props) {
//   const { id } = params;
//   try {
//     const getUser = await prisma.user.findUnique({
//       where: {
//         id: Number(id),
//       },
//       select: {
//         id: true,
//         email: true,
//         username: true,
//         profileImg: true,
//         profileImgId: true,
//       },
//     });

//     return NextResponse.json(getUser, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Failed to find user' },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req: NextRequest, { params }: Props) {
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  const session = await getSession();
  const userId = session.id!;

  try {
    if (action === 'getUser') {
      const getUser = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          id: true,
          email: true,
          username: true,
          profileImg: true,
          profileImgId: true,
        },
      });

      return NextResponse.json(getUser, { status: 200 });
    }

    if (action === 'getUserPost') {
      const userPost = await prisma.tweet.findMany({
        where: {
          userId,
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
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json(userPost, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to find user' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Props) {
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  try {
    const { profileImg, profileImgId, username } = await req.json();

    if (action === 'updateProfileImg') {
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { profileImg, profileImgId },
        select: { profileImg: true, profileImgId: true },
      });
      return NextResponse.json(updatedUser, { status: 200 });
    }

    if (action === 'updateUsername') {
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { username },
        select: { username: true },
      });
      return NextResponse.json(updatedUser, { status: 200 });
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update user', error },
      { status: 500 }
    );
  }
}
