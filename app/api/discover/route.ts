import { NextResponse } from 'next/server'
import { getDbSession } from '../lib/neo4j'
import { streamToString } from '../lib/helpers/streamToString'

export async function POST(req: Request) {
  let session
  const stream = req.body
  try {
    session = await getDbSession()

    const query = await streamToString(stream)
    // TODO: Add sanitization to query, but since it is a read operation it is fairly safe
    
    if (!query) return NextResponse.json({ message: 'Invalid query provided.' })

    const resp = await session.executeRead(async tx => {
      return await tx.run(query)
    });

    return NextResponse.json({ results: resp.records })
  } catch (err) {
    return NextResponse.json({ message: 'Sorry, there was an error with your query. Please check the syntax.', error: err })
  } finally {
    session && await session.close()
  }
}