import Link from "next/link";
import Button from "./Button";
import { Session } from "@/types/Session";
import Image from "next/image";
import LoginButton from "../LoginButton";
import HomeFillSmallIcon from "@/app/ui/icons/HomeFillSmallIcon";
import SolveFillSmallIcon from "@/app/ui/icons/SolveFillSmallIcon";
import HistoryFillSmallIcon from "@/app/ui/icons/HistoryFillSmallIcon";
import UserFillIcon from "@/app/ui/icons/UserFillIcon";
import GuestLargeIcon from "@/app/ui/icons/GuestLargeIcon";
import GithubIcon from "@/app/ui/icons/GithubIcon";
type ToggleMenuProps = {
  isToggleMenuOpen: boolean;
  animationClass: string;
  onClick: () => void;
  session: Session;
};

export default function ToggleMenu({
  session,
  onClick,
  animationClass,
}: ToggleMenuProps) {
  const deleteSession = async () => {
    await fetch("/auth/deleteSession", {
      method: "DELETE",
    });
    window.location.reload();
  };

  return (
    <div
      className={`absolute right-0 top-0 w-3/4 h-[100dvh] z-30 bg-primary-gray-50 shadow-lg rounded-md py-16 block md:hidden  ${animationClass}`}
    >
      <div className="absolute right-3 top-5">
        {session && session.user ? (
          <Image
            className="h-[20px] w-[20px] sm:h-8 sm:w-8 rounded-full mx-auto my-auto cursor-pointer hover:opacity-80"
            width={20}
            height={20}
            src={session.user?.imageUrlValue || "/images/default-profile.png"}
            alt=""
            onClick={() => onClick && onClick()}
          />
        ) : (
          <UserFillIcon
            className={`sm:w-8 sm:h-8 mx-auto my-auto cursor-pointer text-primary-600 hover:opacity-80`}
            onClick={() => onClick && onClick()}
          />
        )}
      </div>
      <div className="flex flex-col h-full ">
        <div className="pl-8 flex flex-col gap-4 ">
          <h1 className="text-primary-gray-900 text-[16px] leading-[19.2.px] font-semibold">
            내 정보
          </h1>
          {session && session.user ? (
            <div className="flex flex-row items-center gap-3">
              <Image
                className="rounded-full justify-items-center items-center itmes-self-center ring-[5px] ring-primary-200"
                width={55}
                height={55}
                src={session.user.imageUrlValue || "/default-user.png"}
                alt="user Image"
                priority={true}
              />
              <p className="font-semibold text-primary-600 text-sm">
                {session.user.nicknameValue}
              </p>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-3">
              <GuestLargeIcon />
              <p className="font-semibold text-primary-gray-600 text-sm">
                <span className="underline">로그인</span> 후 이용해주세요
              </p>
            </div>
          )}
        </div>
        <nav className="bg-white mt-6 mx-4 grid grid-cols-1 divide-y border border-[#F4F4F4]">
          <Button href="/">
            <HomeFillSmallIcon />홈
          </Button>
          <Button href="/solve/backend">
            <SolveFillSmallIcon />
            문제풀기
          </Button>
          {session && (
            <Button href="/history">
              <HistoryFillSmallIcon />
              히스토리
            </Button>
          )}
        </nav>
        {session ? (
          <button
            className="flex w-full items-center justify-center mx-4 mt-auto py-4 bg-primary-gray-200 rounded-[5px] cursor-pointer max-w-[calc(100%-2rem)]"
            onClick={() => deleteSession()}
          >
            <p className="text-[16px] leading-[19.2px] text-primary-gray-400 font-bold">
              로그아웃
            </p>
          </button>
        ) : (
          <Link
            className="flex w-full items-center justify-center mx-4 mt-auto py-1.5 bg-primary-gray-900 rounded-[5px] cursor-pointer max-w-[calc(100%-2rem)] "
            href="/signIn"
          >
            <Image
              width={40}
              height={40}
              src="/images/github_logo.png"
              alt="github logo"
              className="-ml-6 mr-4"
              priority={true}
            ></Image>
            <p className="text-[16px] leading-[19.2px] text-white font-bold">
              Github 로그인
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
