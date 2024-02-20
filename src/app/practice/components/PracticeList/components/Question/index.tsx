import Link from "next/link";
import Tag from "./components/Tag";
interface QuestionProps {
  id: number;
  title: string;
  onClick?: () => void;
}

export default function Question({ id, title, onClick }: QuestionProps) {
  return (
    // <Link href={`/solve/problem/${id}`}>
    <div
      className="relative flex flex-col bg-[#F8F3FF] rounded-[20px] px-5 py-4 gap-5 cursor-pointer hover:opacity-70 "
      onClick={onClick}
    >
      <h2 className="text-[#212121] text-[18px] mt-0.5 sm:text-2xl font-bold leading-5 ">
        {title}
      </h2>
      <p className="text-[#616161] text-[12px] sm:text-lg font-semibold leading-3">
        👥{" "}
        <span className="text-primary">
          {Math.floor(Math.random() * 2000) + 1}
        </span>
        명의 사용자가 도전했습니다
      </p>
      {/* <div className="absolute bottom-[10px] right-[10px] mt-2 bg-[#EEEEEE] rounded-[100px] px-4 py-1">
          <p className="text-[#616161] text-[10px] leading-3 font-medium">
            1 min
          </p>
        </div> */}
    </div>
    // </Link>
  );
}
