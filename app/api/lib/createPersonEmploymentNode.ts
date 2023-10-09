import { Session } from "neo4j-driver"

export const createPersonEmploymentNode = async (data: any[], session: Session) => {
  const query = `
    UNWIND $data AS peData
    MERGE (p:PersonEmployment {
      company_id: peData.company_id,
      person_id: peData.person_id,
      employment_title: peData.employment_title,
      start_date: peData.start_date,
      end_date: peData.end_date,
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