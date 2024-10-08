import { getNextAuthSession, getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { TbLogout2 } from 'react-icons/tb';

export default function LogoutButton() {
  const handleLogout = async () => {
    'use server';

    const session = await getSession();
    const nextAuthSession = await getNextAuthSession();
    session.destroy();
    nextAuthSession.destroy();
    redirect('/login');
  };

  return (
    <form
      className='border-none text-start lg:hover:bg-background font-semibold text-like hover:rounded-b-xl'
      action={handleLogout}
    >
      <button className='flex items-center gap-3' type='submit'>
        <TbLogout2 className='size-7 lg:size-6' />
        <span className='hidden lg:block'>Logout</span>
      </button>
    </form>
  );
}
