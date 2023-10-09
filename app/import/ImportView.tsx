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
  const [importType, setImportType] = useState<ImportNodeTypes>(ImportNodeTypes.Company)
  
  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.length ? e.target.files[0] : null
    if (selectedFile) {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const resp = await importData(formData, importType)
      const json = await resp.json()
      console.log('json', json)
    }
  }
  
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
      <div>Import your Knowledge Graph</div>
      <br />
      <Dropdown>
        <Dropdown.Toggle id="import-type-menu">
          Change Import Type
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {IMPORT_DROPDOWN.map((item) =>
            <Dropdown.Item key={item.value} onClick={() => setImportType(item.value)}>
              {item.label}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      <label htmlFor="import-data-input">Upload JSON file</label>
      <input
        id="import-data-input"
        name="import data"
        type="file"
        onChange={uploadFile}
      />
    </section>
  )
}