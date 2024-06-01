"use client";
import useSpeechToText from "react-hook-speech-to-text";
import { useEffect, useState } from "react";
export default function Main() {
  const [isListening, setIsListening] = useState(false);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "Web Speech API is not supported by this browser. Please use Chrome or Firefox."
      );
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    // recognition.interimResults = true;
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
      console.error(event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognition);
  }, []);

  const startListening = () => {
    console.log("녹음 시작");
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
    <>
      <main className="flex flex-col mx-auto px-4 sm:px-6 pt-20 pb-8 h-[100dvh] sm:max-h-[1000px] sm:w-1/2 2xl:w-1/3 no-scrollbar overflow-y-hidden">
        <div className="flex flex-col items-center justify-center m-auto ">
          <button
            className="flex bg-primary-600 p-3 rounded-sm text-white"
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? "녹음 중지" : "녹음 시작"}
          </button>
          <h1 className="text-xl text-primary-gray-600 leading-7 font-bold mt-6">
            음성인식 상황{" "}
            <span className="text-red-500">{isListening ? "on" : "off"}</span>
          </h1>
          <h1 className="text-[16px] text-primary-gray-600 leading-[22px] font-normal mt-4">
            내가 말한 대답 :
          </h1>
          <h1 className="text-[16px] text-primary-gray-900 font-bold leading-[22px]">
            {transcripts.join(" ")}
          </h1>
          {/* <h1 className="text-xl text-primary-gray-600 leading-7 font-bold mt-6">
            에러 콘솔 로그
            <span className="text-red-500">{isErrorLog}</span>
          </h1> */}
        </div>
      </main>
    </>
  );
}
