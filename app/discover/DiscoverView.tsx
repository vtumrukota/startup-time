'use client'

import { FormEvent, useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { IMPORT_DROPDOWN, ImportNodeTypes } from "../import/import.constants"

export const DiscoverView = (): JSX.Element => {
  const defaultImport: any = IMPORT_DROPDOWN[0]
  const [importType, setImportType] =
    useState<{ label: string, value: ImportNodeTypes }>(defaultImport)
  const [relationshipType, setRelationshipType] =
    useState<any>()
  const [query, setQuery] = useState<string>('')

  const fetchData = async (e: FormEvent, query: string) => {
    e.preventDefault()
    
    const resp = fetch('/api/discover', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: query,
    })
    const data = await resp
    const results = await data.json()
    console.log('results', results)
  }
  

  return (
    <section className="flex flex-col items-center justify-start w-full h-screen">
      <h1 className="text-3xl mt-4">Discover Relationships</h1>
      <h6 className="mt-2 text-md">Answer common questions about your company & employee data!</h6>

      <Form id="discover-form" className="mt-4 p-4 border-4 border-blue-500 rounded-lg w-10/12"
        onSubmit={(e: FormEvent) => fetchData(e, query)}>
        <div>
          <p className="text-md">Our Knowledge Graph has a few node types:
            <span className="ml-2 font-bold">Companies, Employees, and Acquisitions</span>
          </p>
          <p className="text-xs">
              ***Please use the Neo4j Cypher query language
              <a href="https://neo4j.com/developer/cypher/" target="_blank" className="ml-2 text-blue-500">Learn more</a>
          </p>
          <div className="flex flex-row items-center justify-center">
            <Form.Control
              className="border-slate-400"
              size="lg"
              as="textarea"
              rows={3}
              placeholder="Query the startup graph..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" className="ml-2">Submit!</Button>
          </div>
        </div>
      </Form>
    </section>
  )
}