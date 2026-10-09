const illustrations = [
  <g key="understand">
    <circle cx="14" cy="14" r="7.5" />
    <path d="m19.5 19.5 6 6M10.5 14h7M14 10.5v7" />
  </g>,
  <g key="align">
    <path d="M5.5 8h13a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H12l-5.5 4v-4h-1a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z" />
    <path d="M12 4h14a3 3 0 0 1 3 3v7M8 13h8M8 16h5" />
  </g>,
  <g key="build">
    <path d="m16 4 11 6-11 6-11-6 11-6ZM5 16l11 6 11-6M5 22l11 6 11-6" />
    <path d="M16 10v6" opacity=".45" />
  </g>,
  <g key="improve">
    <path d="M25 11a10 10 0 1 0 1 9M25 5v6h-6" />
    <path d="m10.5 16 3.5 3.5 7-7" />
  </g>,
];

export const ProcessIcon = ({ index }: { index: number }) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {illustrations[index % illustrations.length]}
  </svg>
);
