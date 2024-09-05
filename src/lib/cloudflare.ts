interface Props {
  preview: string | null;
  imageFile: File | null;
  uploadUrl: string;
  imageId: string;
}

export async function getUploadURL() {
  const res = await fetch('/api/cloudflare', {
    method: 'POST',
  });
  const data = await res.json();
  return data;
}

export async function getImageURL({
  preview,
  imageFile,
  uploadUrl,
  imageId,
}: Props) {
  if (!preview) {
    const imageURL = '';
    return imageURL;
  } else {
    const cloudflareForm = new FormData();
    cloudflareForm.append('file', imageFile!);
    const res = await fetch(uploadUrl, {
      method: 'POST',
      body: cloudflareForm,
    });
    if (!res.ok) {
      alert('업로드에 실패했습니다.');
      return;
    }
    const imageURL = `https://imagedelivery.net/TkBJiZLQuPhAy6jY41Kdvg/${imageId}`;
    return imageURL;
  }
}

export async function deleteImageURL(profileImgId: string) {
  await fetch(`/api/cloudflare?profileImgId=${profileImgId}`, {
    method: 'DELETE',
  });
}
