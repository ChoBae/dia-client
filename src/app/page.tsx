import Intro from "./components/Intro";
import { getSession } from "../authLib";
import { headers } from "next/headers";
export default async function Home() {
  // const session = await getSession();
  // console.log('home',session);

  return (
    <main className="flex flex-col justify-center mx-auto items-center sm:px-6 py-16 sm:w-1/2 no-scrollbar">
      <Intro />
    </main>
  );
}
