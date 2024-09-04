'use client';

import Image from 'next/image';
import { IoMdHeartEmpty } from 'react-icons/io';
import { TfiComment } from 'react-icons/tfi';
import { IoShareSocialOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useState } from 'react';
import UserIcon from './UserIcon';
import { ITweet } from './Tweets';
import ActionButtons from './ActionButtons';
import EditForm from './EditForm';

export default function Tweet({
  id,
  tweet,
  image,
  user,
  createdAt,
  userId,
}: ITweet & { userId: number }) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <li className='bg-white shadow-md p-5 rounded-xl mb-4 list-none'>
      <div className='flex items-start justify-between'>
        <div className='flex justify-between w-full items-start'>
          <div className='flex items-center gap-2'>
            {user.profileImg ? (
              <Image
                width={45}
                height={45}
                className='rounded-xl'
                src={user.profileImg}
                alt={user.username}
              />
            ) : (
              <UserIcon custom='size-11' />
            )}
            <div>
              <p className='font-semibold'>{user.username}</p>
              <p className='text-xs text-slate-500'>
                {new Date(createdAt).toLocaleString('ko-KR')}
              </p>
            </div>
          </div>
          {userId === user.id && (
            <ActionButtons id={id} setIsEdit={setIsEdit} />
          )}
        </div>
      </div>
      <Link
        href={`/posts/${id}`}
        className='space-y-5 px-1 py-4 border-b border-slate-200 mb-4'
      >
        {image && (
          <Image
            src={`${image}/public`}
            width={500}
            height={400}
            alt='image'
            className='w-full h-[450px] object-contain'
            priority
          />
        )}
        <p>{tweet}</p>
      </Link>
      {isEdit ? <EditForm setIsEdit={setIsEdit} id={id} tweet={tweet} /> : null}
      <div className='flex justify-end items-center'>
        <div className='flex items-center gap-3 px-1'>
          <IoMdHeartEmpty className='size-7' />
          <TfiComment className='size-6' />
          <IoShareSocialOutline className='size-6' />
        </div>
      </div>
    </li>
  );
}
