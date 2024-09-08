import Link from 'next/link';
import LogoIcon from '../ui/LogoIcon';

export default function Header() {
  return (
    <header className='bg-white w-full p-4'>
      <Link
        href='/'
        className='flex gap-3 items-center max-w-screen-2xl mx-auto'
      >
        <LogoIcon />
        <span className='font-bold text-3xl'>Hwitter</span>
      </Link>
    </header>
  );
}
