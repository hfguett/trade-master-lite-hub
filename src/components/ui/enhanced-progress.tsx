import React from 'react';

interface RingProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  label?: string;
  showValue?: boolean;
}

interface BarProgressProps {
  value: number;
  label?: string;
  color?: string;
  height?: string;
  showValue?: boolean;
}

export const RingProgress: React.FC<RingProgressProps> = ({
  value,
  size = 120,
  strokeWidth = 8,
  color = "#3b82f6",
  backgroundColor = "#334155",
  label,
  showValue = true
}) => {
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s ease' }}
        />
      </svg>
      {label && (
        <div className="absolute text-center">
          <div className="text-sm font-medium">{label}</div>
          {showValue && <div className="text-xs text-slate-400">{value}%</div>}
        </div>
      )}
    </div>
  );
};

export const BarProgress: React.FC<BarProgressProps> = ({
  value,
  label,
  color = "#3b82f6",
  height = "h-3",
  showValue = true
}) => {
  return (
    <div className="space-y-1">
      {label && <div className="text-sm font-medium">{label}</div>}
      <div className="relative">
        <div className={`w-full bg-slate-800 rounded-full ${height}`}></div>
        <div
          className={`bg-primary absolute top-0 left-0 rounded-full ${height}`}
          style={{ width: `${value}%`, backgroundColor: color, transition: 'width 0.3s ease 0s' }}
        ></div>
        {showValue && (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-slate-100">
            {value}%
          </span>
        )}
      </div>
    </div>
  );
};
