
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
import { EnhancedDrawingJournal } from "@/components/EnhancedDrawingJournal";
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
      case "ai-signals":
        return <AISignals />;
      case "bot-trading":
        return <BotTrading />;
      case "risk-management":
        return <RiskManagement />;
      case "drawing":
        return <EnhancedDrawingJournal />;
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
                <Card key={index} className="stat-card glass-effect-strong border-mint/20 hover-mint-border transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-mint/70 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-mint">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.icon}
                          <span className={`text-sm ml-1 ${
                            stat.changeType === 'positive' ? 'text-mint' : 'text-mint/70'
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
              <Card className="lg:col-span-2 glass-effect-strong border-mint/20 hover-mint-border transition-all duration-300 floating-chart">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-mint">
                    Portfolio Performance
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border text-mint hover:bg-mint hover:text-darkest-blue">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" className="border-mint/50 hover-mint-border text-mint hover:bg-mint hover:text-darkest-blue">
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

              <Card className="glass-effect-strong border-mint/20 hover-mint-border transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-mint">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full mint-button transition-all duration-300 hover:scale-105">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Trade
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-mint/50 hover-mint-border text-mint hover:bg-mint hover:text-darkest-blue transition-all duration-300 hover:scale-105"
                    onClick={() => setActiveTab("ai-signals")}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    View AI Signals
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-mint/50 hover-mint-border text-mint hover:bg-mint hover:text-darkest-blue transition-all duration-300 hover:scale-105"
                    onClick={() => setActiveTab("bot-trading")}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Manage Bots
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-mint/50 hover-mint-border text-mint hover:bg-mint hover:text-darkest-blue transition-all duration-300 hover:scale-105"
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

            <Card className="glass-effect-strong border-mint/20 hover-mint-border transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-mint">Recent Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrades.map((trade, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 bg-darkest-blue/50 rounded-lg hover:bg-darkest-blue/70 transition-all duration-300 hover:scale-102 animate-slide-up border border-mint/10"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant={trade.type === "LONG" ? "default" : "destructive"} 
                          className={`w-16 justify-center ${
                            trade.type === "LONG" ? "mint-button" : ""
                          }`}
                        >
                          {trade.type}
                        </Badge>
                        <div>
                          <p className="font-semibold text-mint">{trade.symbol}</p>
                          <p className="text-sm text-mint/70">{trade.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-mint/70 font-mono">
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
      "ai-signals": "AI Trading Signals",
      "bot-trading": "Automated Trading",
      "risk-management": "Risk Management",
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
      "ai-signals": "AI-powered trading recommendations",
      "bot-trading": "Manage automated trading strategies",
      "risk-management": "Monitor and control trading risks",
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
    <div ref={dashboardRef} className="min-h-screen bg-darker-blue cyber-grid text-foreground flex">
      <EnhancedSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 p-6 ml-16 lg:ml-64 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-mint">
                {getPageTitle()}
              </h1>
              <p className="text-mint/70">
                {getPageDescription()}
              </p>
            </div>
            <Button className="mint-button transition-all duration-300 hover:scale-105">
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
