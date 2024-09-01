interface CreateProps {
  tweet: string;
  image: string;
}

export async function createTweet({ tweet, image }: CreateProps) {
  const res = await fetch('/api/tweet', {
    method: 'POST',
    body: JSON.stringify({ tweet, image }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
  if (!res.ok) {
    throw new Error('Failed to create tweet');
  }

  const data = await res.json();
  return data;
}

export async function getAllTweet() {
  const res = await fetch('/api/tweet', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch tweets');
  }

  const data = await res.json();
  return data;
}
