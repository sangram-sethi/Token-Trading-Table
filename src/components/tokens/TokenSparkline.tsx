"use client";

interface TokenSparklineProps {
  points: number[];
  className?: string;
  height?: number;
  strokeWidth?: number;
}

export default function TokenSparkline({
  points,
  className = "",
  height = 32,
  strokeWidth = 1.5,
}: TokenSparklineProps) {
  if (!points || points.length === 0) return null;

  const width = 80;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points
    .map((p, i) => {
      const x =
        points.length === 1 ? width / 2 : (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const change = points[points.length - 1] - points[0];
  const isUp = change >= 0;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={`overflow-visible ${className}`}
    >
      <polyline
        points={coords}
        fill="none"
        stroke={isUp ? "#22c55e" : "#f97373"}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
