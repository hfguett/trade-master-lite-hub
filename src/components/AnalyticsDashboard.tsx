
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Download, Filter, Calendar } from "lucide-react";

export const AnalyticsDashboard = () => {
  const performanceMetrics = {
    totalTrades: 147,
    winRate: 68.2,
    avgRiskReward: 1.8,
    profitFactor: 2.1,
    maxDrawdown: -8.5,
    sharpeRatio: 1.4,
    totalPnL: 2847.32,
    bestTrade: 450.00,
    worstTrade: -225.00,
    avgTradeLength: 3.2
  };

  const strategyPerformance = [
    {
      strategy: "Breakout",
      trades: 45,
      winRate: 73.3,
      avgPnL: 32.50,
      totalPnL: 1462.50,
      riskReward: 2.1
    },
    {
      strategy: "Reversal", 
      trades: 38,
      winRate: 65.8,
      avgPnL: 18.75,
      totalPnL: 712.50,
      riskReward: 1.6
    },
    {
      strategy: "Scalping",
      trades: 64,
      winRate: 64.1,
      avgPnL: 10.25,
      totalPnL: 656.00,
      riskReward: 1.2
    }
  ];

  const monthlyData = [
    { month: "Oct 2023", pnl: 1250, trades: 32, winRate: 62.5 },
    { month: "Nov 2023", pnl: 1820, trades: 38, winRate: 68.4 },
    { month: "Dec 2023", pnl: 2100, trades: 41, winRate: 70.7 },
    { month: "Jan 2024", pnl: 2847, trades: 36, winRate: 72.2 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">Total P&L</p>
              <p className="text-xl font-bold text-emerald-400">
                +${performanceMetrics.totalPnL.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">Win Rate</p>
              <p className="text-xl font-bold">{performanceMetrics.winRate}%</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">Avg R:R</p>
              <p className="text-xl font-bold">{performanceMetrics.avgRiskReward}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">Profit Factor</p>
              <p className="text-xl font-bold text-emerald-400">{performanceMetrics.profitFactor}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">Max Drawdown</p>
              <p className="text-xl font-bold text-red-400">{performanceMetrics.maxDrawdown}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-slate-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-slate-600">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Portfolio Growth Chart */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Portfolio Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
                  <p className="text-slate-400">Portfolio growth line chart</p>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Performance */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monthlyData.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <div>
                        <p className="font-semibold">{month.month}</p>
                        <p className="text-sm text-slate-400">{month.trades} trades</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${month.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          +${month.pnl.toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-400">{month.winRate}% win rate</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Detailed Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <p className="text-sm text-slate-400 mb-1">Total Trades</p>
                  <p className="text-2xl font-bold">{performanceMetrics.totalTrades}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-slate-400 mb-1">Sharpe Ratio</p>
                  <p className="text-2xl font-bold text-emerald-400">{performanceMetrics.sharpeRatio}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-slate-400 mb-1">Best Trade</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    +${performanceMetrics.bestTrade.toFixed(2)}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-slate-400 mb-1">Worst Trade</p>
                  <p className="text-2xl font-bold text-red-400">
                    ${performanceMetrics.worstTrade.toFixed(2)}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-slate-400 mb-1">Avg Trade Length</p>
                  <p className="text-2xl font-bold">{performanceMetrics.avgTradeLength}h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Strategy Performance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategyPerformance.map((strategy, index) => (
                  <div key={index} className="p-4 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{strategy.strategy}</h3>
                        <p className="text-sm text-slate-400">{strategy.trades} trades</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-bold ${strategy.totalPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          +${strategy.totalPnL.toLocaleString()}
                        </p>
                        <div className="flex items-center">
                          <TrendingUp className="h-3 w-3 text-emerald-400 mr-1" />
                          <span className="text-sm text-emerald-400">{strategy.winRate}% win rate</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400">Avg P&L</p>
                        <p className="font-semibold">${strategy.avgPnL}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Risk:Reward</p>
                        <p className="font-semibold">{strategy.riskReward}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Contribution</p>
                        <p className="font-semibold">
                          {((strategy.totalPnL / performanceMetrics.totalPnL) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Win Rate Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
                  <p className="text-slate-400">Win rate trend chart</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Risk-Reward Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
                  <p className="text-slate-400">Risk-reward trend chart</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="border-slate-600 h-20 flex-col">
                  <Download className="h-6 w-6 mb-2" />
                  Monthly Summary
                </Button>
                <Button variant="outline" className="border-slate-600 h-20 flex-col">
                  <Download className="h-6 w-6 mb-2" />
                  Tax Report
                </Button>
                <Button variant="outline" className="border-slate-600 h-20 flex-col">
                  <Download className="h-6 w-6 mb-2" />
                  Performance Analysis
                </Button>
              </div>
              
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <h3 className="font-semibold mb-2">Custom Date Range Report</h3>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm text-slate-400 mb-1">From</label>
                    <input type="date" className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-slate-400 mb-1">To</label>
                    <input type="date" className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2" />
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Generate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
