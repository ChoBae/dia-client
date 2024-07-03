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
import Button from "@/app/components/Button";
interface Props {
  pkValue: string;
  session?: Session;
  historys: HistoryType[];
}

export default function PracticeResultMain({
  pkValue,
  session,
  historys,
}: Props) {
  const router = useRouter();
  const [questionIdx, setQuestionIdx] = useState(1);
  return (
    <section className="flex flex-col h-full gap-3 px-4">
      <div className="flex gap-[6px] flex-row w-full overflow-x-auto no-scrollbar mb-4">
        {historys.map((question, index) => (
          <NumberButton
            key={question.question.pkValue}
            isSelected={questionIdx === index + 1}
            onClick={() => setQuestionIdx(index + 1)} // 숫자 버튼 클릭 시 questionIdx 변경
          >
            {index + 1}
          </NumberButton>
        ))}
      </div>
      <Question
        question={historys[questionIdx - 1].question}
        isBookmarkOn={session ? true : false}
      >
        <Question.SubTitle className="text-[#FDDA23]">
          Question
        </Question.SubTitle>
        <Question.Title>
          {historys[questionIdx - 1].question.korTitleValue}
        </Question.Title>
      </Question>
      <ScriptSection
        id={historys[questionIdx - 1].question.pkValue}
        className="flex-grow-3 h-[150px] sm:h-[200px]"
        session={session}
      />
      <HistorySection
        id={historys[questionIdx - 1].pkValue}
        history={historys[questionIdx - 1]}
        session={session}
        className="flex-grow h-0"
        theme="multi"
      />
      <div className="flex flex-row gap-3">
        <Button
          onClick={() => router.push(`/mockinterview/practice/${pkValue}`)}
          className="bg-primary-gray-50 border-primary-600 border-[1.5px] text-primary-600"
        >
          다시풀기
        </Button>
        <Button onClick={() => router.push(`/practice/backend`)}>
          답변완료
        </Button>
      </div>
    </section>
  );
}
