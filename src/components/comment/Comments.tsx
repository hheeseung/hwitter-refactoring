'use client';

import { getAllComments } from '@/services/comment';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

interface IComment {
  id: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    username: string;
    userId: number;
    profileImg: string;
  };
  userId: true;
}

export default function Comments() {
  const { id } = useParams();

  const {
    data: comments,
    isError,
    error,
    isPending,
  } = useQuery<IComment[]>({
    queryFn: () => getAllComments(Number(id)),
    queryKey: ['comments'],
  });

  if (isPending) return <p className='text-center'>Loading...</p>;

  if (isError) return <p className='text-center'>{error.message}</p>;

  return (
    <section className='px-2'>
      <h1 className='text-xl font-bold'>Comments</h1>
      <ul>
        {comments && comments.length > 0 ? (
          comments.map((comment) => <li key={comment.id}>{comment.comment}</li>)
        ) : (
          <p>작성된 댓글이 없습니다. </p>
        )}
      </ul>
    </section>
  );
}
