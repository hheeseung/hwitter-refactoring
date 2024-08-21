import Link from 'next/link';
import UserInfo from './UserInfo';

export default function Sidebar() {
  return (
    <aside className='w-1/4'>
      <UserInfo />
      <nav>
        <Link href='/'>Home</Link>
        <Link href='/photos'>Photos</Link>
        <Link href='/profile'>Profile</Link>
        <button type='button'>Logout</button>
      </nav>
    </aside>
  );
}
