"use client";
import React, { useEffect, useState } from "react";
import {
  signIn,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import GithubIcon from "@/app/ui/icons/GithubIcon";
import Logo from "@/app/ui/Logo";
import Link from "next/link";
interface LoginProps {
  providers?: Record<string, ClientSafeProvider>;
  prevPath: string;
}

export default function LoginMain({ prevPath }: LoginProps) {
  return (
    <main className="flex h-screen w-full bg-gradient-to-r from-purple-300 via-pink-200 to-red-200  justify-center items-center no-scrollbar overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-center items-center px-10 py-24 rounded-lg gap-4">
        <div className="flex flex-col justify-center items-center m-20">
          {/* <h1 className="text-xl custom-color sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-4">
            DIA
          </h1> */}
          <Logo className="w-[150px]" />
          <p className="text-base text-[#616161] sm:text-lg text-center mb-2 sm:mb-4 whitespace-nowrap">
            Developer Interview Assistant
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xs text-[#616161] sm:text-md mb-2 sm:mb-4">
            자체적인 회원가입은 정책상 지원하지 않습니다 🛠️
          </p>

          {/* <a
            onClick={() => setIsLogin(true)}
            className="bg-[#333] text-white flex items-center justify-center gap-2 px-4 sm:px-8 py-1 sm:py-2 rounded hover:opacity-90"
            // href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}&redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_URL}/api/v0/auth/oauth/github/callback`}
          >
            <GithubIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            Login with GitHub
          </a> */}
          {/* {isLogin && <AuthCodeLoginPage />} */}
          <Link
            className="bg-[#333] text-white flex items-center justify-center gap-2 px-4 sm:px-8 py-1 sm:py-2 rounded hover:opacity-90"
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}&redirect_uri=http://localhost:3000/signIn/github&response_type=code`}
          >
            <GithubIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            Login with GitHub
          </Link>
        </div>
      </div>
    </main>
  );
}
