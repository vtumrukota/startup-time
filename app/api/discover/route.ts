import url from 'url'
import { NextResponse } from 'next/server'
import { getDbSession } from '../lib/neo4j'

export async function GET(req: Request) {
  const parsedUrl = url.parse(req.url, true)


  try {
    const session = await getDbSession() // TODO: make sure to close 

    

  } catch (err) {
    console.log(`Couldn't fetch relationship data`, err)
  } 
}