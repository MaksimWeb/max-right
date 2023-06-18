import type { IImage } from '@/store/post';
import Image from 'next/image';

interface Props {
  author: string;
  image: IImage;
}

export function PostAuthor({ author, image }: Props) {
  return (
    <div className='flex items-center gap-x-4'>
      <h2>Автор: {author}</h2>
      <div className='relative w-20 h-20'>
        <Image className='rounded-2xl' fill src={image.src} alt={image.alt} />
      </div>
    </div>
  );
}
