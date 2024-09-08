import { contacts } from '@/constant/contact';
import Image from 'next/image';
import { BsThreeDots } from 'react-icons/bs';

export default function ContactTab() {
  return (
    <article>
      <h1 className='font-bold text-slate-500 px-2 text-lg mb-4'>CONTACTS</h1>
      <div className='bg-white rounded-xl shadow-md'>
        {contacts.map((contact, index) => (
          <div key={index} className='p-5 hover:bg-background hover:rounded-xl'>
            <div className='flex items-center gap-2'>
              <Image
                src={contact.profileImg}
                alt={contact.name}
                width={50}
                height={50}
                className='object-cover size-[50px] rounded-xl aspect-square'
              />
              <div className='flex justify-between items-center w-full'>
                <p className='font-bold'>{contact.name}</p>
                <BsThreeDots className='text-slate-500 text-xl' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
