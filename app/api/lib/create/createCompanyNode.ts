import { Session } from "neo4j-driver"
import { CompanyNode } from "../models"

export const createCompanyNode = async (data: any[], session: Session) => {
  const validNodes: CompanyNode[] = []
  const invalidNodes: any = []

  // validate JSON company nodes have valid structures
  for (const company of data) {
    if (!company.headcount) company.headcount = 0 // default to 0 if no headcount to avoid NULL error in neo4j
    !company.company_id || !company.company_name ?
      invalidNodes.push(company) :
      validNodes.push(company)
  }

  // Ensure that the company_id is unique and overwrite any existing nodes with the latest data
  const query = `
    UNWIND $validNodes AS companyData
    MERGE (c:Company { company_id: companyData.company_id })
    ON CREATE SET
      c.company_name = companyData.company_name,
      c.headcount = companyData.headcount
    ON MATCH SET
      c.company_name = companyData.company_name,
      c.headcount = companyData.headcount
  `;

  try {
    await session.executeWrite(async tx => {
      await tx.run(query, { validNodes })
    });
    console.log('created company nodes: ', validNodes.length)
    console.log('skipped invalid company nodes: ', invalidNodes)
  } catch (error) {
    console.error(`Error creating company nodes`, error);
  } finally {
    await session.close()
  }
}