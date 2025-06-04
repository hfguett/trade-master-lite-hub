
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Plus, Trash2, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Alert {
  id: string;
  symbol: string;
  condition: 'above' | 'below';
  price: number;
  currentPrice: number;
  isActive: boolean;
  triggered: boolean;
  created: string;
  type: 'price' | 'volume' | 'percentage';
}

interface AlertFormData {
  symbol: string;
  condition: 'above' | 'below';
  price: string;
  type: 'price' | 'volume' | 'percentage';
}

export const AlertSystem: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [formData, setFormData] = useState<AlertFormData>({
    symbol: '',
    condition: 'above',
    price: '',
    type: 'price'
  });
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  // Mock current prices for demo
  const mockPrices: Record<string, number> = {
    'BTC/USDT': 43250,
    'ETH/USDT': 2650,
    'AAPL': 185.40,
    'GOOGL': 142.80,
    'TSLA': 248.50
  };

  useEffect(() => {
    // Initialize with some mock alerts
    setAlerts([
      {
        id: '1',
        symbol: 'BTC/USDT',
        condition: 'above',
        price: 45000,
        currentPrice: 43250,
        isActive: true,
        triggered: false,
        created: new Date().toISOString(),
        type: 'price'
      },
      {
        id: '2',
        symbol: 'ETH/USDT',
        condition: 'below',
        price: 2500,
        currentPrice: 2650,
        isActive: true,
        triggered: false,
        created: new Date().toISOString(),
        type: 'price'
      }
    ]);
  }, []);

  useEffect(() => {
    // Check for triggered alerts
    const checkAlerts = () => {
      setAlerts(prevAlerts => 
        prevAlerts.map(alert => {
          if (!alert.isActive || alert.triggered) return alert;
          
          const currentPrice = mockPrices[alert.symbol] || alert.currentPrice;
          const shouldTrigger = 
            (alert.condition === 'above' && currentPrice >= alert.price) ||
            (alert.condition === 'below' && currentPrice <= alert.price);

          if (shouldTrigger && !alert.triggered) {
            toast({
              title: "Price Alert Triggered!",
              description: `${alert.symbol} is now ${alert.condition} $${alert.price}`,
              variant: "default",
            });
            return { ...alert, triggered: true, currentPrice };
          }

          return { ...alert, currentPrice };
        })
      );
    };

    const interval = setInterval(checkAlerts, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [toast]);

  const createAlert = () => {
    if (!formData.symbol || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newAlert: Alert = {
      id: Date.now().toString(),
      symbol: formData.symbol,
      condition: formData.condition,
      price: parseFloat(formData.price),
      currentPrice: mockPrices[formData.symbol] || 0,
      isActive: true,
      triggered: false,
      created: new Date().toISOString(),
      type: formData.type
    };

    setAlerts(prev => [...prev, newAlert]);
    setFormData({ symbol: '', condition: 'above', price: '', type: 'price' });
    setShowForm(false);

    toast({
      title: "Alert Created",
      description: `Alert set for ${newAlert.symbol}`,
      variant: "default",
    });
  };

  const toggleAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      )
    );
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    toast({
      title: "Alert Deleted",
      description: "Alert has been removed",
      variant: "default",
    });
  };

  const getAlertStatus = (alert: Alert) => {
    if (!alert.isActive) return { status: 'Inactive', color: 'bg-gray-500' };
    if (alert.triggered) return { status: 'Triggered', color: 'bg-green-500' };
    return { status: 'Active', color: 'bg-blue-500' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-white" />
          <h2 className="text-2xl font-bold text-white">Alert System</h2>
          <Badge variant="outline" className="border-green-400 text-green-400">
            {alerts.filter(a => a.isActive).length} Active
          </Badge>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Alert
        </Button>
      </div>

      {showForm && (
        <Card className="glass-effect border-green-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Create New Alert</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowForm(false)}
                className="text-white hover:bg-slate-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white">Symbol</label>
                <Select value={formData.symbol} onValueChange={(value) => setFormData({...formData, symbol: value})}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Select symbol" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(mockPrices).map(symbol => (
                      <SelectItem key={symbol} value={symbol}>{symbol}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-white">Alert Type</label>
                <Select value={formData.type} onValueChange={(value: 'price' | 'volume' | 'percentage') => setFormData({...formData, type: value})}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price Alert</SelectItem>
                    <SelectItem value="volume">Volume Alert</SelectItem>
                    <SelectItem value="percentage">Percentage Change</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white">Condition</label>
                <Select value={formData.condition} onValueChange={(value: 'above' | 'below') => setFormData({...formData, condition: value})}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="above">Above</SelectItem>
                    <SelectItem value="below">Below</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-white">Target Price</label>
                <Input
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>
            <Button onClick={createAlert} className="w-full bg-green-600 hover:bg-green-700 text-white">
              Create Alert
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {alerts.map((alert) => {
          const alertStatus = getAlertStatus(alert);
          return (
            <Card key={alert.id} className="glass-effect border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {alert.condition === 'above' ? 
                        <TrendingUp className="h-4 w-4 text-green-400" /> : 
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      }
                      <div>
                        <p className="font-semibold text-white">{alert.symbol}</p>
                        <p className="text-sm text-gray-400">
                          {alert.condition} ${alert.price} • {alert.type}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Current</p>
                      <p className="font-mono text-white">${alert.currentPrice}</p>
                    </div>
                    
                    <Badge className={`${alertStatus.color} text-white`}>
                      {alertStatus.status}
                    </Badge>
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
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
