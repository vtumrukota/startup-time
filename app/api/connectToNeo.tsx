import { driver, auth } from 'neo4j-driver'

const connectToDB = async () => {
  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  const URI = '<URI to Neo4j database>'
  const USER = '<Username>'
  const PASSWORD = '<Password>'
  let d

  try {
    d = driver(URI, auth.basic(USER, PASSWORD))
    const serverInfo = await d.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
  } catch (err) {
    console.log(`Connection error`, err)
  }
}