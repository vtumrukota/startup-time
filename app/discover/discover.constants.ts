import { ImportNodeTypes } from "../import/import.constants"

export const RELATIONSHIP_DROPDOWN = {
  [ImportNodeTypes.Company]: [
    {
      label: 'Current Employees',
      value: 'current_employees'
    }, 
    {
      label: 'Former Employees',
      value: 'former_employees'
    },
    {
      label: 'Acquired By',
      value: 'acquired_by'
    },
    {
      label: 'Has Acquired',
      value: 'has_acquired'
    }
  ],
  [ImportNodeTypes.PersonEmployment]: [
    {
      label: 'Companies Worked For',
      value: 'companies_worked_for'
    },
    {
      label: 'Companies with Current Employees',
      value: 'companies_with_current_employees'
    }
  ],
  [ImportNodeTypes.CompanyAcquisition]: [
    {
      label: 'Comapnies Acquired',
      value: 'companies_acquired'
    },
    {
      label: 'Acquired Companies',
      value: 'acquired_companies'
    }
  ]
}