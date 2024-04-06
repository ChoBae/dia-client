"use client";
import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import Pagination from "./components/Pagination";
import Tag from "./components/Tag";
import CategoryButton from "./components/CategoryButton";
import type { Question as QuestionType } from "@/types/Question";
import { getTags } from "@/utils/getTags";
import { getQuestionList } from "@/app/api/getQuestionList";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Session } from "@/types/Session";
import { Practice } from "@/types/Practice";
interface Props {
  practiceList: any[];
  query: string;
  practiceClick: (id: number) => void;
  session? : Session
}
export default function PracticeList({
  practiceList,
  query,
  practiceClick,
}: Props) {
  return (
    <section className="grid gap-3">
      {practiceList.map((practice: Practice, index: number) => (
        <Link
          href={`/practice/problem/${practice.pkValue}`}
          key={practice.pkValue}
        >
          <Question
            key={practice.pkValue}
            id={practice.pkValue}
            title={practice.titleValue}
            onClick={() => practiceClick(practice.pkValue)}
          />
        </Link>
      ))}
    </section>
  );
}
