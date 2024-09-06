import { getSession } from '@/lib/session';
import Navbar from './Navbar';
import UserInfo from './UserInfo';
import LogoutButton from './LogoutButton';

export default async function Sidebar() {
  const { id } = await getSession();

  return (
    <aside className='w-1/4'>
      <UserInfo id={id!} />
      <nav className='bg-white *:p-5 *:border-b *:w-full shadow-md rounded-xl flex flex-col items-start justify-center'>
        <Navbar />
        <LogoutButton />
      </nav>
    </aside>
  );
}
