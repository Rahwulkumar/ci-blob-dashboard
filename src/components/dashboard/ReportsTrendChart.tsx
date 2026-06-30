type TrendPoint = { month: string; reports: number };

export function ReportsTrendChart({ data, height = 230 }: { data: TrendPoint[]; height?: number }) {
  const latest = data.at(-1)?.reports ?? 31;
  const chartHeight = height === 232 ? "h-58" : "h-[230px]";

  return (
    <div className="px-2.5 pt-3">
      <svg
        className={`block w-full ${chartHeight}`}
        viewBox="0 0 720 230"
        preserveAspectRatio="none"
        role="img"
        aria-label="Report flow from February to July"
      >
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity=".22" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="#e9edf4" strokeWidth="1">
          <line x1="0" y1="55" x2="720" y2="55" />
          <line x1="0" y1="105" x2="720" y2="105" />
          <line x1="0" y1="155" x2="720" y2="155" />
          <line x1="0" y1="205" x2="720" y2="205" />
        </g>
        <path
          d="M30,180 C90,176 120,158 150,150 C200,137 230,114 270,110 C320,105 350,128 390,124 C440,119 470,84 510,78 C560,70 590,62 630,48 C660,38 680,34 690,30 L690,205 L30,205 Z"
          fill="url(#fill)"
        />
        <path
          d="M30,180 C90,176 120,158 150,150 C200,137 230,114 270,110 C320,105 350,128 390,124 C440,119 470,84 510,78 C560,70 590,62 630,48 C660,38 680,34 690,30"
          fill="none"
          stroke="#2563eb"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
        <circle cx="690" cy="30" r="5" fill="#2563eb" />
        <circle cx="690" cy="30" r="10" fill="#2563eb" opacity=".15" />
        <g className="font-sans text-xs font-bold" fill="#16243d">
          <rect x="648" y="2" rx="6" width="62" height="20" fill="#fff" stroke="#dbe7fd" />
          <text x="679" y="16" textAnchor="middle">
            {latest} rpts
          </text>
        </g>
      </svg>
      <div className="relative -mt-7 flex justify-between px-7 pb-4">
        {data.map((item, index) => (
          <span
            key={item.month}
            className={`text-xs font-bold uppercase tracking-wider ${
              index === data.length - 1 ? "text-[#1d4fd8]" : "text-[#97a3b8]"
            }`}
          >
            {item.month}
          </span>
        ))}
      </div>
    </div>
  );
}
