interface IconProps {
  className?: string;
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 7L7 17M8 7h9v9"
      />
    </svg>
  );
}

export function FileTextIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5">
        <path d="M14.186 2.753v3.596c0 .487.195.955.54 1.3a1.85 1.85 0 0 0 1.306.539h4.125" />
        <path d="M20.25 8.568v8.568a4.25 4.25 0 0 1-1.362 2.97a4.28 4.28 0 0 1-3.072 1.14h-7.59a4.3 4.3 0 0 1-3.1-1.124a4.26 4.26 0 0 1-1.376-2.986V6.862a4.25 4.25 0 0 1 1.362-2.97a4.28 4.28 0 0 1 3.072-1.14h5.714a3.5 3.5 0 0 1 2.361.905l2.96 2.722a2.97 2.97 0 0 1 1.031 2.189M7.647 7.647h3.265M7.647 12h8.706m-8.706 4.353h8.706" />
      </g>
    </svg>
  );
}

export function BookOpenIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.756 16.358a1.09 1.09 0 0 0 1.154 1.198a16.6 16.6 0 0 1 3.54.338c1.635.2 3.197.794 4.552 1.731V6.448A10.16 10.16 0 0 0 7.45 4.694a16.6 16.6 0 0 0-3.605-.316a1.09 1.09 0 0 0-1.09 1.09zm18.492 0a1.09 1.09 0 0 1-1.154 1.154a16.6 16.6 0 0 0-3.54.338a10.16 10.16 0 0 0-4.552 1.775V6.448a10.16 10.16 0 0 1 4.552-1.754a16.6 16.6 0 0 1 3.605-.316a1.09 1.09 0 0 1 1.089 1.155zM5.621 8.234h1.252m-1.252 6.011h1.834M5.78 11.24h3.35"
      />
    </svg>
  );
}

export function Code2Icon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}>
      <g fill="none">
        <path d="M0 0h24v24H0z" />
        <path
          fill="currentColor"
          d="M14.486 3.143a1 1 0 0 1 .692 1.233l-4.43 15.788a1 1 0 0 1-1.926-.54l4.43-15.788a1 1 0 0 1 1.234-.693M7.207 7.05a1 1 0 0 1 0 1.414L3.672 12l3.535 3.535a1 1 0 1 1-1.414 1.415L1.55 12.707a1 1 0 0 1 0-1.414L5.793 7.05a1 1 0 0 1 1.414 0m9.586 1.414a1 1 0 1 1 1.414-1.414l4.243 4.243a1 1 0 0 1 0 1.414l-4.243 4.243a1 1 0 0 1-1.414-1.415L20.328 12z"
        />
      </g>
    </svg>
  );
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#fff"
      stroke="none"
      strokeWidth="0"
      className={className}>
      <path d="m12.01,1C5.92,1,1,5.96,1,12.09c0,4.9,3.15,9.05,7.53,10.52.55.11.75-.24.75-.53,0-.26-.02-1.14-.02-2.06-3.06.66-3.7-1.32-3.7-1.32-.49-1.29-1.22-1.62-1.22-1.62-1-.68.07-.68.07-.68,1.11.07,1.7,1.14,1.7,1.14.98,1.69,2.57,1.21,3.21.92.09-.72.38-1.21.69-1.49-2.44-.26-5.01-1.21-5.01-5.47,0-1.21.44-2.2,1.13-2.97-.11-.28-.49-1.41.11-2.94,0,0,.93-.29,3.03,1.14.9-.24,1.82-.37,2.75-.37.93,0,1.88.13,2.75.37,2.1-1.43,3.03-1.14,3.03-1.14.6,1.52.22,2.66.11,2.94.71.77,1.13,1.76,1.13,2.97,0,4.26-2.57,5.2-5.03,5.47.4.35.75,1.01.75,2.06,0,1.49-.02,2.68-.02,3.05,0,.29.2.64.75.53,4.37-1.47,7.53-5.62,7.53-10.52.02-6.13-4.92-11.09-10.99-11.09Z" />
    </svg>
  );
}

export function Icon({ className }: IconProps) {
  return;
}
