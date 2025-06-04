
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  BarChart3, 
  Plus,
  Filter,
  Download
} from "lucide-react";
import { EnhancedSidebar } from "@/components/EnhancedSidebar";
import { TradingJournal } from "@/components/TradingJournal";
import { PortfolioOverview } from "@/components/PortfolioOverview";
import { MarketData } from "@/components/MarketData";
import { WhaleTracker } from "@/components/WhaleTracker";
import { GoalTracker } from "@/components/GoalTracker";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { AISignals } from "@/components/AISignals";
import { BotTrading } from "@/components/BotTrading";
import { RiskManagement } from "@/components/RiskManagement";
import { Backtesting } from "@/components/Backtesting";
import { PositionCalculator } from "@/components/PositionCalculator";
import { PriceAlerts } from "@/components/PriceAlerts";
import { PnLTracker } from "@/components/PnLTracker";
import { NotesManager } from "@/components/NotesManager";
import { ScreenshotManager } from "@/components/ScreenshotManager";
import { ProfilePage } from "@/components/ProfilePage";
import { SettingsPage } from "@/components/SettingsPage";
import { NotificationsCenter } from "@/components/NotificationsCenter";
import { TradingChart } from "@/components/ui/TradingChart";
import { WorldClock } from "@/components/WorldClock";
import { GoalPlanningWidget } from "@/components/GoalPlanningWidget";
import { EconomicCalendar } from "@/components/EconomicCalendar";
import { TradingWorkspace } from "@/components/TradingWorkspace";
import { RingProgress, BarProgress } from "@/components/ui/enhanced-progress";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

    }, dashboardRef);

    return () => ctx.revert();
  }, [activeTab]);

  const stats = [
    {
      title: "Total Portfolio Value",
      value: "$24,847.32",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: <TrendingUp className="h-4 w-4" />,
      progress: 78
    },
    {
      title: "Today's P&L",
      value: "+$347.82",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: <TrendingUp className="h-4 w-4" />,
      progress: 65
    },
    {
      title: "Win Rate",
      value: "68.2%",
      change: "+5.3%",
      changeType: "positive" as const,
      icon: <Target className="h-4 w-4" />,
      progress: 68
    },
    {
      title: "Total Trades",
      value: "147",
      change: "+8",
      changeType: "neutral" as const,
      icon: <BarChart3 className="h-4 w-4" />,
      progress: 85
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
      case "ai-signals":
        return <AISignals />;
      case "bot-trading":
        return <BotTrading />;
      case "risk-management":
        return <RiskManagement />;
      case "drawing":
      case "diagrams":
        return <TradingWorkspace />;
      case "notes":
        return <NotesManager />;
      case "screenshots":
        return <ScreenshotManager />;
      case "profile":
        return <ProfilePage />;
      case "settings":
        return <SettingsPage />;
      case "notifications":
        return <NotificationsCenter />;
      default:
        return (
          <div className="space-y-6 main-content">
            {/* Enhanced Stats Grid with Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="stat-card glass-effect border-primary/20 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-primary/70 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.icon}
                          <span className="text-sm ml-1 text-primary">
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div className="w-16 h-16">
                        <RingProgress 
                          value={stat.progress} 
                          size={64}
                          strokeWidth={6}
                          showValue={false}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 glass-effect border-primary/20 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-primary">
                    Portfolio Performance
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-primary/50 hover:border-primary text-primary hover:bg-primary hover:text-white">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" className="border-primary/50 hover:border-primary text-primary hover:bg-primary hover:text-white">
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

              <Card className="glass-effect border-primary/20 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-primary">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/80 text-white transition-all duration-300 hover:scale-105">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Trade
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/50 hover:border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
                    onClick={() => setActiveTab("ai-signals")}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    View AI Signals
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/50 hover:border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
                    onClick={() => setActiveTab("bot-trading")}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Manage Bots
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/50 hover:border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
                    onClick={() => setActiveTab("risk-management")}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Risk Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <WorldClock />
              <GoalPlanningWidget />
              <EconomicCalendar />
            </div>

            <Card className="glass-effect border-primary/20 hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-primary">Recent Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrades.map((trade, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 glass-effect rounded-lg hover:scale-105 transition-all duration-300 border border-primary/10"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant={trade.type === "LONG" ? "default" : "destructive"} 
                          className="w-16 justify-center"
                        >
                          {trade.type}
                        </Badge>
                        <div>
                          <p className="font-semibold text-primary">{trade.symbol}</p>
                          <p className="text-sm text-slate-300">{trade.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-300 font-mono">
                          {trade.entry} → {trade.exit}
                        </p>
                        <p className={`font-semibold font-mono ${
                          trade.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'
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
      "ai-signals": "AI Trading Signals",
      "bot-trading": "Automated Trading",
      "risk-management": "Risk Management",
      drawing: "Drawing & Diagrams",
      diagrams: "Drawing & Diagrams",
      notes: "Notes Manager",
      screenshots: "Screenshots",
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
      "ai-signals": "AI-powered trading recommendations",
      "bot-trading": "Manage automated trading strategies",
      "risk-management": "Monitor and control trading risks",
      drawing: "Vector drawings and strategy diagrams",
      diagrams: "Vector drawings and strategy diagrams",
      notes: "Organize your trading notes and ideas",
      screenshots: "Manage trade confirmation screenshots",
      profile: "Manage your trading profile and achievements",
      settings: "Customize your trading experience",
      notifications: "Stay updated with alerts and notifications"
    };
    return descriptions[activeTab as keyof typeof descriptions] || "Welcome back, trader";
  };

  return (
    <div ref={dashboardRef} className="min-h-screen bg-slate-950 text-foreground flex">
      <EnhancedSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 p-6 ml-16 lg:ml-64 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-primary">
                {getPageTitle()}
              </h1>
              <p className="text-slate-300">
                {getPageDescription()}
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/80 text-white transition-all duration-300 hover:scale-105">
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
