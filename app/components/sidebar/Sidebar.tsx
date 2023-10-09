import Link from "next/link"

export const Sidebar = () => {

  return (
    <section className="flex flex-col w-[240px] h-screen p-4 bg-slate-200">
      <h1 className="text-3xl centered">
        <Link href="/">Startup Time!</Link>
      </h1>
      <h6 className="mt-8 text-sm">Uncover critical startup ecosystem relationships</h6>
      <ul className="mt-8 justify-start">
        <li className="mb-4">
          <Link href="/discover" className="text-lg">Discover</Link>
        </li>
        <li>
          <Link href="/import" className="text-lg">Import</Link>
        </li>
      </ul>
    </section>
  )
}
