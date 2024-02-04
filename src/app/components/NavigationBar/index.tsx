"use client";
import { useState, useEffect } from "react";
import type { User } from "@/app/types/User";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/ui/Logo";
import HomeIcon from "@/app/ui/HomeIcon";
import SolveIcon from "@/app/ui/SolveIcon";
import HistoryIcon from "@/app/ui/HistoryIcon";
interface NavigationBarProps {
  // session: any;
}

export default function NavigationBar({}: NavigationBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenu, setIsMenu] = useState("home");
  useEffect(() => {
    if (pathname === "/") {
      setIsMenu("home");
    } else if (pathname === "/solve") {
      setIsMenu("solve");
    } else if (pathname === "/history") {
      setIsMenu("history");
    } else {
      setIsMenu(""); // 다른 페이지일 경우 isMenu를 초기화합니다.
    }
  }, [pathname]);

  const handleLogoClick = () => {
    setIsMenu("home");
    if (pathname === "/") {
      location.reload(); // Reload the current page if already on the main page
    } else {
      router.push("/"); // Navigate to the main page if on a different page
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white border-[#F5F5F5] h-[66px] flex justify-between md:hidden">
      <div
        className="flex flex-col items-center justify-center flex-grow cursor-pointer group"
        onClick={handleLogoClick}
      >
        <HomeIcon className={isMenu === "home" ? "stroke-primary" : ""} />
        <p
          className={`text-[#E0E0E0] group-hover:text-primary group-focus:text-primary text-[10px] font-semibold text-center ${
            isMenu === "home" && "text-primary"
          }`}
        >
          홈
        </p>
      </div>
      <Link
        href="/solve"
        className="flex flex-col items-center justify-center flex-grow cursor-pointer group"
      >
        <SolveIcon className={isMenu === "solve" ? "stroke-primary" : ""} />
        <p
          className={`text-[#E0E0E0] group-hover:text-primary group-focus:text-primary text-[10px] font-semibold text-center ${
            isMenu === "solve" && "text-primary"
          }`}
        >
          문제풀기
        </p>
      </Link>
      <div className="flex flex-col items-center justify-center flex-grow cursor-pointer group">
        <HistoryIcon className={isMenu === "history" ? "stroke-primary" : ""} />
        <p className="text-[#E0E0E0] group-hover:text-primary text-[10px] font-semibold text-center">
          히스토리
        </p>
      </div>
    </div>
  );
}
