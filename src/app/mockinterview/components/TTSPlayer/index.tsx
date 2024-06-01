"use client";
import { VoiceType } from "@/types/Voice";
import React, { useState, useRef, useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import VoiceTranscription from "../VoiceTranscription";

interface TTSPlayerProps {
  isStart: boolean;
  setDuration: (duration: number) => void;
  handleStop?: (interimResult: string, time: number) => void;
  voice: VoiceType;
  isEnd?: boolean;
  isRecording: boolean;
  setIsRecording?: (isRecording: boolean) => void;
  isRestart: boolean;
}

export default function TTSPlayer({
  isStart,
  setDuration,
  handleStop,
  voice,
  isEnd,
  isRecording,
  setIsRecording,
  isRestart,
}: TTSPlayerProps) {
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);
  const [time, setTime] = useState<number>(0);
  const [timer, setTimer] = useState<any>(null);

  const playAudio1 = () => {
    if (audio1Ref.current) {
      audio1Ref.current.play();
    }
  };

  const playAudio2 = () => {
    if (audio2Ref.current) {
      // audio1Ref.current!.pause(); // 재생 전에 일단 중지
      audio2Ref.current.play();
    }
  };

  const stopAudio = () => {
    if (audio1Ref.current) {
      audio1Ref.current.pause();
      // setIsAudio1Playing(false);
    }
    if (audio2Ref.current) {
      audio2Ref.current.pause();
    }
  };

  useEffect(() => {
    let timer: any;
    // 초기상태 초기화
    stopAudio();
    setTime(0);
    if (isStart) {
      setTimeout(() => {
        playAudio1();
      }, 1000);
      // timer = setInterval(() => {
      //   setTime((prevTime) => prevTime + 1);
      // }, 1000);
    }
    return () => {};
  }, [isStart, voice, isRestart]);

  useEffect(() => {
    if (handleStop && !isStart && !isEnd) {
      stopAudio();
      setIsRecording && setTimeout(() => setIsRecording(false), 1000);
    }
    setTime(0);
    return () => {
      stopTimer();
    };
  }, [isStart, handleStop, isEnd]);

  const handleAudio1Ended = () => {
    setTimeout(() => {
      playAudio2();
    }, 1000);
  };
  const handleLoadedMetadata = () => {
    if (audio1Ref.current) {
      const audioDuration = audio1Ref.current.duration;
      setDuration(audioDuration);
    }
  };
  const handleAudio2Ended = () => {
    stopAudio();
    setIsRecording && setTimeout(() => setIsRecording(true), 1000);
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
  useEffect(() => {
    if (isRecording) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => {
      stopTimer();
    };
  }, [isRecording]);

  return (
    <div>
      {voice && (
        <audio
          ref={audio1Ref}
          src={voice.fileUrlValue}
          onEnded={handleAudio1Ended} //
          onLoadedMetadata={handleLoadedMetadata}
          preload="true"
        ></audio>
      )}
      <audio
        ref={audio2Ref}
        onEnded={handleAudio2Ended}
        src="/sounds/beep.mp3"
      ></audio>
      {handleStop && (
        <VoiceTranscription
          isStart={isRecording}
          handleStop={handleStop}
        />
      )}
    </div>
  );
}
