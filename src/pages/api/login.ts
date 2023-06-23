/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { headers, body } = req;

  try {
    const { data, headers: returnedHeaders } = await axios.post(
      'http://localhost:3000/login',
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1] as string)
    );

    res.status(200).json(data); // Send data from Node.js server response
  } catch (error: any) {
    console.log(`My custom error ${error}`);
  }
}
