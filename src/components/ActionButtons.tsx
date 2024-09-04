'use client';

import { Dispatch, SetStateAction } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';
import { FiEdit } from 'react-icons/fi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTweet } from '@/services/tweet';
import { useRouter } from 'next/navigation';

interface Props {
  id: number;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export default function ActionButtons({ id, setIsEdit }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
      router.push('/');
    },
  });

  const onEditClick = () => {
    setIsEdit((prev) => !prev);
  };

  const onDeleteClick = () => {
    const ok = window.confirm('삭제하시겠습니까?');
    if (ok) {
      mutation.mutate(id);
    }
  };

  return (
    <div className='flex justify-start items-center gap-1'>
      <button type='button' aria-label='edit' onClick={onEditClick}>
        <FiEdit className='text-primary size-5' />
      </button>
      <button type='button' aria-label='delete' onClick={onDeleteClick}>
        <HiOutlineXMark className='text-like size-5' />
      </button>
    </div>
  );
}
