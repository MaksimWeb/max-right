import { Post } from '@/pages/posts';

export function arePosts(posts: unknown): posts is Post[] {
  return Array.isArray(posts);
}
