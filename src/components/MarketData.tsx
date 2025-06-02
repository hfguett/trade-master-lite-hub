import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, RefreshCw, Search, Star, Zap, AlertTriangle, Activity, DollarSign, BarChart3, Globe, Clock, Wifi, WifiOff, Target } from "lucide-react";
import { Input } from "@/components/ui/input";

export const MarketData = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1h");
  const [connectionStatus, setConnectionStatus] = useState("connected");
  const [marketSentiment, setMarketSentiment] = useState(72);
  
  const marketData = [
    {
      symbol: "BTC/USDT",
      name: "Bitcoin",
      price: 43250.50,
      change: 2.35,
      changePercent: 5.72,
      volume: "2.1B",
      high24h: 44120.00,
      low24h: 41850.00,
      marketCap: "847.2B",
      dominance: "42.3%",
      fear_greed: 74
    },
    {
      symbol: "ETH/USDT", 
      name: "Ethereum",
      price: 2650.25,
      change: -32.15,
      changePercent: -1.20,
      volume: "1.8B",
      high24h: 2720.00,
      low24h: 2580.00,
      marketCap: "318.7B",
      dominance: "18.2%",
      fear_greed: 68
    },
    {
      symbol: "SOL/USDT",
      name: "Solana",
      price: 98.75,
      change: 4.22,
      changePercent: 4.47,
      volume: "890M",
      high24h: 102.30,
      low24h: 92.15,
      marketCap: "45.8B",
      dominance: "2.1%",
      fear_greed: 81
    },
    {
      symbol: "ADA/USDT",
      name: "Cardano", 
      price: 0.485,
      change: 0.012,
      changePercent: 2.53,
      volume: "245M",
      high24h: 0.492,
      low24h: 0.461,
      marketCap: "17.2B",
      dominance: "0.8%",
      fear_greed: 65
    }
  ];

  const heatmapData = [
    { name: "DeFi", change: 12.4, size: 340 },
    { name: "Gaming", change: -8.2, size: 180 },
    { name: "NFTs", change: 5.7, size: 120 },
    { name: "Layer 1", change: 15.3, size: 890 },
    { name: "Layer 2", change: 8.9, size: 245 },
    { name: "Meme", change: -15.6, size: 67 },
    { name: "AI Tokens", change: 28.4, size: 156 },
    { name: "RWA", change: 11.2, size: 89 }
  ];

  const topMovers = [
    { symbol: "RNDR", change: 45.2, price: 12.34, volume: "234M" },
    { symbol: "OCEAN", change: 38.7, price: 0.89, volume: "156M" },
    { symbol: "FET", change: 32.1, price: 2.45, volume: "198M" },
    { symbol: "AGIX", change: -28.4, price: 0.67, volume: "123M" },
    { symbol: "SAND", change: -22.1, price: 0.78, volume: "89M" }
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

  const dexMetrics = [
    { name: "Uniswap V3", volume: "2.8B", fees: "8.4M", pairs: 12450 },
    { name: "PancakeSwap", volume: "1.2B", fees: "3.6M", pairs: 8930 },
    { name: "SushiSwap", volume: "450M", fees: "1.3M", pairs: 5670 },
    { name: "Curve", volume: "890M", fees: "2.1M", pairs: 890 }
  ];

  const onChainMetrics = [
    { metric: "Active Addresses", value: "1.2M", change: "+8.4%" },
    { metric: "Transaction Count", value: "890K", change: "+12.7%" },
    { metric: "Gas Price (Gwei)", value: "45", change: "-15.2%" },
    { metric: "ETH Burned", value: "12.4K", change: "+5.3%" }
  ];

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const timeframes = ["1m", "5m", "15m", "1h", "4h", "1d"];

  useEffect(() => {
    // Simulate connection status changes
    const interval = setInterval(() => {
      setConnectionStatus(Math.random() > 0.95 ? "reconnecting" : "connected");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {connectionStatus === "connected" ? (
              <Wifi className="h-5 w-5 text-mint" />
            ) : (
              <WifiOff className="h-5 w-5 text-yellow-400" />
            )}
            <span className="text-sm text-muted-foreground capitalize">
              {connectionStatus}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-mint" />
            <span className="text-sm">Market Sentiment: </span> 
            <Badge variant={marketSentiment > 50 ? "default" : "destructive"} className="mint-button text-xs">
              {marketSentiment}% {marketSentiment > 50 ? "Bullish" : "Bearish"}
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search symbols..." 
              className="pl-10 bg-darkest-blue border-mint/30 w-64 glass-effect" 
            />
          </div>
          <Button className="mint-button">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-darkest-blue border border-mint/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-mint data-[state=active]:text-darkest-blue">Overview</TabsTrigger>
          <TabsTrigger value="watchlist" className="data-[state=active]:bg-mint data-[state=active]:text-darkest-blue">Watchlist</TabsTrigger>
          <TabsTrigger value="heatmap" className="data-[state=active]:bg-mint data-[state=active]:text-darkest-blue">Heatmap</TabsTrigger>
          <TabsTrigger value="defi" className="data-[state=active]:bg-mint data-[state=active]:text-darkest-blue">DeFi</TabsTrigger>
          <TabsTrigger value="onchain" className="data-[state=active]:bg-mint data-[state=active]:text-darkest-blue">On-Chain</TabsTrigger>
          <TabsTrigger value="orderbook" className="data-[state=active]:bg-mint data-[state=active]:text-darkest-blue">Order Book</TabsTrigger>
          <TabsTrigger value="liquidations" className="data-[state=active]:bg-mint data-[state=active]:text-darkest-blue">Liquidations</TabsTrigger>
          <TabsTrigger value="news" className="data-[state=active]:bg-mint data-[state=active]:text-darkest-blue">News</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-effect-strong border-mint/20 hover-mint-border transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-mint" />
                    <span className="text-sm text-muted-foreground">Total Market Cap</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-mint">$2.1T</p>
                <p className="text-sm text-mint/70">+2.4% (24h)</p>
              </CardContent>
            </Card>

            <Card className="glass-effect-strong border-mint/20 hover-mint-border transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-mint" />
                    <span className="text-sm text-muted-foreground">24h Volume</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-mint">$89.7B</p>
                <p className="text-sm text-mint/70">+12.8% (24h)</p>
              </CardContent>
            </Card>

            <Card className="glass-effect-strong border-mint/20 hover-mint-border transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-mint" />
                    <span className="text-sm text-muted-foreground">BTC Dominance</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-mint">42.3%</p>
                <p className="text-sm text-mint/70">-0.8% (24h)</p>
              </CardContent>
            </Card>

            <Card className="glass-effect-strong border-mint/20 hover-mint-border transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-mint" />
                    <span className="text-sm text-muted-foreground">Fear & Greed</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-mint">74</p>
                <p className="text-sm matrix-text">Extreme Greed</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-effect-strong border-mint/20 hover-mint-border transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-mint">Top Movers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topMovers.map((mover, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-darkest-blue/50 rounded-lg">
                      <div>
                        <p className="font-semibold text-mint">{mover.symbol}</p>
                        <p className="text-sm text-muted-foreground font-mono">${mover.price}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          {mover.change >= 0 ? (
                            <TrendingUp className="h-3 w-3 text-mint" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-400" />
                          )}
                          <span className={`font-mono ${mover.change >= 0 ? 'text-mint' : 'text-red-400'}`}>
                            {mover.change >= 0 ? '+' : ''}{mover.change}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Vol: {mover.volume}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect-strong border-mint/20 hover-mint-border transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-mint">On-Chain Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {onChainMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-darkest-blue/50 rounded-lg">
                      <span className="text-muted-foreground">{metric.metric}</span>
                      <div className="text-right">
                        <p className="font-mono text-mint">{metric.value}</p>
                        <p className={`text-xs ${metric.change.startsWith('+') ? 'text-mint' : 'text-red-400'}`}>
                          {metric.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-6">
          <Card className="glass-effect-strong border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-mint">Sector Performance Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {heatmapData.map((sector, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-lg transition-all duration-300 hover:scale-105 ${
                      sector.change >= 0 ? 'bg-mint/20 border border-mint/40' : 'bg-red-500/20 border border-red-500/40'
                    }`}
                    style={{ 
                      minHeight: `${100 + (sector.size / 10)}px`,
                      backgroundSize: '20px 20px',
                      backgroundImage: sector.change >= 0 
                        ? 'linear-gradient(45deg, rgba(74, 222, 128, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(74, 222, 128, 0.1) 25%, transparent 25%)'
                        : 'linear-gradient(45deg, rgba(239, 68, 68, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(239, 68, 68, 0.1) 25%, transparent 25%)'
                    }}
                  >
                    <h3 className="font-semibold text-mint mb-2">{sector.name}</h3>
                    <p className={`text-2xl font-bold ${sector.change >= 0 ? 'text-mint' : 'text-red-400'}`}>
                      {sector.change >= 0 ? '+' : ''}{sector.change}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ${sector.size}B MCap
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="defi" className="space-y-6">
          <Card className="glass-effect-strong border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-mint">DEX Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dexMetrics.map((dex, index) => (
                  <div key={index} className="p-4 bg-darkest-blue/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-mint">{dex.name}</h4>
                      <Badge className="mint-button text-xs">Active</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">24h Volume</p>
                        <p className="font-mono text-mint">{dex.volume}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">24h Fees</p>
                        <p className="font-mono text-mint">{dex.fees}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Pairs</p>
                        <p className="font-mono text-mint">{dex.pairs}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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

        <TabsContent value="orderbook" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-mint">Order Book - BTC/USDT</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Asks */}
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-3">Asks (Sell Orders)</h4>
                  <div className="space-y-1">
                    {liquidations.map((ask, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 p-2 hover:bg-red-500/10 transition-colors text-sm font-mono">
                        <span className="text-red-400">${ask.price.toLocaleString()}</span>
                        <span className="text-right">{ask.amount}</span>
                        <span className="text-right text-muted-foreground">${ask.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bids */}
                <div>
                  <h4 className="text-sm font-semibold text-mint mb-3">Bids (Buy Orders)</h4>
                  <div className="space-y-1">
                    {liquidations.map((bid, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 p-2 hover:bg-mint/10 transition-colors text-sm font-mono">
                        <span className="text-mint">${bid.price.toLocaleString()}</span>
                        <span className="text-right">{bid.amount}</span>
                        <span className="text-right text-muted-foreground">${bid.price.toLocaleString()}</span>
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
