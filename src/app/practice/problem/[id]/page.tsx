import { getQuestionDetails } from "@/app/api/getQuestionDetails";
import QuestionListMain from "./components/QuestionListMain";
import { Metadata } from "next";
import { Question } from "@/types/Question";
import { getQuestionList } from "@/app/api/getQuestionList";
import { getSession } from "../../../../../authLib";
import { headers } from "next/headers";
export const revalidate = 0;

// export const dynamic = "auto";
// export const revalidate = 0;

const dummyPractice = {
  pkValue: 1,
  korTitleValue: "Java / Spring / Jpa",
};

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const data = await getQuestionDetails({ id: params.id });
  return {
    title: data.data.korTitleValue,
    description: "개발자들이 실제로 경험한 면접 문제들을 풀어보세요!",
  };
};

export default async function Main({ params }: { params: { id: number } }) {
  const session = await getSession();
  const headersList = headers();
  const userAgentString = headersList.get("user-agent");
  let result;
  let questionList: Question[] = [];
  if (session) {
    if (!params.id) return;
    questionList = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/question/getList/?query=backend`,
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
    if (!params.id) return;
    questionList = await getQuestionList("backend");
  }
  const sliceList = questionList.slice(0, 3);
  return (
    <main className="flex flex-col mx-auto px-4 sm:px-6 pt-20 pb-8 h-[100dvh] sm:max-h-[800px] sm:w-1/2 2xl:w-1/3 no-scrollbar overflow-y-hidden">
      <QuestionListMain practice={dummyPractice} questionList={sliceList} session={session} />
    </main>
  );
}
