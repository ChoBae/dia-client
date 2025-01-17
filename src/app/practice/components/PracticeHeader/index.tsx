"use client";
import React, { useState } from "react";
import Tag from "./components/Tag";
import CategoryButton from "./components/CategoryButton";
import { getTags } from "@/utils/getTags";
import Link from "next/link";
type Props = {
  query: string;
};
export const PracticeHeader = (props: Props) => {
  const tags = getTags();
  const [currentTag, setCurrentTag] = useState(props.query);

  return (
    <header className="sticky top-16 bg-white z-10 mb-3">
      <div className="flex flex-row w-full mb-3">
        <Link href={`/solve/${currentTag}`} className="flex-1">
          <CategoryButton>개별연습</CategoryButton>
        </Link>
        <Link href={`/practice/${currentTag}`} className="flex-1">
          <CategoryButton selected={true}>실전연습</CategoryButton>
        </Link>
      </div>
      <div className="flex flex-row gap-1.5 z-0 w-full pr-8  overflow-x-auto no-scrollbar">
        {tags.map((tag, index) => (
          <Tag key={index} selected={currentTag}>
            {tag.name}
          </Tag>
        ))}
      </div>
    </header>
  );
};
