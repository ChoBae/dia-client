"use client";
import React, { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Spinner from "@/app/components/Spinner";
import EditIcon from "@/app/ui/icons/EditIcon";
import { getQuestionScript } from "@/app/api/getQuestionScript";
import { editQuestionScript } from "@/app/api/editQuestionScript";
import { saveQuestionScript } from "@/app/api/saveQuestionScript";
import { twMerge } from "tailwind-merge";
import type { Session } from "@/types/Session";
import type { Script } from "@/types/Script";

export interface Props {
  id: number;
  className?: string;
  placeholder?: string;
  writeScript?: boolean;
  session?: Session;
  preloadScript?: Script;
}

const maxCharacterCount = 3000;

export default function ScriptSection({
  id,
  className,
  placeholder,
  writeScript = true,
  session,
  preloadScript,
}: Props) {
  const [script, setScript] = useState<Script | undefined>(undefined);
  const [prevScript, setPrevScript] = useState<Script | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setScript(undefined);
    const fetchData = async () => {
      if (preloadScript) {
        setScript(preloadScript);
        setIsLoading(false);
        return;
      }
      if (session) {
        const getScript = await getQuestionScript(id, session.accessToken);
        if (getScript) setScript(getScript);
      } else {
        const savedScriptString = localStorage.getItem(`script=${id}`);
        const savedScriptObj = savedScriptString
          ? JSON.parse(savedScriptString)
          : { contentValue: "" };
        setScript(savedScriptObj);
      }
    };
    fetchData();
    setIsLoading(false);
  }, [id]);
  useEffect(() => {
    if (isEditing) {
      textAreaRef.current?.focus();
    }
  }, [isEditing]);
  const handleSaveScript = async () => {
    if (session && session.user) {
      if (prevScript) {
        await editQuestionScript({
          scriptPkValue: script?.pkValue as number,
          contentValue: script?.contentValue.trim() as string,
          accessToken: session?.accessToken,
        });
      } else {
        await saveQuestionScript({
          questionPkValue: id,
          contentValue: script?.contentValue.trim() as string,
          accessToken: session?.accessToken,
        });
      }
    } else {
      const savedScript = JSON.stringify(script);
      localStorage.setItem(`script=${id}`, savedScript);
    }
    setIsEditing(false);
    setPrevScript(script);
  };

  const handleSectionClick = () => {
    if (isEditing || script?.contentValue || !writeScript) return;
    setIsEditing(true);
  };
  return (
    <div
      className={twMerge(
        `flex flex-col relative bg-[#FAFAFA] rounded-[5px] w-full pt-3 pb-10 ${
          !script?.contentValue ? "cursor-pointer" : ""
        }`,
        className
      )}
      onClick={handleSectionClick}
    >
      <div className="flex-1 overflow-y-auto px-4 no-scrollbar">
        {isLoading ? (
          <Spinner />
        ) : isEditing ? (
          <>
            <textarea
              ref={textAreaRef}
              value={script?.contentValue}
              placeholder={
                placeholder
                  ? placeholder
                  : "스크립트를 작성하시면 면접 후 답변과 비교해보실 수 있습니다"
              }
              onChange={(e) =>
                setScript(
                  (prevScript) =>
                    ({
                      ...prevScript,
                      contentValue: e.target.value,
                    } as Script)
                )
              }
              className="w-full h-40 rounded-md bg-[#FAFAFA] text-[14px] focus:ring-blue-500"
            />
            <div className="absolute bottom-4 left-4 flex items-center">
              <XCircleIcon
                onClick={() => {
                  setIsEditing(false);
                  setScript(prevScript);
                }}
                className="w-5 h-5 text-red-500 cursor-pointer hover:opacity-50"
              ></XCircleIcon>
              <CheckCircleIcon
                onClick={() => handleSaveScript()}
                className="w-5 h-5 text-primary-600 cursor-pointer hover:opacity-50"
              ></CheckCircleIcon>
            </div>
          </>
        ) : (
          <div className="whitespace-pre-wrap overflow-y-auto flex w-full">
            {script && script.contentValue ? (
              <p className="text-[14px] text-primary-gray-800  leading-[22px] sm:text-lg font-normal">
                {script.contentValue}
              </p>
            ) : (
              <p className="text-[14px] text-primary-gray-400 leading-[22px] sm:text-lg font-medium">
                모의연습 전 스크립트를 먼저 작성해보세요.
                <br />
                이후 음성 답변과 스크립트를 비교할 수 있습니다.
              </p>
            )}
          </div>
        )}
      </div>

      {script && (
        <div className="absolute bottom-2 right-4 ">
          <p className="text-xs leading-7 font-medium text-primary-gray-400">
            <span className="text-primary-gray-600">
              {script.contentValue.length}
            </span>
            {` / ${maxCharacterCount}`}
          </p>
        </div>
      )}
      {!isEditing && writeScript && (
        <div
          className="absolute bottom-3 left-3 bg-white w-8 h-8 rounded-full px-[7px] py-[7px] mx-auto my-auto mt-2 cursor-pointer hover:opacity-70"
          onClick={() => {
            setIsEditing(true);
            setPrevScript(script);
          }}
        >
          <EditIcon></EditIcon>
        </div>
      )}
    </div>
  );
}
