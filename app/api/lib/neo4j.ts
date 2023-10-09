import { driver, auth, Driver } from 'neo4j-driver'

const URI = `${process.env.DB_URI}`
const USER = `${process.env.DB_USERNAME}`
const PASSWORD = `${process.env.DB_PASSWORD}`

const dbDriver: Driver = driver(URI, auth.basic(USER, PASSWORD))
export const closeDb = () => dbDriver.close()
export const getDbSession = async () =>  {
  console.log('URI/USER/PASSWORD', URI, USER, PASSWORD)
  if (!dbDriver) console.error('No dbDriver')
  const info = await dbDriver.getServerInfo()
  console.log('server info', info)
  return dbDriver.session({ database: 'neo4j' })
}