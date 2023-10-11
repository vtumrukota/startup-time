import Link from "next/link"

export const Sidebar = () =>
  <section className="flex flex-col w-[240px] h-screen p-4 bg-slate-200">
    <h1 className="text-2xl">
      <Link href="/" className="no-underline font-bold text-slate-600">Startup Time</Link>
    </h1>
    <ul className="mt-12 justify-start pl-0">
      <li className="mb-4">
        <Link href="/discover" className="text-xl no-underline text-slate-600 hover:text-slate-400">Discover</Link>
      </li>
      <li>
        <Link href="/import" className="text-xl no-underline text-slate-600 hover:text-slate-400">Import</Link>
      </li>
    </ul>
  </section>