"use client";

import Header from "@/app/components/Header";
import NavigationBar from "@/app/components/NavigationBar";
import { usePathname } from "next/navigation";
export interface LayoutProviderProps {
  children: React.ReactNode;
  session?: any;

}

export const LayoutProvider = ({ children, session}: LayoutProviderProps) => {
  const pathname = usePathname();
  const headerNotAllowedPath = ["/signIn/", "/mockinterview/", "/settings/"];
  const naviNotAllowedPath = [
    "/signIn/",
    "/mockinterview/",
    "/solve/problem/",
    "/practice/problem/",
    "/result/",
    "/settings/",
  ];
  const headerIsNotAllowed = headerNotAllowedPath.some((path) =>
    pathname.startsWith(path)
  );
  const naviIsNotAllowed = naviNotAllowedPath.some((path) =>
    pathname.startsWith(path)
  );
  
  return (
    <>
      {!headerIsNotAllowed && <Header/>}
      {children}
      {!naviIsNotAllowed && <NavigationBar></NavigationBar>}
    </>
  );
};
