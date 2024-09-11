import BottomNav from '@/components/common/BottomNav';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Social from '@/components/ui/Social';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <section className='max-w-screen-2xl mx-auto py-5 flex flex-col lg:px-2 2xl:px-0'>
        <section className='flex gap-4'>
          <Sidebar />
          <main className='w-full px-4 pb-14 lg:p-0 lg:w-1/2'>{children}</main>
          <Social />
        </section>
        <BottomNav />
      </section>
    </>
  );
}
