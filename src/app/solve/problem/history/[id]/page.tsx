// import QuestionList from "./components/QuestionList";
import { Metadata } from "next";
import { getQuestionDetails } from "@/app/api/getQuestionDetails";
import HistoryResult from "./components/HistoryResult";
import { Question } from "@/types/Question";
import { HistoryType } from "@/types/History";
import { getSession } from "../../../../../authLib";
import { headers } from "next/headers";
export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  // const data = await getQuestionDetails(params.id);
  return {
    title: "답변 히스토리",
    // description: data.description,
  };
};

export default async function Home({ params }: { params: { id: number } }) {
  const session = await getSession();
  const headersList = headers();
  const userAgentString = headersList.get("user-agent");
  let result;
  let question;
  if (session) {
    question = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/question/getQuestion/?pkValue=${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: session.accessToken,
          "user-agent": userAgentString as string,
        },
      }
    ).then((res) => res.json());
    result = await await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/question/getHistoryList/?pkValue=${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: session.accessToken,
          "user-agent": userAgentString as string,
        },
      }
    ).then((res) => res.json());
  } else {
    result = await getQuestionDetails({ id: params.id });
  }
  
  return (
    <main className="flex flex-col mx-auto py-20 h-[100dvh] max-w-[500px] max-h-[1000px] overflow-y-hidden bg-white no-scrollbar">
      <HistoryResult
        question={question as Question}
        historyList={result as HistoryType[]}
        session={session}
      ></HistoryResult>
    </main>
  );
}
