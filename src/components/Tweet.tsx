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
import TweetEditForm from './TweetEditForm';

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
                className='rounded-xl size-11 object-cover aspect-square'
                src={
                  user.profileImg.includes('imagedelivery')
                    ? `${user.profileImg}/public`
                    : user.profileImg
                }
                alt={user.username}
                priority
              />
            ) : (
              <UserIcon custom='size-11 rounded-xl p-2' />
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
      <Link href={`/posts/${id}`}>
        <div className='space-y-5 px-1 py-4 border-b border-slate-200 mb-4'>
          {image && (
            <Image
              src={`${image}/public`}
              width={500}
              height={400}
              alt='image'
              className='w-full h-[450px] object-contain'
            />
          )}
          <p>{tweet}</p>
        </div>
      </Link>
      {isEdit ? (
        <TweetEditForm setIsEdit={setIsEdit} id={id} tweet={tweet} />
      ) : null}
      <div className='flex justify-end items-center'>
        <div className='flex items-center gap-3 px-1 text-slate-500'>
          <IoMdHeartEmpty className='size-7' />
          <TfiComment className='size-6' />
          <IoShareSocialOutline className='size-6' />
        </div>
      </div>
    </li>
  );
}
