'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserPost } from '@/services/user';
import { ITweet } from '../post/Tweets';
import Tweet from '../post/Tweet';
import TweetsSkeleton from '../ui/TweetsSkeleton';

export default function UserPostList({ userId }: { userId: number }) {
  const { data, isError, error, isPending } = useQuery<ITweet[]>({
    queryFn: () => getUserPost(userId),
    queryKey: ['tweets', userId],
  });

  if (isPending)
    return new Array(10)
      .fill(null)
      .map((_, index) => <TweetsSkeleton key={index} />);

  if (isError) return <p className='text-center'>{error.message}</p>;

  return (
    <article>
      {data.length !== 0 ? (
        data.map((post) => <Tweet key={post.id} {...post} userId={userId} />)
      ) : (
        <p className='text-center'>작성한 글이 없습니다.</p>
      )}
    </article>
  );
}
