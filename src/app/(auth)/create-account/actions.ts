'use server';

import prisma from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

const formSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: '사용자 이름은 3글자 이상이어야 합니다.' }),
    email: z.string().trim().email('유효하지 않은 이메일입니다.').toLowerCase(),
    password: z
      .string()
      .trim()
      .min(5, { message: '비밀번호는 5글자 이상이어야 합니다.' }),
  })
  .superRefine(async ({ username }, ctx) => {
    const checkExistUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (checkExistUsername) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 존재하는 사용자 이름입니다.',
        path: ['username'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const checkExistEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (checkExistEmail) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 존재하는 이메일입니다.',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export default async function signup(_: unknown, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    await prisma.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    redirect('/login');
  }
}
