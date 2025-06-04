
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RingProgress, BarProgress } from "@/components/ui/enhanced-progress";
import { TradingChart } from "@/components/ui/TradingChart";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Target,
  Calendar,
  Filter
} from "lucide-react";

export const PnLTracker = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const pnlData = {
    today: { value: 347.82, change: 2.1 },
    week: { value: 1247.50, change: 8.3 },
    month: { value: 3821.45, change: 15.7 },
    year: { value: 12847.32, change: 24.5 }
  };

  const realtimePnL = [
    { time: '09:00', value: 0 },
    { time: '10:00', value: 120 },
    { time: '11:00', value: 89 },
    { time: '12:00', value: 234 },
    { time: '13:00', value: 187 },
    { time: '14:00', value: 298 },
    { time: '15:00', value: 347.82 }
  ];

  const positions = [
    {
      symbol: "BTC/USDT",
      type: "LONG",
      size: 0.25,
      entryPrice: 43250,
      currentPrice: 43891,
      pnl: 160.25,
      pnlPercent: 1.48
    },
    {
      symbol: "ETH/USDT", 
      type: "SHORT",
      size: 2.5,
      entryPrice: 2650,
      currentPrice: 2578,
      pnl: 180.00,
      pnlPercent: 2.72
    },
    {
      symbol: "AAPL",
      type: "LONG", 
      size: 10,
      entryPrice: 185.40,
      currentPrice: 183.95,
      pnl: -14.50,
      pnlPercent: -0.78
    }
  ];

  const totalUnrealizedPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">P&L Tracker</h1>
          <p className="text-slate-300">Real-time profit and loss monitoring</p>
        </div>
        <div className="flex gap-2">
          {Object.keys(pnlData).map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={selectedPeriod === period ? 'bg-primary text-white' : 'border-primary/50 hover:border-primary text-primary'}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-effect border-primary/20 text-center hover:scale-105 transition-all duration-300">
          <CardContent className="p-6">
            <p className="text-sm text-primary mb-2">Realized P&L ({selectedPeriod})</p>
            <p className={`text-2xl font-bold ${pnlData[selectedPeriod as keyof typeof pnlData].value >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {pnlData[selectedPeriod as keyof typeof pnlData].value >= 0 ? '+' : ''}${pnlData[selectedPeriod as keyof typeof pnlData].value}
            </p>
            <div className="flex items-center justify-center mt-2 gap-1">
              {pnlData[selectedPeriod as keyof typeof pnlData].change >= 0 ? 
                <TrendingUp className="h-4 w-4 text-green-400" /> : 
                <TrendingDown className="h-4 w-4 text-red-400" />
              }
              <span className={`text-sm ${pnlData[selectedPeriod as keyof typeof pnlData].change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {pnlData[selectedPeriod as keyof typeof pnlData].change >= 0 ? '+' : ''}{pnlData[selectedPeriod as keyof typeof pnlData].change}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20 text-center hover:scale-105 transition-all duration-300">
          <CardContent className="p-6">
            <p className="text-sm text-primary mb-2">Unrealized P&L</p>
            <p className={`text-2xl font-bold ${totalUnrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalUnrealizedPnL >= 0 ? '+' : ''}${totalUnrealizedPnL.toFixed(2)}
            </p>
            <RingProgress 
              value={Math.abs(totalUnrealizedPnL) / 10} 
              size={60} 
              strokeWidth={6} 
              showValue={false} 
            />
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20 text-center hover:scale-105 transition-all duration-300">
          <CardContent className="p-6">
            <p className="text-sm text-primary mb-2">Open Positions</p>
            <p className="text-2xl font-bold text-primary">{positions.length}</p>
            <Target className="h-8 w-8 text-primary mx-auto mt-2" />
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20 text-center hover:scale-105 transition-all duration-300">
          <CardContent className="p-6">
            <p className="text-sm text-primary mb-2">Win Rate</p>
            <p className="text-2xl font-bold text-green-400">68.2%</p>
            <BarProgress value={68.2} height="h-3" showValue={false} />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Real-time P&L Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TradingChart 
              type="line" 
              data={realtimePnL.map(d => ({ name: d.time, value: d.value }))} 
              height={300}
              animate={true}
            />
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Open Positions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {positions.map((position, index) => (
              <div key={index} className="p-4 glass-effect rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={position.type === "LONG" ? "default" : "destructive"}>
                      {position.type}
                    </Badge>
                    <span className="font-semibold text-primary">{position.symbol}</span>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                    </p>
                    <p className={`text-xs ${position.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent}%
                    </p>
                  </div>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-mono">{position.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entry:</span>
                    <span className="font-mono">${position.entryPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current:</span>
                    <span className="font-mono">${position.currentPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
