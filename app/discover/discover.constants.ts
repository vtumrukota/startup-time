import { ImportNodeTypes } from "../import/import.constants"

export const RELATIONSHIP_DROPDOWN = [
  {
    label: 'Companies Acquired',
    value: 'companies_acquired',
    hasSearch: true,
  },
  {
    label: 'Was Company Acquired?',
    value: 'was_company_acquired',
    hasSearch: true,
  },
  {
    label: 'Current Employees',
    value: 'current_employees',
    hasSearch: true
  },
  {
    label: 'Former Employees',
    value: 'former_employees',
    hasSearch: true
  },
  {
    
  }
]

// export const RELATIONSHIP_DROPDOWN = {
//   [ImportNodeTypes.Company]: [
//     {
//       label: 'Current Employees',
//       value: 'WORKS_AT'
//     }, 
//     {
//       label: 'Former Employees',
//       value: 'WORKED_AT'
//     },
//     {
//       label: 'Acquired By',
//       value: 'ACQUIRED_BY'
//     },
//     {
//       label: 'Has Acquired',
//       value: 'HAS_ACQUIRED'
//     }
//   ],
//   [ImportNodeTypes.PersonEmployment]: [
//     {
//       label: 'Companies Worked For',
//       value: 'companies_worked_for'
//     },
//     {
//       label: 'Companies with Current Employees',
//       value: 'companies_with_current_employees'
//     }
//   ],
//   [ImportNodeTypes.CompanyAcquisition]: [
//     {
//       label: 'Comapnies Acquired',
//       value: 'companies_acquired'
//     },
//     {
//       label: 'Acquired Companies',
//       value: 'acquired_companies'
//     }
//   ]
// }