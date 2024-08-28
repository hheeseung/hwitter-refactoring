'use client';

import Image from 'next/image';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { useFormState } from 'react-dom';
import { addTweet, getUploadURL } from '@/app/(home)/actions';
import { ChangeEvent, useState } from 'react';
import UserIcon from './UserIcon';

interface Props {
  profileImg: string;
}

export default function TweetUploadForm({ profileImg }: Props) {
  const [preview, setPreview] = useState('');
  const [imageId, setImageId] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    const previewURL = URL.createObjectURL(files[0]);
    setPreview(previewURL);

    const { success, result } = await getUploadURL();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setImageId(id);
    }
  };

  const setPhotoAction = async (_: unknown, formData: FormData) => {
    const photoData = formData.get('photo');

    if (!preview) {
      const photoURL = '';
      formData.set('photo', photoURL);
    } else {
      const cloudflareForm = new FormData();
      cloudflareForm.append('file', photoData!);
      const res = await fetch(uploadUrl, {
        method: 'POST',
        body: cloudflareForm,
      });
      if (!res.ok) {
        alert('업로드에 실패했습니다.');
        return;
      }
      const photoURL = `https://imagedelivery.net/TkBJiZLQuPhAy6jY41Kdvg/${imageId}`;
      formData.set('photo', photoURL);
    }
    return addTweet(_, formData);
  };

  const [state, dispatch] = useFormState(setPhotoAction, null);

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
        <form action={dispatch} className='flex flex-col w-full'>
          <textarea
            rows={5}
            className='resize-none w-full bg-background outline-none rounded-xl p-4'
            placeholder="What's happening?!"
            name='tweet'
            required
          />
          {state && <span>{state.fieldErrors.tweet}</span>}
          <div className='flex justify-between items-center py-1'>
            {preview ? (
              <Image
                src={preview}
                alt='preview'
                width={45}
                height={45}
                className='object-cover h-[45px]'
              />
            ) : (
              <label htmlFor='photo' className='cursor-pointer'>
                <HiOutlinePhoto className='size-8 text-primary' />
              </label>
            )}
            <input
              type='file'
              accept='image/*'
              id='photo'
              name='photo'
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
          {state && <span>{state.fieldErrors.photo}</span>}
        </form>
      </div>
    </section>
  );
}
