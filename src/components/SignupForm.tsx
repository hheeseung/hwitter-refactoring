'use client';

import signup from '@/app/(auth)/create-account/actions';
import { useFormState } from 'react-dom';

export default function SignupForm() {
  const [state, dispatch] = useFormState(signup, null);

  return (
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
  );
}
