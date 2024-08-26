import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Social from '@/components/Social';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <section className='max-w-screen-2xl mx-auto py-5 flex gap-4'>
        <Sidebar />
        <main className='w-1/2'>{children}</main>
        <Social />
        {/* <BottomNav /> */}
      </section>
    </>
  );
}
