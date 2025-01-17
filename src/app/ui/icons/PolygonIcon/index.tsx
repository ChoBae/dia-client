type Props = {
  className?: string;
  onClick?: () => void;
};

export default function PolygonIcon(props: Props) {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path d="M6 8L0.803847 0.5L11.1962 0.500001L6 8Z" fill="#757575" />
    </svg>
  );
}
