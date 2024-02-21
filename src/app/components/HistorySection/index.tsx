"use client";
import React, { useState, useEffect } from "react";
import type { HistoryType } from "@/types/History";
import { twMerge } from "tailwind-merge";
import Spinner from "../Spinner";
import DeleteIcon from "@/app/ui/icons/DeleteIcon";
import { deleteHistory } from "@/app/api/deleteHistory";
import type { Session } from "@/types/Session";
import formatDateString from "@/utils/\bformatDateString";
import convertToHourMinute from "@/utils/convertToHourMinute";

export interface HistorySectionProps {
  id: number;
  className?: string;
  history: HistoryType;
  session: Session;
}
// const maxCharacterCount = 500;

export default function HistorySection({
  id,
  className,
  history,
  session,
}: HistorySectionProps) {
  const handleDelete = async () => {
    if (session) {
      try {
        await deleteHistory({
          practiceHistoryPkValue: history.pkValue,
          accessToken: session?.user.access_token,
        });
      } catch (e) {
        console.error("Delete operation failed", e);
      }
    }
    else {
      // const getHistory = localStorage.getItem(`history=${history.question.pkValue}`);
    }
  };
  return (
    <div
      className={twMerge(
        `relative px-5 py-[45px]  bg-[#E2D7FF] rounded-[10px] h-[264px]`,
        className
      )}
    >
      <div className="whitespace-pre-wrap flex">
        {history ? (
          <p className="text-[14px] text-[#424242] leading-[22px] sm:text-lg font-medium">
            {history.contentValue}
          </p>
        ) : (
          <p className="text-[14px] text-[#D1C4E9] leading-[22px] sm:text-lg font-medium">
            히스토리가 없습니다.
          </p>
        )}
      </div>
      <div className="absolute top-4 left-4">
        <p className="text-xs leading-[14.4px] font-semibold text-primary">
          {history ? formatDateString(history.createdTimeValue) : ""}
        </p>
      </div>
      <DeleteIcon
        className="absolute bottom-2 left-3 hover:opacity-70"
        onClick={handleDelete}
      ></DeleteIcon>
      {history ? (
        <div className="absolute top-2.5 right-3 flex bg-[#EEEEEE] rounded-[100px] px-[7px] py-[3px] cursor-pointer hover:opacity-70">
          <p className="text-[#616161] text-[10px] leading-3">
            🎙️{convertToHourMinute(history.elapsedTimeValue)}
          </p>
        </div>
      ) : null}
    </div>
  );
}
