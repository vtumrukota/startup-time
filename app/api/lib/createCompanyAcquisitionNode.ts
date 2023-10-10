import { Session } from "neo4j-driver"
import { CompanyAcquisitionNode } from "./models";

export const createCompanyAcquisitionNode = async (data: any[], session: Session) => {
  const validNodes: CompanyAcquisitionNode[] = []
  const invalidNodes: any[] = []

  // validate JSON company acquisiton nodes have valid structures
  for (const comAcq of data) {
    if (!comAcq.merged_into_parent_company) comAcq.merged_into_parent_company = false // default to false if no value to avoid NULL error in neo4j
    !comAcq.parent_company_id || !comAcq.acquired_company_id ?
      invalidNodes.push(comAcq) :
      validNodes.push(comAcq)
  }
  
  // Ensure parent & acquired ids are unique and overwrite any existing nodes with the latest merged status
  const query = `
    UNWIND $validNodes AS comAcqData
    MERGE (c:CompanyAcquisition {
      parent_company_id: comAcqData.parent_company_id,
      acquired_company_id: comAcqData.acquired_company_id
    })
    ON CREATE SET
      c.merged_into_parent_company = comAcqData.merged_into_parent_company
    ON MATCH SET
      c.merged_into_parent_company = comAcqData.merged_into_parent_company
  `;

  try {
    await session.executeWrite(async tx => {
      await tx.run(query, { validNodes })
    });
    console.log('created company acqusition nodes: ', validNodes.length)
    console.log('skipped invalid company acquisition nodes: ', invalidNodes)
  } catch (error) {
    console.error(`Error creating company acquisition nodes`, error);
  } finally {
    await session.close()
  }
}