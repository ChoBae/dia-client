type Props = {
  className?: string;
};
export default function HomeFillSmallIcon(props: Props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path d="M15 6L8 1L1 6V15H6.25V9H9.75V15H15V6Z" fill="#591FD9" />
    </svg>
  );
}
