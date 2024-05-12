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
import type { Session } from "@/types/Session";
import HistorySection from "@/app/components/HistorySection";
import { getQuestionHistory } from "@/app/api/getQuestionHistory";
import type { HistoryType } from "@/types/History";
import PlusIcon from "@/app/ui/icons/PlusIcon";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {
  questionData: QuestionType;
  session?: any;
}

export default function QuestionMain({
  questionData,
  session,
}: // session,
Props) {
  // const { data: session, status } = useSession();
  // const typedSession = session as Session;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState<string>("");

  const [isView, setIsView] = useState<number>(0); // 0: 현재 답변, 1: 히스토리
  const [historyList, setHistoryList] = useState<HistoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const getHistory = await getQuestionHistory(
          questionData.pkValue,
          session.accessToken
        );
        if (getHistory) setHistoryList(getHistory);
      }
    };

    fetchData();
  }, [questionData, session]);

  const solveQuestion = () => {
    router.push(`/mockinterview/${questionData.pkValue}`);
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
  const handleMore = () => {
    if (!session) {
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
      notify();
      return;
    }
    router.push(`/solve/problem/history/${questionData.pkValue}`);
  };
  return (
    <>
      <section className="flex flex-col w-full h-full max-h-[1000px]">
        <div className="flex items-center mb-[32px] pl-2">
          <div onClick={() => router.back()}>
            <ChevronLeftIcon className="h-3 w-3 text-[#212121] cursor-pointer hover:opacity-50" />
          </div>
          <h1 className="text-lg leading-[21.6px] sm:text-xl font-bold text-center text-primary-600 flex-grow mr-2">
            개별 문제 풀기
          </h1>
          <div className="mr-1" onClick={() => copyToClipboard()}>
            <ShareIcon />
          </div>
        </div>
        <div className="flex flex-col flex-grow gap-y-3 mb-4 h-3/5">
          <Question
            question={questionData}
            session={session}
            isBookmarkOn={session ? true : false}
          >
            <Question.SubTitle className="text-primary-600">
              개별연습
            </Question.SubTitle>
            <Question.Title>{questionData.korTitleValue}</Question.Title>
          </Question>
          <ScriptSection
            id={questionData.pkValue}
            className={"h-full"}
            placeholder="모의연습 전 스크립트를 먼저 작성해보세요.이후 음성 답변과 스크립트를 비교할 수 있습니다."
            session={session}
          ></ScriptSection>

          <div className="flex flex-col h-[30%]">
            <div className="flex flex-row mb-3 justify-between px-4">
              <h1 className="text-[16px] leading-[19px] font-bold text-primary-600 ">
                답변 히스토리
              </h1>
              <p
                onClick={handleMore}
                className="flex flex-row gap-1 text-[14px] leading-[16.71px] font-semibold text-primary-gray-600 pl-4 cursor-pointer hover:opacity-70"
              >
                모두 보기
                <PlusIcon className=""></PlusIcon>
              </p>
            </div>
            {historyList.length > 0 ? (
              <div className="flex flex-row max-w-full h-full overflow-x-auto gap-3 no-scrollbar">
                {historyList.map((history, index) => (
                  <HistorySection
                    key={index}
                    history={history}
                    session={session}
                    className="min-w-[80%] sm:min-w-[50%] h-full"
                    previewMode={true}
                  ></HistorySection>
                ))}
              </div>
            ) : (
              <div className="flex flex-col px-5 py-3 rounded-[10px] h-full bg-primary-100">
                <div className="flex flex-row gap-1">
                  <p className="text-[12px] text-primary-400 leading-[14px] font-semibold">
                    연습 기록이 아직 없습니다
                  </p>
                  <div className="flex justify-center items-center bg-white  rounded-[100px] px-[6px] py-[3px] cursor-pointer hover:opacity-70">
                    <p className="text-primary-gray-600 text-[8px] leading-[9.6px] font-semibold">
                      🎙️--:--
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Button onClick={handleClick}>모의연습 시작하기</Button>
      </section>
      {/* 모달 섹션 */}
      <Modal
        animationClass={animationClass}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        isOverlayClickClose={true}
      >
        <Modal.Header closeModal={hideMenu} />
        <Modal.Body
          title="개별연습을 시작해볼까요?"
          description="문제의 리얼한 TTS가 제공되며 소요 시간은 평균 1~2분입니다."
        />
        <Modal.Button onClick={solveQuestion}>시작하기</Modal.Button>
      </Modal>

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
  );
}
