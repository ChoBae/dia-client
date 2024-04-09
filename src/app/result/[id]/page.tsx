// import QuestionList from "./components/QuestionList";
import { Metadata } from "next";
import ResultMain from "./components/ResultMain";
import { HistoryType } from "@/types/History";
import ResultMainGuest from "./components/ResultMainGuest";
import Header from "@/app/mockinterview/[id]/components/Header";
import { getSession } from "../../../authLib";
import { headers } from "next/headers";
import { getQuestionDetails } from "@/app/api/getQuestionDetails";
import { getQuestionHistory } from "@/app/api/getQuestionHistory";
export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  // const data = await getQuestionDetails(params.id);
  return {
    title: "연습 결과",
    // description: data.description,
  };
};
export default async function Home({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: HistoryType;
}) {
  const session = await getSession();
  const headersList = headers();
  const userAgentString = headersList.get("user-agent");

  const result = await getQuestionDetails({
    id: params.id,
    accessToken: session?.accessToken,
    headers: {
      "user-agent": userAgentString as string,
      ...(session && session.accessToken
        ? { authorization: session.accessToken }
        : {}),
    },
  });
  const historyList = await getQuestionHistory(params.id, session.accessToken, {
    "user-agent": userAgentString as string,
  });
  const isGuest = searchParams.contentValue ? true : false;

  return (
    <main className="flex flex-col mx-auto pt-20 pb-8  max-w-[500px] h-[100dvh] sm:max-h-[1000px] overflow-y-hidden bg-white no-scrollbar">
      <Header title="답변확인" className="mb-5" />
      {isGuest ? (
        <ResultMainGuest question={result} resultData={searchParams} />
      ) : (
        <ResultMain
          pkValue={params.id}
          question={result.data}
          session={session}
          historyList={historyList as HistoryType[]}
        ></ResultMain>
      )}
    </main>
  );
}
