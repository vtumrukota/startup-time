import { Session } from "neo4j-driver"

export const createCompanyNode = async (data: any[], session: Session) => {
  for (const company of data) {
    const query = `
      CREATE (c: Company {
        company_id: ${company.company_id},
        company_name: ${company.company_name},
        headcount: ${company.headcount},
      })
    `
    // TODO upload in bulk
    try {
      await session.run(query, data);
      console.log(`Node created for person_id: ${company.company_id}`);
    } catch (error) {
      console.error(`Error creating node for person_id: ${company.company_id}`, error);
    }
    // We will close session in the calling function
  }
}