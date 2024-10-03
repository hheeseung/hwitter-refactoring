import Comments from '@/components/comment/Comments';
import TweetDetail from '@/components/post/TweetDetail';
import { getSession } from '@/lib/session';

export default async function Detail() {
  const session = await getSession();
  const userId = session.id!;

  return (
    <section>
      <TweetDetail userId={userId} />
      <Comments />
    </section>
  );
}
