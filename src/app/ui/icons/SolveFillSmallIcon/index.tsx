type Props = {
  className?: string;
};

export default function SolveFillSmallIcon(props: Props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 2.72484V14C3.51749 13.0731 6.03498 13.4796 7.25 13.7809V2.41458C5.33435 1.77274 2.67645 1.87616 1 2.72484ZM8.75 2.41458V13.7616C11.9829 12.8892 15 14 15 14V2.72484C13.3235 1.87616 10.6656 1.77274 8.75 2.41458Z"
        fill="#591FD9"
      />
    </svg>
  );
}
