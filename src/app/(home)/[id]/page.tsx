'use client';

import Tweet from '@/components/Tweet';
import { getTweetById } from '@/services/tweet';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function Detail() {
  const { id } = useParams();
  const { data, isError, error, isPending } = useQuery({
    queryFn: () => getTweetById(Number(id)),
    queryKey: ['tweet', id],
  });

  if (isPending) return <p className='text-center'>Loading...</p>;

  if (isError) return <p className='text-center'>{error.message}</p>;

  return <Tweet {...data} />;
}
