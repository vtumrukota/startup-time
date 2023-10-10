export type CompanyNode = {
  company_id: number,
  company_name: string,
  headcount: number,
}

export type CompanyAcquisitionNode = {
  parent_company_id: number,
  acquired_company_id: number,
  merged_into_parent_company: boolean,
}

export type PersonEmploymentNode = {
  person_id: number,
  company_id: number,
  title: string,
  start_date: string,
  end_date: string,
}