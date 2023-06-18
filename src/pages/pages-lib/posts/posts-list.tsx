import { Post } from '@/pages/posts';
import { PostPreview } from './post-preview';

export function PostsList({ posts }: Props) {
  return (
    <div className='flex flex-col gap-y-2'>
      {posts.map((post) => (
        <PostPreview key={post._id} {...post} />
      ))}
    </div>
  );
}

interface Props {
  posts: Post[];
}
