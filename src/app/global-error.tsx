"use client";
import Link from "next/link";
import GrayLogoIcon from "@/app/ui/icons/GrayLogoIcon";
import GrayNotiIcon from "@/app/ui/icons/GrayNotiIcon";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <>
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
          <main className="flex flex-col mx-auto px-4 sm:px-6 pt-20 pb-8 h-[100dvh] sm:max-h-[800px] sm:w-1/2 2xl:w-1/3 no-scrollbar overflow-y-hidden">
            <div className="flex flex-col items-center justify-center m-auto ">
              <GrayNotiIcon></GrayNotiIcon>
              <h1 className="text-xl text-primary-gray-600 leading-7 font-bold mt-3">
                에러가 발생하였습니다.
              </h1>
              <h1 className="text-xl text-primary-gray-600 leading-7 font-bold">
                홈 화면으로 이동해주세요.
              </h1>
              <h1 className="text-[16px] text-primary-gray-600 leading-[22px] font-normal mt-4">
                지속적으로 발생시 문의 부탁드립니다.
              </h1>
            </div>
          </main>
        </>
      </body>
    </html>
  );
}
