"use client";
import React, { useState } from "react";
import HistoryList from "../components/HistoryList";
import Link from "next/link";
const dummyData = {
  id: 1,
  title: "Solid 원칙에 대해 설명해보세요",
  description:
    "객체지향 설계에서 지켜줘야 할 5개의 소프트웨어 개발 원칙( SRP, OCP, LSP, ISP, DIP )을 말한다.",
};
export default function Main({ params }: { params: { id: string } }) {
  const [isCategory, setIsCategory] = useState(0); // 0: 히스토리 보기, 1: 스크립트 보기

  const CategoryComponent = () => {
    switch (isCategory) {
      case 0:
        return <HistoryList></HistoryList>;
      case 1:
        return (
          <div className="p-3 w-full mt-2 bg-white rounded-lg shadow-md divide-y border-dashed border-2 border-indigo-500 ">
            {dummyData.description ? (
              <p>{dummyData.description}</p>
            ) : (
              <p>스크립트가 없습니다. 새로 작성해주세요✏️</p>
            )}
          </div>
        );
      default:
        return <HistoryList></HistoryList>;
    }
  };

  return (
    <main className="h-screen max-w-3xl mx-auto">
      <h1 className="text-3xl font-sans mt-5 text-gray-500">
        {dummyData.title}
      </h1>
      <div className="mt-5 mb-5 flex space-x-4">
        <span
          onClick={() => setIsCategory(0)}
          className={`text-md cursor-pointer hover:underline decoration-wavy decoration-indigo-500 ${
            isCategory === 0 && "underline"
          }`}
        >
          히스토리
        </span>
        <span
          onClick={() => setIsCategory(1)}
          className={`text-md cursor-pointer hover:underline decoration-wavy decoration-indigo-500 ${
            isCategory === 1 && "underline"
          }`}
        >
          스크립트 보기
        </span>
      </div>
      <CategoryComponent></CategoryComponent>
      <Link
        href={`/mockinterview/${params.id}/mocktest`}

        // onClick={toggleScriptVisibility}
      >
        <button className="mt-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-xl shadow-md hover:bg-indigo-700 focus:outline-none">
          면접 진행 🔥
        </button>
      </Link>
    </main>
  );
}
