import Link from "next/link";

type ToggleMenuProps = {
  isToggleMenuOpen: boolean;
  animationClass: string;
  onClick: () => void;
  session: any;
};

export default function ToggleMenu(props: ToggleMenuProps) {
   const deleteSession = async () => {
     await fetch("/api/auth/deleteSession", {
       method: "DELETE",
     });

     // router.refresh();
     window.location.reload();
   };

  return (
    <div
      className={`absolute right-1 w-2/3 h-96 z-50 bg-white shadow-lg rounded-md p-6 block md:hidden  ${props.animationClass}`}
    >
      <span className="items-center mb-5 text-3xl font-bold custom-color cursor-pointer">
        DIA
      </span>
      <nav className="grid gap-2">
        <Link
          className="flex w-full items-center py-2 text-lg font-semibold text-slate-600 "
          href="/"
          onClick={props.onClick}
        >
          홈
        </Link>
        <Link
          className="flex w-full items-center py-2 text-lg font-semibold text-slate-600 "
          href="/solve/backend"
          onClick={props.onClick}
        >
          모든 문제
        </Link>
        {props.session ? (
          <p
            className="flex w-full items-center py-2 text-lg font-semibold text-slate-600 cursor-pointer"
            onClick={() => deleteSession()}
          >
            로그아웃
          </p>
        ) : (
          <Link
            className="flex w-full items-center py-2 text-lg font-semibold text-slate-600 "
            href="/signIn"
          >
            로그인
          </Link>
        )}
      </nav>
    </div>
  );
}
