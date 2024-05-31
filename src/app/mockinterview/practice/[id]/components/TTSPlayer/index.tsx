"use client";
import { VoiceType } from "@/types/Voice";
import React, { useState, useRef, useEffect } from "react";
import VoiceTranscription from "./VoiceTranscription";
interface TTSPlayerProps {
  isStart: boolean;
  setDuration: (duration: number) => void;
  handleStop?: (interimResult: string, time: number) => void;
  voice: VoiceType;
  isEnd?: boolean;
  setIsRecording?: (isRecording: boolean) => void;
  isRestart: boolean;
  // isTarget: boolean;
  isRecording: boolean;
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
  // isTarget,
}: TTSPlayerProps) {
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);
  // console.log('props')
  // console.log('isStart : ', isStart)
  // console.log('isTarget : ', isTarget)
  // console.log('voice', voice)
  

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
    // stopSpeechToText();
    if (isStart) {
      setTimeout(() => {
        playAudio1();
      }, 1000);
      // timer = setInterval(() => {
      //   setTime((prevTime) => prevTime + 1);
      // }, 1000);
    }
    return () => {
      // clearInterval(timer);
    };
  }, [isStart, voice, isRestart]);
  // useEffect(() => {
  //   let timer: any;
  //   // 초기상태 초기화
  //   stopAudio();
  //   // stopSpeechToText();
  //   if (isTarget) {
  //     setTimeout(() => {
  //       playAudio1();
  //     }, 1000);
  //     // timer = setInterval(() => {
  //     //   setTime((prevTime) => prevTime + 1);
  //     // }, 1000);
  //   }
  //   return () => {
  //     // clearInterval(timer);
  //   };
  // }, [isTarget, voice, isRestart]);

  useEffect(() => {
    if (handleStop && !isStart && !isEnd) {
      stopAudio();
      setIsRecording && setTimeout(() => setIsRecording(false), 1000);
    }
    return () => {
    };
  }, [isStart, handleStop]);

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
          // isTarget={isTarget}
        />
      )}
    </div>
  );
}
