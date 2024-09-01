'use client';

import { getAllTweet } from '@/services/tweet';
import { useQuery } from '@tanstack/react-query';
import Tweet from './Tweet';

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

export default function Tweets() {
  const { data, isError, error, isPending } = useQuery<ITweet[]>({
    queryFn: getAllTweet,
    queryKey: ['tweets'],
  });

  if (isError) return <p className='text-center'>{error.message}</p>;

  if (isPending) return <p className='text-center'>Loading...</p>;

  return (
    <section className='overflow-y-scroll max-h-screen'>
      <ul className='space-y-3'>
        {data.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </ul>
    </section>
  );
}
