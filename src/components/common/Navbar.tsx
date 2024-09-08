'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { HiOutlinePhoto } from 'react-icons/hi2';

const urls = [
  {
    url: '/',
    name: 'Home',
    icon: <AiOutlineHome className='size-6' />,
  },
  {
    url: '/photos',
    name: 'Photos',
    icon: <HiOutlinePhoto className='size-6' />,
  },
  {
    url: '/profile',
    name: 'Profile',
    icon: <CgProfile className='size-6' />,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {urls.map((link) => (
        <Link
          href={link.url}
          key={link.name}
          className={`hover:bg-background flex items-center gap-3 font-semibold ${
            pathname === link.url ? 'text-primary' : 'text-icon'
          } ${link.name === 'Home' && 'hover:rounded-t-xl'}`}
        >
          {link.icon}
          <span>{link.name}</span>
        </Link>
      ))}
    </>
  );
}
