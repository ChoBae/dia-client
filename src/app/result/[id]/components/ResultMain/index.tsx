"use client";
import React, { useState, useEffect } from "react";
import { getQuestionHistory } from "@/app/api/getQuestionHistory";
import type { HistoryType } from "@/types/History";
import type { Session } from "@/types/Session";
import type { Question as QuestionType } from "@/types/Question";
import ResultSession from "../ResultSession";

interface Props {
  pkValue: number;
  question: QuestionType;
  session?: Session;
  historyList: HistoryType[];
}

export default function ResultMain({
  pkValue,
  question,
  session,
  historyList,
}: Props) {
  const [isView, setIsView] = useState<number>(0); // 0: 현재 답변, 1: 히스토리

  return (
    <>
      <ResultSession
        pkValue={pkValue}
        latestHistory={historyList[0]}
        question={question}
        session={session}
      />
    </>
  );
}
