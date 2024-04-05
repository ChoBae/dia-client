import { Metadata } from "next";
import { PracticeMain } from "../components/PracticeMain";
import { getSession } from "../../../authLib";
import { headers } from "next/headers";
import { getPracticeList } from "@/app/api/getPracticeList";
export const metadata: Metadata = {
  title: "실전 연습",
  description: "현직 개발자가 엄선한 문제 세트를 확인해보세요!",
};
const dummyList = [
  {
    pkValue: 1,
    korTitleValue: "Java / Spring / Jpa",
  },
];
export default async function Home({ params }: { params: { query: string } }) {
  const session = await getSession();
  const headersList = headers();
  const userAgentString = headersList.get("user-agent");
  let practiceList;
  if (session) {
    if (!params.query) return;
    practiceList = await getPracticeList({
      "user-agent": userAgentString as string,
    });
  } else {
    if (!params.query) return;
    practiceList = practiceList = await getPracticeList({
      "user-agent": userAgentString as string,
    });
  }
  return (
    <PracticeMain
      practiceList={practiceList}
      query={params.query}
      session={session}
    ></PracticeMain>
  );
}
