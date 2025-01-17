"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import InterviewIntroIcon from "@/app/ui/icons/InterviewIntroIcon";
import Typed from "typed.js";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import Header from "@/app/mockinterview/[id]/components/Header";
import { TestVoicePlayer } from "./TestVoicePlayer";
import EqualizerIcon from "../ui/icons/EqualizerIcon";
import { MicroIcon } from "../ui/icons/MicroIcon";
import Recorder from "../components/Recorder";

interface Props {}

export default function SettingSession({}: Props) {
  const router = useRouter();
  const [testVoiceStart, setTestVoiceStart] = useState<boolean>(false);
  const [recordedVoiceStart, setRecordedVoiceStart] = useState<boolean>(false);
  const [recordStart, setRecordStart] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  return (
    <main
      className={`flex flex-col mx-auto w-screen pt-20 pb-8 h-[100dvh] sm:max-h-[1000px] sm:w-1/4 2xl:w-1/3 no-scrollbar`}
    >
      <Header handleBack={() => router.back()} title="환경설정" />
      <section className="flex flex-col px-4 w-full h-screen">
        <div className="flex flex-col w-full ml-4 mb-3">
          <h1 className="text-lg text-primary-gray-900 font-semibold">
            음량 테스트
          </h1>
          <p className="text-sm font-normal text-primary-gray-800">
            테스트 음성을 재생시켜 기기의 볼륨을 조절해주세요
          </p>
        </div>
        <TestVoicePlayer
          src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/[민기] 다이아는 개발자 모의 면접 플랫폼입니다.mp3`}
        />
        <div className={`flex flex-col ml-4 mb-3 mt-3`}>
          <h1 className="text-lg text-primary-gray-900 font-semibold">
            마이크 테스트
          </h1>
          <p className="text-sm font-normal text-primary-gray-800">
            예시 문장을 녹음해 자신의 목소리를 확인해보세요
          </p>
        </div>
        <Recorder setAudioBlob={setAudioBlob}></Recorder>
        {audioBlob ? (
          <TestVoicePlayer src={URL.createObjectURL(audioBlob)} />
        ) : (
          <TestVoicePlayer src="" />
        )}
      </section>
    </main>
  );
}
