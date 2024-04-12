// import QuestionList from "./components/QuestionList";
import { Metadata } from "next";
import PracticeResultMain from "./components/PracticeResultMain";
import { getSession } from "../../../../authLib";
import { headers } from "next/headers";
import { getUserHistoryBySize } from "@/app/api/getUserHistoryBySize";
import { HistoryType } from "@/types/History";
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
    // practice = await getMultiPracticeDetails(params.id);
    alert("로그인이 필요한 서비스입니다.");
  }
  return (
    <PracticeResultMain
      pkValue={params.id}
      historys={historys?.reverse() as HistoryType[]}
      session={session}
    />
  );
}
