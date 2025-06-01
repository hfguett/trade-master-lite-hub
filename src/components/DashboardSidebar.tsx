
import { Button } from "@/components/ui/button";
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
  Whale,
  User,
  Settings,
  Bell
} from "lucide-react";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const DashboardSidebar = ({ activeTab, onTabChange }: DashboardSidebarProps) => {
  const menuItems = [
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
    },
    { 
      id: "whale", 
      label: "Whale Tracker", 
      icon: <Whale className="h-4 w-4" />,
      description: "Monitor large transactions"
    },
    { 
      id: "goals", 
      label: "Goals & Planning", 
      icon: <Target className="h-4 w-4" />,
      description: "Set and track goals"
    },
    { 
      id: "analytics", 
      label: "Analytics", 
      icon: <BarChart3 className="h-4 w-4" />,
      description: "Performance analysis"
    },
    // Productivity features
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
    },
    // User features
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
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-blue border-r border-mint/20 z-50">
      <div className="p-6 border-b border-mint/20">
        <h1 className="text-xl font-bold gradient-text">TradeMaster Lite</h1>
        <p className="text-sm text-muted-foreground mt-1">Professional Trading Platform</p>
      </div>
      
      <nav className="p-4 space-y-2 h-full overflow-y-auto">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={`w-full justify-start h-auto p-3 transition-all duration-300 ${
              activeTab === item.id 
                ? "bg-mint text-dark-blue hover:bg-mint/80" 
                : "text-foreground hover:bg-mint/10 hover:text-mint border-transparent hover:border-mint/30"
            }`}
            onClick={() => onTabChange(item.id)}
          >
            <div className="flex items-center w-full">
              <div className="mr-3">{item.icon}</div>
              <div className="text-left">
                <div className="font-medium text-sm">{item.label}</div>
                <div className={`text-xs ${
                  activeTab === item.id ? "text-dark-blue/70" : "text-muted-foreground"
                }`}>
                  {item.description}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </nav>
    </aside>
  );
};
