type Props = {
  className?: string;
  onClick?: () => void;
};

export default function UpIcon(props: Props) {
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
      <path d="M7 14L12 9L17 14" stroke="#E0E0E0" strokeWidth="1.5" />
    </svg>
  );
}
