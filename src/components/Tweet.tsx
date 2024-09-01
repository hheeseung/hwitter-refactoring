import Image from 'next/image';
import { IoMdHeartEmpty } from 'react-icons/io';
import { TfiComment } from 'react-icons/tfi';
import { IoShareSocialOutline } from 'react-icons/io5';
import UserIcon from './UserIcon';
import { ITweet } from './Tweets';

export default function Tweet({ tweet, image, user, createdAt }: ITweet) {
  return (
    <li className='bg-white shadow-md p-5 rounded-xl'>
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
      <div className='space-y-5 px-1 py-4 border-b border-slate-200 mb-4'>
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
      </div>
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
