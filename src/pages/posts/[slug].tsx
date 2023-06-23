import type {
  InferGetStaticPropsType,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { Post } from '.';
import { REVALIDATE_INTERVAL } from '@/utils';

import { PostAuthor } from '../pages-lib/posts/post-author';
import { getPost } from '@/lib';

export default function PostDetailPage({
  post,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
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

export async function getServerSideProps({
  req,
  res,
  query,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  query: { slug: string };
}) {
  console.log(query);

  if (!query?.slug) {
    return {
      notFound: true,
      revalidate: REVALIDATE_INTERVAL,
    };
  }

  const cookie = req.headers['cookie'];

  const post = await getPost(query.slug, cookie);

  if (!post) {
    return {
      notFound: true,
      revalidate: REVALIDATE_INTERVAL,
    };
  }

  return { props: { post: post } };
}
