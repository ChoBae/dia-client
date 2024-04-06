type Props = {
  className?: string;
  onClick?: () => void;
};

export default function UserFillIcon(props: Props) {
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
      <g clipPath="url(#clip0_689_2425)">
        <circle cx="12" cy="12" r="9.5" fill="#591FD9" stroke="#757575" />
        <circle cx="12" cy="9" r="3" fill="white" />
        <path
          d="M12 14C8.13401 14 5 16.067 5 18V21H19V18C19 16.067 15.866 14 12 14Z"
          fill="white"
        />
        <circle cx="12" cy="12" r="9" stroke="#591FD9" strokeWidth="2" />
      </g>
      <defs>
        <clipPath id="clip0_689_2425">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
