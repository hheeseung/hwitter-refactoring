import TweetForm from '@/components/TweetForm';
import Tweets from '@/components/Tweets';
import prisma from '@/lib/db';
import { getSession } from '@/lib/session';

export default async function Home() {
  const userId = (await getSession()).id;
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
    <section>
      <TweetForm profileImg={user?.profileImg || ''} />
      <Tweets />
    </section>
  );
}
