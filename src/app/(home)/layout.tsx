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
      <section className='max-w-screen-2xl mx-auto py-5 flex gap-4'>
        <Sidebar />
        <main className='w-1/2'>{children}</main>
        <Social />
        {/* <BottomNav /> */}
      </section>
    </>
  );
}
