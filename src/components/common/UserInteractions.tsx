'use client';

import { addLikes, deleteLikes } from '@/services/likes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { TfiComment } from 'react-icons/tfi';

interface Props {
  tweetId: number;
  count: {
    likes: number;
    comments: number;
  };
  likes: {
    userId: number;
    tweetId: number;
  }[];
  userId: number;
}

export default function UserInteractions({
  tweetId,
  count,
  likes,
  userId,
}: Props) {
  const queryClient = useQueryClient();

  const isLiked = !!likes.find((like) => like.userId === userId);
  const [isLike, setIsLike] = useState(isLiked);

  const mutation = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      if (isLike) {
        return addLikes({ id });
      } else {
        return deleteLikes({ id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
      queryClient.invalidateQueries({ queryKey: ['tweets', tweetId] });
    },
  });

  const onLikeClick = () => {
    setIsLike((prev) => !prev);
    mutation.mutate({ id: tweetId });
  };

  return (
    <div className='bottom-5 right-5 flex justify-end items-center'>
      <div className='flex items-center gap-3 px-1 text-slate-500'>
        <button
          type='button'
          className='flex items-center gap-1'
          onClick={onLikeClick}
        >
          {isLike ? (
            <IoMdHeart className='size-7 text-like' />
          ) : (
            <IoMdHeartEmpty className='size-7' />
          )}
          <span>{count.likes}</span>
        </button>
        <div className='flex items-center gap-1'>
          <TfiComment className='size-6' />
          <span>{count.comments}</span>
        </div>
        {/* <IoShareSocialOutline className='size-6' /> */}
      </div>
    </div>
  );
}
