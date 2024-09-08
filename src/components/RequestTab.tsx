import { requests } from '@/constant/request';
import Image from 'next/image';

export default async function RequestTab() {
  return (
    <article className='space-y-4'>
      <h1 className='font-bold text-slate-500 px-2 text-lg'>REQUESTS</h1>
      {requests.map((req, index) => (
        <div
          key={index}
          className='bg-white p-5 rounded-xl shadow-md space-y-4'
        >
          <div className='flex items-center gap-2'>
            <Image
              src={req.profileImg}
              alt={req.name}
              width={50}
              height={50}
              className='object-cover size-12 rounded-xl'
            />
            <p>
              <span className='font-bold'>{req.name}</span> wants to add you to
              friends
            </p>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <button
              type='button'
              className='bg-primary py-2 px-3 rounded-xl text-white w-full hover:brightness-110 transition-all'
            >
              Accept
            </button>
            <button
              type='button'
              className='bg-white border border-slate-200 py-2 px-3 rounded-xl w-full hover:brightness-90 transition-all'
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </article>
  );
}
