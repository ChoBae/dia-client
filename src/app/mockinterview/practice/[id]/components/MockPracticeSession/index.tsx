import EqualizerIcon from "@/app/ui/icons/EqualizerIcon";
import TTSPlayer from "../../../../components/TTSPlayer";

import { useEffect, useState, useRef, useCallback } from "react";
import type { PracticeResult } from "@/types/PracticeResult";
import type { VoiceType } from "@/types/Voice";
import { Modal } from "@/app/components/Modal";
import Image from "next/image";
import Link from "next/link";
import { savePractice } from "@/app/api/savePractice";
import type { Session } from "@/types/Session";
import RetryIcon from "@/app/ui/icons/RetryCircleIcon";
import convertToHourMinute from "@/utils/convertToHourMinute";
import { MicroCircleIcon } from "@/app/ui/icons/MicroCircleIcon";
import LayerLogoYellowIcon from "@/app/ui/icons/LayerLogoYellowIcon";
import Header from "@/app/mockinterview/[id]/components/Header";
import Typed from "typed.js";
import type { PracticeDetail, QuestionAndScript } from "@/types/Practice";
import { useRouter } from "next/navigation";
type Props = {
  practice: PracticeDetail;
  setIsView: (isView: number) => void;
  setResultList: (resultList: PracticeResult[]) => void;
  session?: Session;
  questionList: QuestionAndScript[];
};

export default function MockPraceticeSession(props: Props) {
  const { setIsView, setResultList, session, practice, questionList } = props;
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [practiceResultList, setPracticeResultList] = useState<
    PracticeResult[]
  >([]);
  const [duration, setDuration] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(true);
  const [isCancel, setIsCancel] = useState<boolean>(false);
  const [isAbleToSave, setIsAbleToSave] = useState<boolean>(false);

  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState<boolean>(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isRestart, setIsRestart] = useState<boolean>(false);
  const router = useRouter();
  const el = useRef(null);
  // Create reference to store the Typed instance itself
  const typed = useRef<Typed | null>(null);
  useEffect(() => {
    const options = {
      strings: [
        "질문이 끝난 뒤 마이크 버튼을 눌러<br/> 답변 녹음을 시작해보세요.",
        "질문을 다시 들으려면 다시듣기 아이콘을<br/> 눌러 한번 더 들으실 수 있습니다.",
        "차분한 어조로 답변해보세요.",
        "답변을 완료하면 마이크 버튼을 한번 더<br/>눌러 모의연습을 완료해주세요.",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      showCursor: false,
      cursorChar: "|",
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current?.destroy();
    };
  }, []);

  useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
            setTimeout(() => {
              setIsAbleToSave(true);
            }, 1200);
    }
    else {
      setElapsedTime(0);
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isRecording]);

  const handleStop = useCallback(
    async (interimResult: string, time: number) => {
      if (
        questionIdx !== null &&
        questionIdx !== undefined &&
        questionIdx < questionList.length
      ) {
        if (isCancel) {
          setIsCancelModalOpen(true);
          return;
        }
        setIsEndModalOpen(true);
        // 비었을때 빈문자열 보내게 수정
        if (session) {
          await savePractice({
            practiceResult: {
              interviewQuestionPkValue: questionList[questionIdx].question
                .pkValue as number,
              contentValue: interimResult.trim() || "",
              typeValue: "MULTI",
              elapsedTimeValue: time,
              filePathValue: null,
            },
            accessToken: session.accessToken,
          });
        } else {
          setPracticeResultList((prev: PracticeResult[]) => {
            return [
              ...prev,
              {
                interviewQuestionPkValue: questionList[questionIdx].question
                  .pkValue as number,
                contentValue: interimResult as string,
                typeValue: "MULTI",
                elapsedTimeValue: time,
                filePathValue: null,
                createdTimeValue : new Date().toISOString()
              },
            ] as PracticeResult[];
          });
          localStorage.setItem(
            "practiceResultList",
            JSON.stringify([
              ...practiceResultList,
              {
                interviewQuestionPkValue: questionList[questionIdx].question
                  .pkValue as number,
                contentValue: interimResult.trim() || "" as string,
                typeValue: "MULTI",
                elapsedTimeValue: time,
                filePathValue: null,
                createdTimeValue : new Date().toISOString(),
              },
            ])
          );
        }
      }
      if (questionIdx + 1 < questionList.length) {
        setQuestionIdx((prev) => prev + 1);
        setIsStart(true);
      } else {
        setIsModalOpen(true);
      }
    },
    [questionIdx, questionList, session, isCancel]
  );
  const handleNext = () => {
    if (!isAbleToSave) return;
    setIsAbleToSave(false);
    setIsStart(false);
    setElapsedTime(0);
    // if (questionIdx + 1 < questionList.length) {
    //   setQuestionIdx((prev) => prev + 1);
    // } else {
    //   setIsModalOpen(true);
    // }
  };
  const handleRetry = () => {
    setIsRestart(true);
    setIsRecording(false);
    setElapsedTime(0);
  };
  const handleBack = () => {
    setIsCancel(true);
    setIsStart(false);
  };

  return (
    <>
      <Header handleBack={handleBack} title="모의연습" />
      <section className="flex flex-col w-full h-full relative">
        {isRecording && (
          <RetryIcon
            onClick={handleRetry}
            className="absolute right-4 hover:opacity-70 cursor-pointer mb-2"
          />
        )}
        <div className="flex flex-col px-4 mt-10 h-full w-full">
          <div className="flex px-[16px] py-[17px] w-full  bg-white rounded-[10px] justify-center">
            <span
              ref={el}
              className="whitespace-nowrap  text-[16px] leading-6 sm:text-lg font-medium text-center text-primary-gray-900"
            ></span>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <div className="mx-auto my-auto inset-0 bg-cover bg-center z-0 max-w-[380px]">
              <LayerLogoYellowIcon className="mx-auto" />
              <div className="relative z-10 flex flex-row gap-[-2px] justify-center -mt-4">
                <Image
                  src="/images/mockinterview/interviewer_male.png"
                  alt="면접관 이미지"
                  width={320}
                  height={360}
                  className="w-1/2 ml-3 -mr-10"
                  priority={true}
                />
                <Image
                  src="/images/mockinterview/interviewer_female.png"
                  alt="면접관 이미지"
                  width={320}
                  height={360}
                  className="w-1/2"
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full absolute bottom-12 text-center my-auto">
          <div className="absolute inset-0 flex justify-center items-center w-full">
            <Image
              src="/images/mockinterview/equalizer_y.png"
              alt="이퀄라이저"
              width={1408}
              height={344}
              className={`z-40 w-full sm:px-4 ${
                isStart ? "animate-pulse" : ""
              }`}
              priority={true}
            />
            <div
              className={`absolute flex mx-auto my-auto justify-center items-center rounded-full z-50  hover:opacity-75 ${
                !isAbleToSave ? "opacity-75" : ""
              }`}
              onClick={handleNext}
            >
              <div
                className={`w-full h-full absolute ring-8 ring-primary-200 rounded-full ${
                  isAbleToSave ? "animate-ping" : ""
                }`}
              ></div>
              <h1 className="text-center font-semibold text-primary-600 absolute mx-auto my-auto -top-8 mr-1">
                {convertToHourMinute(elapsedTime)}
              </h1>
              <MicroCircleIcon />
            </div>
          </div>
        </div>
        {questionList && questionIdx !== null && questionIdx !== undefined && (
          <TTSPlayer
            isStart={isStart}
            voice={questionList[questionIdx].question.voices[0] as VoiceType}
            handleStop={handleStop}
            setDuration={setDuration}
            isEnd={isModalOpen}
            isRestart={isRestart}
            setIsRecording={setIsRecording}
          ></TTSPlayer>
        )}
        {/* 모달 섹션 */}
        <Modal modalPosition="center" isOpen={isModalOpen}>
          <Modal.Body
            title="수고하셨습니다👍🏻"
            description="작성된 스크립트와 녹음된 답변을 비교하러 가볼까요?"
            className="mb-[36px]"
            descClassName="px-5 text-[18px] font-semibold text-[#616161] leading-[28px] text-center"
          />
          <Link
            href={{
              pathname: `/result/practice/${practice.pkValue}`,
              query: {
                orderList: JSON.stringify(
                  questionList.map(
                    (questionAndScript: QuestionAndScript) =>
                      questionAndScript.question.pkValue
                  )
                ),
              },
            }}
          >
            <Modal.Button className="rounded-md w-[100px] px-[81px] py-[10px]">
              다음
            </Modal.Button>
          </Link>
        </Modal>
        {/* 저장 모달 섹션 */}
        <Modal modalPosition="center" isOpen={isCancelModalOpen}>
          <Modal.Header closeModal={() => setIsCancelModalOpen(false)} />
          <Modal.Body
            title="종료하시겠습니까?"
            description="지금 연습을 종료하면 답변한 내용은 저장되지 않습니다 그래도 종료하시겠습니까?"
            descClassName="px-10 text-[16px] font-normal text-primary-gray-900 leading-[22px] text-center"
            mainIcon="info"
          />

          <Modal.Button className="rounded-md" onClick={() => setIsView(0)}>
            종료하기
          </Modal.Button>
        </Modal>
      </section>
    </>
  );
}
