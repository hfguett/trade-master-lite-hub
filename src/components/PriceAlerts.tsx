
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  Plus, 
  Trash2, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export const PriceAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      symbol: "BTC/USDT",
      condition: "above",
      price: 45000,
      currentPrice: 43250,
      isActive: true,
      created: "2024-01-15"
    },
    {
      id: 2,
      symbol: "ETH/USDT",
      condition: "below",
      price: 2500,
      currentPrice: 2650,
      isActive: true,
      created: "2024-01-14"
    },
    {
      id: 3,
      symbol: "AAPL",
      condition: "above",
      price: 190,
      currentPrice: 185.40,
      isActive: false,
      created: "2024-01-13"
    }
  ]);

  const [newAlert, setNewAlert] = useState({
    symbol: "",
    condition: "above",
    price: ""
  });

  const addAlert = () => {
    if (newAlert.symbol && newAlert.price) {
      const alert = {
        id: Date.now(),
        symbol: newAlert.symbol,
        condition: newAlert.condition,
        price: parseFloat(newAlert.price),
        currentPrice: Math.random() * 1000 + 100, // Mock current price
        isActive: true,
        created: new Date().toISOString().split('T')[0]
      };
      setAlerts([...alerts, alert]);
      setNewAlert({ symbol: "", condition: "above", price: "" });
    }
  };

  const toggleAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Price Alerts</h1>
          <p className="text-slate-300">Set up notifications for price movements</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create Alert
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="symbol" className="text-primary">Symbol</Label>
              <Input
                id="symbol"
                value={newAlert.symbol}
                onChange={(e) => setNewAlert({...newAlert, symbol: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="BTC/USDT"
              />
            </div>

            <div>
              <Label htmlFor="condition" className="text-primary">Condition</Label>
              <Select value={newAlert.condition} onValueChange={(value) => setNewAlert({...newAlert, condition: value})}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="above">Price Above</SelectItem>
                  <SelectItem value="below">Price Below</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price" className="text-primary">Target Price</Label>
              <Input
                id="price"
                value={newAlert.price}
                onChange={(e) => setNewAlert({...newAlert, price: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="45000"
                type="number"
              />
            </div>

            <Button onClick={addAlert} className="w-full bg-primary hover:bg-primary/80 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Active Alerts ({alerts.filter(a => a.isActive).length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 glass-effect rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {alert.condition === "above" ? 
                          <TrendingUp className="h-4 w-4 text-green-400" /> : 
                          <TrendingDown className="h-4 w-4 text-red-400" />
                        }
                        <div>
                          <p className="font-semibold text-primary">{alert.symbol}</p>
                          <p className="text-sm text-slate-300">
                            Alert when price goes {alert.condition} ${alert.price}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-slate-300">Current</p>
                        <p className="font-mono text-primary">${alert.currentPrice.toFixed(2)}</p>
                      </div>
                      
                      <div>
                        {alert.isActive ? (
                          alert.condition === "above" && alert.currentPrice >= alert.price ? (
                            <Badge className="bg-green-500 text-white">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Triggered
                            </Badge>
                          ) : alert.condition === "below" && alert.currentPrice <= alert.price ? (
                            <Badge className="bg-green-500 text-white">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Triggered
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-primary text-primary">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Waiting
                            </Badge>
                          )
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={alert.isActive}
                        onCheckedChange={() => toggleAlert(alert.id)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteAlert(alert.id)}
                        className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {alerts.length === 0 && (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-300">No alerts created yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
