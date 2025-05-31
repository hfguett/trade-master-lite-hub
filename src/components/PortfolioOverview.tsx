
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, RefreshCw, Settings } from "lucide-react";

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

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-1">Total Portfolio Value</p>
              <p className="text-3xl font-bold">${portfolioData.totalValue.toLocaleString()}</p>
              <div className="flex items-center justify-center mt-2">
                {portfolioData.todayChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-emerald-400 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                )}
                <span className={`text-sm ${portfolioData.todayChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {portfolioData.todayChange >= 0 ? '+' : ''}${portfolioData.todayChange.toFixed(2)} ({portfolioData.todayChangePercent >= 0 ? '+' : ''}{portfolioData.todayChangePercent}%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-1">24h Performance</p>
              <p className="text-2xl font-bold text-emerald-400">+2.1%</p>
              <p className="text-sm text-slate-400 mt-1">vs Market: +0.8%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-1">Risk Score</p>
              <p className="text-2xl font-bold text-yellow-400">6.8</p>
              <p className="text-sm text-slate-400 mt-1">Moderate Risk</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-slate-800">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-slate-600">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <TabsContent value="holdings" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Current Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.holdings.map((holding, index) => (
                  <div key={index} className="p-4 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{holding.symbol}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{holding.name}</p>
                          <p className="text-sm text-slate-400">{holding.amount} {holding.symbol}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold">${holding.value.toLocaleString()}</p>
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
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Allocation</span>
                        <span>{holding.allocation}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${holding.allocation}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
                  <p className="text-slate-400">Pie chart visualization</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">High Risk</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }} />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Medium Risk</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Low Risk</span>
                    <span>15%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.transactions.map((transaction, index) => (
                  <div key={index} className="p-4 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant={transaction.type === "BUY" ? "default" : "destructive"}
                          className="w-12 justify-center"
                        >
                          {transaction.type}
                        </Badge>
                        <div>
                          <p className="font-semibold">{transaction.symbol}</p>
                          <p className="text-sm text-slate-400">
                            {transaction.amount} @ ${transaction.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold">${transaction.value.toLocaleString()}</p>
                        <p className="text-sm text-slate-400">
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

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
                <p className="text-slate-400">Performance chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
