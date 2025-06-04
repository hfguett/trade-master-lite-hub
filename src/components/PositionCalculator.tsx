
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";

export const PositionCalculator = () => {
  const [accountBalance, setAccountBalance] = useState("10000");
  const [riskPercentage, setRiskPercentage] = useState("2");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [leverage, setLeverage] = useState("1");

  const calculatePosition = () => {
    const balance = parseFloat(accountBalance);
    const risk = parseFloat(riskPercentage) / 100;
    const entry = parseFloat(entryPrice);
    const stop = parseFloat(stopLoss);
    
    if (balance && risk && entry && stop) {
      const riskAmount = balance * risk;
      const stopDistance = Math.abs(entry - stop);
      const positionSize = riskAmount / stopDistance;
      
      return {
        positionSize: positionSize.toFixed(4),
        riskAmount: riskAmount.toFixed(2),
        riskRewardRatio: takeProfit ? ((Math.abs(parseFloat(takeProfit) - entry)) / stopDistance).toFixed(2) : "0"
      };
    }
    return null;
  };

  const result = calculatePosition();

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Position Size Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="balance" className="text-white">Account Balance ($)</Label>
              <Input
                id="balance"
                value={accountBalance}
                onChange={(e) => setAccountBalance(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="10000"
                type="number"
              />
            </div>

            <div>
              <Label htmlFor="risk" className="text-white">Risk Percentage (%)</Label>
              <Input
                id="risk"
                value={riskPercentage}
                onChange={(e) => setRiskPercentage(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="2"
                type="number"
                step="0.1"
              />
            </div>

            <div>
              <Label htmlFor="entry" className="text-white">Entry Price ($)</Label>
              <Input
                id="entry"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="43250"
                type="number"
                step="0.01"
              />
            </div>

            <div>
              <Label htmlFor="stop" className="text-white">Stop Loss ($)</Label>
              <Input
                id="stop"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="42800"
                type="number"
                step="0.01"
              />
            </div>

            <div>
              <Label htmlFor="target" className="text-white">Take Profit ($)</Label>
              <Input
                id="target"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="44150"
                type="number"
                step="0.01"
              />
            </div>

            <div>
              <Label htmlFor="leverage" className="text-white">Leverage</Label>
              <Select value={leverage} onValueChange={setLeverage}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1x (Spot)</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                  <SelectItem value="5">5x</SelectItem>
                  <SelectItem value="10">10x</SelectItem>
                  <SelectItem value="20">20x</SelectItem>
                  <SelectItem value="50">50x</SelectItem>
                  <SelectItem value="100">100x</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Calculation Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {result ? (
              <>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 glass-effect rounded-lg text-center">
                    <p className="text-sm text-white/70 mb-2">Position Size</p>
                    <p className="text-2xl font-bold text-green-400">{result.positionSize}</p>
                    <p className="text-xs text-white/50">Units/Shares</p>
                  </div>
                  
                  <div className="p-4 glass-effect rounded-lg text-center">
                    <p className="text-sm text-white/70 mb-2">Risk Amount</p>
                    <p className="text-2xl font-bold text-red-400">${result.riskAmount}</p>
                    <p className="text-xs text-white/50">Maximum Loss</p>
                  </div>
                  
                  <div className="p-4 glass-effect rounded-lg text-center">
                    <p className="text-sm text-white/70 mb-2">Risk:Reward Ratio</p>
                    <p className="text-2xl font-bold text-blue-400">1:{result.riskRewardRatio}</p>
                    <Badge variant={parseFloat(result.riskRewardRatio) >= 2 ? "default" : "destructive"} className="mt-2">
                      {parseFloat(result.riskRewardRatio) >= 2 ? "Good" : "Poor"} R:R
                    </Badge>
                  </div>
                </div>

                <div className="p-4 glass-effect rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-semibold text-white">Risk Analysis</span>
                  </div>
                  <div className="space-y-2 text-sm text-white/70">
                    <p>• Risking {riskPercentage}% of account balance</p>
                    <p>• Position value: ${(parseFloat(result.positionSize) * parseFloat(entryPrice || "0")).toFixed(2)}</p>
                    <p>• Leverage: {leverage}x</p>
                    {parseFloat(result.riskRewardRatio) < 2 && (
                      <p className="text-red-400">⚠ Consider improving risk:reward ratio</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Calculator className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/70">Enter values to calculate position size</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-white">Quick Position Presets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col bg-green-600 hover:bg-green-700 text-white border-green-500"
              onClick={() => setRiskPercentage("1")}
            >
              <span className="text-lg font-bold">1%</span>
              <span className="text-xs">Conservative</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
              onClick={() => setRiskPercentage("2")}
            >
              <span className="text-lg font-bold">2%</span>
              <span className="text-xs">Moderate</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col bg-orange-600 hover:bg-orange-700 text-white border-orange-500"
              onClick={() => setRiskPercentage("3")}
            >
              <span className="text-lg font-bold">3%</span>
              <span className="text-xs">Aggressive</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col bg-red-600 hover:bg-red-700 text-white border-red-500"
              onClick={() => setRiskPercentage("5")}
            >
              <span className="text-lg font-bold">5%</span>
              <span className="text-xs">High Risk</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
