'use server';

import prisma from '@/lib/db';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const tweetSchema = z.object({
  tweet: z.string().trim().min(1, '트윗은 반드시 입력해야 합니다.'),
  photo: z.string().nullable(),
});

export async function addTweet(_: unknown, formData: FormData) {
  const data = {
    tweet: formData.get('tweet'),
    photo: formData.get('photo'),
  };
  const result = await tweetSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await getSession();
    if (user.id) {
      await prisma.tweet.create({
        data: {
          tweet: result.data.tweet,
          image: result.data.photo,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
    }
  }
}

/* eslint-disable @typescript-eslint/comma-dangle */
export async function getUploadURL() {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
    }
  );
  const data = res.json();
  return data;
}
