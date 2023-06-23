import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

/* eslint-disable import/no-anonymous-default-export */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req;

  try {
    const { data, headers: returnedHeaders } = await axios.post(
      'http://localhost:3000/auth/refresh-token',
      undefined,
      { headers }
    );

    Object.keys(returnedHeaders).forEach((key) =>
      res.setHeader(key, returnedHeaders[key])
    );

    res.status(200).json(data);
  } catch (error) {
    res.send(error);
  }
};
