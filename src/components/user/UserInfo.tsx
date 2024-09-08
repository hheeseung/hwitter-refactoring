'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/services/user';
import UserIcon from '../ui/UserIcon';
import UserSkeleton from '../ui/UserSkeleton';

export default function UserInfo({ id }: { id: number }) {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  });

  if (isLoading) return <UserSkeleton />;

  if (isError) return <p>{error.message}</p>;

  return (
    <article className='bg-white flex items-center gap-3 w-full rounded-xl p-4 shadow-md mb-3'>
      {user ? (
        <>
          {user.profileImg ? (
            <Image
              src={
                user.profileImg.includes('imagedelivery')
                  ? `${user.profileImg}/public`
                  : user.profileImg
              }
              alt='profile'
              width={45}
              height={45}
              className='rounded-xl size-11 object-cover aspect-square'
            />
          ) : (
            <UserIcon custom='size-11 rounded-xl p-2' />
          )}
          <div className='flex flex-col'>
            <span className='font-semibold'>{user.username}</span>
            <span className='text-slate-500 text-sm'>{user.email}</span>
          </div>
        </>
      ) : (
        <span>No User</span>
      )}
    </article>
  );
}
