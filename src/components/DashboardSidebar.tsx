
import { Button } from "@/components/ui/button";
import { 
  TrendingUp,
  LayoutDashboard,
  BookOpen,
  PieChart,
  BarChart3,
  Target,
  Calendar,
  Settings,
  User,
  LogOut
} from "lucide-react";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const DashboardSidebar = ({ activeTab, onTabChange }: DashboardSidebarProps) => {
  const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: "journal", label: "Trading Journal", icon: <BookOpen className="h-4 w-4" /> },
    { id: "portfolio", label: "Portfolio", icon: <PieChart className="h-4 w-4" /> },
    { id: "market", label: "Market Data", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "goals", label: "Goals & Planning", icon: <Target className="h-4 w-4" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-700 p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8">
        <TrendingUp className="h-8 w-8 text-emerald-500" />
        <span className="text-xl font-bold">TradeMaster</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={`w-full justify-start ${
              activeTab === item.id 
                ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
            onClick={() => onTabChange(item.id)}
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </Button>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-slate-700 pt-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <User className="h-4 w-4" />
          <span className="ml-2">Profile</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <Settings className="h-4 w-4" />
          <span className="ml-2">Settings</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <LogOut className="h-4 w-4" />
          <span className="ml-2">Logout</span>
        </Button>
      </div>
    </aside>
  );
};
