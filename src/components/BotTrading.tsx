
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bot, Play, Pause, Settings, TrendingUp, DollarSign } from "lucide-react";

export const BotTrading = () => {
  const bots = [
    {
      name: "Scalping Master",
      status: "active",
      profit: "+$1,247.32",
      trades: 156,
      winRate: 68.5,
      strategy: "High-frequency scalping on 1m timeframes"
    },
    {
      name: "Swing Trader Pro",
      status: "paused", 
      profit: "+$2,890.15",
      trades: 89,
      winRate: 74.2,
      strategy: "Medium-term swings on 4H/Daily charts"
    },
    {
      name: "DCA Bot",
      status: "active",
      profit: "+$567.89",
      trades: 45,
      winRate: 82.2,
      strategy: "Dollar-cost averaging with RSI signals"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-mint">Automated Trading Bots</h2>
          <p className="text-gray-400 mt-1">Manage your automated trading strategies</p>
        </div>
        <Button className="mint-button">
          <Bot className="h-4 w-4 mr-2" />
          Create New Bot
        </Button>
      </div>

      <div className="grid gap-6">
        {bots.map((bot, index) => (
          <Card key={index} className="glass-effect-strong border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bot className="h-5 w-5 text-mint" />
                  <div>
                    <CardTitle className="text-mint">{bot.name}</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">{bot.strategy}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={bot.status === "active" ? "default" : "secondary"}
                    className={bot.status === "active" ? "mint-button" : ""}
                  >
                    {bot.status === "active" ? "Active" : "Paused"}
                  </Badge>
                  <Switch 
                    checked={bot.status === "active"}
                    className="data-[state=checked]:bg-mint"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Total Profit</p>
                  <p className="text-xl font-bold text-mint">{bot.profit}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Total Trades</p>
                  <p className="text-xl font-bold text-gray-300">{bot.trades}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Win Rate</p>
                  <p className="text-xl font-bold text-mint">{bot.winRate}%</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Status</p>
                  <div className="flex items-center justify-center mt-1">
                    <div className={`h-2 w-2 rounded-full mr-2 ${
                      bot.status === "active" ? "bg-mint animate-pulse" : "bg-gray-500"
                    }`} />
                    <span className="text-sm text-gray-300 capitalize">{bot.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant={bot.status === "active" ? "outline" : "default"}
                  className={bot.status === "active" 
                    ? "border-red-500 text-red-400 hover:bg-red-500 hover:text-white" 
                    : "mint-button"
                  }
                >
                  {bot.status === "active" ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause Bot
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Bot
                    </>
                  )}
                </Button>
                <Button variant="outline" className="border-mint/50 text-mint hover:bg-mint hover:text-dark-blue">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                <Button variant="outline" className="border-mint/50 text-mint hover:bg-mint hover:text-dark-blue">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Performance
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
