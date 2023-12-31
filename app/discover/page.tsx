import { Sidebar } from "../components/sidebar/Sidebar"
import { DiscoverView } from "./DiscoverView"

const DiscoverPage = () =>
  <main className="flex flex-row items-center">
    <Sidebar />
    <DiscoverView />
  </main>

export default DiscoverPage