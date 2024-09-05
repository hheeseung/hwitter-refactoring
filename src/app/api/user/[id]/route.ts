import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
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
