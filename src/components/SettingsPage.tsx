
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Zap,
  Database,
  Key,
  Download,
  Trash2
} from 'lucide-react';

export const SettingsPage = () => {
  const [settings, setSettings] = useState({
    // Notifications
    tradeAlerts: true,
    whaleAlerts: true,
    goalReminders: true,
    marketUpdates: false,
    emailNotifications: true,
    pushNotifications: true,
    
    // Trading
    defaultRiskPercentage: 2,
    autoStopLoss: true,
    confirmTrades: true,
    paperTrading: false,
    
    // Display
    theme: 'dark',
    currency: 'USD',
    timezone: 'auto',
    chartType: 'candlestick',
    
    // Privacy
    shareProfile: false,
    analyticsTracking: true,
    dataRetention: '1year'
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text mb-2">Settings</h2>
          <p className="text-muted-foreground">Customize your TradeMaster Lite experience</p>
        </div>
        <Button className="bg-mint hover:bg-mint/80 text-dark-blue">
          <Download className="h-4 w-4 mr-2" />
          Export Settings
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="bg-slate-800">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="api">API & Data</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-mint">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="trade-alerts" className="text-base font-medium">Trade Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when trades are executed</p>
                  </div>
                  <Switch 
                    id="trade-alerts"
                    checked={settings.tradeAlerts}
                    onCheckedChange={(checked) => updateSetting('tradeAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="whale-alerts" className="text-base font-medium">Whale Movement Alerts</Label>
                    <p className="text-sm text-muted-foreground">Large transaction notifications</p>
                  </div>
                  <Switch 
                    id="whale-alerts"
                    checked={settings.whaleAlerts}
                    onCheckedChange={(checked) => updateSetting('whaleAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="goal-reminders" className="text-base font-medium">Goal Reminders</Label>
                    <p className="text-sm text-muted-foreground">Daily and weekly goal progress updates</p>
                  </div>
                  <Switch 
                    id="goal-reminders"
                    checked={settings.goalReminders}
                    onCheckedChange={(checked) => updateSetting('goalReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="market-updates" className="text-base font-medium">Market Updates</Label>
                    <p className="text-sm text-muted-foreground">Breaking market news and analysis</p>
                  </div>
                  <Switch 
                    id="market-updates"
                    checked={settings.marketUpdates}
                    onCheckedChange={(checked) => updateSetting('marketUpdates', checked)}
                  />
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h4 className="font-medium mb-4">Delivery Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                    <Switch 
                      id="email-notifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
                    <Switch 
                      id="push-notifications"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-mint">
                <Zap className="h-5 w-5" />
                Trading Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="risk-percentage" className="text-base font-medium">Default Risk Percentage</Label>
                  <p className="text-sm text-muted-foreground mb-2">Maximum risk per trade</p>
                  <Input
                    id="risk-percentage"
                    type="number"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={settings.defaultRiskPercentage}
                    onChange={(e) => updateSetting('defaultRiskPercentage', parseFloat(e.target.value))}
                    className="bg-slate-800 border-slate-600"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">Chart Default</Label>
                  <p className="text-sm text-muted-foreground mb-2">Preferred chart type</p>
                  <Select value={settings.chartType} onValueChange={(value) => updateSetting('chartType', value)}>
                    <SelectTrigger className="bg-slate-800 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candlestick">Candlestick</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="area">Area Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-stop-loss" className="text-base font-medium">Auto Stop Loss</Label>
                    <p className="text-sm text-muted-foreground">Automatically set stop loss based on risk %</p>
                  </div>
                  <Switch 
                    id="auto-stop-loss"
                    checked={settings.autoStopLoss}
                    onCheckedChange={(checked) => updateSetting('autoStopLoss', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="confirm-trades" className="text-base font-medium">Confirm Trades</Label>
                    <p className="text-sm text-muted-foreground">Show confirmation dialog before executing trades</p>
                  </div>
                  <Switch 
                    id="confirm-trades"
                    checked={settings.confirmTrades}
                    onCheckedChange={(checked) => updateSetting('confirmTrades', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="paper-trading" className="text-base font-medium">Paper Trading Mode</Label>
                    <p className="text-sm text-muted-foreground">Practice trading without real money</p>
                  </div>
                  <Switch 
                    id="paper-trading"
                    checked={settings.paperTrading}
                    onCheckedChange={(checked) => updateSetting('paperTrading', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-mint">
                <Palette className="h-5 w-5" />
                Display Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-medium">Theme</Label>
                  <p className="text-sm text-muted-foreground mb-2">Choose your preferred theme</p>
                  <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                    <SelectTrigger className="bg-slate-800 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">Currency</Label>
                  <p className="text-sm text-muted-foreground mb-2">Default display currency</p>
                  <Select value={settings.currency} onValueChange={(value) => updateSetting('currency', value)}>
                    <SelectTrigger className="bg-slate-800 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">Timezone</Label>
                  <p className="text-sm text-muted-foreground mb-2">Display timezone for market hours</p>
                  <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                    <SelectTrigger className="bg-slate-800 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto Detect</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                      <SelectItem value="JST">Japan Standard Time</SelectItem>
                      <SelectItem value="CST">Central European Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-mint">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="share-profile" className="text-base font-medium">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Allow others to view your trading stats</p>
                  </div>
                  <Switch 
                    id="share-profile"
                    checked={settings.shareProfile}
                    onCheckedChange={(checked) => updateSetting('shareProfile', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics-tracking" className="text-base font-medium">Analytics Tracking</Label>
                    <p className="text-sm text-muted-foreground">Help improve the platform with usage analytics</p>
                  </div>
                  <Switch 
                    id="analytics-tracking"
                    checked={settings.analyticsTracking}
                    onCheckedChange={(checked) => updateSetting('analyticsTracking', checked)}
                  />
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Data Retention</Label>
                <p className="text-sm text-muted-foreground mb-2">How long to keep your trading data</p>
                <Select value={settings.dataRetention} onValueChange={(value) => updateSetting('dataRetention', value)}>
                  <SelectTrigger className="bg-slate-800 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                    <SelectItem value="forever">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h4 className="font-medium mb-4 text-red-400">Danger Zone</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-red-500 text-red-400 hover:bg-red-500/10">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Trading Data
                  </Button>
                  <Button variant="outline" className="w-full border-red-500 text-red-400 hover:bg-red-500/10">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-mint">
                <Database className="h-5 w-5" />
                API & Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8 text-muted-foreground">
                <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>API configuration will be available in the next update.</p>
                <p className="text-sm mt-2">Connect your exchange APIs, configure webhooks, and manage data sources.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
