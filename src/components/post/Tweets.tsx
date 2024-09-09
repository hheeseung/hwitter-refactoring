'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllTweet } from '@/services/tweet';
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
    isFetchingNextPage,
    hasNextPage,
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

  if (isError) return <p className='text-center'>{error.message}</p>;

  if (isFetching)
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
      <div className='flex justify-center items-center'>
        <button
          type='button'
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {hasNextPage ? 'Load More' : ''}
        </button>
      </div>
    </ul>
  );
}
