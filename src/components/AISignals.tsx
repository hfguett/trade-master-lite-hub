
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, TrendingDown, Zap, Target } from "lucide-react";

export const AISignals = () => {
  const signals = [
    {
      symbol: "BTC/USDT",
      action: "BUY",
      confidence: 87,
      price: "$43,250",
      target: "$45,800",
      stopLoss: "$41,200",
      timeframe: "4H",
      reason: "Strong momentum breakout pattern detected"
    },
    {
      symbol: "ETH/USDT", 
      action: "SELL",
      confidence: 72,
      price: "$2,650",
      target: "$2,450",
      stopLoss: "$2,750",
      timeframe: "1H",
      reason: "Bearish divergence on RSI indicator"
    },
    {
      symbol: "AAPL",
      action: "BUY",
      confidence: 94,
      price: "$185.40",
      target: "$195.00",
      stopLoss: "$180.00", 
      timeframe: "Daily",
      reason: "Golden cross formation with high volume"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-mint">AI Trading Signals</h2>
          <p className="text-gray-400 mt-1">Advanced machine learning powered trade recommendations</p>
        </div>
        <Badge className="bg-mint text-dark-blue font-semibold">
          <Brain className="h-3 w-3 mr-1" />
          AI Active
        </Badge>
      </div>

      <div className="grid gap-4">
        {signals.map((signal, index) => (
          <Card key={index} className="glass-effect-strong border-mint/20 hover-mint-border transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={signal.action === "BUY" ? "default" : "destructive"}
                    className={`w-16 justify-center ${signal.action === "BUY" ? "mint-button" : ""}`}
                  >
                    {signal.action}
                  </Badge>
                  <div>
                    <h3 className="font-semibold text-lg text-mint">{signal.symbol}</h3>
                    <p className="text-sm text-gray-400">{signal.timeframe} • Confidence: {signal.confidence}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    <Zap className="h-4 w-4 text-mint mr-1" />
                    <span className="text-mint font-semibold">{signal.confidence}%</span>
                  </div>
                  <div className="w-20 bg-darkest-blue rounded-full h-2">
                    <div 
                      className="bg-mint h-2 rounded-full transition-all duration-500"
                      style={{ width: `${signal.confidence}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-xs">Entry Price</p>
                  <p className="font-mono font-semibold text-mint">{signal.price}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Target</p>
                  <p className="font-mono font-semibold text-green-400">{signal.target}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Stop Loss</p>
                  <p className="font-mono font-semibold text-red-400">{signal.stopLoss}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Risk/Reward</p>
                  <p className="font-mono font-semibold text-mint">1:2.5</p>
                </div>
              </div>

              <div className="bg-darkest-blue/50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-300">{signal.reason}</p>
              </div>

              <div className="flex gap-3">
                <Button className="mint-button flex-1">
                  <Target className="h-4 w-4 mr-2" />
                  Execute Trade
                </Button>
                <Button variant="outline" className="border-mint/50 text-mint hover:bg-mint hover:text-dark-blue">
                  Add to Watchlist
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
