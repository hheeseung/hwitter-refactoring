'use server';

import prisma from '@/lib/db';
import { getSession } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const postSchema = z.object({
  tweet: z.string().trim().min(1, '트윗은 반드시 입력해야 합니다.'),
  image: z.string().nullable().optional(),
});

export async function uploadPost(_: unknown, formData: FormData) {
  const data = {
    tweet: formData.get('tweet'),
    image: formData.get('image'),
  };

  const result = postSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      await prisma.tweet.create({
        data: {
          tweet: result.data.tweet,
          image: result.data.image,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      revalidatePath('/');
    }
  }
}
