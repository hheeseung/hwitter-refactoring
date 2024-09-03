'use client';

import { getTweetById } from '@/services/tweet';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { FiEdit } from 'react-icons/fi';
import { HiOutlineXMark } from 'react-icons/hi2';
import Tweet from './Tweet';
import { ITweet } from './Tweets';

export default function TweetDetail({ userId }: { userId: number }) {
  const { id } = useParams();
  const { data, isError, error, isPending } = useQuery<ITweet>({
    queryFn: () => getTweetById(Number(id)),
    queryKey: ['tweet', id],
  });

  if (isPending) return <p className='text-center'>Loading...</p>;

  if (isError) return <p className='text-center'>{error.message}</p>;

  return (
    <section className='relative'>
      <Tweet {...data} />
      {userId === data.user.id && (
        <div className='flex justify-start items-center gap-1 *:size-5 absolute top-5 right-5'>
          <FiEdit className='text-primary' />
          <HiOutlineXMark className='text-like' />
        </div>
      )}
    </section>
  );
}
