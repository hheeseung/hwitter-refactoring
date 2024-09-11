import ContactTab from './ContactTab';
import RequestTab from './RequestTab';

export default function Social() {
  return (
    <aside className='hidden lg:block lg:w-1/4 space-y-8'>
      <RequestTab />
      <ContactTab />
    </aside>
  );
}
