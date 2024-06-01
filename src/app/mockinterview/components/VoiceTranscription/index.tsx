"use client";
import { VoiceType } from "@/types/Voice";
import React, { useState, useEffect } from "react";

interface Props {
  isStart: boolean;
  handleStop: (interimResult: string, time: number) => void;
}

export default function VoiceTranscription({ isStart, handleStop }: Props) {
  const [isListening, setIsListening] = useState(false);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [wasListening, setWasListening] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [timer, setTimer] = useState<any>(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "음성인식이 동작하지 않는 브라우저입니다. 크롬 브라우저를 사용해주세요!"
      );
      return;
    }
    setTime(0);
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
    return () => {
      stopTimer();
      recognition.stop();
    };
  }, []);

  // 음성인식 시작 코드
  useEffect(() => {
    if (isStart) {
      startListening();
      setWasListening(true);
    } else if (wasListening && !isStart) {
      stopListening();
      let resultString = "";
      if (transcripts.length > 0) {
        transcripts.forEach((result: any) => {
          resultString = resultString + result + ". ";
        });
      }
      handleStop(resultString, time);
      setWasListening(false);
    }
    return () => {
      stopListening();
    };
  }, [isStart]);
  useEffect(() => {
    if (isListening) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => {
      stopTimer();
    };
  }, [isListening]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      // recognition.abort();
      setTimeout(() => {
        recognition.stop();
      }, 3000);
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
  return <></>;
}
