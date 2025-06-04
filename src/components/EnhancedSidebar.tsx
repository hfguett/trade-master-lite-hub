
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  BookOpen, 
  PieChart, 
  TrendingUp, 
  Target,
  BarChart3,
  Pencil,
  StickyNote,
  Camera,
  User,
  Settings,
  Bell,
  Brain,
  Calculator,
  AlertTriangle,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  TestTube,
  Bot,
  Shield,
  Fish
} from "lucide-react";

interface EnhancedSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const EnhancedSidebar = ({ activeTab, onTabChange }: EnhancedSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { 
      id: "overview", 
      label: "Overview", 
      icon: <LayoutDashboard className="h-4 w-4" />,
      description: "Dashboard home",
      category: "main"
    },
    { 
      id: "journal", 
      label: "Trading Journal", 
      icon: <BookOpen className="h-4 w-4" />,
      description: "Track your trades",
      category: "trading"
    },
    { 
      id: "portfolio", 
      label: "Portfolio", 
      icon: <PieChart className="h-4 w-4" />,
      description: "Portfolio tracking",
      category: "trading"
    },
    { 
      id: "market", 
      label: "Market Data", 
      icon: <TrendingUp className="h-4 w-4" />,
      description: "Real-time data",
      category: "trading"
    },
    { 
      id: "whale", 
      label: "Whale Tracker", 
      icon: <Fish className="h-4 w-4" />,
      description: "Monitor large transactions",
      category: "trading"
    },
    { 
      id: "goals", 
      label: "Goals & Planning", 
      icon: <Target className="h-4 w-4" />,
      description: "Set and track goals",
      category: "planning"
    },
    { 
      id: "analytics", 
      label: "Analytics", 
      icon: <BarChart3 className="h-4 w-4" />,
      description: "Performance analysis",
      category: "analytics"
    },
    { 
      id: "ai-signals", 
      label: "AI Signals", 
      icon: <Brain className="h-4 w-4" />,
      description: "AI-powered signals",
      category: "automation"
    },
    { 
      id: "bot-trading", 
      label: "Bot Trading", 
      icon: <Bot className="h-4 w-4" />,
      description: "Automated trading",
      category: "automation"
    },
    { 
      id: "backtesting", 
      label: "Backtesting", 
      icon: <TestTube className="h-4 w-4" />,
      description: "Strategy testing",
      category: "tools"
    },
    { 
      id: "position-calculator", 
      label: "Position Calculator", 
      icon: <Calculator className="h-4 w-4" />,
      description: "Calculate positions",
      category: "tools"
    },
    { 
      id: "price-alerts", 
      label: "Price Alerts", 
      icon: <AlertTriangle className="h-4 w-4" />,
      description: "Price notifications",
      category: "tools"
    },
    { 
      id: "pnl-tracker", 
      label: "P&L Tracker", 
      icon: <DollarSign className="h-4 w-4" />,
      description: "Profit & loss tracking",
      category: "analytics"
    },
    { 
      id: "risk-management", 
      label: "Risk Management", 
      icon: <Shield className="h-4 w-4" />,
      description: "Risk analysis",
      category: "tools"
    },
    { 
      id: "drawing", 
      label: "Drawing & Diagrams", 
      icon: <Pencil className="h-4 w-4" />,
      description: "Visual tools",
      category: "productivity"
    },
    { 
      id: "notes", 
      label: "Notes Manager", 
      icon: <StickyNote className="h-4 w-4" />,
      description: "Organize your notes",
      category: "productivity"
    },
    { 
      id: "screenshots", 
      label: "Screenshots", 
      icon: <Camera className="h-4 w-4" />,
      description: "Trade confirmations",
      category: "productivity"
    },
    { 
      id: "profile", 
      label: "Profile", 
      icon: <User className="h-4 w-4" />,
      description: "Your trading profile",
      category: "user"
    },
    { 
      id: "notifications", 
      label: "Notifications", 
      icon: <Bell className="h-4 w-4" />,
      description: "Alerts & updates",
      category: "user"
    },
    { 
      id: "settings", 
      label: "Settings", 
      icon: <Settings className="h-4 w-4" />,
      description: "App preferences",
      category: "user"
    }
  ];

  const categories = [
    { id: "main", label: "Main" },
    { id: "trading", label: "Trading" },
    { id: "analytics", label: "Analytics" },
    { id: "automation", label: "Automation" },
    { id: "tools", label: "Tools" },
    { id: "productivity", label: "Productivity" },
    { id: "user", label: "User" },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-slate-900 border-r border-green-500/20 z-50 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 border-b border-green-500/20 flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h1 className="text-xl font-bold text-green-400">TradeMaster</h1>
            <p className="text-sm text-white/70">Professional Trading</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-green-500/20"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="p-2 space-y-1 h-full overflow-y-auto">
        {categories.map((category) => {
          const categoryItems = menuItems.filter(item => item.category === category.id);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category.id} className="space-y-1">
              {!isCollapsed && (
                <div className="px-2 py-1">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    {category.label}
                  </p>
                </div>
              )}
              {categoryItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start h-auto p-3 transition-all duration-300 ${
                    activeTab === item.id 
                      ? "bg-green-600 text-white hover:bg-green-700" 
                      : "text-white hover:bg-green-500/20 hover:text-green-400"
                  } ${isCollapsed ? 'px-3' : ''}`}
                  onClick={() => onTabChange(item.id)}
                  title={isCollapsed ? item.label : ''}
                >
                  <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'w-full'}`}>
                    <div className={isCollapsed ? '' : 'mr-3'}>{item.icon}</div>
                    {!isCollapsed && (
                      <div className="text-left flex-1">
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className={`text-xs ${
                          activeTab === item.id ? "text-white/70" : "text-white/50"
                        }`}>
                          {item.description}
                        </div>
                      </div>
                    )}
                  </div>
                </Button>
              ))}
              {!isCollapsed && <div className="h-2" />}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
