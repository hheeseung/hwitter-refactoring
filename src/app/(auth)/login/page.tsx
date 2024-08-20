'use client';

import GoogleIcon from '@/assets/icons/GoogleIcon';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import login from './actions';

export default function Login() {
  const [state, dispatch] = useFormState(login, null);

  return (
    <section className='text-center w-full p-7'>
      <div className='mt-14 mb-10 space-y-2'>
        <h1 className='font-bold text-3xl'>Login</h1>
        <p className='text-gray-500'>Log in to explore the wide world!</p>
      </div>
      <form
        action={dispatch}
        className='flex flex-col justify-center items-start space-y-3'
      >
        <input
          type='email'
          name='email'
          className='auth-input'
          placeholder='Email'
          required
        />
        {state?.fieldErrors.email?.map((error, index) => (
          <span key={index} className='text-like px-2'>
            {error}
          </span>
        ))}
        <input
          type='password'
          name='password'
          className='auth-input'
          placeholder='Password'
          required
        />
        <span className='text-like px-2'>{state?.fieldErrors.password}</span>
        <button className='auth-button bg-primary text-white' type='submit'>
          Login
        </button>
      </form>
      <div className='space-y-4 my-5'>
        <Link href='/reset-password' className='text-primary font-semibold'>
          Forgot Password?
        </Link>
        <p className='w-full my-7 text-gray-500 relative flex items-center justify-center'>
          <span className='flex-grow h-px bg-gray-300 mx-3' />
          <span>or</span>
          <span className='flex-grow h-px bg-gray-300 mx-3' />
        </p>
        <button
          className='auth-button bg-white flex justify-center items-center gap-2 text-primary'
          type='button'
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>
      </div>
      <p>
        Don&apos;t have an account?{' '}
        <Link href='/create-account' className='text-primary'>
          Create account here.
        </Link>
      </p>
    </section>
  );
}
