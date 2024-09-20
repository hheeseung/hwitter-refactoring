import prisma from '@/lib/db';
import { getSession } from '@/lib/session';
import Category from './Category';
import LogoutButton from '../auth/LogoutButton';

export default async function BottomNav() {
  const { id } = await getSession();
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      profileImg: true,
    },
  });

  return (
    <nav className='lg:hidden fixed bottom-0 bg-white w-full flex justify-between items-center px-10 py-4 bg-opacity-90'>
      <Category profileImg={user!.profileImg} />
      <LogoutButton />
    </nav>
  );
}
