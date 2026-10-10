const illustrations = [
  <g className="ui-g" key="understand">
    <circle className="ui-circle" cx="14" cy="14" r="7.5" />
    <path className="ui-path" d="m19.5 19.5 6 6" />
  </g>,
  <g className="ui-g" key="align">
    <path
      className="ui-path"
      d="M7 6h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H13l-6 5v-5H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
    />
    <path className="ui-path" d="M11 12h10M11 16h7" />
  </g>,
  <g className="ui-g" key="build">
    <path
      className="ui-path"
      d="m16 4 11 6-11 6-11-6 11-6ZM5 16l11 6 11-6M5 22l11 6 11-6"
    />
  </g>,
  <g className="ui-g" key="improve">
    <path className="ui-path" d="M25 11a10 10 0 1 0 1 9M25 5v6h-6" />
    <path className="ui-path" d="m10.5 16 3.5 3.5 7-7" />
  </g>,
];

export const ProcessIcon = ({ index }: { index: number }) => (
  <svg
    className="ui-svg"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {illustrations[index % illustrations.length]}
  </svg>
);
