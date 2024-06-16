"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MicroCircleIcon } from "@/app/ui/icons/MicroCircleIcon";
import convertToHourMinute from "@/utils/convertToHourMinute";
import { Modal } from "@/app/components/Modal";

interface Props {
  isStart: boolean;
  handleStop: (interimResult: string, time: number) => void;
  setIsEnd: (isEnd: boolean) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
  isRestartFirst: boolean;
  isRestartSecond: boolean;
}

export default function VoiceTranscription({
  isStart,
  handleStop,
  isRestartFirst,
  isRestartSecond,
  setIsEnd,
  setIsModalOpen,
}: Props) {
  const [isListening, setIsListening] = useState(false);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [wasListening, setWasListening] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [timer, setTimer] = useState<any>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

  const initRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "음성인식이 동작하지 않는 브라우저입니다. 크롬 브라우저를 사용해주세요!"
      );
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "ko-KR";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptSegment;
        }
      }
      setTranscripts((prevTranscripts) => [
        ...prevTranscripts,
        finalTranscript,
      ]);
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") {
        setIsErrorModalOpen(true);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognition);
  };

  useEffect(() => {
    initRecognition();
    return () => {
      stopTimer();
      setRecognition(null);
      recognition?.stop();
    };
  }, []);

  // 음성인식 시작 코드
  useEffect(() => {
    const handleListening = async () => {
      if (isStart) {
        if (!isRestartSecond) {
          startListening();
        } else {
          setIsListening(true);
          startListening();
        }
        setTranscripts([]);
        startTimer();
        setWasListening(true);
      }
    };
    handleListening();
    return () => {
      stopListening();
    };
  }, [isStart]);

  useEffect(() => {
    if (isRestartFirst) {
      setWasListening(false);
      setIsListening(false);
      // stopListening();
      setTime(0);
      stopTimer();
    }
  }, [isRestartFirst]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      // setIsListening(false);
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTime((prevTime: number) => prevTime + 1);
    }, 1000); // 1초마다 증가
    setTimer(interval);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
  };

  const handleSave = async () => {
    let resultString = "";
    if (transcripts.length > 0) {
      transcripts.forEach((result) => {
        if (result.trim() === "") return;
        resultString += result + ". ";
      });
    }
    handleStop(resultString, time || 1);
    setWasListening(false);
  };

  useEffect(() => {
    if (!isListening && wasListening) {
      handleSave();
      // stopListening();
    }
  }, [isListening]);

  const handleEnd = () => {
    setIsModalOpen(true);
    stopListening();
    stopTimer();
    setTimeout(() => {
      setIsListening(false);
    }, 3000);
  };
  return (
    <div className="w-full absolute bottom-12 text-center my-auto">
      <div className="absolute inset-0 flex justify-center items-center w-full">
        <Image
          src="/images/equalizer.png"
          alt="이퀄라이저"
          width={1408}
          height={344}
          className={`z-40 w-full sm:px-4 ${isStart ? "animate-pulse" : ""}`}
          priority={true}
        />
        <div
          className={`absolute flex mx-auto my-auto justify-center items-center rounded-full z-50  hover:opacity-75 ${
            !isListening ? "opacity-75" : ""
          }`}
          onClick={handleEnd}
        >
          <div
            className={`w-full h-full absolute ring-8 ring-primary-200 rounded-full ${
              isListening ? "animate-ping" : ""
            }`}
          ></div>
          <h1 className="text-center font-semibold text-primary-600 absolute mx-auto my-auto -top-8 mr-1">
            {convertToHourMinute(time)}
          </h1>
          <MicroCircleIcon />
        </div>
      </div>
      {/* 오류 모달 섹션 */}
      <Modal modalPosition="center" isOpen={isErrorModalOpen}>
        <Modal.Header closeModal={() => setIsErrorModalOpen(false)} />
        <Modal.Body
          title="음성인식 오류"
          titleClassName="text-primary-gray-600"
          description="현재 녹음이 되지 않고 있습니다. 마이크를 입력을 확인해주세요"
          descClassName="px-10 text-[16px] font-normal text-primary-gray-900 leading-[22px] text-center"
          mainIcon="VoiceError"
        />

        <Modal.Button
          className="rounded-md"
          onClick={() => setIsErrorModalOpen(false)}
        >
          확인
        </Modal.Button>
      </Modal>
    </div>
  );
}
