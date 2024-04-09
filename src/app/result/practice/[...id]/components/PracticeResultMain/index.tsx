"use client";
import React, { useState, useEffect } from "react";

import { getQuestionHistory } from "@/app/api/getQuestionHistory";
import type { HistoryType } from "@/types/History";
import type { Session } from "@/types/Session";
import type { Question as QuestionType } from "@/types/Question";
import NumberButton from "../NumberButton";
import { Question } from "@/app/components/Question";
import ScriptSection from "@/app/components/ScriptSection";
import HistorySection from "@/app/components/HistorySection";
import Header from "@/app/mockinterview/[id]/components/Header";
import { useRouter } from "next/navigation";
import type { QuestionAndScript } from "@/types/Practice";

interface Props {
  pkValue: string;
  questionList: QuestionAndScript[];
  session?: Session;
}

export default function PracticeResultMain({
  pkValue,
  questionList,
  session,
}: Props) {
  const router = useRouter();
  const [questionIdx, setQuestionIdx] = useState(1);
  const [History, setHistory] = useState<HistoryType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const getHistory = await getQuestionHistory(
          questionList[questionIdx - 1].question.pkValue,
          session.accessToken
        );
        if (getHistory) setHistory(getHistory[0]);
      }
    };

    fetchData();
  }, [questionIdx, session]); // 의존성 배열 수정
  return (
    <main className="flex flex-col mx-auto pt-20 pb-8 h-[100dvh] max-w-[500px] max-h-[1000px] overflow-y-hidden bg-white no-scrollbar">
      <Header
        title="답변확인"
        className="mb-5"
        handleBack={() => router.push(`/mockinterview/practice/${pkValue}`)}
      />
      <section className="flex flex-col px-5">
        <div className="flex gap-[6px] flex-row w-full overflow-x-auto no-scrollbar mb-4">
          {questionList.map((question, index) => (
            <NumberButton
              key={question.question.pkValue}
              isSelected={questionIdx === index + 1}
              onClick={() => setQuestionIdx(index + 1)} // 숫자 버튼 클릭 시 questionIdx 변경
            >
              {index + 1}
            </NumberButton>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <Question
            question={questionList[questionIdx - 1].question}
            isBookmarkOn={session ? true : false}
          >
            <Question.SubTitle className="text-[#FDDA23]">
              Question
            </Question.SubTitle>
            <Question.Title>
              {questionList[questionIdx - 1].question.korTitleValue}
            </Question.Title>
          </Question>
          <ScriptSection
            id={questionList[questionIdx - 1].question.pkValue}
            className="h-[151px] sm:h-[250px]"
            preloadScript={questionList[questionIdx - 1].script}
          />
          <HistorySection
            id={questionList[questionIdx - 1].question.pkValue}
            history={History as HistoryType}
            session={session}
            className="h-[369px]"
            theme="multi"
          />
        </div>
      </section>
    </main>
  );
}
