import Image from "next/image"

export const Welcome = () =>
  <section className="flex flex-col items-center justify-start w-full mt-4">
    <h1 className="text-3xl mb-4">Welcome to Startup Time!</h1>
    <h4 className="text-sm">Uncover critical information about your startup ecosystem</h4>
    <Image
      src="/images/startup-graph.png"
      alt="Startup Graph"
      width={700}
      height={500}
      priority
    />
  </section>