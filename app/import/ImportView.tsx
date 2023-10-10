'use client'

import { ChangeEvent, useState } from "react"
import { IMPORT_DROPDOWN, ImportNodeTypes } from "./import.constants"
import Dropdown from 'react-bootstrap/Dropdown';

const importData = (formData: FormData, type = ImportNodeTypes.Company) => {
  return fetch(`/api/import?type=${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })
}

export const ImportView = () => {
  const [importType, setImportType] = useState<{ label: string, value: ImportNodeTypes }>(IMPORT_DROPDOWN[0])
  
  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.length ? e.target.files[0] : null
    if (selectedFile) {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const resp = await importData(formData, importType.value)
      const json = await resp.json() 
      console.log('json', json)
    }
  }
  
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl">Import your Knowledge Graph Nodes</h1>
      <div className="flex flex-row items-center justify-center mt-4">
        <h4 className="mr-4 text-lg"> Import Type:</h4>
        <Dropdown>
          <Dropdown.Toggle id="import-type-menu">
            {importType.label}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {IMPORT_DROPDOWN.map((item) =>
              <Dropdown.Item key={item.value} onClick={() => setImportType(item)}>
                {item.label}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="flex flex-row mt-8">        
        <label htmlFor="import-data-input">Upload JSON file</label>
        <input
          id="import-data-input"
          className="ml-4"
          name="import data"
          type="file"
          onChange={uploadFile}
        />
        {/* TODO add submit button */}
      </div>
    </section>
  )
}