import ContactTab from './ContactTab';
import RequestTab from './RequestTab';

export default function Social() {
  return (
    <aside className='space-y-8'>
      <RequestTab />
      <ContactTab />
    </aside>
  );
}
