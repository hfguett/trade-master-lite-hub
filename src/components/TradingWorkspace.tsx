
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RingProgress, BarProgress } from "@/components/ui/enhanced-progress";
import { 
  BarChart3, 
  BookOpen, 
  Pencil, 
  FileText,
  TrendingUp,
  TrendingDown,
  Target,
  CheckCircle
} from "lucide-react";
import { VectorDrawingCanvas } from "@/components/VectorDrawingCanvas";

export const TradingWorkspace = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const performanceData = {
    totalTrades: 127,
    winRate: 68,
    profitLoss: 12450,
    bestTrade: 2340,
    worstTrade: -850,
    avgWin: 420,
    avgLoss: -280
  };

  const recentTrades = [
    { id: 1, pair: "BTC/USDT", type: "Long", entry: 45200, exit: 46800, pnl: 1600, date: "2024-01-15" },
    { id: 2, pair: "ETH/USDT", type: "Short", entry: 2850, exit: 2720, pnl: 130, date: "2024-01-14" },
    { id: 3, pair: "SOL/USDT", type: "Long", entry: 98.50, exit: 102.30, pnl: 380, date: "2024-01-13" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Trading Workspace</h1>
          <p className="text-slate-300">Manage your trades, drawings, and analysis</p>
        </div>
        <div className="flex gap-2">
          {["week", "month", "quarter"].map((period) => (
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

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass-effect border-primary/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="trades" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <BookOpen className="h-4 w-4 mr-2" />
            Trade Journal
          </TabsTrigger>
          <TabsTrigger value="drawing" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Pencil className="h-4 w-4 mr-2" />
            Vector Drawing & Diagrams
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <FileText className="h-4 w-4 mr-2" />
            Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="glass-effect border-primary/20 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-primary mb-2">Total Trades</p>
                <p className="text-2xl font-bold text-primary">{performanceData.totalTrades}</p>
                <div className="mt-4">
                  <RingProgress 
                    value={75} 
                    size={80} 
                    strokeWidth={8}
                    showValue={false}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-primary/20 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-primary mb-2">Win Rate</p>
                <p className="text-2xl font-bold text-green-400">{performanceData.winRate}%</p>
                <div className="mt-4">
                  <BarProgress 
                    value={performanceData.winRate}
                    showValue={false}
                    height="h-4"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-primary/20 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-primary mb-2">P&L</p>
                <p className="text-2xl font-bold text-green-400">${performanceData.profitLoss}</p>
                <Target className="h-8 w-8 text-green-400 mx-auto mt-2" />
              </CardContent>
            </Card>

            <Card className="glass-effect border-primary/20 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-primary mb-2">Best Trade</p>
                <p className="text-2xl font-bold text-green-400">${performanceData.bestTrade}</p>
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mt-2" />
              </CardContent>
            </Card>
          </div>

          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <BarProgress 
                      value={performanceData.winRate}
                      label="Win Rate"
                      color="#10b981"
                    />
                    <BarProgress 
                      value={Math.abs(performanceData.avgWin) / 10}
                      label="Average Win"
                      color="#3b82f6"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 glass-effect rounded-lg text-center">
                      <p className="text-sm text-primary mb-2">Average Win</p>
                      <p className="text-lg font-semibold text-green-400">${performanceData.avgWin}</p>
                    </div>
                    <div className="p-4 glass-effect rounded-lg text-center">
                      <p className="text-sm text-primary mb-2">Average Loss</p>
                      <p className="text-lg font-semibold text-red-400">${performanceData.avgLoss}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trades" className="mt-6">
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrades.map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between p-4 glass-effect rounded-lg hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <Badge variant={trade.type === "Long" ? "default" : "secondary"}>
                        {trade.type}
                      </Badge>
                      <div>
                        <p className="font-semibold text-primary">{trade.pair}</p>
                        <p className="text-sm text-slate-300">{trade.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-300">Entry: ${trade.entry}</p>
                      <p className="text-sm text-slate-300">Exit: ${trade.exit}</p>
                    </div>
                    <div className={`text-right ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <p className="font-semibold">${trade.pnl}</p>
                      {trade.pnl >= 0 ? <TrendingUp className="h-4 w-4 inline" /> : <TrendingDown className="h-4 w-4 inline" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drawing" className="mt-6">
          <VectorDrawingCanvas />
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Trading Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <FileText className="h-16 w-16 text-primary/50 mx-auto mb-4" />
                <p className="text-slate-300">Notes manager will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
