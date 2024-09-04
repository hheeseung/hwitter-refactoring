'use client';

import { getTweetById } from '@/services/tweet';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Tweet from './Tweet';
import { ITweet } from './Tweets';

export default function TweetDetail({ userId }: { userId: number }) {
  const { id } = useParams();
  const { data, isError, error, isPending } = useQuery<ITweet>({
    queryFn: () => getTweetById(Number(id)),
    queryKey: ['tweets', id],
  });

  if (isPending) return <p className='text-center'>Loading...</p>;

  if (isError) return <p className='text-center'>{error.message}</p>;

  return (
    <section className='relative'>
      <Tweet userId={userId} {...data} />
    </section>
  );
}
