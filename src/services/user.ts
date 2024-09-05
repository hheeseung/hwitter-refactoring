interface IUpdateProfileImg {
  id: number;
  profileImg: string;
  profileImgId: string;
}

interface IUpdateUsername {
  id: number;
  username: string;
}

export async function updateUserProfile({
  id,
  profileImg,
  profileImgId,
}: IUpdateProfileImg) {
  const res = await fetch(`/api/user/${id}?action=updateProfileImg`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ profileImg, profileImgId }),
  });
  if (!res.ok) {
    throw new Error('Failed to update profile image');
  }
  return res;
}

export async function updateUsername({ id, username }: IUpdateUsername) {
  const res = await fetch(`/api/user/${id}?action=updateUsername`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });
  if (!res.ok) {
    throw new Error('Failed to update username');
  }
  return res;
}
