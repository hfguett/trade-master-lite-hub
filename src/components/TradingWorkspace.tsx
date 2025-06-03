import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RingProgress } from "@/components/ui/enhanced-progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  ArrowDown,
  ArrowUp,
  TrendingUp,
  TrendingDown,
  Wallet,
  Banknote,
  Percent,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Loader2,
  BarChart3,
  BookOpen,
  Pencil,
  Layers,
  FileText
} from "lucide-react";
import { VectorDrawingCanvas } from "@/components/VectorDrawingCanvas";

export const TradingWorkspace = () => {
  const [symbol, setSymbol] = useState("BTC/USDT");
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState(1);
  const [leverage, setLeverage] = useState(1);
  const [stopLoss, setStopLoss] = useState(0);
  const [takeProfit, setTakeProfit] = useState(0);
  const [isLong, setIsLong] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tradeSuccess, setTradeSuccess] = useState(false);
  const [tradeError, setTradeError] = useState("");

  const chartData = [
    { time: '00:00', price: 27000 },
    { time: '01:00', price: 27100 },
    { time: '02:00', price: 27200 },
    { time: '03:00', price: 27150 },
    { time: '04:00', price: 27250 },
    { time: '05:00', price: 27300 },
    { time: '06:00', price: 27400 },
    { time: '07:00', price: 27350 },
    { time: '08:00', price: 27450 },
    { time: '09:00', price: 27500 },
    { time: '10:00', price: 27600 },
    { time: '11:00', price: 27550 },
    { time: '12:00', price: 27650 },
    { time: '13:00', price: 27700 },
    { time: '14:00', price: 27650 },
    { time: '15:00', price: 27750 },
    { time: '16:00', price: 27800 },
    { time: '17:00', price: 27750 },
    { time: '18:00', price: 27850 },
    { time: '19:00', price: 27900 },
    { time: '20:00', price: 27850 },
    { time: '21:00', price: 27950 },
    { time: '22:00', price: 28000 },
    { time: '23:00', price: 27950 },
  ];

  const portfolioData = [
    { name: 'BTC', value: 45, color: '#3b82f6' },
    { name: 'ETH', value: 30, color: '#6366f1' },
    { name: 'Others', value: 25, color: '#0ea5e9' }
  ];

  const COLORS = portfolioData.map(item => item.color);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTradeSuccess(false);
    setTradeError("");

    // Simulate trade execution
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const randomSuccess = Math.random() > 0.2; // 80% success rate

    if (randomSuccess) {
      setTradeSuccess(true);
    } else {
      setTradeError("Trade execution failed. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Order Form */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">New Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                type="text"
                id="symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="bg-slate-800 border-slate-600"
              />
            </div>
            <div>
              <Label htmlFor="orderType">Order Type</Label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-100">
                  <SelectValue placeholder="Select order type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 text-slate-100">
                  <SelectItem value="market">Market Order</SelectItem>
                  <SelectItem value="limit">Limit Order</SelectItem>
                  <SelectItem value="stop">Stop Order</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="bg-slate-800 border-slate-600"
              />
            </div>
            <div>
              <Label htmlFor="leverage">Leverage</Label>
              <Slider
                defaultValue={[leverage]}
                max={100}
                step={1}
                onValueChange={(value) => setLeverage(value[0])}
                className="bg-slate-800"
              />
              <p className="text-sm text-slate-400 mt-1">Current Leverage: {leverage}x</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stopLoss">Stop Loss</Label>
                <Input
                  type="number"
                  id="stopLoss"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(Number(e.target.value))}
                  className="bg-slate-800 border-slate-600"
                />
              </div>
              <div>
                <Label htmlFor="takeProfit">Take Profit</Label>
                <Input
                  type="number"
                  id="takeProfit"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(Number(e.target.value))}
                  className="bg-slate-800 border-slate-600"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isLong">Long Position</Label>
              <Switch
                id="isLong"
                checked={isLong}
                onCheckedChange={setIsLong}
                className="bg-primary data-[state=checked]:bg-primary-light"
              />
            </div>
            <Button type="submit" className="primary-button w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Executing...
                </>
              ) : isLong ? (
                "Open Long Position"
              ) : (
                "Open Short Position"
              )}
            </Button>
          </form>
          {tradeSuccess && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Trade executed successfully!
            </div>
          )}
          {tradeError && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Error: {tradeError}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Market Analysis */}
      <Card className="glass-effect border-primary/20 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Market Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} itemStyle={{ color: '#94a3b8' }} />
              <Legend wrapperStyle={{ color: '#94a3b8' }} />
              <Line type="monotone" dataKey="price" stroke="#3b82f6" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
          <Textarea
            placeholder="Enter your analysis notes here."
            className="bg-slate-800 border-slate-600 mt-4 text-sm"
          />
        </CardContent>
      </Card>

      {/* Portfolio Overview */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Portfolio Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <RingProgress value={75} label="Risk Score" color="#0ea5e9" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-2">Asset Allocation</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={portfolioData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {
                    portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} itemStyle={{ color: '#94a3b8' }} />
                <Legend layout="vertical" align="right" wrapperStyle={{ color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-300">Quick Stats</h3>
            <div className="flex justify-between text-sm">
              <span>Total Balance:</span>
              <span>$56,789</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Profit/Loss:</span>
              <span className="text-green-400">+2.5%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
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
          {/* Overview Content */}
        </TabsContent>

        <TabsContent value="trades" className="mt-6">
          {/* Trade Journal Content */}
        </TabsContent>

        <TabsContent value="drawing" className="mt-6">
          <VectorDrawingCanvas />
        </TabsContent>

        <TabsContent value="diagrams" className="mt-6">
          {/* Diagrams Content */}
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          {/* Notes Content */}
        </TabsContent>
      </Tabs>
    </div>
  );
};
