'use client';

import EditUserImage from './EditUserImage';
import EditUserName from './EditUserName';

interface Props {
  user: {
    id: number;
    username: string;
    profileImg: string | null;
    profileImgId: string | null;
  };
}

export default function EditUser({ user }: Props) {
  return (
    <article className='w-full'>
      <EditUserImage
        userId={user.id}
        profileImg={user.profileImg}
        profileImgId={user.profileImgId}
      />
      <EditUserName userId={user.id} username={user.username} />
    </article>
  );
}
