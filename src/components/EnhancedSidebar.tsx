
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
  Workflow,
  Fish,
  User,
  Settings,
  Bell,
  Brain,
  Menu,
  X,
  Bot,
  Zap,
  Shield,
  Activity,
  Calculator,
  DollarSign,
  TrendingDown,
  AlertTriangle,
  Cpu,
  Layers,
  Globe
} from "lucide-react";

interface EnhancedSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const EnhancedSidebar = ({ activeTab, onTabChange }: EnhancedSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuSections = [
    {
      title: "Trading Core",
      items: [
        { 
          id: "overview", 
          label: "Overview", 
          icon: <LayoutDashboard className="h-4 w-4" />,
          description: "Dashboard home"
        },
        { 
          id: "journal", 
          label: "Trading Journal", 
          icon: <BookOpen className="h-4 w-4" />,
          description: "Track your trades"
        },
        { 
          id: "portfolio", 
          label: "Portfolio", 
          icon: <PieChart className="h-4 w-4" />,
          description: "Portfolio tracking"
        },
        { 
          id: "market", 
          label: "Market Data", 
          icon: <TrendingUp className="h-4 w-4" />,
          description: "Real-time data"
        }
      ]
    },
    {
      title: "Advanced Analytics",
      items: [
        { 
          id: "whale", 
          label: "Whale Tracker", 
          icon: <Fish className="h-4 w-4" />,
          description: "Monitor large transactions"
        },
        { 
          id: "analytics", 
          label: "Analytics", 
          icon: <BarChart3 className="h-4 w-4" />,
          description: "Performance analysis"
        },
        { 
          id: "ai-signals", 
          label: "AI Signals", 
          icon: <Brain className="h-4 w-4" />,
          description: "AI-powered insights"
        },
        { 
          id: "risk-management", 
          label: "Risk Manager", 
          icon: <Shield className="h-4 w-4" />,
          description: "Risk assessment tools"
        }
      ]
    },
    {
      title: "Trading Tools",
      items: [
        { 
          id: "bot-trading", 
          label: "Bot Trading", 
          icon: <Bot className="h-4 w-4" />,
          description: "Automated trading"
        },
        { 
          id: "backtesting", 
          label: "Backtesting", 
          icon: <Activity className="h-4 w-4" />,
          description: "Strategy testing"
        },
        { 
          id: "calculator", 
          label: "Position Calculator", 
          icon: <Calculator className="h-4 w-4" />,
          description: "Calculate positions"
        },
        { 
          id: "alerts", 
          label: "Price Alerts", 
          icon: <AlertTriangle className="h-4 w-4" />,
          description: "Custom alerts"
        }
      ]
    },
    {
      title: "Portfolio Management",
      items: [
        { 
          id: "pnl-tracker", 
          label: "P&L Tracker", 
          icon: <DollarSign className="h-4 w-4" />,
          description: "Real-time P&L"
        },
        { 
          id: "goals", 
          label: "Goals & Planning", 
          icon: <Target className="h-4 w-4" />,
          description: "Set and track goals"
        },
        { 
          id: "performance", 
          label: "Performance", 
          icon: <Zap className="h-4 w-4" />,
          description: "Detailed metrics"
        },
        { 
          id: "tax-reporting", 
          label: "Tax Reporting", 
          icon: <Layers className="h-4 w-4" />,
          description: "Tax calculations"
        }
      ]
    },
    {
      title: "Research & Social",
      items: [
        { 
          id: "social-sentiment", 
          label: "Social Sentiment", 
          icon: <Globe className="h-4 w-4" />,
          description: "Market sentiment"
        },
        { 
          id: "news-feed", 
          label: "News Feed", 
          icon: <Activity className="h-4 w-4" />,
          description: "Market news"
        },
        { 
          id: "economic-calendar", 
          label: "Economic Calendar", 
          icon: <Cpu className="h-4 w-4" />,
          description: "Economic events"
        }
      ]
    },
    {
      title: "Productivity",
      items: [
        { 
          id: "drawing", 
          label: "Drawing Journal", 
          icon: <Pencil className="h-4 w-4" />,
          description: "Sketch trade setups"
        },
        { 
          id: "notes", 
          label: "Notes Manager", 
          icon: <StickyNote className="h-4 w-4" />,
          description: "Organize your notes"
        },
        { 
          id: "screenshots", 
          label: "Screenshots", 
          icon: <Camera className="h-4 w-4" />,
          description: "Trade confirmations"
        },
        { 
          id: "diagrams", 
          label: "Diagrams", 
          icon: <Workflow className="h-4 w-4" />,
          description: "Build flow charts"
        }
      ]
    },
    {
      title: "Account",
      items: [
        { 
          id: "profile", 
          label: "Profile", 
          icon: <User className="h-4 w-4" />,
          description: "Your trading profile"
        },
        { 
          id: "notifications", 
          label: "Notifications", 
          icon: <Bell className="h-4 w-4" />,
          description: "Alerts & updates"
        },
        { 
          id: "settings", 
          label: "Settings", 
          icon: <Settings className="h-4 w-4" />,
          description: "App preferences"
        }
      ]
    }
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-dark-blue border-r border-mint/20 z-50 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 border-b border-mint/20 flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h1 className="text-lg font-bold text-mint">TradeMaster Pro</h1>
            <p className="text-xs text-gray-400 mt-1">Advanced Trading Platform</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-mint hover:bg-mint/10 hover:text-mint p-2"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="p-2 space-y-1 h-full overflow-y-auto">
        {menuSections.map((section) => (
          <div key={section.title} className="mb-4">
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                {section.title}
              </h3>
            )}
            {section.items.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start h-auto transition-all duration-300 mb-1 ${
                  activeTab === item.id 
                    ? "bg-mint text-dark-blue hover:bg-mint/80" 
                    : "text-gray-300 hover:bg-mint/10 hover:text-mint border-transparent hover:border-mint/30"
                } ${isCollapsed ? 'px-2' : 'px-3 py-2'}`}
                onClick={() => onTabChange(item.id)}
                title={isCollapsed ? item.label : undefined}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'w-full'}`}>
                  <div className={isCollapsed ? '' : 'mr-3'}>{item.icon}</div>
                  {!isCollapsed && (
                    <div className="text-left flex-1">
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className={`text-xs ${
                        activeTab === item.id ? "text-dark-blue/70" : "text-gray-400"
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  )}
                </div>
              </Button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};
