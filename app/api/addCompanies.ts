import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('req', req)
  console.log('req', res)

  res.json({ message: 'added-companies' })
}