import EditUser from '@/components/EditUser';
import prisma from '@/lib/db';
import { getSession } from '@/lib/session';

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
      <article>
        <h1>여기는 사용자 작성 포스팅 보여주기</h1>
      </article>
    </section>
  );
}
