import { Session } from "@/types/Session";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import LoginButton from "./LoginButton";
import Image from "next/image";
type Props = {
  session?: Session;
  handleProfileOnClick : () => void;
};
export default function DesktopMenu({ session,handleProfileOnClick }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogoClick = () => {
    if (pathname === "/") {
      location.reload(); // Reload the current page if already on the main page
    } else {
      router.push("/"); // Navigate to the main page if on a different page
    }
  };
  return (
    <div className="hidden md:block">
      <div className="flex">
        <Link
          href="/solve/backend"
          className="text-slate-700 hover:text-primary-600 px-3 py-5 rounded-md text-sm font-semibold"
          onClick={handleProfileOnClick}
        >
          문제 풀기
        </Link>
        {session && session.user ? (
          <>
            <Image
              className="h-6 w-6 sm:h-8 sm:w-8 rounded-full mx-auto my-auto cursor-pointer hover:opacity-80"
              width={20}
              height={20}
              src={session.user?.imageUrlValue || "/images/default-profile.png"}
              alt=""
              onClick={handleProfileOnClick}
            />
          </>
        ) : (
          <LoginButton onClick={handleProfileOnClick}></LoginButton>
        )}
      </div>
    </div>
  );
}
