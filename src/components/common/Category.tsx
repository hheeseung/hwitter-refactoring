'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineHome } from 'react-icons/ai';
import { HiOutlinePhoto } from 'react-icons/hi2';
import UserIcon from '../ui/UserIcon';

const urls = [
  {
    url: '/',
    name: 'Home',
    icon: <AiOutlineHome className='size-8' />,
  },
  {
    url: '/photos',
    name: 'Photos',
    icon: <HiOutlinePhoto className='size-8' />,
  },
];

export default function Category({
  profileImg,
}: {
  profileImg: string | null;
}) {
  const pathname = usePathname();

  return (
    <>
      {urls.map((link) => (
        <Link
          href={link.url}
          key={link.name}
          className={`flex items-center gap-3 font-semibold ${
            pathname === link.url ? 'text-primary' : 'text-icon'
          } ${link.name === 'Home' && 'hover:rounded-t-xl'}`}
        >
          {link.icon}
        </Link>
      ))}
      <Link href='/profile'>
        {profileImg ? (
          <Image
            src={`${profileImg}/public`}
            alt='user'
            width={25}
            height={25}
            className={`rounded-full ring-1 ring-offset-2  ${
              pathname === '/profile' ? 'ring-primary' : 'ring-slate-400'
            }`}
          />
        ) : (
          <UserIcon
            custom={`size-6 rounded-full p-1 ring-1 ring-offset-2 ${
              pathname === '/profile'
                ? 'ring-primary'
                : 'ring-slate-400 text-slate-400'
            }`}
          />
        )}
      </Link>
    </>
  );
}
