"use client";

import Header from "@/app/components/Header";
import NavigationBar from "@/app/components/NavigationBar";
// Use usePathname for catching route name.
import { usePathname } from "next/navigation";

export interface LayoutProviderProps {
  children: React.ReactNode;
  session: any;
}

export const LayoutProvider = ({ children, session }: LayoutProviderProps) => {
  const pathname = usePathname();
const notAllowedPath = ["/signIn/", "/mockinterview/"];
const isNotAllowed = notAllowedPath.some((path) => pathname.startsWith(path));

return (
  <>
    {!isNotAllowed && <Header session={session} />}
    {children}
    <NavigationBar></NavigationBar>
  </>
);
};
