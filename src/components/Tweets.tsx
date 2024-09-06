'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllTweet } from '@/services/tweet';
import Tweet from './Tweet';
import TweetsSkeleton from './TweetsSkeleton';

export interface ITweet {
  id: number;
  tweet: string;
  image: string;
  createdAt: Date;
  user: {
    id: number;
    username: string;
    profileImg: string | null;
  };
}

export default function Tweets({ userId }: { userId: number }) {
  const { data, isError, error, isPending } = useQuery<ITweet[]>({
    queryFn: getAllTweet,
    queryKey: ['tweets'],
  });

  if (isError) return <p className='text-center'>{error.message}</p>;

  if (isPending)
    return new Array(10)
      .fill(null)
      .map((_, index) => <TweetsSkeleton key={index} />);

  return (
    <ul>
      {data.map((tweet) => (
        <Tweet userId={userId} key={tweet.id} {...tweet} />
      ))}
    </ul>
  );
}
