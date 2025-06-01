
import { useState, useEffect, useRef } from "react";
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
import { WhaleTracker } from "@/components/WhaleTracker";
import { GoalTracker } from "@/components/GoalTracker";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { DrawingJournal } from "@/components/DrawingJournal";
import { NotesManager } from "@/components/NotesManager";
import { ScreenshotManager } from "@/components/ScreenshotManager";
import { DiagramBuilder } from "@/components/DiagramBuilder";
import { ProfilePage } from "@/components/ProfilePage";
import { SettingsPage } from "@/components/SettingsPage";
import { NotificationsCenter } from "@/components/NotificationsCenter";
import { TradingChart } from "@/components/ui/TradingChart";
import { WorldClock } from "@/components/WorldClock";
import { GoalPlanningWidget } from "@/components/GoalPlanningWidget";
import { EconomicCalendar } from "@/components/EconomicCalendar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats cards on load
      gsap.fromTo(
        ".stat-card",
        { 
          y: 50, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      );

      // Animate main content
      gsap.fromTo(
        ".main-content",
        { 
          y: 30, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out"
        }
      );

      // Floating animation for charts
      gsap.to(".floating-chart", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

    }, dashboardRef);

    return () => ctx.revert();
  }, [activeTab]);

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

  const portfolioData = [
    { name: 'Jan', value: 20000 },
    { name: 'Feb', value: 21500 },
    { name: 'Mar', value: 23000 },
    { name: 'Apr', value: 22800 },
    { name: 'May', value: 24847 },
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
      case "whale":
        return <WhaleTracker />;
      case "goals":
        return <GoalTracker />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "drawing":
        return <DrawingJournal />;
      case "notes":
        return <NotesManager />;
      case "screenshots":
        return <ScreenshotManager />;
      case "diagrams":
        return <DiagramBuilder />;
      case "profile":
        return <ProfilePage />;
      case "settings":
        return <SettingsPage />;
      case "notifications":
        return <NotificationsCenter />;
      default:
        return (
          <div className="space-y-6 main-content">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="stat-card glass-effect border-mint/20 hover-mint-border transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.icon}
                          <span className={`text-sm ml-1 ${
                            stat.changeType === 'positive' ? 'text-mint' : 'text-muted-foreground'
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
              <Card className="lg:col-span-2 glass-effect border-mint/20 hover-mint-border transition-all duration-300 floating-chart">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gradient-text">
                    Portfolio Performance
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TradingChart 
                    type="area" 
                    data={portfolioData} 
                    height={300}
                    animate={true}
                  />
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
                <CardHeader>
                  <CardTitle className="gradient-text">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-mint hover:bg-mint/80 text-dark-blue transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-mint/25">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Trade
                  </Button>
                  <Button variant="outline" className="w-full border-mint/50 hover-mint-border transition-all duration-300 hover:scale-105">
                    <Calendar className="h-4 w-4 mr-2" />
                    Plan Trade
                  </Button>
                  <Button variant="outline" className="w-full border-mint/50 hover-mint-border transition-all duration-300 hover:scale-105">
                    <Target className="h-4 w-4 mr-2" />
                    Set Goal
                  </Button>
                  <Button variant="outline" className="w-full border-mint/50 hover-mint-border transition-all duration-300 hover:scale-105">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Features Row */}
            <div className="grid lg:grid-cols-3 gap-6">
              <WorldClock />
              <GoalPlanningWidget />
              <EconomicCalendar />
            </div>

            {/* Recent Trades */}
            <Card className="glass-effect border-mint/20 hover-mint-border transition-all duration-300">
              <CardHeader>
                <CardTitle className="gradient-text">Recent Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrades.map((trade, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 bg-dark-blue/30 rounded-lg hover:bg-dark-blue/50 transition-all duration-300 hover:scale-102 animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant={trade.type === "LONG" ? "default" : "destructive"} 
                          className={`w-16 justify-center ${
                            trade.type === "LONG" ? "bg-mint text-dark-blue" : ""
                          }`}
                        >
                          {trade.type}
                        </Badge>
                        <div>
                          <p className="font-semibold">{trade.symbol}</p>
                          <p className="text-sm text-muted-foreground">{trade.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground font-mono">
                          {trade.entry} → {trade.exit}
                        </p>
                        <p className={`font-semibold font-mono ${
                          trade.pnl.startsWith('+') ? 'text-mint' : 'text-red-400'
                        }`}>
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

  const getPageTitle = () => {
    const titles = {
      overview: "Dashboard Overview",
      journal: "Trading Journal",
      portfolio: "Portfolio",
      market: "Market Data",
      whale: "Whale Tracker", 
      goals: "Goals & Planning",
      analytics: "Analytics",
      drawing: "Drawing Journal",
      notes: "Notes Manager",
      screenshots: "Screenshots",
      diagrams: "Diagrams",
      profile: "Profile",
      settings: "Settings",
      notifications: "Notifications"
    };
    return titles[activeTab as keyof typeof titles] || "Dashboard";
  };

  const getPageDescription = () => {
    const descriptions = {
      overview: "Your trading performance at a glance",
      journal: "Track and analyze your trades",
      portfolio: "Monitor your portfolio performance",
      market: "Real-time market intelligence",
      whale: "Monitor large blockchain transactions",
      goals: "Set and track your trading goals",
      analytics: "Deep dive into your trading analytics",
      drawing: "Sketch and analyze trade setups",
      notes: "Organize your trading notes and ideas",
      screenshots: "Manage trade confirmation screenshots",
      diagrams: "Build trading strategy flow charts",
      profile: "Manage your trading profile and achievements",
      settings: "Customize your trading experience",
      notifications: "Stay updated with alerts and notifications"
    };
    return descriptions[activeTab as keyof typeof descriptions] || "Welcome back, trader";
  };

  return (
    <div ref={dashboardRef} className="min-h-screen bg-dark-blue text-foreground flex">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 p-6 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 gradient-text">
                {getPageTitle()}
              </h1>
              <p className="text-muted-foreground">
                {getPageDescription()}
              </p>
            </div>
            <Button className="bg-mint hover:bg-mint/80 text-dark-blue transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-mint/25">
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
