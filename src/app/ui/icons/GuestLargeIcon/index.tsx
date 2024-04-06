type Props = {
  className?: string;
  onClick?: () => void;
};

export default function GuestLargeIcon(props: Props) {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      onClick={props.onClick}
    >
      <circle cx="30" cy="30" r="30" fill="#EEEEEE" />
      <circle cx="30" cy="30" r="25" fill="#F5F5F5" />
      <circle cx="30" cy="21" r="9" fill="white" />
      <mask
        id="mask0_689_2426"
        maskUnits="userSpaceOnUse"
        x="8"
        y="37"
        width="44"
        height="22"
      >
        <path
          d="M30 37C17.8497 37 8 43.4963 8 49.5714V59H52V49.5714C52 43.4963 42.1503 37 30 37Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_689_2426)">
        <circle cx="30" cy="30" r="25" fill="white" />
      </g>
    </svg>
  );
}
