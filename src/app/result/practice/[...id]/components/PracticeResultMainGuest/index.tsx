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
import Button from "@/app/components/Button";
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
    <>
      <section className="flex flex-col gap-3 h-full px-5">
        <div className="flex gap-[6px] h-8 flex-row w-full overflow-x-auto no-scrollbar">
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
        <Question question={practice[questionIdx - 1]} toastOptionFunc={notify}>
          <Question.SubTitle className="text-[#FDDA23]">
            Question
          </Question.SubTitle>
          <Question.Title>
            {practice[questionIdx - 1].korTitleValue}
          </Question.Title>
        </Question>
        <ScriptSection
          id={practice[questionIdx - 1].pkValue}
          className="flex-grow-3 h-[150px] sm:h-[200px]"
        />
        <HistorySection
          id={practice[questionIdx - 1].pkValue}
          history={historys[questionIdx - 1]}
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
    </>
    // <main className="flex flex-col mx-auto pt-20 pb-8 h-[100dvh] max-w-[500px] max-h-[1000px] overflow-y-hidden bg-white no-scrollbar">

    // </main>
  );
}
