"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const MockPracticeSession = dynamic(() => import("../MockPracticeSession"), {
  ssr: false,
});
import GuidanceSession from "../GuidanceSession";
import MockPracticeHeader from "../MockPracticeHeader";
import ResultSession from "../ResultSession";
import type { PracticeResult } from "@/types/PracticeResult";
import type { Question } from "@/types/Question";
import { Session } from "@/types/Session";
import { PracticeDetail, QuestionAndScript } from "@/types/Practice";

interface Props {
  practice: PracticeDetail;
  session?: Session;
}
export default function MockPracticeMain({ practice, session }: Props) {
  const [isView, setIsView] = useState<number | null>(0); // 0: 안내 페이지, 1: 실전연습 중인 페이지 2: 결과 페이지
  const [resultList, setResultList] = useState<PracticeResult[]>([]);
  const randomQuestionList = practice.questionAndScripts.sort(
    () => Math.random() - 0.5
  );

  const ViewPage = () => {
    switch (isView) {
      case 0:
        return <GuidanceSession setIsView={setIsView} theme="multi" />;
      case 1:
        return (
          <MockPracticeSession
            questionList={randomQuestionList as QuestionAndScript[]}
            practice={practice}
            setIsView={setIsView}
            setResultList={setResultList}
            session={session}
          />
        );
      case 2:
        return <ResultSession resultList={resultList} />;
      default:
        return <GuidanceSession setIsView={setIsView} />;
    }
  };
  return (
    <main className="flex flex-col pt-20 pb-8 h-[100dvh] overflow-y-auto no-scrollbar w-full mx-auto sm:w-1/4 sm:h-[1000px]">
      <ViewPage />
    </main>
  );
}
