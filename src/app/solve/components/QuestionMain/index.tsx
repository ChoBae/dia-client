"use client";
import React, { useState, useEffect } from "react";
import CategoryButton from "./components/CategoryButton";
import type { Question as QuestionType } from "@/types/Question";
import Link from "next/link";
import { ToolTips } from "../ToolTips";
import { Question } from "@/app/components/Question";
import { Session } from "@/types/Session";
import { TagBar } from "./components/TagBar";
interface Props {
  questionsData: QuestionType[];
  query: string;
  session: any;
}
export default function QuestionMain({ questionsData, query, session }: Props) {
  const [currentTag, setCurrentTag] = useState(query);
  const [firstCheck, setFirstCheck] = useState<boolean>(false);
  const [questionList, setQuestionList] = useState<QuestionType[]>([]);
  // const [session, setSession] = useState<Session | null>(null);
  // console.log('여기서 확인', questionList)
  useEffect(() => {
    if (!session) {
      handleFirstCheck();
    }
  }, [session]);

  useEffect(() => {
    setQuestionList(questionsData);
  }, [questionsData, query]);
  const handleFirstCheck = async () => {
    // 로컬스트리지에서 처음 접속했는지에 대한 정보를 찾아본다
    const firstCheck = localStorage.getItem("firstCheck");
    if (firstCheck === null) {
      // 처음 접속했다면
      localStorage.setItem("firstCheck", "true");
      setFirstCheck(true);
    }
  };
  return (
    <main className="flex flex-col mx-auto w-full px-4 sm:px-6 py-16 sm:w-1/2 max-w-3xl no-scrollbar relative">
      <div className="sticky top-16 bg-white z-10">
        <div className="flex flex-row w-full mb-3 border-b-[1px] border-[#F5F5F5]">
          <Link href={`/solve/${currentTag}`} className="flex-1">
            <CategoryButton selected={true}>개별연습</CategoryButton>
          </Link>
          <Link href={`/practice/${currentTag}`} className="flex-1">
            <CategoryButton>실전연습</CategoryButton>
          </Link>
        </div>
        <TagBar
          currentTag={currentTag}
          session={session}
          setQuestionList={setQuestionList}
        />
      </div>
      <section className="grid gap-3 mb-3">
        {questionList.map((question: QuestionType, index: number) => (
          <Link
            href={`/solve/problem/${question.pkValue}`}
            key={question.pkValue}
          >
            <Question
              question={question}
              key={index}
              isDetail={true}
              session={session}
            >
              <Question.SubTitle className="text-primary-600">
                개별연습
              </Question.SubTitle>
              <Question.Title>{question.korTitleValue}</Question.Title>
            </Question>
          </Link>
        ))}
      </section>
      {/* tooltip */}
      {firstCheck && !session && (
        <ToolTips onClick={() => setFirstCheck(false)} />
      )}
    </main>
  );
}
