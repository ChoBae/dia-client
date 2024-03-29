// import QuestionList from "./components/QuestionList";
import { Metadata } from "next";
import { getQuestionList } from "@/app/api/getQuestionList";
import PracticeResultMain from "./components/PracticeResultMain";
import { Session } from "@/types/Session";
import { Question } from "@/types/Question";
import { getSession } from "../../../../../authLib";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  // const data = await getQuestionDetails(params.id);
  return {
    title: "실전연습 결과",
    // description: data.description,
  };
};
export default async function Home({ params }: { params: { id: number } }) {
  // const session = await getServerSession(authOptions);
  // const result = await getQuestionList('backend');
  const session = await getSession();
  const headersList = headers();
  const userAgentString = headersList.get("user-agent");

  let questionList: Question[] = [];
  if (session) {
    if (!params) return;
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
    if (!params) return;
    questionList = await getQuestionList("backend");
  }
  const sliceQuestionList = questionList.slice(0, 2);
  return (
    <PracticeResultMain pkValue={params.id} questionList={sliceQuestionList} />
  );
}
