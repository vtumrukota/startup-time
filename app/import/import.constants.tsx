export enum ImportNodeTypes {
  Company = 'Company',
  PersonEmployment = 'PersonEmployment',
  CompanyAcquisition = 'CompanyAcquisition',
}

const NODE_LABELS = {
  [ImportNodeTypes.Company]: 'Company',
  [ImportNodeTypes.PersonEmployment]: 'Person Employment',
  [ImportNodeTypes.CompanyAcquisition]: 'Company Acquisition',
}

export const IMPORT_DROPDOWN = [
  {
    label: NODE_LABELS[ImportNodeTypes.Company],
    value: ImportNodeTypes.Company,
  }, 
  {
    label: NODE_LABELS[ImportNodeTypes.PersonEmployment],
    value: ImportNodeTypes.PersonEmployment,
  }, 
  {
    label: NODE_LABELS[ImportNodeTypes.CompanyAcquisition],
    value: ImportNodeTypes.CompanyAcquisition,
  }
]