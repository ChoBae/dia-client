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
  setIsModalOpen: (isModalOpen: boolean) => void;
  setIsEnd: (isEnd: boolean) => void;
  setIsRestart?: (isRestart: boolean) => void;
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
  setIsModalOpen,
  setIsEnd,
  setIsRestart,
}: TTSPlayerProps) {
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);
  const [isReplay, setIsReplay] = useState<boolean>(false);

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
    if (isStart) {
      setTimeout(() => {
        playAudio1();
      }, 1000);
    }
    return () => {
      // clearInterval(timer);
    };
  }, [isStart, voice]);

  useEffect(() => {
    let timer: any;
    // 초기상태 초기화
    stopAudio();
    if (isRestart) {
      setIsRecording && setIsRecording(false);
      setTimeout(() => {
        playAudio1();
      }, 1000);
    }
    return () => {};
  }, [isRestart]);

  useEffect(() => {
    if (handleStop && !isStart) {
      stopAudio();
      // setIsRecording && setTimeout(() => setIsRecording(false), 1000);
    }
    return () => {};
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
    if (isRestart) {
      setIsReplay(true);
    }
    setIsRestart && setIsRestart(false);
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
          isRestartFirst={isRestart}
          isRestartSecond={isReplay}
          // isRestart={isRestart}
          setIsModalOpen={setIsModalOpen}
          setIsEnd={setIsEnd}
        />
      )}
    </div>
  );
}
