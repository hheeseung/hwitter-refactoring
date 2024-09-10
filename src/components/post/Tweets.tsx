'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllTweet } from '@/services/tweet';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaSpinner } from 'react-icons/fa';
import Tweet from './Tweet';
import TweetsSkeleton from '../ui/TweetsSkeleton';

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

export interface PageData {
  tweets: ITweet[];
  hasNextPage: boolean;
}

export default function Tweets({ userId }: { userId: number }) {
  const {
    data,
    isError,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PageData>({
    queryFn: ({ pageParam }) => getAllTweet({ page: pageParam }),
    queryKey: ['tweets'],
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.tweets.length + 1;
      } else {
        return undefined;
      }
    },
  });
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (isError) return <p className='text-center'>{error.message}</p>;

  if (isFetching && !isFetchingNextPage)
    return new Array(10)
      .fill(null)
      .map((_, index) => <TweetsSkeleton key={index} />);

  return (
    <ul>
      {data?.pages.flatMap((page) =>
        page.tweets.map((tweet) => (
          <Tweet userId={userId} key={tweet.id} {...tweet} />
        ))
      )}
      <div ref={ref} />
      {isFetchingNextPage && (
        <FaSpinner className='mx-auto text-blue-400 size-8 animate-spin' />
      )}
    </ul>
  );
}
