export default function UserSkeleton() {
  return (
    <article className='bg-white flex items-center gap-3 w-full rounded-xl p-4 shadow-md mb-3'>
      <div className='size-11 bg-slate-200 rounded-xl animate-pulse' />
      <div className='flex flex-col gap-3 *:animate-pulse'>
        <div className='bg-slate-200 w-14 h-3 rounded-sm' />
        <div className='bg-slate-200 w-32 h-3 rounded-sm' />
      </div>
    </article>
  );
}
