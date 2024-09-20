export async function addLikes({ id }: { id: number }) {
  const res = await fetch(`/api/likes/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to Add Likes');
  }
  return res;
}

export async function deleteLikes({ id }: { id: number }) {
  const res = await fetch(`/api/likes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to Add Likes');
  }
  return res;
}
