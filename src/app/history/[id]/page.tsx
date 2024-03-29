import { Metadata } from "next";
import HistoryResult from "./components/HistoryResult";
import { Question } from "@/types/Question";
import { HistoryType } from "@/types/History";
import { redirect } from "next/navigation";
import { getSession } from "../../../../authLib";
import { headers } from "next/headers";
export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  // const data = await getQuestionDetails(params.id);
  return {
    title: "연습 결과",
    // description: data.description,
  };
};

export default async function Home({ params }: { params: { id: number } }) {
  const session = await getSession();
  const headersList = headers();
  let result;
  if (!session) {
    redirect("/signIn");
  }
  if (session) {
        result = await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/history/getSingleHistory/?pkValue=${params.id}`,
          {
            method: "GET",
            headers: headersList,
          }
        ).then((res) => res.json());
  }
  return (
    <main className="flex flex-col mx-auto py-20 h-full max-w-[500px] max-h-[1000px] overflow-y-hidden bg-white no-scrollbar">
      <HistoryResult
        question={result?.question as Question}
        history={result as HistoryType}
        session={session}
      ></HistoryResult>
    </main>
  );
}
