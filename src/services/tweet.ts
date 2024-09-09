interface CreateProps {
  tweet: string;
  image: string;
}

export interface EditProps {
  id: number;
  tweet: string;
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

export async function getAllTweet({ page }: { page: unknown }) {
  const res = await fetch(`api/tweet?page=${page}`, {
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

export async function getTweetById(id: number) {
  const res = await fetch(`/api/tweet/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch tweet');
  }

  const data = await res.json();
  return data;
}

export async function updateTweet({ id, tweet }: EditProps) {
  const res = await fetch(`/api/tweet/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tweet }),
    credentials: 'same-origin',
  });
  if (!res.ok) {
    throw new Error('Failed to edit tweet');
  }
  const data = await res.json();
  return data;
}

export async function deleteTweet(id: number) {
  const res = await fetch(`/api/tweet/${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
  });
  if (!res.ok) {
    throw new Error('Failed to delete tweet');
  }
}
