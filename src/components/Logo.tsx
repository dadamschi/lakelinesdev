interface LogoMarkProps {
  className?: string;
  /** Stroke color for the two Ls */
  lColor?: string;
  /** Stroke color for the ripples */
  rippleColor?: string;
}

/**
 * The Lakelines mark: two back-to-back Ls standing on rippling water —
 * a dock silhouette over a lake.
 */
export function LogoMark({
  className = "h-8 w-8",
  lColor = "var(--color-lake-800)",
  rippleColor = "var(--color-lake-500)",
}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Back-to-back Ls */}
      <path
        d="M27 11 V35 H13"
        stroke={lColor}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37 11 V35 H51"
        stroke={lColor}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ripples */}
      <path
        d="M10 45 q5.5 -5 11 0 t11 0 t11 0 t11 0"
        stroke={rippleColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M21 53 q5.5 -5 11 0 t11 0"
        stroke={rippleColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8" />
      <span className="text-lg font-semibold tracking-tight text-lake-950">
        Lakelines{" "}
        <span className="font-normal text-lake-600">Dev</span>
      </span>
    </span>
  );
}
