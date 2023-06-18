import { Post } from '@/pages/posts';
import Link from 'next/link';
import { FaUserNinja } from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const BASE_URL = 'posts/';

export function PostPreview({ title, author, slug }: Post) {
  return (
    <Link href={`${BASE_URL}${slug}`}>
      <div
        className={`border rounded-md p-3 flex items-center justify-between cursor-pointer
       hover:border-fuchsia-300 hover:-translate-y-0.5 hover:scale-x-95 transition-transform`}
      >
        <div className='flex flex-col gap-y-2'>
          <h2 className='text-2xl font-semibold'>{title}</h2>
          <div className='flex items-center gap-x-1'>
            <FaUserNinja size='1rem' />
            <span className='text-slate-300'>{author}</span>
          </div>
        </div>
        <MdKeyboardDoubleArrowRight size='3rem' fill='white' />
      </div>
    </Link>
  );
}
