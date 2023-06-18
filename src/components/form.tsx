import { Dispatch, SetStateAction, useState } from 'react';
import ModalButton from './modal-button';
import Portal from './portal';
import axios from 'axios';

import { useUserCredentials } from '@/utils/useUserCredentials';

interface IPost {
  title: string;
  text: string;
  slug: string;
}

interface Props {
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

export function Form({ setShowForm }: Props) {
  const { user } = useUserCredentials();

  const [post, setPost] = useState({
    title: '',
    text: '',
    slug: '',
  });

  const handleConnection = async (post: IPost) => {
    const req = await axios.post(
      'http://localhost:3000/posts',
      {
        ...post,
        image: user?.image,
        author: user?.name,
      },
      { headers: { Authorization: `Bearer ${user?.accessToken ?? ''}` } }
    );

    if (req?.data?.acknowledged) {
      setShowForm(false);
    }
  };

  return (
    <Portal>
      <form className='flex flex-col gap-y-2 bg-white p-5 rounded-sm absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
        <input
          type='text'
          className='border p-2'
          placeholder='Заголовок'
          onChange={(e) =>
            setPost((prev) => ({
              ...prev,
              title: e.target.value,
              slug: e.target.value,
            }))
          }
        />
        <textarea
          className='border p-2'
          placeholder='Текст'
          onChange={(e) =>
            setPost((prev) => ({ ...prev, text: e.target.value }))
          }
        />
        <ModalButton
          text='Опубликовать'
          data={post}
          handleClick={handleConnection}
        />
      </form>
    </Portal>
  );
}
