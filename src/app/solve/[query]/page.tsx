import QuestionMain from "../components/QuestionMain";
import { Metadata } from "next";
import { getSession } from "../../../authLib";
import { headers } from "next/headers";
export const revalidate = 0;
export const dynamic = "auto";
export const metadata: Metadata = {
  title: "모든 문제",
  description: "현직 개발자가 엄선한 모든 문제들을 확인해보세요!",
};

export default async function Home({ params }: { params: { query: string } }) {
  const session = await getSession();
  // console.log('session', session.accessToken)
  // let questionList: Question[] = [];
  // if (session) {
  //   if (!params.query) return;
  //   questionList = await getQuestionList(params.query, session.accessToken,
  //   );
  // } else {
  //   if (!params.query) return;
  //   questionList = await getQuestionList(params.query);
  // }
  const headersList = headers();
  const userAgentString = headersList.get("user-agent");
  // const questionList = await fetch(
  //   `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/question/getList/?query=${params.query}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       ...(session && session.accessToken
  //         ? { authorization: session.accessToken }
  //         : {}),
  //       "user-agent": userAgentString as string,
  //     },
  //   }
  // ).then((res) => res.json());
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/v0/interview/questions?categoryValues=${params.query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // ...(session && session.accessToken
        //   ? { authorization: session.accessToken }
        //   : {}),
        "user-agent": userAgentString as string,
      },
    }
  ).then((res) => {
    const data = res.json();
    return data;
  });
  const questionList = result.data.pageData;
  return (
    <QuestionMain
      questionsData={questionList}
      query={params.query}
      session={session}
    ></QuestionMain>
  );
}
