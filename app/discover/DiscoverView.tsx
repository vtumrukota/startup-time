'use client'

import { FormEvent, useState } from "react"
import { JsonView } from "react-json-view-lite"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { IMPORT_DROPDOWN, ImportNodeTypes } from "../import/import.constants"

export const DiscoverView = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [jsonData, setJsonData] = useState<any>(null)

  const fetchData = async (e: FormEvent, query: string) => {
    e.preventDefault()
    try {
      setError(false)
      setIsLoading(true)
      const resp = fetch('/api/discover', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: query,
      })
      const data = await resp
      const results = await data.json()
      setJsonData(results)
      results.message?.includes('Sorry') && setError(true)
    } catch (err) {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="flex flex-col items-center justify-start w-full h-screen">
      <h1 className="text-3xl mt-4">Discover Relationships</h1>
      <h6 className="mt-2 text-md">Answer common questions about your company & employee data!</h6>

      <Form id="discover-form" className="mt-4 p-4 pb-1 border-4 border-blue-500 rounded-lg w-10/12"
        onSubmit={(e: FormEvent) => fetchData(e, query)}>
        <div>
          <p className="text-sm">Our Knowledge Graph has the node types:
            <span className="ml-2 text-xs font-bold">{`<Company> : <PersonEmployment> : <CompanyAcquisition>`}</span>
          </p>
          <p className="text-sm">With the following relationships:
            <span className="ml-2 font-bold text-xs">{`<HAS_ACQUIRED> : <WAS_ACQUIRED> : <OLD_WORKERS> : <WORKERS> : <WORKED_AT> : <WORKS_FOR>`}</span>
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
          <p className="text-xs mt-1">
              ***Please use the Neo4j Cypher query language
              <a href="https://neo4j.com/developer/cypher/" target="_blank" className="ml-2 text-blue-500">Learn more</a>
          </p>
        </div>
      </Form>
      
      {/* Loading state w. error handling */}
      {isLoading ? <Spinner animation="border" className="mt-4" /> : (
        <>      
          {error && <Alert variant="danger" className="mt-4">Sorry, there was an error with your query!</Alert>}
          {/* Show neo4j data in JSON format as we cannot know structure upfront */}
          {jsonData && !error && (
            <>
              <p className="text-md mt-2 ">Total Results: {jsonData.results.length}</p>
              <div className="flex flex-col h-screen overflow-auto mb-4 ml-4 mr-4 rounded-lg">
                <JsonView data={jsonData} />
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}