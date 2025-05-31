
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, Download, Upload, TrendingUp, TrendingDown } from "lucide-react";

export const TradingJournal = () => {
  const [trades] = useState([
    {
      id: 1,
      symbol: "BTC/USDT",
      type: "LONG",
      entryPrice: 43250,
      exitPrice: 44120,
      quantity: 0.5,
      entryDate: "2024-01-15T10:30:00",
      exitDate: "2024-01-15T14:20:00",
      strategy: "Breakout",
      pnl: 435,
      notes: "Clean breakout above resistance with good volume"
    },
    {
      id: 2,
      symbol: "ETH/USDT",
      type: "SHORT",
      entryPrice: 2650,
      exitPrice: 2580,
      quantity: 2,
      entryDate: "2024-01-14T09:15:00",
      exitDate: "2024-01-14T11:45:00",
      strategy: "Reversal",
      pnl: 140,
      notes: "Reversal at key resistance level"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const calculateMetrics = () => {
    const totalTrades = trades.length;
    const winningTrades = trades.filter(trade => trade.pnl > 0).length;
    const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
    const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
    
    return { totalTrades, winningTrades, totalPnL, winRate };
  };

  const metrics = calculateMetrics();

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-1">Total Trades</p>
              <p className="text-2xl font-bold">{metrics.totalTrades}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-1">Win Rate</p>
              <p className="text-2xl font-bold text-emerald-400">{metrics.winRate.toFixed(1)}%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-1">Total P&L</p>
              <p className={`text-2xl font-bold ${metrics.totalPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                ${metrics.totalPnL.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-1">Avg Per Trade</p>
              <p className={`text-2xl font-bold ${metrics.totalPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                ${metrics.totalTrades > 0 ? (metrics.totalPnL / metrics.totalTrades).toFixed(2) : '0.00'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trades" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-slate-800">
            <TabsTrigger value="trades">All Trades</TabsTrigger>
            <TabsTrigger value="add">Add Trade</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-slate-600">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="trades" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Trade History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trades.map((trade) => (
                  <div key={trade.id} className="p-4 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant={trade.type === "LONG" ? "default" : "destructive"}
                          className="w-16 justify-center"
                        >
                          {trade.type}
                        </Badge>
                        <div>
                          <p className="font-semibold text-lg">{trade.symbol}</p>
                          <p className="text-sm text-slate-400">{trade.strategy}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-bold ${trade.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                        </p>
                        <div className="flex items-center text-sm text-slate-400">
                          {trade.pnl >= 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {((trade.pnl / (trade.entryPrice * trade.quantity)) * 100).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400">Entry</p>
                        <p className="font-mono">${trade.entryPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Exit</p>
                        <p className="font-mono">${trade.exitPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Quantity</p>
                        <p className="font-mono">{trade.quantity}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Duration</p>
                        <p className="font-mono">
                          {Math.round((new Date(trade.exitDate).getTime() - new Date(trade.entryDate).getTime()) / (1000 * 60))}m
                        </p>
                      </div>
                    </div>
                    
                    {trade.notes && (
                      <div className="mt-3 pt-3 border-t border-slate-700">
                        <p className="text-sm text-slate-300">{trade.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Add New Trade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="symbol">Symbol</Label>
                    <Input id="symbol" placeholder="e.g., BTC/USDT" className="bg-slate-700 border-slate-600" />
                  </div>
                  <div>
                    <Label htmlFor="type">Trade Type</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LONG">LONG</SelectItem>
                        <SelectItem value="SHORT">SHORT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="strategy">Strategy</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakout">Breakout</SelectItem>
                        <SelectItem value="reversal">Reversal</SelectItem>
                        <SelectItem value="scalping">Scalping</SelectItem>
                        <SelectItem value="swing">Swing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="entryPrice">Entry Price</Label>
                      <Input id="entryPrice" type="number" step="0.01" className="bg-slate-700 border-slate-600" />
                    </div>
                    <div>
                      <Label htmlFor="exitPrice">Exit Price</Label>
                      <Input id="exitPrice" type="number" step="0.01" className="bg-slate-700 border-slate-600" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" step="0.001" className="bg-slate-700 border-slate-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="entryDate">Entry Date</Label>
                      <Input id="entryDate" type="datetime-local" className="bg-slate-700 border-slate-600" />
                    </div>
                    <div>
                      <Label htmlFor="exitDate">Exit Date</Label>
                      <Input id="exitDate" type="datetime-local" className="bg-slate-700 border-slate-600" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Add any notes about this trade..."
                  className="bg-slate-700 border-slate-600 min-h-[100px]"
                />
              </div>
              
              <div className="flex gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Trade
                </Button>
                <Button variant="outline" className="border-slate-600">
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Performance by Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
                  <p className="text-slate-400">Strategy performance chart</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Risk-Reward Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
                  <p className="text-slate-400">Risk-reward chart</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
