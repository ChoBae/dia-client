import { getQuestionDetails } from "@/app/api/getQuestionDetails";
import QuestionListMain from "./components/QuestionListMain";
import { Metadata } from "next";
import { Question } from "@/types/Question";
import { getQuestionList } from "@/app/api/getQuestionList";
import { getSession } from "../../../../authLib";
import { headers } from "next/headers";
import { getMultiPracticeDetails } from "@/app/api/getMultiPracticeDetails";
import type { PracticeDetail } from "@/types/Practice";
export const revalidate = 0;

// export const dynamic = "auto";
// export const revalidate = 0;

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const data = await getMultiPracticeDetails(params.id);
  return {
    title: data.titleValue,
    description: "개발자들이 실제로 경험한 면접 문제들을 풀어보세요!",
  };
};

export default async function Main({ params }: { params: { id: string } }) {
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
  return (
    <main className="flex flex-col mx-auto px-4 sm:px-6 pt-20 pb-8 h-[100dvh] sm:max-h-[800px] sm:w-1/2 2xl:w-1/3 no-scrollbar overflow-y-hidden">
      <QuestionListMain
        practice={practice}
        session={session}
      />
    </main>
  );
}
