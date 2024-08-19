import GoogleIcon from '@/assets/icons/GoogleIcon';
import Link from 'next/link';

export default function CreateAccount() {
  return (
    <section className='text-center w-full p-7'>
      <div className='mt-14 mb-10 space-y-2'>
        <h1 className='font-bold text-3xl'>Create Your Account</h1>
        <p className='text-gray-500'>Sign up and experience the wide world.</p>
      </div>
      <form className='flex flex-col items-center space-y-3'>
        <input
          type='text'
          className='auth-input'
          placeholder='Username'
          required
        />
        <input className='auth-input' placeholder='Email' />
        <input className='auth-input' placeholder='Password' />
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
