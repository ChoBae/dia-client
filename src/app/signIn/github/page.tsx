import { useRouter, useSearchParams } from "next/navigation";
import { login } from "../../../authLib";
import { getAccesstoken } from "@/app/api/getAccesstoken";
import { redirect } from "next/navigation";
import LoginAction from "./LoginAction";
import { headers } from "next/headers";
import Link from "next/link";
import GrayLogoIcon from "@/app/ui/icons/GrayLogoIcon";
export default function Home({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const code = searchParams.code;
  const headersList = headers();
  const userAgentString = headersList.get("user-agent");
  async function createSession() {
    "use server";
    const token = await getAccesstoken(code, {
      "Content-Type": "application/json",
      "user-agent": userAgentString as string,
    }).then((res) => {
      return res.accessTokenValue;
    });
    await login(token);
    redirect("/");
  }
  return (
    <>
      <LoginAction createSession={createSession} />
      <header className="fixed z-50 bg-white w-full sm:mx-auto ">
        <nav className=" mx-auto px-4 sm:px-6 lg:px-8 sm:w-1/2 max-w-3xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center ">
              <Link href="/">
                <GrayLogoIcon className="w-[52px] h-20 cursor-pointer"></GrayLogoIcon>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-col mx-auto px-4 sm:px-6 pt-20 pb-8 h-[100dvh] sm:max-h-[1000px] sm:w-1/2 2xl:w-1/3 no-scrollbar overflow-y-hidden">
        <div className="flex flex-col items-center justify-center m-auto ">
          <div className="flex space-x-2 justify-center items-center bg-white h-full ">
            <span className="sr-only">Loading...</span>
            <div className="h-8 w-8 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-8 w-8 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-8 w-8 bg-primary-600 rounded-full animate-bounce"></div>
          </div>
          <h1 className="text-xl text-primary-gray-600 leading-7 font-bold mt-6">
            소셜 로그인 중입니다.
          </h1>
          <h1 className="text-[16px] text-primary-gray-600 leading-[22px] font-normal mt-4">
            최소 2초 이상 소요될 수 있고,
          </h1>
          <h1 className="text-[16px] text-primary-gray-600 leading-[22px] font-normal">
            화면이 넘어가지 않는 경우 상단의 로고버튼을 눌러주세요.
          </h1>
        </div>
      </main>
    </>
  );
}
