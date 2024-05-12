import ChevronRightIcon from "@/app/ui/icons/ChevronRightIcon";
import Link from "next/link";
type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ href, className, children,onClick }: Props) {
  return (
    <Link
      className="flex justify-between pl-4 py-2 items-center w-full h-[48px] bg-white"
      href={href}
      onClick={onClick}
    >
      <h1 className="text-sm leading-[22px] font-semibold text-primary-600 flex flex-row items-center gap-3">
        {children}
      </h1>
      <ChevronRightIcon  />
    </Link>
  );
}
