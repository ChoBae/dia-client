"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@/app/ui/icons/ChevronLeftIcon";
import { Question } from "../../../../../components/Question";
import ScriptSection from "@/app/components/ScriptSection";
import type { Question as QuestionType } from "@/types/Question";
import { Modal } from "@/app/components/Modal";
import Button from "@/app/components/Button";
import ShareIcon from "@/app/ui/icons/ShareIcon";
import copyToClipboard from "@/utils/copyToClipBoard";
import PolygonIcon from "@/app/ui/icons/PolygonIcon";
import QuestionDropdown from "../QuestionDropdown";

interface Props {
  practice: any;
  questionList: QuestionType[];
  session?: any;
}

export default function QuestionListMain({
  questionList,
  practice,
  session,
}: // session,
Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState<string>("");

  const solveQuestion = () => {
    router.push(`/mockinterview/practice/${practice.pkValue}`);
  };
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

  return (
    <section className="flex flex-col w-full h-full max-h-[1000px]">
      <div className="flex items-center mb-5 pl-2">
        <div onClick={() => router.back()}>
          <ChevronLeftIcon className="h-3 w-3 text-[#212121] cursor-pointer hover:opacity-50" />
        </div>
        <h1 className="text-lg leading-[21.6px] sm:text-xl font-bold text-center text-primary-600 flex-grow mr-2">
          문제 리스트
        </h1>
        <div className="mr-1" onClick={() => copyToClipboard()}>
          <ShareIcon />
        </div>
      </div>
      <Question
        question={practice}
        session={session}
        isBookmarkOn={session ? true : false}
      >
        <Question.SubTitle className="text-[#FEEB89]">
          실전연습
        </Question.SubTitle>
        <Question.Title>{practice.korTitleValue}</Question.Title>
      </Question>
      <div className="relative flex flex-col flex-grow h-3/5 mt-5 py-2">
        <div className="flex flex-row gap-1 mb-2 pl-4">
          <PolygonIcon className="mt-1" />
          <h3 className="text-primary-gray-600 text-[14px] leading-[16.8px] font-normal">
            아래의 문제들이 랜덤으로 출제됩니다.
          </h3>
        </div>
        <div className="flex flex-col h-full relative gap-3 overflow-y-auto no-scrollbar">
          {questionList.map((question: QuestionType, index: number) => (
            <QuestionDropdown
              question={question}
              session={session}
              key={question.pkValue}
            ></QuestionDropdown>
          ))}
        </div>
      </div>
      <Button onClick={handleClick}>실전연습 시작하기</Button>
      {/* 모달 섹션 */}
      <Modal
        animationClass={animationClass}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        isOverlayClickClose={true}
      >
        <Modal.Header closeModal={hideMenu} />
        <Modal.Body
          title="실전연습을 시작해볼까요?"
          description="문제의 리얼한 TTS가 제공되며 리스트의 문제는 랜덤으로 진행됩니다"
        />
        <Modal.Button onClick={solveQuestion}>시작하기</Modal.Button>
      </Modal>
    </section>
  );
}
