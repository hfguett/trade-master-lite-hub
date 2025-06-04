
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, RefreshCw, Settings } from "lucide-react";
import { RingProgress, BarProgress } from "@/components/ui/enhanced-progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const PortfolioOverview = () => {
  const portfolioData = {
    totalValue: 24847.32,
    todayChange: 347.82,
    todayChangePercent: 2.1,
    holdings: [
      {
        symbol: "BTC",
        name: "Bitcoin",
        amount: 0.5,
        value: 21750.00,
        change: 2.3,
        allocation: 87.5
      },
      {
        symbol: "ETH", 
        name: "Ethereum",
        amount: 1.2,
        value: 3097.32,
        change: -1.2,
        allocation: 12.5
      }
    ],
    transactions: [
      {
        type: "BUY",
        symbol: "BTC",
        amount: 0.1,
        price: 43250,
        date: "2024-01-15T10:30:00",
        value: 4325
      },
      {
        type: "SELL",
        symbol: "ETH",
        amount: 0.5,
        price: 2650,
        date: "2024-01-14T15:20:00", 
        value: 1325
      }
    ]
  };

  const pieData = portfolioData.holdings.map((holding, index) => ({
    name: holding.symbol,
    value: holding.allocation,
    color: index === 0 ? '#10b981' : '#3b82f6'
  }));

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="font-semibold"
      >
        {`${name}: ${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Summary with Enhanced Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect border-primary/20">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-primary mb-4">Total Portfolio Value</p>
            <p className="text-3xl font-bold text-primary">${portfolioData.totalValue.toLocaleString()}</p>
            <div className="mt-4">
              <RingProgress 
                value={75} 
                size={120} 
                label="Performance"
                color="#10b981"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20">
          <CardContent className="p-6">
            <p className="text-sm text-primary mb-4">24h Performance</p>
            <div className="space-y-4">
              <BarProgress 
                value={portfolioData.todayChangePercent > 0 ? 65 : 35} 
                label="Daily Change"
                height="h-4"
              />
              <div className="flex items-center justify-center">
                {portfolioData.todayChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-emerald-400 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                )}
                <span className={`text-lg font-bold ${portfolioData.todayChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {portfolioData.todayChange >= 0 ? '+' : ''}${portfolioData.todayChange.toFixed(2)} ({portfolioData.todayChangePercent >= 0 ? '+' : ''}{portfolioData.todayChangePercent}%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-primary mb-4">Risk Score</p>
            <RingProgress 
              value={68} 
              size={120} 
              label="Risk Level"
              color="#f59e0b"
            />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="glass-effect">
            <TabsTrigger value="holdings" className="data-[state=active]:bg-primary data-[state=active]:text-white">Holdings</TabsTrigger>
            <TabsTrigger value="allocation" className="data-[state=active]:bg-primary data-[state=active]:text-white">Allocation</TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-primary data-[state=active]:text-white">Transactions</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary hover:text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary hover:text-white">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <TabsContent value="holdings" className="space-y-6">
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Current Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.holdings.map((holding, index) => (
                  <div key={index} className="p-4 glass-effect rounded-lg hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{holding.symbol}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-primary">{holding.name}</p>
                          <p className="text-sm text-slate-300">{holding.amount} {holding.symbol}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-primary">${holding.value.toLocaleString()}</p>
                        <div className="flex items-center">
                          {holding.change >= 0 ? (
                            <TrendingUp className="h-3 w-3 text-emerald-400 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-400 mr-1" />
                          )}
                          <span className={`text-sm ${holding.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {holding.change >= 0 ? '+' : ''}{holding.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <BarProgress 
                        value={holding.allocation}
                        label={`Allocation: ${holding.allocation}%`}
                        height="h-3"
                        showValue={false}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Portfolio Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {portfolioData.holdings.map((holding, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-medium">{holding.symbol}</span>
                      <span className="text-primary font-bold">{holding.allocation}%</span>
                    </div>
                    <RingProgress 
                      value={holding.allocation} 
                      size={60}
                      strokeWidth={8}
                      showValue={false}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.transactions.map((transaction, index) => (
                  <div key={index} className="p-4 glass-effect rounded-lg hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant={transaction.type === "BUY" ? "default" : "destructive"}
                          className="w-12 justify-center"
                        >
                          {transaction.type}
                        </Badge>
                        <div>
                          <p className="font-semibold text-primary">{transaction.symbol}</p>
                          <p className="text-sm text-slate-300">
                            {transaction.amount} @ ${transaction.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-primary">${transaction.value.toLocaleString()}</p>
                        <p className="text-sm text-slate-300">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
