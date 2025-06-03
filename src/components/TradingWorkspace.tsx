
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  BookOpen, 
  Pencil, 
  Layers, 
  FileText,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  AlertTriangle,
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
          <p className="text-slate-400">Manage your trades, drawings, and analysis</p>
        </div>
        <div className="flex gap-2">
          {["week", "month", "quarter"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={selectedPeriod === period ? 'bg-primary text-white' : 'border-primary/50 hover:border-primary'}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 glass-effect border-primary/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-slate-900">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="trades" className="data-[state=active]:bg-primary data-[state=active]:text-slate-900">
            <BookOpen className="h-4 w-4 mr-2" />
            Trade Journal
          </TabsTrigger>
          <TabsTrigger value="drawing" className="data-[state=active]:bg-primary data-[state=active]:text-slate-900">
            <Pencil className="h-4 w-4 mr-2" />
            Vector Drawing
          </TabsTrigger>
          <TabsTrigger value="diagrams" className="data-[state=active]:bg-primary data-[state=active]:text-slate-900">
            <Layers className="h-4 w-4 mr-2" />
            Diagrams
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-primary data-[state=active]:text-slate-900">
            <FileText className="h-4 w-4 mr-2" />
            Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="glass-effect border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total Trades</p>
                    <p className="text-2xl font-bold text-primary">{performanceData.totalTrades}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Win Rate</p>
                    <p className="text-2xl font-bold text-green-400">{performanceData.winRate}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">P&L</p>
                    <p className="text-2xl font-bold text-green-400">${performanceData.profitLoss}</p>
                  </div>
                  <Target className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Best Trade</p>
                    <p className="text-2xl font-bold text-green-400">${performanceData.bestTrade}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Win Rate</span>
                  <div className="flex items-center gap-2">
                    <Progress value={performanceData.winRate} className="w-20" />
                    <span className="text-green-400">{performanceData.winRate}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-sm text-slate-400">Average Win</p>
                    <p className="text-lg font-semibold text-green-400">${performanceData.avgWin}</p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-sm text-slate-400">Average Loss</p>
                    <p className="text-lg font-semibold text-red-400">${performanceData.avgLoss}</p>
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
                  <div key={trade.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge variant={trade.type === "Long" ? "default" : "secondary"}>
                        {trade.type}
                      </Badge>
                      <div>
                        <p className="font-semibold text-slate-100">{trade.pair}</p>
                        <p className="text-sm text-slate-400">{trade.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Entry: ${trade.entry}</p>
                      <p className="text-sm text-slate-400">Exit: ${trade.exit}</p>
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

        <TabsContent value="diagrams" className="mt-6">
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Trading Diagrams</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Diagram builder coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Trading Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">Notes manager coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
