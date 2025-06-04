
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

export const PositionCalculator = () => {
  const [accountBalance, setAccountBalance] = useState("10000");
  const [riskPercentage, setRiskPercentage] = useState("2");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [tradeType, setTradeType] = useState("long");

  const calculatePosition = () => {
    const balance = parseFloat(accountBalance);
    const risk = parseFloat(riskPercentage) / 100;
    const entry = parseFloat(entryPrice);
    const stop = parseFloat(stopLoss);
    
    if (!balance || !risk || !entry || !stop) return null;
    
    const riskAmount = balance * risk;
    const stopDistance = Math.abs(entry - stop);
    const positionSize = riskAmount / stopDistance;
    const shares = Math.floor(positionSize / entry);
    
    return {
      riskAmount,
      positionSize,
      shares,
      totalInvestment: shares * entry
    };
  };

  const calculation = calculatePosition();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Position Calculator</h1>
          <p className="text-slate-300">Calculate optimal position sizes based on risk management</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Position Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="balance" className="text-primary">Account Balance ($)</Label>
              <Input
                id="balance"
                value={accountBalance}
                onChange={(e) => setAccountBalance(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="10000"
              />
            </div>

            <div>
              <Label htmlFor="risk" className="text-primary">Risk Per Trade (%)</Label>
              <Input
                id="risk"
                value={riskPercentage}
                onChange={(e) => setRiskPercentage(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="2"
              />
            </div>

            <div>
              <Label htmlFor="type" className="text-primary">Trade Type</Label>
              <Select value={tradeType} onValueChange={setTradeType}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long">Long Position</SelectItem>
                  <SelectItem value="short">Short Position</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="entry" className="text-primary">Entry Price ($)</Label>
              <Input
                id="entry"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="45.50"
              />
            </div>

            <div>
              <Label htmlFor="stop" className="text-primary">Stop Loss ($)</Label>
              <Input
                id="stop"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="43.00"
              />
            </div>

            <div>
              <Label htmlFor="target" className="text-primary">Take Profit ($)</Label>
              <Input
                id="target"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="50.00"
              />
            </div>

            <Button className="w-full bg-primary hover:bg-primary/80 text-white">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Position
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Calculation Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {calculation ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 glass-effect rounded-lg text-center">
                      <p className="text-sm text-primary mb-2">Risk Amount</p>
                      <p className="text-xl font-bold text-red-400">${calculation.riskAmount.toFixed(2)}</p>
                    </div>
                    <div className="p-4 glass-effect rounded-lg text-center">
                      <p className="text-sm text-primary mb-2">Position Size</p>
                      <p className="text-xl font-bold text-primary">${calculation.positionSize.toFixed(2)}</p>
                    </div>
                    <div className="p-4 glass-effect rounded-lg text-center">
                      <p className="text-sm text-primary mb-2">Shares/Units</p>
                      <p className="text-xl font-bold text-green-400">{calculation.shares}</p>
                    </div>
                    <div className="p-4 glass-effect rounded-lg text-center">
                      <p className="text-sm text-primary mb-2">Total Investment</p>
                      <p className="text-xl font-bold text-primary">${calculation.totalInvestment.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="p-4 glass-effect rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-primary font-medium">Risk-Reward Analysis</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      {takeProfit && (
                        <div className="flex justify-between">
                          <span>Potential Profit:</span>
                          <span className="text-green-400 font-mono">
                            ${((parseFloat(takeProfit) - parseFloat(entryPrice || "0")) * calculation.shares).toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Potential Loss:</span>
                        <span className="text-red-400 font-mono">-${calculation.riskAmount.toFixed(2)}</span>
                      </div>
                      {takeProfit && (
                        <div className="flex justify-between">
                          <span>Risk/Reward Ratio:</span>
                          <span className="text-primary font-mono">
                            1:{((parseFloat(takeProfit) - parseFloat(entryPrice || "0")) / Math.abs(parseFloat(entryPrice || "0") - parseFloat(stopLoss || "0"))).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <p className="text-slate-300">Enter all required values to calculate position size</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Risk Management Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="border-green-400 text-green-400 mt-1">1</Badge>
                  <p className="text-sm">Never risk more than 1-2% of your account on a single trade</p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="border-blue-400 text-blue-400 mt-1">2</Badge>
                  <p className="text-sm">Always set stop-loss orders before entering a position</p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="border-purple-400 text-purple-400 mt-1">3</Badge>
                  <p className="text-sm">Aim for risk-reward ratios of at least 1:2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
