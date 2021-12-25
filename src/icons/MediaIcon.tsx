import * as React from "react"

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      viewBox="0 0 21 21"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 10.5l8 4 8.017-4M2.5 14.5l8 4 8.017-4M2.5 6.657l8.008 3.843 8.009-3.843L10.508 2.5z" />
      </g>
    </svg>
  )
}

export default SvgComponent
