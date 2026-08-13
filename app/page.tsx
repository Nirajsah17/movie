import Link from "next/link"
export default function Home(){
  return <>
    <div className="bg-neutral-primary w-1/2 h-screen max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link href={"/movies"}>
        <button type="button" className="text-white bg-warning box-border border border-transparent hover:bg-warning-strong focus:ring-4 focus:ring-warning-medium shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none">Explore Movies & Series</button>
      </Link>
    </div>
  </>
}