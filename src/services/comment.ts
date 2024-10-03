export async function getAllComments(tweetId: number) {
  const res = await fetch(`/api/comments/${tweetId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch comments');
  }

  const data = await res.json();
  return data;
}
