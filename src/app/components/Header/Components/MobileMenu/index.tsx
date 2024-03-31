"use client";
import { useState } from "react";
import HamburgerIcon from "@/app/ui/icons/HamburgerIcon";
import SearchIcon from "@/app/ui/icons/SeacrhIcon";
import { Session } from "@/types/Session";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "../LoginButton";

type MobileMenuProps = {
  onClick: () => void;
  session?: Session;
};

export default function MobileMenu({ onClick, session }: MobileMenuProps) {
  return (
    <div className="flex flex-row md:hidden gap-2 items-center">
      {session && session.user ? (
        <>
          <Image
            className="h-6 w-6 sm:h-8 sm:w-8 rounded-full mx-auto my-auto cursor-pointer hover:opacity-80"
            width={20}
            height={20}
            src={session.user?.imageUrlValue || "/images/default-profile.png"}
            alt=""
            onClick={() => onClick && onClick()}
          />
        </>
      ) : (
        <LoginButton onClick={() => onClick && onClick()}></LoginButton>
      )}
    </div>
  );
}
