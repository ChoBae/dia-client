"use client";
import React, { useState, useEffect } from "react";
import SelectButtons from "../SelectButtons";
import HistorySession from "../HistorySession";
import { useSession } from "next-auth/react";
import { getQuestionHistory } from "@/app/api/getQuestionHistory";
import type { HistoryType } from "@/types/History";
import type { Session } from "@/types/Session";
import type { Question as QuestionType } from "@/types/Question";
import ResultSession from "../ResultSession";

interface Props {
  pkValue: number;
  question: QuestionType;
}

export default function ResultMain({ pkValue, question }: Props) {
  // const router = useRouter();
  const { data: session, status } = useSession();
  const typedSession = session as Session;
  const [isView, setIsView] = useState<number>(0); // 0: 현재 답변, 1: 히스토리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState<string>("");
  const [historyList, setHistoryList] = useState<HistoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const getHistory = await getQuestionHistory(
          pkValue,
          typedSession?.user.access_token
        );
        if (getHistory) setHistoryList(getHistory);
      } else {
        const getHistory = localStorage.getItem(`history=${pkValue}`);
        if (getHistory) {
          // 데이터가 없을 경우 기본값으로 빈 배열 설정
          const historyArray = getHistory ? JSON.parse(getHistory) : [];
          setHistoryList(historyArray);
        }
      }
    };

    fetchData();
  }, [pkValue, typedSession, session]);

  const hideMenu = async () => {
    setAnimationClass("animate-fadeOutDown");
    await new Promise((r) => setTimeout(r, 600));
    setIsModalOpen(false);
  };

  const handleClick = () => {
    if (isModalOpen) {
      hideMenu();
    } else {
      setAnimationClass("animate-fadeInUp");
      setIsModalOpen(true);
    }
  };

  const ViewComponent = () => {
    switch (isView) {
      case 0:
        return (
          <ResultSession
            pkValue={pkValue}
            latestHistory={historyList[0]}
            question={question}
          />
        );
      case 1:
        return <HistorySession id={pkValue} historyList={historyList} />;
      default:
        return (
          <ResultSession
            pkValue={pkValue}
            latestHistory={historyList[0]}
            question={question}
          />
        );
    }
  };
  return (
    <>
      <SelectButtons isView={isView} setIsView={setIsView}></SelectButtons>
      <ViewComponent />
    </>
  );
}
