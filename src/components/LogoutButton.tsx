import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { TbLogout2 } from 'react-icons/tb';

export default function LogoutButton() {
  const handleLogout = async () => {
    'use server';

    const session = await getSession();
    session.destroy();
    redirect('/login');
  };

  return (
    <form
      className='border-none text-start hover:bg-background font-semibold text-like hover:rounded-b-xl'
      action={handleLogout}
    >
      <button className='flex items-center gap-3' type='submit'>
        <TbLogout2 className='size-6' />
        <span>Logout</span>
      </button>
    </form>
  );
}
