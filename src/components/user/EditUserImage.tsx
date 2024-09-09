'use client';

import { deleteImageURL, getImageURL, getUploadURL } from '@/lib/cloudflare';
import { updateUserProfile } from '@/services/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import UserIcon from '../ui/UserIcon';

interface EditUserImageProps {
  userId: number;
  profileImg: string | null;
  profileImgId: string | null;
}

export default function EditUserImage({
  userId,
  profileImg,
  profileImgId,
}: EditUserImageProps) {
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState(profileImg);
  const [imageId, setImageId] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageSubmitting, setImageSubmitting] = useState(false);

  const imgMutation = useMutation({
    mutationKey: ['user', userId],
    mutationFn: ({
      id,
      image,
      imgId,
    }: {
      id: number;
      image: string;
      imgId: string;
    }) => updateUserProfile({ id, profileImg: image, profileImgId: imgId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      window.alert('프로필 이미지가 변경되었습니다.');
    },
    onError: () => window.alert('프로필 이미지 변경에 실패했습니다.'),
  });

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files || files.length === 0) return;

    const previewURL = URL.createObjectURL(files[0]);
    setPreview(previewURL);
    setImageFile(files[0]);

    setIsUploading(true);

    try {
      const { success, result } = await getUploadURL();

      if (success) {
        const { id, uploadURL } = result;
        setUploadUrl(uploadURL);
        setImageId(id);
      } else {
        window.alert('업로드 URL을 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('업로드 URL을 가져오는 중 에러 발생:', error);
      window.alert('업로드 URL을 가져오는 중 에러가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile || !uploadUrl) {
      window.alert('이미지를 선택하고 다시 시도해 주세요.');
      return;
    }

    setImageSubmitting(true);

    try {
      const imageURL = await getImageURL({
        preview,
        imageFile,
        uploadUrl,
        imageId,
      });

      if (!imageURL) {
        window.alert('이미지 업로드에 실패했습니다.');
        return;
      }

      if (profileImgId) {
        await deleteImageURL(profileImgId);
      }

      imgMutation.mutate({
        id: userId,
        image: imageURL!,
        imgId: imageId,
      });
    } catch (error) {
      console.error('이미지 변경 중 에러 발생:', error);
      window.alert('이미지 변경 중 에러가 발생했습니다.');
    } finally {
      setImageSubmitting(false);
    }
  };

  return (
    <div className='w-full'>
      {preview ? (
        <Image
          src={
            preview.includes('imagedelivery') ? `${preview}/public` : preview
          }
          alt='user'
          width={150}
          height={150}
          className='rounded-full mx-auto size-36 object-cover shadow-md'
        />
      ) : (
        <UserIcon custom='size-36 bg-white rounded-full pt-4 mx-auto shadow-md' />
      )}
      <form
        onSubmit={handleImageSubmit}
        className='flex justify-center items-center gap-2 mt-4'
      >
        <label
          htmlFor='profile'
          className='bg-white rounded-xl px-3 py-2 shadow-sm cursor-pointer'
        >
          이미지 선택
        </label>
        <input id='profile' type='file' onChange={onImageChange} hidden />
        <button
          type='submit'
          className={`bg-primary text-white rounded-xl px-3 py-2 shadow-sm ${
            isUploading || isImageSubmitting
              ? 'cursor-not-allowed opacity-50'
              : ''
          }`}
          disabled={isUploading || isImageSubmitting}
        >
          {isUploading ? '업로드 중...' : '변경하기'}
        </button>
      </form>
    </div>
  );
}
