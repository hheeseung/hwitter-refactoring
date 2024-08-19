import GoogleIcon from '@/assets/icons/GoogleIcon';
import Link from 'next/link';

export default function Login() {
  return (
    <section className='text-center w-full p-7'>
      <div className='mt-14 mb-10 space-y-2'>
        <h1 className='font-bold text-3xl'>Login</h1>
        <p className='text-gray-500'>Log in to explore the wide world!</p>
      </div>
      <form className='flex flex-col items-center space-y-3'>
        <input className='auth-input' placeholder='Email' />
        <input className='auth-input' placeholder='Password' />
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
