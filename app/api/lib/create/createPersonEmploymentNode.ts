import { Session } from "neo4j-driver"
import { PersonEmploymentNode } from "../models";

export const createPersonEmploymentNode = async (data: any[], session: Session) => {
  const validNodes: PersonEmploymentNode[] = []
  const invalidNodes: any[] = []

  for (const pe of data) {
    // default to empty string to avoid NULL error in neo4j
    if (!pe.start_date) pe.start_date = ''
    if (!pe.end_date) pe.end_date = ''
    if (!pe.employment_title) pe.employment_title = ''
    !pe.person_id || !pe.company_id ?
      invalidNodes.push(pe) :
      validNodes.push(pe)
  }

  console.log('validNodes', validNodes)
  
  const query = `
    UNWIND $validNodes AS peData
    MERGE (p:PersonEmployment {
      company_id: peData.company_id,
      person_id: peData.person_id
    })
    ON CREATE SET 
      p.start_date = peData.start_date,
      p.end_date = peData.end_date,
      p.employment_title = peData.employment_title
    ON MATCH SET
      p.start_date = peData.start_date,
      p.end_date = peData.end_date,
      p.employment_title = peData.employment_title
  `;

  try {
    await session.executeWrite(async tx => {
      await tx.run(query, { validNodes })
    });
    console.log('created person employment nodes: ', validNodes.length)
    console.log('skipped invalid person employment nodes: ', invalidNodes)
  } catch (error) {
    console.error(`Error creating person employment nodes`, error);
  } finally {
    await session.close()
  }
}