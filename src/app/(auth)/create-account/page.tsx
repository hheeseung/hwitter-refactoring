'use client';

import GoogleIcon from '@/assets/icons/GoogleIcon';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import signup from './actions';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(signup, null);

  return (
    <section className='text-center w-full p-7'>
      <div className='mt-14 mb-10 space-y-2'>
        <h1 className='font-bold text-3xl'>Create Your Account</h1>
        <p className='text-gray-500'>Sign up and experience the wide world.</p>
      </div>
      <form
        action={dispatch}
        className='flex flex-col justify-center items-start space-y-3'
      >
        <input
          type='text'
          name='username'
          className='auth-input'
          placeholder='Username'
          required
        />
        {state?.fieldErrors.username?.map((error, index) => (
          <span key={index} className='text-like px-2'>
            {error}
          </span>
        ))}
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
          Create Account
        </button>
      </form>
      <div className='space-y-4 my-4'>
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
        Already have an account?{' '}
        <Link href='/login' className='text-primary'>
          Login here.
        </Link>
      </p>
    </section>
  );
}
