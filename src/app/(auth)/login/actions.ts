'use server';

import prisma from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

const checkExistEmail = async (email: string) => {
  const isExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return Boolean(isExist);
};

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .email('유효하지 않은 이메일입니다.')
    .toLowerCase()
    .refine(checkExistEmail, '존재하지 않는 이메일입니다.'),
  password: z.string().trim().min(5, '비밀번호는 5글자 이상이어야 합니다.'),
});

export default async function login(_: unknown, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? '');
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect('/');
    } else {
      return {
        fieldErrors: {
          password: ['잘못된 비밀번호입니다.'],
          email: [],
        },
      };
    }
  }
}
