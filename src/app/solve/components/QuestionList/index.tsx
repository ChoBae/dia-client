"use client";
import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import Pagination from "./components/Pagination";
import Tag from "./components/Tag";
import CategoryButton from "./components/CategoryButton";
import type { Question as QuestionType } from "@/app/types/Question";
import { getTags } from "@/app/utils/getTags";
import { getQuestionList } from "@/app/api/getQuestionList";
import { useSession } from "next-auth/react";
interface QuestionListProps {
  questionList: QuestionType[];
  query: string;
}
export default function QuestionList({
  questionList,
  query,
}: QuestionListProps) {
  const tags = getTags();
  const { data: session, status } = useSession();
  const [currentTag, setCurrentTag] = useState(query);
  return (
    <div className="">
      <div className="sticky top-16 bg-white z-10">
        <div className="flex flex-row w-full mb-4">
          <CategoryButton selected={true}>개별연습</CategoryButton>
          <CategoryButton>실전연습</CategoryButton>
        </div>
        <div className="flex flex-row gap-3 overflow-x-auto w-full mb-4">
          {tags.map((tag, index) => (
            <Tag key={index} selected={currentTag}>
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>
      <section className="grid gap-3">
        {questionList.map((qusetion: QuestionType, index: number) => (
          <Question
            key={qusetion.pkValue}
            id={qusetion.pkValue}
            title={qusetion.korTitleValue}
            // description={qusetion.description || ""}
            // tags={qusetion.tags}
          />
        ))}
        {/* <Pagination contentNum={questionList.length}></Pagination> */}
      </section>
    </div>
  );
}
