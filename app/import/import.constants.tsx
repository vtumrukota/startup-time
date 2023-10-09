export enum ImportNodeTypes {
  Company = 'Company',
  PersonEmployment = 'PersonEmployment',
  CompanyAcquisition = 'CompanyAcquisition',
}

export const IMPORT_DROPDOWN = [
  {
    label: ImportNodeTypes.Company,
    value: ImportNodeTypes.Company,
  }, 
  {
    label: ImportNodeTypes.PersonEmployment,
    value: ImportNodeTypes.PersonEmployment,
  }, 
  {
    label: ImportNodeTypes.CompanyAcquisition,
    value: ImportNodeTypes.CompanyAcquisition,
  }
]