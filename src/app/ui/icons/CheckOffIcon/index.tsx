type Props = {
  className?: string;
  onClick?: () => void;
};

export default function CheckOffIcon(props: Props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      onClick={props.onClick}
    >
      <circle
        cx="8"
        cy="8"
        r="6.25"
        stroke="#E0E0E0"
        stroke-width="1.5"
        className="group-hover:fill-primary-600 group-hover:stroke-primary-600"
      />
      <path
        d="M5 7.77778L7.07946 10L9.2705 7.77778L11 6"
        stroke="#E0E0E0"
        stroke-width="1.5"
      />
    </svg>
  );
}
