'use client';

import Image from 'next/image';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { ChangeEvent, FormEvent, useState } from 'react';
import { getImageURL, getUploadURL } from '@/lib/cloudflare';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTweet } from '@/services/tweet';
import UserIcon from './UserIcon';

interface Props {
  profileImg: string;
}

export default function TweetUploadForm({ profileImg }: Props) {
  const queryClient = useQueryClient();
  const [tweet, setTweet] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [imageId, setImageId] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');

  const mutation = useMutation({
    mutationFn: createTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
    },
  });

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    const previewURL = URL.createObjectURL(files[0]);
    setPreview(previewURL);
    setImageFile(files[0]);

    const { success, result } = await getUploadURL();

    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setImageId(id);
    }
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imageURL = await getImageURL({
      preview,
      imageFile,
      uploadUrl,
      imageId,
    });
    mutation.mutate({ tweet, image: imageURL! });
    setTweet('');
    setImageFile(null);
    setPreview('');
  };

  return (
    <section className='bg-white p-4 rounded-xl shadow-md'>
      <div className='flex gap-2 justify-between items-start'>
        {profileImg ? (
          <Image
            src={profileImg}
            alt='user-profile'
            width={50}
            height={50}
            className='rounded-xl'
          />
        ) : (
          <UserIcon custom='w-[45px] h-[45px]' />
        )}
        <form onSubmit={handleSubmit} className='flex flex-col w-full'>
          <textarea
            rows={5}
            className='resize-none w-full bg-background outline-none rounded-xl p-4'
            placeholder="What's happening?!"
            name='tweet'
            onChange={onChange}
            value={tweet}
            required
          />
          <div className='flex justify-between items-center py-1'>
            {preview ? (
              <Image
                src={preview}
                alt='preview'
                width={45}
                height={45}
                className='object-cover h-[45px] rounded-xl'
              />
            ) : (
              <label htmlFor='image' className='cursor-pointer'>
                <HiOutlinePhoto className='size-8 text-primary' />
              </label>
            )}
            <input
              type='file'
              accept='image/*'
              id='image'
              name='image'
              className='hidden'
              onChange={onImageChange}
            />
            <button
              type='submit'
              className='bg-primary rounded-xl px-3 py-2 text-white mt-2'
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
