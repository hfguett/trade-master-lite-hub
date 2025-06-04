
import React from 'react';
import { AdvancedChart } from './advanced-chart';

interface TradingChartProps {
  type: 'line' | 'area' | 'pie' | 'bar';
  data: any[];
  height?: number;
  showGrid?: boolean;
  colors?: string[];
  animate?: boolean;
}

export const TradingChart: React.FC<TradingChartProps> = ({
  type,
  data,
  height = 300,
  showGrid = true,
  colors,
  animate = true
}) => {
  return (
    <AdvancedChart 
      data={data}
      height={height}
      showControls={false}
    />
  );
};
