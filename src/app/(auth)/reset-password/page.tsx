import Link from 'next/link';

export default function ResetPassword() {
  return (
    <section className='text-center w-full p-7'>
      <div className='mt-14 mb-10 space-y-2'>
        <h1 className='font-bold text-3xl'>Forgot Password?</h1>
        <p className='text-gray-500'>Input your email to reset password.</p>
      </div>
      <form className='flex flex-col items-center space-y-3'>
        <input className='auth-input' placeholder='Email' />
        <button className='auth-button bg-primary text-white' type='submit'>
          Reset
        </button>
      </form>
      <div className='space-y-4 my-5'>
        <p className='w-full my-7 text-gray-500 relative flex items-center justify-center'>
          <span className='flex-grow h-px bg-gray-300 mx-3' />
          <span>or</span>
          <span className='flex-grow h-px bg-gray-300 mx-3' />
        </p>
      </div>
      <p>
        <Link href='/login' className='text-primary font-semibold'>
          ← Back to Previous Page
        </Link>
      </p>
    </section>
  );
}
