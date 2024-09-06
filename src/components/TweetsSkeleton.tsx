export default function TweetsSkeleton() {
  return (
    <article className='bg-white w-full h-60 rounded-xl shadow-md p-5 space-y-4 mb-4 *:animate-pulse'>
      <div className='flex items-center gap-3 mb-3'>
        <div className='size-11 bg-slate-200 rounded-xl' />
        <div className='flex flex-col gap-3'>
          <div className='h-3 w-14 bg-slate-200 rounded-sm' />
          <div className='h-3 w-32 bg-slate-200 rounded-sm' />
        </div>
      </div>
      <div className='h-20 w-full bg-slate-200 rounded-md' />
      <div className='bg-slate-200 w-32 h-8 rounded-sm float-end' />
    </article>
  );
}
