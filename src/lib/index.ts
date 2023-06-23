import axios from 'axios';

export async function getPost(slug: string, cookie?: string) {
  const response = await axios.get(`http://localhost:3001/api/posts/${slug}`, {
    withCredentials: true,
    headers: {
      'Set-Cookie': cookie,
    },
  });

  return response.data;
}
