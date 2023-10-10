import url from 'url'
import { NextResponse } from 'next/server'
import { getDbSession } from '../lib/neo4j'
import { streamToJson } from '../lib/streamToJson';
import { createCompanyNode } from '../lib/createCompanyNode';
import { ImportNodeTypes } from '@/app/import/import.constants';
import { createPersonEmploymentNode } from '../lib/createPersonEmploymentNode';
import { createCompanyAcquisitionNode } from '../lib/createCompanyAcquisitionNode';

/**
 * Import companies from a JSON file upload into our graph database
 * 
 * @param req: Should contain a JSON stream on the body representing an array of objects
 * @returns: <NextResponse> - a JSON response with a message to FE
 */
export async function POST(req: Request) {
  const data = req.body
  if (!data) return NextResponse.json({ message: 'No data provided.' })
  const parsedUrl = url.parse(req.url, true)
  const nodeType = parsedUrl.query.type as ImportNodeTypes
  
  try {
    const session = await getDbSession() // TODO: move into try/catch
    const parsedData = await streamToJson(data)
    switch(nodeType) {
      case ImportNodeTypes.CompanyAcquisition:
        await createCompanyAcquisitionNode(parsedData, session)
        break
      case ImportNodeTypes.PersonEmployment:
        await createPersonEmploymentNode(parsedData, session)
        break
      case ImportNodeTypes.Company:
      default:
        await createCompanyNode(parsedData, session)
        break
    }
    return NextResponse.json({ type: nodeType, text: 'imported data' });
  } catch (err) {
    console.error('Error adding companies', err);
    return NextResponse.json({ text: 'An error occurred while processing the data.' });
  }
}
