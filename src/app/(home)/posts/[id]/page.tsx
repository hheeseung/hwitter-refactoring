import TweetDetail from '@/components/TweetDetail';
import { getSession } from '@/lib/session';

export default async function Detail() {
  const session = await getSession();
  const userId = session.id!;

  return <TweetDetail userId={userId} />;
}
