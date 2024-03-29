import { Metadata } from "next";
import { PracticeMain } from "../components/PracticeMain";
import { getSession } from "../../../authLib";
export const metadata: Metadata = {
  title: "실전 연습",
  description: "현직 개발자가 엄선한 문제 세트를 확인해보세요!",
};
const dummyList = [
  {
    pkValue: 1,
    korTitleValue: "Java / Spring / Jpa",
  },
  // {
  //   pkValue: 2,
  //   korTitleValue: "실전 모의고사 60분",
  // },
  // {
  //   pkValue: 3,
  //   korTitleValue: "실전 모의고사 90분",
  // },
  // {
  //   pkValue: 4,
  //   korTitleValue: "실전 모의고사 120분",
  // },
];
export default async function Home({ params }: { params: { query: string } }) {
  const session = await getSession();
  return (
    <PracticeMain
      practiceList={dummyList}
      query={params.query}
      session={session}
    ></PracticeMain>
  );
}
