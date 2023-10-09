import { ReactElement } from "react"
import Layout from "./layout"
import HomePage from "./home/page"

const Root = () => {
  return (
    <main className="flex flex-row items-center justify-start">
      <HomePage />
    </main>
  )
}

Root.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Root