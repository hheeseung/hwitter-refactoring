import { NextResponse } from 'next/server';

export async function POST() {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`,
      },
    }
  );

  const data = await res.json();
  if (res.ok) {
    return NextResponse.json(data, { status: 200 });
  } else {
    return NextResponse.json(data, { status: res.status });
  }
}
