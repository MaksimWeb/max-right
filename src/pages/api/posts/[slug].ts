import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, headers, query } = req;
  const cookie = headers['set-cookie'] ? headers['set-cookie'][0] : null;
  if (!cookie) {
    res.status(403).json({ message: 'Not Allowed To Get Post' });
  }

  try {
    const response = await axios.get(
      `http://localhost:3000/post-preview?type=${query.slug}`
    );

    res.status(200).send(response.data);
  } catch (error) {
    console.log(`My custom error ${error}`);
  }
}
