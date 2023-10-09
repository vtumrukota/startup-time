import { Session } from "neo4j-driver"

export const createCompanyAcquisitionNode = async (data: any[], session: Session) => {
  const query = `
    UNWIND $data AS caData
    MERGE (c:CompanyAcquisition {
      parent_company_id: caData.parent_company_id,
      acquired_company_id: caData.acquired_company_id,
      merged_into_parent_company: caData.merged_into_parent_company,
    })
  `;

  try {
    await session.executeWrite(async tx => {
      await tx.run(query, { data })
    });
  } catch (error) {
    console.error(`Error creating nodes`, error);
  }
  // We will close session in the calling function
}