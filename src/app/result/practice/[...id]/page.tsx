// import QuestionList from "./components/QuestionList";
import { Metadata } from "next";
import { getQuestionList } from "@/app/api/getQuestionList";
import PracticeResultMain from "./components/PracticeResultMain";
import { Session } from "@/types/Session";
import { Question } from "@/types/Question";
import { getSession } from "../../../../authLib";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { getMultiPracticeDetails } from "@/app/api/getMultiPracticeDetails";
import type { PracticeDetail, QuestionAndScript } from "@/types/Practice";
export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  // const data = await getQuestionDetails(params.id);
  return {
    title: "실전연습 결과",
    // description: data.description,
  };
};
export default async function Home({
  searchParams,
  params,
}: {
  searchParams: {
    orderList: string[];
  };
  params: {
    id: string;
  };
}) {
  // const session = await getServerSession(authOptions);
  // const result = await getQuestionList('backend');
  const session = await getSession();
  const headersList = headers();
  const userAgentString = headersList.get("user-agent");

  let practice: PracticeDetail;
  if (session) {
    if (!params.id) return;
    practice = await getMultiPracticeDetails(params.id, session.accessToken, {
      "user-agent": userAgentString as string,
    });
  } else {
    if (!params.id) return;
    practice = await getMultiPracticeDetails(params.id);
  }
  const sortQuestionList = (
    questionList: QuestionAndScript[],
    orderList: string[]
  ) => {
    const sortedQuestionList = orderList.map((id) =>
      questionList.find((question) => question.question.pkValue === Number(id))
    );
    return sortedQuestionList;
  };
  const sliceQuestionList = sortQuestionList(
    practice.questionAndScripts,
    searchParams.orderList
  );
  return (
    <PracticeResultMain
      pkValue={params.id}
      questionList={sliceQuestionList as QuestionAndScript[]}
      session={session}
    />
  );
}
