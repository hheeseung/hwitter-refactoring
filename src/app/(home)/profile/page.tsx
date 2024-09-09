import prisma from '@/lib/db';
import { getSession } from '@/lib/session';
import EditUser from '@/components/user/EditUser';
import UserPostList from '@/components/user/UserPostList';

export default async function Profile() {
  const session = await getSession();
  const userId = session.id!;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      profileImg: true,
      profileImgId: true,
    },
  });

  return (
    <section>
      <EditUser user={user!} />
      <p className='mt-10 mb-5 px-2 font-bold text-xl text-center'>My Post</p>
      <UserPostList userId={userId} />
    </section>
  );
}
