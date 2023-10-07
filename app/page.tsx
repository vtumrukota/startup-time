import { ReactElement } from "react"
import Layout from "./layout"

const Root = () => {
  return (
    <div className="flex flex-col items-center">Main App Loaded!</div>
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