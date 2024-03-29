import { getQuestionDetails } from "@/app/api/getQuestionDetails";
import QuestionMain from "./components/QuestionMain";
import { Metadata } from "next";
import { getSession } from "../../../../authLib";
import { headers } from "next/headers";
export const revalidate = 0;
// export const dynamic = "auto";
// export const revalidate = 0;
export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const data = await getQuestionDetails({ id: params.id });
  return {
    title: data.data.korTitleValue,
    description: "개발자들이 실제로 경험한 면접 문제들을 풀어보세요!",
  };
};

export default async function Main({ params }: { params: { id: number } }) {
  const session = await getSession();
  // let result;
  // if (session) {
  //   result = await getQuestionDetails({
  //     id: params.id,
  //     accessToken: session.accessToken,
  //   });
  // } else {
  //   result = await getQuestionDetails({ id: params.id });
  // }
  const headersList = headers();
  const userAgentString = headersList.get("user-agent");

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/question/getQuestion/?pkValue=${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(session && session.accessToken
          ? { authorization: session.accessToken }
          : {}),
        "user-agent": userAgentString as string,
      },
    }
  ).then((res) => res.json());
  return (
    <main className="flex flex-col mx-auto px-4 sm:px-6 pt-20 pb-8 h-[100dvh] sm:max-h-[800px] sm:w-1/2 2xl:w-1/3 no-scrollbar overflow-y-hidden">
      <QuestionMain questionData={result} session={session}></QuestionMain>
    </main>
  );
}
