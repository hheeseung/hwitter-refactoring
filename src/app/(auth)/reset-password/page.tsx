'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { reset } from './actions';

export default function CheckEmail() {
  const [state, dispatch] = useFormState(reset, null);

  return (
    <section className='text-center w-full p-7'>
      <div className='mt-14 mb-8 space-y-2'>
        <h1 className='font-bold text-3xl'>Forgot Password?</h1>
        <p className='text-gray-500'>Reset your password here.</p>
      </div>
      <form
        action={dispatch}
        className='flex flex-col items-start justify-center space-y-2'
      >
        <input
          type='email'
          name='email'
          className='auth-input'
          placeholder='Email'
          required
        />
        {state &&
          state.errors?.fieldErrors.email?.map((error, index) => (
            <span key={index} className='px-2 py-1 text-like'>
              {error}
            </span>
          ))}
        <input
          type='password'
          name='password'
          className='auth-input'
          placeholder='Enter Your New Password'
          required
        />
        <span>{state?.errors?.fieldErrors.password}</span>
        <button type='submit' className='auth-button bg-primary text-white'>
          Reset
        </button>
      </form>
      <p className='py-3 text-green-500 font-semibold'>{state?.success}</p>
      <p className='mt-5'>
        <Link href='/login' className='text-primary font-semibold'>
          ← Back to Login Page
        </Link>
      </p>
    </section>
  );
}
