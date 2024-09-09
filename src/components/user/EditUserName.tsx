'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { IUpdateUsername, updateUsername } from '@/services/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface EditUserNameProps {
  userId: number;
  username: string;
}

export default function EditUserName({ userId, username }: EditUserNameProps) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(username);
  const [isNameSubmitting, setIsNameSubmitting] = useState(false);

  const usernameMutation = useMutation({
    mutationKey: ['user', userId],
    mutationFn: (newUsername: IUpdateUsername) => updateUsername(newUsername),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      window.alert('사용자 이름이 변경되었습니다.');
    },
    onError: () => window.alert('사용자 이름 변경에 실패했습니다.'),
  });

  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNameSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNameSubmitting) return;

    if (!name.trim()) {
      window.alert('유효한 사용자 이름을 입력하세요.');
      return;
    }

    setIsNameSubmitting(true);

    try {
      usernameMutation.mutate({ id: userId, username: name });
    } catch (error) {
      console.error('닉네임 변경 중 에러 발생:', error);
      window.alert('닉네임 변경 중 에러가 발생했습니다.');
    } finally {
      setIsNameSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleNameSubmit}
      className='flex justify-center items-center gap-1 mt-3 *:shadow-sm'
    >
      <input
        type='text'
        value={name}
        onChange={onUsernameChange}
        className='bg-white outline-none px-3 py-2 rounded-xl'
      />
      <button
        type='submit'
        className={`bg-primary text-white p-2 rounded-xl ${
          isNameSubmitting ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={isNameSubmitting}
      >
        변경
      </button>
    </form>
  );
}
