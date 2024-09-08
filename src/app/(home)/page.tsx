import TweetUploadForm from '@/components/post/TweetUploadForm';
import prisma from '@/lib/db';
import { getSession } from '@/lib/session';
import Tweets from '@/components/post/Tweets';

export default async function Home() {
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
    },
  });

  return (
    <section className='space-y-4'>
      <TweetUploadForm profileImg={user?.profileImg || ''} />
      <Tweets userId={userId} />
    </section>
  );
}
