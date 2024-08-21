'use client';

import GoogleIcon from '@/assets/icons/GoogleIcon';
import { signIn } from 'next-auth/react';

export default function GoogleLoginButton() {
  return (
    <button
      className='auth-button bg-white flex justify-center items-center gap-2 text-primary'
      type='button'
      onClick={() => signIn()}
    >
      <GoogleIcon />
      <span>Continue with Google</span>
    </button>
  );
}
