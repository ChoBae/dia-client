type Props = {
  className?: string;
  onClick?: () => void;
};

export default function ChevronRightIcon(props: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      onClick={props.onClick}
    >
      <g clip-path="url(#clip0_548_6288)">
        <path d="M9 6L15 12L9 18" stroke="#9E9E9E" strokeWidth="2" />
      </g>
      <defs>
        <clipPath id="clip0_548_6288">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
