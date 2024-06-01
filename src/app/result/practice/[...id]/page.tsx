// import QuestionList from "./components/QuestionList";
import { Metadata } from "next";
import PracticeResultMain from "./components/PracticeResultMain";
import { getSession } from "../../../../authLib";
import { headers } from "next/headers";
import { getUserHistoryBySize } from "@/app/api/getUserHistoryBySize";
import { HistoryType } from "@/types/History";
import PracticeResultMainGuest from "./components/PracticeResultMainGuest";
import { getMultiPracticeDetails } from "@/app/api/getMultiPracticeDetails";
export const dynamic = "force-dynamic";
import Header from "@/app/mockinterview/[id]/components/Header";
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
    orderList: string;
  };
  params: {
    id: string;
  };
}) {
  const session = await getSession();
  const headersList = headers();
  const userAgentString = headersList.get("user-agent");
  const orderList = JSON.parse(searchParams.orderList);
  let historys: HistoryType[] | undefined;
  let practice;
  if (session) {
    if (!params.id) return;
    historys = await getUserHistoryBySize(
      session.accessToken,
      {
        "user-agent": userAgentString as string,
      },
      orderList.length
    );
  } else {
    if (!params.id) return;
    const getData = await getMultiPracticeDetails(params.id);
    const questionAndScripts = getData.questionAndScripts;

    practice = orderList
      .map((order: any) => {
        const foundQuestion = questionAndScripts.find(
          (item: any) => item.question.pkValue === order
        );
        return foundQuestion ? foundQuestion.question : null;
      })
      .filter(Boolean);
  }
  return (
    <>
      <main className="flex flex-col mx-auto pt-20 pb-8 max-w-[500px] h-[100dvh] sm:max-h-[1000px] overflow-y-hidden bg-white no-scrollbar">
        <Header title="답변확인" className="mb-5" />
        {session ? (
          <PracticeResultMain
            pkValue={params.id}
            historys={historys?.reverse() as HistoryType[]}
            session={session}
          />
        ) : (
          <PracticeResultMainGuest pkValue={params.id} practice={practice} />
        )}
      </main>
      {/* {session ? (
        <PracticeResultMain
          pkValue={params.id}
          historys={historys?.reverse() as HistoryType[]}
          session={session}
        />
      ) : (
        <PracticeResultMainGuest pkValue={params.id} practice={practice} />
      )} */}
    </>
  );
}
