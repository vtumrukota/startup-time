import { driver, auth, Driver } from 'neo4j-driver'

const URI = `${process.env.DB_URI}`
const USER = `${process.env.DB_USER}`
const PASSWORD = `${process.env.DB_PASSWORD}`

const dbDriver: Driver = driver(URI, auth.basic(USER, PASSWORD))

export const closeDb = () => dbDriver.close()
export const getDbSession = () =>  dbDriver.session({ database: 'neo4j' })