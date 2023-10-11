import { Sidebar } from "../components/sidebar/Sidebar"
import { ImportView } from "./ImportView"

const ImportPage = () =>
  <main className="flex flex-row items-center">
    <Sidebar />
    <ImportView />
  </main>

export default ImportPage