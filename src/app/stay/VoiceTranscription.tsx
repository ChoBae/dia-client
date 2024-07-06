"use client";
import React, { useState, useEffect } from "react";

interface Props {}

export default function VoiceTranscription({}: Props) {
  const [isListening, setIsListening] = useState(false);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  
  const initRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "음성인식이 동작하지 않는 브라우저입니다. 크롬 브라우저를 사용해주세요!"
      );
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
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
      setErrorMessages((prevErrorMessages) => [
        ...prevErrorMessages,
        event.error,
      ]);
    };

    recognition.onend = () => {
      console.log("음성인식 종료");
      setIsListening(false);
      recognition.start();
    };

    setRecognition(recognition);
  };

  useEffect(() => {
    initRecognition();
    return () => {
      setRecognition(null);
      recognition?.stop();
    };
  }, []);


  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div className="flex flex-col mx-auto pt-20 pb-8 w-screen h-[100dvh] sm:max-h-[1000px] sm:w-1/4 2xl:w-1/3">
      <h1 className="flex text-center mx-auto">테스트 페이지</h1>
      <div className="flex flex-row mx-auto gap-3">
        <h2
          className="flex bg-blue-500 p-2 rounded-sm cursor-pointer"
          onClick={startListening}
        >
          음성인식 시작
        </h2>
        <h2
          className="flex bg-red-500 p-2 rounded-sm cursor-pointer"
          onClick={stopListening}
        >
          음성인식 종료
        </h2>
      </div>
      <h2>상태 : {isListening ? "음성인식 중" : "음성인식 중지"}</h2>
      <h2>결과 : {transcripts}</h2>
      <h2>에러 메세지 : {errorMessages}</h2>
    </div>
  );
}
