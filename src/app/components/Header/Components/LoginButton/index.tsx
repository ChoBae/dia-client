"use client";
import UserIcon from "@/app/ui/icons/UserIcon";
import { twMerge } from "tailwind-merge";
type Props = {
  onClick: () => void;
  className?: string;
};
export default function LoginButton({ onClick, className }: Props) {
  return (
    <UserIcon
      className={twMerge(
        `w-6 h-6 sm:w-8 sm:h-8 mx-auto my-auto cursor-pointer text-primary-600 hover:opacity-80`,
        className
      )}
      onClick={onClick}
    />
  );
}
