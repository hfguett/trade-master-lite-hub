
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, TrendingDown, DollarSign } from "lucide-react";

export const RiskManagement = () => {
  const riskMetrics = {
    portfolioRisk: 7.2,
    maxDrawdown: 15.3,
    varDaily: 2.8,
    sharpeRatio: 1.47,
    exposureLimit: 75,
    currentExposure: 62
  };

  const riskAlerts = [
    {
      type: "warning",
      message: "Portfolio exposure exceeding 60% threshold",
      action: "Consider reducing position sizes"
    },
    {
      type: "info", 
      message: "BTC correlation risk increased to 85%",
      action: "Diversify into uncorrelated assets"
    },
    {
      type: "success",
      message: "Stop losses are properly configured",
      action: "No action required"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-mint">Risk Management</h2>
          <p className="text-gray-400 mt-1">Monitor and control your trading risks</p>
        </div>
        <Badge className="bg-mint text-dark-blue font-semibold">
          <Shield className="h-3 w-3 mr-1" />
          Risk Score: {riskMetrics.portfolioRisk}/10
        </Badge>
      </div>

      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect-strong border-mint/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-mint">Portfolio Risk</h3>
              <Shield className="h-5 w-5 text-mint" />
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Current Risk Level</span>
                  <span className="text-mint">{riskMetrics.portfolioRisk}/10</span>
                </div>
                <Progress value={riskMetrics.portfolioRisk * 10} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Max Drawdown</span>
                  <span className="text-red-400">{riskMetrics.maxDrawdown}%</span>
                </div>
                <Progress value={riskMetrics.maxDrawdown} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect-strong border-mint/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-mint">Exposure Limits</h3>
              <DollarSign className="h-5 w-5 text-mint" />
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Current Exposure</span>
                  <span className="text-mint">{riskMetrics.currentExposure}%</span>
                </div>
                <Progress value={riskMetrics.currentExposure} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Limit</span>
                  <span className="text-gray-300">{riskMetrics.exposureLimit}%</span>
                </div>
                <div className="text-xs text-gray-400">
                  {riskMetrics.exposureLimit - riskMetrics.currentExposure}% remaining capacity
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect-strong border-mint/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-mint">Performance Metrics</h3>
              <TrendingDown className="h-5 w-5 text-mint" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Daily VaR</span>
                <span className="text-mint font-semibold">{riskMetrics.varDaily}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Sharpe Ratio</span>
                <span className="text-mint font-semibold">{riskMetrics.sharpeRatio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Risk Score</span>
                <span className="text-mint font-semibold">{riskMetrics.portfolioRisk}/10</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Alerts */}
      <Card className="glass-effect-strong border-mint/20">
        <CardHeader>
          <CardTitle className="text-mint flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Risk Alerts & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskAlerts.map((alert, index) => (
              <div key={index} className="p-4 bg-darkest-blue/50 rounded-lg border-l-4 border-mint/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Badge 
                        variant={alert.type === "warning" ? "destructive" : 
                                alert.type === "success" ? "default" : "secondary"}
                        className={alert.type === "success" ? "mint-button" : ""}
                      >
                        {alert.type.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-1">{alert.message}</p>
                    <p className="text-sm text-gray-400">{alert.action}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-mint/50 text-mint hover:bg-mint hover:text-dark-blue ml-4"
                  >
                    Take Action
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
