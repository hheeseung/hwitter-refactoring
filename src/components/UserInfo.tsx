import prisma from '@/lib/db';
import { getSession } from '@/lib/session';
import Image from 'next/image';

export default async function UserInfo() {
  const { id } = await getSession();

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      profileImg: true,
    },
  });

  if (!user) return <article>No User</article>;

  return (
    <article className='bg-white flex items-center gap-3 w-full rounded-xl p-3 shadow-md mb-3'>
      <Image
        src={user.profileImg ?? ''}
        alt='profile'
        width={45}
        height={45}
        className='rounded-xl'
      />
      <div className='flex flex-col'>
        <span className='font-semibold'>{user.username}</span>
        <span className='text-slate-500 text-sm'>{user.email}</span>
      </div>
    </article>
  );
}
