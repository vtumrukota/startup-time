import { NextResponse } from 'next/server'
import { getDbSession } from '../lib/neo4j'
import { streamToJson } from '../lib/streamToJson';
import { createCompanyNode } from '../lib/createCompanyNode';

/**
 * Import companies from a JSON file upload into our graph database
 * 
 * @param req: Should contain a JSON stream on the body representing an array of objects
 * @returns: <NextResponse> - a JSON response with a message to FE
 */
export async function POST(req: Request) {
  const session = getDbSession();
  const data = req.body
  if (!data) return NextResponse.json({ message: 'No data provided.' })

  try {
    const parsedData = await streamToJson(data)
    console.log('parsedData', parsedData)
    
    // TODO: handle any type of node upload

    // createCompanyNode(parsedData, session)

    return NextResponse.json({ text: 'added-companies' });
  } catch (err) {
    console.error('Error adding companies', err);
    return NextResponse.json({ text: 'An error occurred while processing the data.' });
  } finally {
    await session.close();
  }
}
