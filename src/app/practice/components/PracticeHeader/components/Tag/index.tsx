"use Client";
import Link from "next/link";
import mapTagToPurpose from "@/utils/mapTagToPurpose";
import { useRouter } from "next/navigation";
type TagProps = {
  children?: React.ReactNode;
  selected: string;
};
export default function Tag(props: TagProps) {
  let categoryValues = "";
  const router = useRouter();
  switch (props.selected.toLowerCase()) {
    case "backend":
      categoryValues = "백엔드";
      break;
    case "frontend":
      categoryValues = "프론트엔드";
      break;
    case "ios":
      categoryValues = "IOS";
      break;
    case "aos":
      categoryValues = "AOS";
      break;
    default:
      categoryValues = "";
      break;
  }
  const tagStyle = (() => {
    if (categoryValues === props.children) {
      return "bg-primary-600 text-white";
    } else {
      return "bg-white text-primary-600 border border-[#7C4DFF] border-solid hover:bg-primary-600 hover:text-white";
    }
  })();
  const handleClick = () => {
    if (props.children !== 'backend') {
      alert('준비중 입니다!')
      return
    }
    router.push(`/practice/${mapTagToPurpose(props.children as string)}`);
  };
  return (
    <a
      className={`flex items-center rounded-[5px] py-2 px-5 h-[30px]    ${tagStyle}`}
      onClick={handleClick}
    >
      <p className="text-[12px] leading-[14.4px]  text-center font-semibold whitespace-nowrap">
        {props.children}
      </p>
    </a>
  );
}
