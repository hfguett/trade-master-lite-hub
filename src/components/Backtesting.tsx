
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RingProgress, BarProgress } from "@/components/ui/enhanced-progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Play, 
  Pause, 
  RotateCcw,
  Calendar,
  DollarSign
} from "lucide-react";

export const Backtesting = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [strategy, setStrategy] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [initialCapital, setInitialCapital] = useState("10000");

  const backtestResults = {
    totalReturn: 24.7,
    winRate: 68.2,
    maxDrawdown: -8.3,
    sharpeRatio: 1.42,
    totalTrades: 127,
    winningTrades: 87,
    losingTrades: 40,
    avgWin: 420,
    avgLoss: -180
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Strategy Backtesting</h1>
          <p className="text-slate-300">Test your trading strategies against historical data</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Backtest Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="strategy" className="text-primary">Strategy</Label>
              <Select value={strategy} onValueChange={setStrategy}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ma-crossover">MA Crossover</SelectItem>
                  <SelectItem value="rsi-divergence">RSI Divergence</SelectItem>
                  <SelectItem value="bollinger-bands">Bollinger Bands</SelectItem>
                  <SelectItem value="macd-signal">MACD Signal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timeframe" className="text-primary">Timeframe</Label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Minute</SelectItem>
                  <SelectItem value="5m">5 Minutes</SelectItem>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="1d">1 Day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="capital" className="text-primary">Initial Capital</Label>
              <Input
                id="capital"
                value={initialCapital}
                onChange={(e) => setInitialCapital(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="10000"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                className="flex-1 bg-primary hover:bg-primary/80 text-white"
              >
                {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isRunning ? "Pause" : "Start"} Backtest
              </Button>
              <Button variant="outline" className="border-primary/50 hover:border-primary text-primary hover:bg-primary hover:text-white">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="glass-effect border-primary/20 text-center">
              <CardContent className="p-4">
                <p className="text-sm text-primary mb-2">Total Return</p>
                <p className="text-xl font-bold text-green-400">+{backtestResults.totalReturn}%</p>
                <RingProgress value={backtestResults.totalReturn} size={60} strokeWidth={6} showValue={false} />
              </CardContent>
            </Card>

            <Card className="glass-effect border-primary/20 text-center">
              <CardContent className="p-4">
                <p className="text-sm text-primary mb-2">Win Rate</p>
                <p className="text-xl font-bold text-green-400">{backtestResults.winRate}%</p>
                <RingProgress value={backtestResults.winRate} size={60} strokeWidth={6} showValue={false} />
              </CardContent>
            </Card>

            <Card className="glass-effect border-primary/20 text-center">
              <CardContent className="p-4">
                <p className="text-sm text-primary mb-2">Max Drawdown</p>
                <p className="text-xl font-bold text-red-400">{backtestResults.maxDrawdown}%</p>
                <RingProgress value={Math.abs(backtestResults.maxDrawdown)} size={60} strokeWidth={6} showValue={false} />
              </CardContent>
            </Card>

            <Card className="glass-effect border-primary/20 text-center">
              <CardContent className="p-4">
                <p className="text-sm text-primary mb-2">Sharpe Ratio</p>
                <p className="text-xl font-bold text-primary">{backtestResults.sharpeRatio}</p>
                <TrendingUp className="h-8 w-8 text-primary mx-auto mt-2" />
              </CardContent>
            </Card>
          </div>

          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Backtest Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <BarProgress 
                    value={backtestResults.winRate}
                    label="Win Rate"
                    color="#10b981"
                  />
                  <BarProgress 
                    value={(backtestResults.winningTrades / backtestResults.totalTrades) * 100}
                    label="Winning Trades Ratio"
                    color="#3b82f6"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 glass-effect rounded-lg text-center">
                    <p className="text-sm text-primary mb-2">Total Trades</p>
                    <p className="text-lg font-semibold">{backtestResults.totalTrades}</p>
                  </div>
                  <div className="p-4 glass-effect rounded-lg text-center">
                    <p className="text-sm text-primary mb-2">Avg Win</p>
                    <p className="text-lg font-semibold text-green-400">${backtestResults.avgWin}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
