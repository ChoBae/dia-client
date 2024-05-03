import QuestionMain from "../components/QuestionMain";
import { Metadata } from "next";
import { getSession } from "../../../authLib";
import { headers } from "next/headers";
import { getQuestionList } from "@/app/api/getQuestionList";
import { Question } from "@/types/Question";
import axios from "axios";
export const revalidate = 0;
export const dynamic = "auto";
export const metadata: Metadata = {
  title: "모든 문제",
  description: "현직 개발자가 엄선한 모든 문제들을 확인해보세요!",
};

export default async function Home({ params }: { params: { query: string } }) {
  const session = await getSession();
  const headersList = headers();
  const userAgentString = headersList.get("user-agent");
  let questionList;
  if (session) {
    if (!params.query) return;
    questionList = await getQuestionList(params.query, session.accessToken, {
      "user-agent": userAgentString as string,
    });
  } else {
    if (!params.query) return;
    questionList = await getQuestionList(params.query);
  }
  return (
    <QuestionMain
      questionsData={questionList}
      query={params.query}
      session={session}
    ></QuestionMain>

  );
}
