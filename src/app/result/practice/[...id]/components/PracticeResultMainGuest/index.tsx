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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {
  pkValue: string;
  practice: QuestionType[];
}

export default function PracticeResultMainGuest({ pkValue, practice }: Props) {
  const router = useRouter();
  const [questionIdx, setQuestionIdx] = useState(1);
  const [historys, setHistorys] = useState<HistoryType[]>([]);
  const notify = () =>
    toast("로그인이 필요한 서비스입니다", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  useEffect(() => {
    const fetchHistory = async () => {
      const historys = localStorage.getItem("practiceResultList");
      if (historys) {
        setHistorys(JSON.parse(historys));
      }
      // localStorage.removeItem("practiceResultList");
    };
    fetchHistory();
  }, []);
  return (
    <main className="flex flex-col mx-auto pt-20 pb-8 h-[100dvh] max-w-[500px] max-h-[1000px] overflow-y-hidden bg-white no-scrollbar">
      <Header
        title="답변확인"
        className="mb-5"
        handleBack={() => router.push(`/mockinterview/practice/${pkValue}`)}
      />
      <section className="flex flex-col px-5">
        <div className="flex gap-[6px] flex-row w-full overflow-x-auto no-scrollbar mb-4">
          {practice.map((question, index) => (
            <NumberButton
              key={question.pkValue}
              isSelected={questionIdx === index + 1}
              onClick={() => setQuestionIdx(index + 1)} // 숫자 버튼 클릭 시 questionIdx 변경
            >
              {index + 1}
            </NumberButton>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <Question
            question={practice[questionIdx - 1]}
            toastOptionFunc={notify}
          >
            <Question.SubTitle className="text-[#FDDA23]">
              Question
            </Question.SubTitle>
            <Question.Title>
              {practice[questionIdx - 1].korTitleValue}
            </Question.Title>
          </Question>
          <ScriptSection
            id={practice[questionIdx - 1].pkValue}
            className="h-[151px] sm:h-[250px]"
          />
          <HistorySection
            id={practice[questionIdx - 1].pkValue}
            history={historys[questionIdx - 1]}
            className="h-[369px]"
            theme="multi"
          />
        </div>
      </section>
      {/* 토스트 메세지 섹션 */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="bg-primary-600 p-3"
      />
    </main>
  );
}
