import Link from 'next/link';
import LogoIcon from '../ui/LogoIcon';

export default function Header() {
  return (
    <header className='bg-white w-full p-4'>
      <div className='max-w-screen-2xl mx-auto'>
        <Link href='/' className='flex items-center gap-3 w-fit'>
          <LogoIcon />
          <span className='font-bold text-3xl'>Hwitter</span>
        </Link>
      </div>
    </header>
  );
}
