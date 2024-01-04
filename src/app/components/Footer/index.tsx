import Link from "next/link";
import GithubIcon from "@/app/ui/GithubIcon";
export default function Footer() {
  return (
    // <footer className="bg-gray-100">
    //   <div className="mt-16 flex flex-col items-center">
    //     <div className="mb-3 flex space-x-4"></div>
    //     <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
    //       <span>DIA</span>
    //       <div>{` • `}</div>
    //       <div>{`© ${new Date().getFullYear()}`}</div>
    //       <div>{` • `}</div>
    //       <Link
    //         className="hover:underline"
    //         href="https://github.com/interest-driven-developers"
    //       >
    //         Github
    //       </Link>
    //     </div>
    //     <div className="mb-8 flex text-sm text-gray-500 dark:text-gray-400 ">
    //       <p>Beta Version</p>
    //     </div>
    //   </div>
    // </footer>
    <footer className="flex items-center justify-between p-6 bg-gray-100">
      <div className="flex gap-2 sm:gap-4">
        <Link
          className="text-xs sm:text-sm text-gray-500 hover:underline"
          href="#"
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs sm:text-sm text-gray-500 hover:underline"
          href="#"
        >
          Privacy Policy
        </Link>
        <Link
          className="text-xs sm:text-sm text-gray-500 hover:underline"
          href="https://github.com/interest-driven-developers/dia-client/issues"
        >
          FAQ
        </Link>
      </div>
      <div className="flex gap-1 sm:gap-3">
        <div className="mt-1 flex space-x-2 text-xs sm:text-sm text-gray-500">
          <span>DIA</span>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
        </div>
        <Link
          className="text-gray-600 hover:text-gray-900 "
          href="https://github.com/interest-driven-developers"
        >
          <GithubIcon className="h-6 w-6" />
        </Link>
      </div>
    </footer>
  );
}
