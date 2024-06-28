type Props = {
  className?: string;
  onClick?: () => void;
};
export default function VoiceErrorIcon({ className, onClick }: Props) {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity="0.8" cx="30" cy="30" r="30" fill="#E0E0E0" />
      <circle cx="30" cy="30" r="24" fill="#757575" />
      <mask
        id="mask0_1020_2690"
        // style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="8"
        y="8"
        width="36"
        height="36"
      >
        <rect x="8" y="8" width="36" height="36" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1020_2690)">
        <path
          d="M40.4 44.1334L36.3667 40.1001C35.8111 40.4556 35.2223 40.7612 34.6 41.0167C33.9778 41.2723 33.3334 41.4778 32.6667 41.6334V38.9001C32.9778 38.789 33.2834 38.6778 33.5834 38.5667C33.8834 38.4556 34.1667 38.3223 34.4334 38.1667L30 33.7334V40.6667L23.3334 34.0001H18V26.0001H22.2667L15.8667 19.6001L17.7334 17.7334L42.2667 42.2667L40.4 44.1334ZM40.1334 36.4001L38.2 34.4667C38.5778 33.7778 38.8611 33.0556 39.05 32.3001C39.2389 31.5445 39.3334 30.7667 39.3334 29.9667C39.3334 27.8778 38.7223 26.0112 37.5 24.3667C36.2778 22.7223 34.6667 21.6112 32.6667 21.0334V18.3001C35.4223 18.9223 37.6667 20.3167 39.4 22.4834C41.1334 24.6501 42 27.1445 42 29.9667C42 31.1445 41.8389 32.2778 41.5167 33.3667C41.1945 34.4556 40.7334 35.4667 40.1334 36.4001ZM35.6667 31.9334L32.6667 28.9334V24.6001C33.7111 25.089 34.5278 25.8223 35.1167 26.8001C35.7056 27.7778 36 28.8445 36 30.0001C36 30.3334 35.9723 30.6612 35.9167 30.9834C35.8611 31.3056 35.7778 31.6223 35.6667 31.9334ZM30 26.2667L26.5334 22.8001L30 19.3334V26.2667ZM27.3334 34.2001V31.0667L24.9334 28.6667H20.6667V31.3334H24.4667L27.3334 34.2001Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
