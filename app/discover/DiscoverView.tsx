'use client'

import { useState } from "react"
import Dropdown from "react-bootstrap/esm/Dropdown"
import { IMPORT_DROPDOWN, ImportNodeTypes } from "../import/import.constants"
import { RELATIONSHIP_DROPDOWN } from "./discover.constants"

export const DiscoverView = (): JSX.Element => {
  const defaultImport: any = IMPORT_DROPDOWN[0]
  const [importType, setImportType] =
    useState<{ label: string, value: ImportNodeTypes }>(defaultImport)
  const [relationshipType, setRelationshipType] =
    useState<any>()
  const [text, setText] = useState<string>('')
  
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl">Discover</h1>
      <h6 className="mt-8 text-sm">Uncover critical startup ecosystem relationships</h6>

      {/* Data Type Selector */}
      <div className="flex flex-row items-cener">
        <h4>What type of data are you interested in?</h4> 
        <Dropdown>
          <Dropdown.Toggle>
            {importType.label}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {IMPORT_DROPDOWN.map((item) => {
              return (
                <Dropdown.Item key={item.value} onClick={() => setImportType(item)}>
                  {item.label}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Relationship Selector */}
      <div className="flex flex-row items-center justify-center">
        <h4>What type of relationships are you interested in?</h4>
        <Dropdown>
          <Dropdown.Toggle>
            {relationshipType ? relationshipType.label : 'Select Relationship Type...'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {RELATIONSHIP_DROPDOWN[importType.value].map((item) => {
              return (
                <Dropdown.Item key={item.value} onClick={() => setRelationshipType(item)}>
                  {item.label}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Any specific Name */}
      <div className="flex flex-row items-center justify-center">
        <h4>Any specific name?</h4>
        <input className="border" type="text" value={text} onChange={(e) => setText(e.target.value)}/>
      </div>
    </section>
  )
}