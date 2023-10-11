'use client'

import { ChangeEvent, useState } from "react"
import Image from "next/image";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { IMPORT_DROPDOWN, ImportNodeTypes } from "./import.constants"

export const ImportView = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [importType, setImportType] = useState<{ label: string, value: ImportNodeTypes }>(IMPORT_DROPDOWN[0])
  
  const importData = (formData: FormData, type = ImportNodeTypes.Company) => {
    return fetch(`/api/import?type=${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
  }

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.length ? e.target.files[0] : null
    if (selectedFile) {
      const formData = new FormData()
      formData.append('file', selectedFile)
      try {
        setIsUploading(true)
        await importData(formData, importType.value)
      } catch (err) {
        // TODO: add error logging/telemetry
        console.log('Error uploading JSON node data', err)
      } finally {
        setIsUploading(false)
      }
    }
  }
  
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl mt-4">Import your Knowledge Graph Nodes</h1>
      <Form className="mt-4 mb-4 p-4 border-4 border-blue-500 rounded-lg">
        <div className="flex flex-row items-center justify-center">
          <h4 className="mr-4 pt-2 text-lg flex-row">Node Type:</h4>
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
        <div className="flex flex-row items-center justify-center mt-8">        
          <input
            id="import-data-input"
            className="ml-4 hidden"
            name="import data"
            accept=".json"
            type="file"
            placeholder="Import JSON file"
            onChange={uploadFile}
          />
          <label htmlFor="import-data-input">
            <Button as="span" className="ml-4">Upload JSON File</Button>
          </label>
        </div>
        {isUploading && (
          <div className="flex flex-row items-center justify-center mt-4">
            <Spinner animation="border" variant="primary" className="mr-2"/>
            Uploading...
          </div>
        )}
      </Form>
      <Image
        src="/images/graph-import.png"
        alt="Graph Import"
        width={300}
        height={200}
        priority
      />
    </section>
  )
}