
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

// Function to get color based on value
const getColorByValue = (value: number): string => {
  if (value > 50) return '#10b981'; // Green
  if (value >= 30) return '#3b82f6'; // Blue
  return '#ef4444'; // Red
};

export const RingProgress: React.FC<RingProgressProps> = ({
  value,
  size = 180,
  strokeWidth = 16,
  color,
  backgroundColor = "#1e293b",
  label,
  showValue = true
}) => {
  const finalColor = color || getColorByValue(value);
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex flex-col items-center justify-center group transition-all duration-500 hover:scale-110 hover:drop-shadow-2xl">
      <svg width={size} height={size} className="transform -rotate-90 transition-all duration-700 group-hover:rotate-0">
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
          stroke={finalColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ 
            filter: `drop-shadow(0 0 8px ${finalColor}50)`,
            animation: 'dashProgress 2s ease-out'
          }}
        />
      </svg>
      <div className="absolute text-center transition-all duration-300 group-hover:scale-110">
        {label && <div className="text-sm font-bold text-white mb-1 font-inter">{label}</div>}
        {showValue && <div className="text-lg font-bold font-mono text-white">{value}%</div>}
      </div>
    </div>
  );
};

export const BarProgress: React.FC<BarProgressProps> = ({
  value,
  label,
  color,
  height = "h-6",
  showValue = true
}) => {
  const finalColor = color || getColorByValue(value);
  
  return (
    <div className="space-y-3 group transition-all duration-300 hover:scale-105">
      {label && <div className="text-lg font-semibold text-white font-inter transition-all duration-300 group-hover:text-cyan-300">{label}</div>}
      <div className="relative">
        <div className={`w-full bg-slate-800 rounded-full ${height} shadow-inner border border-slate-700`}></div>
        <div
          className={`absolute top-0 left-0 rounded-full ${height} transition-all duration-1000 ease-out shadow-lg`}
          style={{ 
            width: `${value}%`, 
            backgroundColor: finalColor,
            boxShadow: `0 0 20px ${finalColor}50, inset 0 2px 4px rgba(255,255,255,0.1)`
          }}
        ></div>
        {showValue && (
          <span 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-white font-mono drop-shadow-md transition-all duration-300 group-hover:scale-110"
          >
            {value}%
          </span>
        )}
      </div>
    </div>
  );
};
