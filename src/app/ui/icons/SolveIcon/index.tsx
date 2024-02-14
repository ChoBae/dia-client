type SolveIconProps = {
  className?: string;
};

export default function SolveIcon(props: SolveIconProps) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_144_2121)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14 24.4154C14.6358 24.5792 15 24.7116 15 24.7116C15.3337 24.5903 15.6674 24.4833 16 24.3895C19.2127 23.483 22.3157 23.8008 24.25 24.1874C25.4903 24.4354 26.25 24.7117 26.25 24.7117V6.81392C23.1818 5.27982 18.0682 5.2798 15 6.81391C11.9318 5.2798 6.81818 5.2798 3.75 6.81391V24.7116C4.41983 24.4681 5.08967 24.2825 5.75 24.1446C9.22384 23.419 12.4348 24.0122 14 24.4154ZM16 22.3212C18.6059 21.6796 21.0808 21.7295 22.975 21.9591C23.4315 22.0145 23.8584 22.0807 24.25 22.1516V8.16699C23.2081 7.84513 21.9477 7.66334 20.625 7.66334C18.843 7.66333 17.1739 7.99332 16 8.5513V22.3212ZM14 8.5513V22.357C13.3794 22.2139 12.6076 22.0661 11.725 21.9591C10.075 21.7591 7.98415 21.6954 5.75 22.1065V8.16698C6.79191 7.84512 8.05235 7.66333 9.375 7.66333C11.157 7.66333 12.8261 7.99332 14 8.5513Z"
          fill="#E0E0E0"
          className={`group-hover:fill-primary ${props.className}`}
        />
      </g>
      <defs>
        <clipPath id="clip0_144_2121">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}