import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  BarChart3, 
  Target, 
  Calendar,
  Plus,
  Filter,
  Download
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { TradingJournal } from "@/components/TradingJournal";
import { PortfolioOverview } from "@/components/PortfolioOverview";
import { MarketData } from "@/components/MarketData";
import { GoalTracker } from "@/components/GoalTracker";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Portfolio Value",
      value: "$24,847.32",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Today's P&L",
      value: "+$347.82",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Win Rate",
      value: "68.2%",
      change: "+5.3%",
      changeType: "positive" as const,
      icon: <Target className="h-4 w-4" />
    },
    {
      title: "Total Trades",
      value: "147",
      change: "+8",
      changeType: "neutral" as const,
      icon: <BarChart3 className="h-4 w-4" />
    }
  ];

  const recentTrades = [
    {
      symbol: "BTC/USDT",
      type: "LONG",
      entry: "$43,250",
      exit: "$44,120",
      pnl: "+$870",
      date: "2024-01-15"
    },
    {
      symbol: "ETH/USDT",
      type: "SHORT",
      entry: "$2,650",
      exit: "$2,580",
      pnl: "+$420",
      date: "2024-01-14"
    },
    {
      symbol: "AAPL",
      type: "LONG",
      entry: "$185.40",
      exit: "$182.30",
      pnl: "-$310",
      date: "2024-01-13"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "journal":
        return <TradingJournal />;
      case "portfolio":
        return <PortfolioOverview />;
      case "market":
        return <MarketData />;
      case "goals":
        return <GoalTracker />;
      case "analytics":
        return <AnalyticsDashboard />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.icon}
                          <span className={`text-sm ml-1 ${
                            stat.changeType === 'positive' ? 'text-emerald-400' : 'text-slate-400'
                          }`}>
                            {stat.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Portfolio Chart */}
              <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Portfolio Performance
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-slate-600">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" className="border-slate-600">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-slate-600 mx-auto mb-2" />
                      <p className="text-slate-400">Portfolio chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Trade
                  </Button>
                  <Button variant="outline" className="w-full border-slate-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Plan Trade
                  </Button>
                  <Button variant="outline" className="w-full border-slate-600">
                    <Target className="h-4 w-4 mr-2" />
                    Set Goal
                  </Button>
                  <Button variant="outline" className="w-full border-slate-600">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Trades */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrades.map((trade, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge variant={trade.type === "LONG" ? "default" : "destructive"} className="w-16 justify-center">
                          {trade.type}
                        </Badge>
                        <div>
                          <p className="font-semibold">{trade.symbol}</p>
                          <p className="text-sm text-slate-400">{trade.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">
                          {trade.entry} → {trade.exit}
                        </p>
                        <p className={`font-semibold ${trade.pnl.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                          {trade.pnl}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 p-6 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {activeTab === "overview" ? "Dashboard Overview" :
                 activeTab === "journal" ? "Trading Journal" :
                 activeTab === "portfolio" ? "Portfolio" :
                 activeTab === "market" ? "Market Data" :
                 activeTab === "goals" ? "Goals & Planning" :
                 activeTab === "analytics" ? "Analytics" : "Dashboard"}
              </h1>
              <p className="text-slate-400">
                {activeTab === "overview" ? "Your trading performance at a glance" :
                 activeTab === "journal" ? "Track and analyze your trades" :
                 activeTab === "portfolio" ? "Monitor your portfolio performance" :
                 activeTab === "market" ? "Real-time market intelligence" :
                 activeTab === "goals" ? "Set and track your trading goals" :
                 activeTab === "analytics" ? "Deep dive into your trading analytics" : "Welcome back, trader"}
              </p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
