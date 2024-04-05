import { Question as QuestionType } from "@/types/Question";
import { Session } from "@/types/Session";
import { useEffect, useState } from "react";
import { getQuestionScript } from "@/app/api/getQuestionScript";
import { Script } from "@/types/Script";
import Spinner from "@/app/components/Spinner";
import DownIcon from "@/app/ui/icons/DownIcon";
import UpIcon from "@/app/ui/icons/UpIcon";
type Props = {
  question: QuestionType;
  session?: Session;
  script?: Script;
};
const maxCharacterCount = 3000;
export default function QuestionDropdown({ question, session, script }: Props) {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [isScript, setIsScript] = useState<Script | undefined>(script);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (isToggle && question.pkValue && script === undefined) {
      const fetchScript = async () => {
        if (session) {
          setIsScript(script)
        } else {
          const savedScriptString = localStorage.getItem(
            `script=${question.pkValue}`
          );
          const savedScriptObj = savedScriptString
            ? JSON.parse(savedScriptString)
            : { contentValue: "" };
          setIsScript(savedScriptObj);
        }
      };
      fetchScript();
    }
    setIsLoading(false);
  }, [isToggle]);
  return (
    <>
      <div className="flex relative flex-col bg-primary-gray-50 rounded-[5px] px-4 py-[18px]">
        <h1
          className={
            "text-[12px] text-primary-600 leading-[14.4px] sm:text-lg font-semibold"
          }
        >
          개별연습
        </h1>
        <h1
          className={
            "text-[#212121] text-[16px] mt-0.5 sm:text-2xl font-bold leading-[19.2px]"
          }
        >
          {question.korTitleValue}
        </h1>
        {isToggle ? (
          <UpIcon
            className="absolute top-0 right-0 cursor-pointer"
            onClick={() => setIsToggle(false)}
          />
        ) : (
          <DownIcon
            className="absolute top-0 right-0 cursor-pointer"
            onClick={() => setIsToggle(true)}
          />
        )}
      </div>
      {isToggle && (
        <div
          className={`flex flex-col relative h-[100px] max-h-[200px] bg-[#FAFAFA] rounded-[5px] w-full -mt-2.5 `}
        >
          <div className="flex-1 overflow-y-auto px-4 py-3 no-scrollbar">
            {isLoading ? (
              <Spinner />
            ) : (
              <div className="whitespace-pre-wrap flex w-full">
                {isScript && isScript.contentValue ? (
                  <p className="text-[14px] text-primary-gray-800  leading-[22px] sm:text-lg font-normal">
                    {isScript.contentValue}
                  </p>
                ) : (
                  <p className="text-[14px] text-primary-gray-400 leading-[22px] sm:text-lg font-medium">
                    작성된 스크립트가 없습니다.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="absolute bottom-2 right-4 ">
            <p className="text-xs leading-7 font-medium text-primary-gray-400">
              <span className="text-primary-gray-600">
                {isScript?.contentValue ? isScript.contentValue.length : "0"}
              </span>
              {` / ${maxCharacterCount}`}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
