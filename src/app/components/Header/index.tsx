"use client";
import { useState, useEffect } from "react";
import type { User } from "@/types/User";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import LoginButton from "./Components/LoginButton";
import Image from "next/image";
import ProfileToolbar from "./Components/ProfileToolbar";
import Link from "next/link";
import ToggleButton from "./Components/ToggleButton";
import ToggleMenu from "./Components/ToggleMenu";
import Logo from "@/app/ui/Logo";
import MobileMenu from "./Components/MobileMenu";
import DesktopMenu from "./Components/DesktopMenu";
interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isProfileToolbarOpen, setIsProfileToolbarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [session, setSession] = useState<any>();
  const handleLogoClick = () => {
    setIsProfileToolbarOpen(false);
    if (pathname === "/") {
      location.reload(); // Reload the current page if already on the main page
    } else {
      router.push("/"); // Navigate to the main page if on a different page
    }
  };
  const handleMobileMenuClick = async () => {
    if (isMenuOpen) {
      await hideMenu();
    } else {
      setAnimationClass("animate-fadeInRight");
      setIsMenuOpen(true);
    }
  };
  const handleDesktopMenuClick = (boolean: boolean) => {
    if (boolean === isProfileToolbarOpen) {
      setIsProfileToolbarOpen(false);
      return;
    }
    setIsProfileToolbarOpen(boolean);
  };

  const hideMenu = async () => {
    setAnimationClass("animate-fadeOutRight");
    await new Promise((r) => setTimeout(r, 600));
    setIsMenuOpen(false);
  };
  const getSession = async () => {
    const session = await fetch(`/auth/getSession`);
    const data = await session.json();
    if (!data.session) return;
    setSession(data.session);
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <header className="fixed z-40 bg-white w-full sm:mx-auto ">
      <nav className=" mx-auto px-4 sm:px-6 lg:px-8 sm:w-1/2 max-w-3xl">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <div className="flex items-center ">
            <Logo
              className="w-[52px] h-20 cursor-pointer"
              onClick={handleLogoClick}
            ></Logo>
          </div>
          {/* 메뉴 */}
          <div className="ml-10 flex justify-items-end justify-self-end  space-x-3">
            <DesktopMenu
              session={session}
              handleProfileOnClick={handleDesktopMenuClick}
            />
            <MobileMenu
              onClick={handleMobileMenuClick}
              session={session}
            ></MobileMenu>
          </div>
        </div>
        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <ToggleMenu
            isToggleMenuOpen={isMenuOpen}
            setIsToggleMenuOpen={setIsMenuOpen}
            animationClass={animationClass}
            onClick={hideMenu}
            session={session}
          ></ToggleMenu>
        )}
        <ProfileToolbar
          isOpen={isProfileToolbarOpen}
          user={session?.user}
          setIsProfileToolbarOpen={setIsProfileToolbarOpen}
        ></ProfileToolbar>
      </nav>
    </header>
  );
}
