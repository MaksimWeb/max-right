import { REVALIDATE_INTERVAL } from '@/utils';
import { PostsList } from '../pages-lib/posts/posts-list';
import Button from '@/components/button';
import { Form } from '@/components/form';
import { useState } from 'react';
import { useWebSocket } from '@/utils/useWebsocket';
import { arePosts } from '@/utils/arePosts';
import { useUserCredentials } from '@/utils/useUserCredentials';

export default function PostsPage({ posts }: Props) {
  const { user } = useUserCredentials();

  const { message } = useWebSocket();
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {!message ? (
        <div>
          <h1>Данные отсутствуют</h1>
        </div>
      ) : (
        <div>
          {user ? (
            <div className='container py-12'>
              <Button
                text='Создать пост'
                className='bg-rose-300 rounded-md p-2'
                handleClick={() => {
                  setShowForm(true);
                }}
              />
            </div>
          ) : null}

          {posts?.length ? (
            <section className='container py-12'>
              <h2 className='text-3xl font-bold mb-8'> Список постов</h2>
              <PostsList
                posts={arePosts(message.message) ? message.message : posts}
              />
            </section>
          ) : null}

          {showForm && <Form setShowForm={setShowForm} />}
        </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/posts');
  const posts = await res.json();

  if (!posts) {
    return {
      notFound: true,
      revalidate: REVALIDATE_INTERVAL,
    };
  }

  return {
    props: {
      posts,
    },
    revalidate: REVALIDATE_INTERVAL,
  };
}

interface Props {
  posts: Post[];
}

export interface Post {
  _id: string;
  title: string;
  author: string;
  text: string;
  image: Image;
  slug: string;
}

interface Image {
  src: string;
  alt: string;
}
