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
      <section className='max-w-screen-2xl mx-auto py-5 flex gap-2'>
        <Sidebar />
        <main className='w-1/2 bg-white rounded-xl shadow-md p-3'>
          {children}
        </main>
        <Social />
        {/* <BottomNav /> */}
      </section>
    </>
  );
}
