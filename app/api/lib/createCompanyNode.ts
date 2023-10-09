import { Session } from "neo4j-driver"

export const createCompanyNode = async (data: any[], session: Session) => {
  const query = `
    UNWIND $data AS companyData
    MERGE (c:Company {
      company_id: companyData.company_id,
      company_name: companyData.company_name,
      headcount: companyData.headcount
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