'use client';

import { EditProps, updateTweet } from '@/services/tweet';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';

interface Props {
  id: number;
  tweet: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export default function EditForm({ id, tweet, setIsEdit }: Props) {
  const queryClient = useQueryClient();
  const [editedTweet, setEditedTweet] = useState(tweet);

  const mutation = useMutation({
    mutationFn: (newTweet: EditProps) => updateTweet(newTweet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
      queryClient.invalidateQueries({ queryKey: ['tweets', id] });
      setIsEdit(false);
    },
  });

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedTweet(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      mutation.mutate({ id, tweet: editedTweet });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className='bg-background p-5 mb-5 rounded-xl shadow-md'
    >
      <textarea
        className='bg-white w-full resize-none outline-none p-4 rounded-xl shadow-sm'
        value={editedTweet}
        onChange={onChange}
        rows={4}
      />
      <div className='flex justify-end gap-2'>
        <button
          type='submit'
          className='bg-primary rounded-xl px-3 py-2 text-white mt-2'
        >
          Edit
        </button>
        <button
          type='button'
          onClick={() => setIsEdit((prev) => !prev)}
          className='bg-white border rounded-xl px-3 py-2 mt-2'
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
