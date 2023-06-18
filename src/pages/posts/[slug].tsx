import type { InferGetStaticPropsType } from 'next';
import type { Post } from '.';
import { REVALIDATE_INTERVAL } from '@/utils';

import { PostAuthor } from '../pages-lib/posts/post-author';
import axios from 'axios';
import { cookies } from 'next/dist/client/components/headers';

export default function PostDetailPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className='container py-12'>
      <div className='flex justify-between items-center w-full mb-14'>
        <h1 className='text-3xl font-bold'>{post.title}</h1>
        {post.author && post.image ? (
          <PostAuthor author={post.author} image={post.image} />
        ) : null}
      </div>
      <p className='text-2xl font-semibold border rounded-md p-5'>
        {post.text}
      </p>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/posts');
  const posts: Post[] = await res.json();

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: any) {
  if (!params?.slug) {
    return {
      notFound: true,
      revalidate: REVALIDATE_INTERVAL,
    };
  }

  let accessToken = '';

  if (typeof window !== 'undefined') {
    accessToken = JSON.parse(window.sessionStorage.get('auth'))?.accessToken;
  }

  const res = axios.get(
    `http://localhost:3000/post-preview?type=${params.slug}`,
    {
      withCredentials: true,
    }
  );
  const post: Post = (await res).data;

  if (!post) {
    return {
      notFound: true,
      revalidate: REVALIDATE_INTERVAL,
    };
  }

  return { props: { post }, revalidate: REVALIDATE_INTERVAL };
}
