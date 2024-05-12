"use client";
import { useEffect, useState } from "react";
import ScriptSection from "@/app/components/ScriptSection";
import HistorySection from "@/app/components/HistorySection";
import { Question } from "@/app/components/Question";
import type { HistoryType } from "@/types/History";
import type { Question as QuestionType } from "@/types/Question";
import type { Session } from "@/types/Session";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
type Props = {
  pkValue: number;
  latestHistory: HistoryType;
  question: QuestionType;
  session?: Session;
};

export default function ResultSession(props: Props) {
  const { pkValue, latestHistory, question, session } = props;
  const router = useRouter();
  return (
    <section className="flex flex-col gap-3 h-full px-4">
      <Question
        question={question}
        isBookmarkOn={session ? true : false}
        session={session}
      >
        <Question.SubTitle className="text-primary-600">
          개별연습
        </Question.SubTitle>
        <Question.Title>{question.korTitleValue}</Question.Title>
      </Question>
      <ScriptSection
        id={pkValue}
        className="flex-grow-3 h-[150px] sm:h-[200px]"
        session={session}
      ></ScriptSection>
      <HistorySection
        id={pkValue}
        history={latestHistory}
        className="flex-grow h-0"
        session={session}
      ></HistorySection>
      <div className="flex flex-row gap-3">
        <Button
          onClick={() => router.push(`/mockinterview/${pkValue}`)}
          className="bg-primary-gray-50 border-primary-600 border-[1.5px] text-primary-600"
        >
          다시풀기
        </Button>
        <Button onClick={() => router.push(`/solve/backend`)}>답변완료</Button>
      </div>
    </section>
  );
}
