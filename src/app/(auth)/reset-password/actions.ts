'use server';

import prisma from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const isExistEmail = async (email: string) => {
  const isExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return Boolean(isExist);
};

const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: '이메일의 형식을 반드시 지켜서 입력해주세요.' })
    .toLowerCase()
    .refine(isExistEmail, '존재하지 않는 이메일입니다.'),
  password: z.string().trim().min(5, '비밀번호는 5글자 이상이어야 합니다.'),
});

export async function reset(_: unknown, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await emailSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      errors: result.error.flatten(),
    };
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    await prisma.user.update({
      where: {
        email: result.data.email,
      },
      data: {
        password: hashedPassword,
      },
    });
    return {
      success: '비밀번호가 변경되었습니다.',
    };
  }
}
