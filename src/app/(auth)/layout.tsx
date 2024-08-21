export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex flex-col justify-center items-center max-w-md mx-auto bg-background'>
      {children}
    </section>
  );
}
