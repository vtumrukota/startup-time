'use client'

import { ChangeEvent } from "react"
import { ImportNodeTypes } from "./import.constants"

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
  
  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.length ? e.target.files[0] : null
    if (selectedFile) {
      console.log('selectedFile', selectedFile)
      const formData = new FormData()
      formData.append('file', selectedFile)
      const resp = await importData(formData)
      const json = await resp.json()
      console.log('json', json)
    }
  }
  
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
      <div>Import your Knowledge Graph</div>
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