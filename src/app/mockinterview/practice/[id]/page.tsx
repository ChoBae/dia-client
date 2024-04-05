// import Header from "./components/Header";
import MockPracticeMain from "./components/MockPracticeMain";
import { getSession } from "../../../../authLib";
import { headers } from "next/headers";
import { getMultiPracticeDetails } from "@/app/api/getMultiPracticeDetails";
import type { PracticeDetail } from "@/types/Practice";

// export async function generateStaticParams() {
//   // const lists = await getPracticeDetails();
//   // const questionList = await getQuestionList();
//   // // console.log(questionList)
//   // return questionList.map((question: any) => {
//   //   return { id: question.pk.toString() };
//   // });

//   return [{ id: "1" }, { id: "2" }, { id: "3" }];
// }
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
    <MockPracticeMain
      practice={practice}
      session={session}
    ></MockPracticeMain>
  );
}
