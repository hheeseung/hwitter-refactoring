'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllTweet } from '@/services/tweet';
import { useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
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
    likes: {
      user: {
        id: number;
      };
    };
  };
  comments: unknown[];
  likes: {
    userId: number;
    tweetId: number;
  }[];
  _count: {
    likes: number;
    comments: number;
  };
}

export interface PageData {
  tweets: ITweet[];
  hasNextPage: boolean;
}

export default function Tweets({ userId }: { userId: number }) {
  const {
    data: tweets,
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

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  const renderTweetItem = useCallback(
    (_: number, tweet: ITweet) => <Tweet userId={userId} {...tweet} />,
    [userId]
  );

  if (isError) return <p className='text-center'>{error.message}</p>;

  if (isFetching && !isFetchingNextPage)
    return new Array(10)
      .fill(null)
      .map((_, index) => <TweetsSkeleton key={index} />);

  return (
    <Virtuoso
      useWindowScroll
      endReached={loadMore}
      data={tweets?.pages.flatMap((page) => page.tweets) || []}
      itemContent={renderTweetItem}
    />
  );
}
