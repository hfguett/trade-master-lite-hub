import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, RefreshCw, Search, Star, Zap, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";

export const MarketData = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1h");
  
  const marketData = [
    {
      symbol: "BTC/USDT",
      name: "Bitcoin",
      price: 43250.50,
      change: 2.35,
      changePercent: 5.72,
      volume: "2.1B",
      high24h: 44120.00,
      low24h: 41850.00
    },
    {
      symbol: "ETH/USDT", 
      name: "Ethereum",
      price: 2650.25,
      change: -32.15,
      changePercent: -1.20,
      volume: "1.8B",
      high24h: 2720.00,
      low24h: 2580.00
    },
    {
      symbol: "ADA/USDT",
      name: "Cardano", 
      price: 0.485,
      change: 0.012,
      changePercent: 2.53,
      volume: "245M",
      high24h: 0.492,
      low24h: 0.461
    },
    {
      symbol: "SOL/USDT",
      name: "Solana",
      price: 98.75,
      change: 4.22,
      changePercent: 4.47,
      volume: "890M",
      high24h: 102.30,
      low24h: 92.15
    }
  ];

  const economicEvents = [
    {
      time: "14:30",
      currency: "USD",
      event: "FOMC Meeting Minutes",
      impact: "high",
      forecast: "-",
      previous: "-"
    },
    {
      time: "16:00", 
      currency: "USD",
      event: "Consumer Confidence",
      impact: "medium",
      forecast: "106.0",
      previous: "104.5"
    },
    {
      time: "20:30",
      currency: "JPY",
      event: "Core CPI",
      impact: "high", 
      forecast: "3.2%",
      previous: "3.1%"
    }
  ];

  const newsItems = [
    {
      title: "Bitcoin Breaks Above $43K Resistance Level",
      source: "CryptoNews",
      time: "2 hours ago",
      category: "crypto"
    },
    {
      title: "Fed Officials Signal Potential Rate Cuts in 2024",
      source: "Reuters",
      time: "4 hours ago", 
      category: "forex"
    },
    {
      title: "Ethereum Network Upgrade Scheduled for Next Month",
      source: "CoinDesk",
      time: "6 hours ago",
      category: "crypto"
    }
  ];

  const liquidations = [
    {
      exchange: "Binance",
      symbol: "BTC/USDT",
      side: "long",
      amount: 1250000,
      price: 43180,
      timestamp: new Date(Date.now() - 1000 * 60 * 2)
    },
    {
      exchange: "Bybit",
      symbol: "ETH/USDT", 
      side: "short",
      amount: 890000,
      price: 2645,
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
      exchange: "OKX",
      symbol: "SOL/USDT",
      side: "long", 
      amount: 450000,
      price: 98.2,
      timestamp: new Date(Date.now() - 1000 * 60 * 8)
    }
  ];

  const orderBookData = {
    bids: [
      { price: 43245.50, amount: 2.5, total: 108113.75 },
      { price: 43240.00, amount: 1.8, total: 77832.00 },
      { price: 43235.25, amount: 3.2, total: 138352.80 },
      { price: 43230.10, amount: 0.9, total: 38907.09 },
      { price: 43225.75, amount: 4.1, total: 177225.58 }
    ],
    asks: [
      { price: 43250.75, amount: 1.6, total: 69201.20 },
      { price: 43255.25, amount: 2.3, total: 99487.08 },
      { price: 43260.00, amount: 1.9, total: 82194.00 },
      { price: 43265.50, amount: 3.4, total: 147102.70 },
      { price: 43270.25, amount: 2.1, total: 90867.53 }
    ]
  };

  const topExchanges = [
    { name: "Binance", volume: "15.2B", change: "+2.1%", pairs: 1200, status: "connected" },
    { name: "Coinbase", volume: "8.9B", change: "+1.8%", pairs: 180, status: "connected" },
    { name: "Kraken", volume: "2.1B", change: "-0.5%", pairs: 120, status: "connected" },
    { name: "Bybit", volume: "12.4B", change: "+3.2%", pairs: 800, status: "connected" },
    { name: "OKX", volume: "9.8B", change: "+1.9%", pairs: 600, status: "connected" },
    { name: "KuCoin", volume: "3.5B", change: "+0.8%", pairs: 450, status: "connected" },
    { name: "Huobi", volume: "2.8B", change: "-1.2%", pairs: 320, status: "connecting" },
    { name: "Gate.io", volume: "1.9B", change: "+2.5%", pairs: 280, status: "connected" }
  ];

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const timeframes = ["1m", "5m", "15m", "1h", "4h", "1d"];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="watchlist" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-slate-800">
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="orderbook">Order Book</TabsTrigger>
            <TabsTrigger value="liquidations">Liquidations</TabsTrigger>
            <TabsTrigger value="exchanges">Exchanges</TabsTrigger>
            <TabsTrigger value="calendar">Economic Calendar</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search symbols..." 
                className="pl-10 bg-slate-800 border-slate-600 w-64" 
              />
            </div>
            <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <TabsContent value="watchlist" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketData.map((asset, index) => (
                  <div key={index} className="p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="p-1 h-auto">
                          <Star className="h-4 w-4" />
                        </Button>
                        <div>
                          <p className="font-semibold text-lg">{asset.symbol}</p>
                          <p className="text-sm text-slate-400">{asset.name}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-mono text-lg font-semibold">
                          ${asset.price.toLocaleString()}
                        </p>
                        <div className="flex items-center justify-end">
                          {asset.change >= 0 ? (
                            <TrendingUp className="h-3 w-3 text-emerald-400 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-400 mr-1" />
                          )}
                          <span className={`text-sm ${asset.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)} ({asset.changePercent >= 0 ? '+' : ''}{asset.changePercent}%)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-slate-700">
                      <div>
                        <p className="text-xs text-slate-400">Volume</p>
                        <p className="text-sm font-mono">{asset.volume}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">24h High</p>
                        <p className="text-sm font-mono">${asset.high24h.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">24h Low</p>
                        <p className="text-sm font-mono">${asset.low24h.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>BTC/USDT Chart</CardTitle>
                <div className="flex gap-2">
                  {timeframes.map((tf) => (
                    <Button
                      key={tf}
                      variant={selectedTimeframe === tf ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTimeframe(tf)}
                      className={selectedTimeframe === tf ? "bg-emerald-600" : "border-slate-600"}
                    >
                      {tf}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-slate-900/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-slate-400 mb-2">Candlestick chart for {selectedTimeframe} timeframe</p>
                  <p className="text-sm text-slate-500">Real-time chart integration coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orderbook" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="gradient-text">Order Book - BTC/USDT</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Asks */}
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-3">Asks (Sell Orders)</h4>
                  <div className="space-y-1">
                    {orderBookData.asks.reverse().map((ask, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 p-2 hover:bg-red-500/10 transition-colors text-sm font-mono">
                        <span className="text-red-400">${ask.price.toLocaleString()}</span>
                        <span className="text-right">{ask.amount}</span>
                        <span className="text-right text-muted-foreground">${ask.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bids */}
                <div>
                  <h4 className="text-sm font-semibold text-mint mb-3">Bids (Buy Orders)</h4>
                  <div className="space-y-1">
                    {orderBookData.bids.map((bid, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 p-2 hover:bg-mint/10 transition-colors text-sm font-mono">
                        <span className="text-mint">${bid.price.toLocaleString()}</span>
                        <span className="text-right">{bid.amount}</span>
                        <span className="text-right text-muted-foreground">${bid.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="liquidations" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Zap className="h-5 w-5" />
                Live Liquidations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liquidations.map((liq, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-dark-blue/30 rounded-lg hover:bg-dark-blue/50 transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded ${liq.side === 'long' ? 'bg-red-500/20' : 'bg-mint/20'}`}>
                          {liq.side === 'long' ? 
                            <TrendingDown className="h-4 w-4 text-red-400" /> : 
                            <TrendingUp className="h-4 w-4 text-mint" />
                          }
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{liq.symbol}</span>
                            <Badge variant="outline" className="text-xs">
                              {liq.exchange}
                            </Badge>
                            <Badge 
                              variant={liq.side === 'long' ? 'destructive' : 'default'}
                              className={liq.side === 'short' ? 'bg-mint text-dark-blue' : ''}
                            >
                              {liq.side.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Liquidated at ${liq.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-400 font-mono text-lg">
                          ${liq.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimeAgo(liq.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exchanges" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="gradient-text">Top 20 Exchanges by Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topExchanges.map((exchange, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-dark-blue/30 rounded-lg hover:bg-dark-blue/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{exchange.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          exchange.status === 'connected' ? 'bg-mint animate-pulse' : 
                          exchange.status === 'connecting' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
                        }`} />
                        <span className="text-xs text-muted-foreground capitalize">
                          {exchange.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">24h Volume</span>
                        <span className="font-mono font-semibold">{exchange.volume}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Change</span>
                        <span className={`font-mono ${exchange.change.startsWith('+') ? 'text-mint' : 'text-red-400'}`}>
                          {exchange.change}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Trading Pairs</span>
                        <span className="font-mono">{exchange.pairs}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Economic Calendar - Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {economicEvents.map((event, index) => (
                  <div key={index} className="p-4 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="font-mono text-sm">{event.time}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {event.currency}
                          </Badge>
                        </div>
                        <div>
                          <p className="font-semibold">{event.event}</p>
                          <Badge 
                            variant={
                              event.impact === 'high' ? 'destructive' :
                              event.impact === 'medium' ? 'default' : 'secondary'
                            }
                            className="text-xs mt-1"
                          >
                            {event.impact} impact
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-slate-400">Forecast</p>
                            <p className="font-mono">{event.forecast}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Previous</p>
                            <p className="font-mono">{event.previous}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Market News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newsItems.map((news, index) => (
                  <div key={index} className="p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 hover:text-emerald-400 transition-colors">
                          {news.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <span>{news.source}</span>
                          <span>•</span>
                          <span>{news.time}</span>
                          <Badge variant="outline" className="text-xs">
                            {news.category}
                          </Badge>
                        </div>
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
