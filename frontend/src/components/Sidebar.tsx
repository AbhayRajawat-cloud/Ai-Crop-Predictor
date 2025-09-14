import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  TrendingUp,
  Cloud,
  Leaf,
  Bug,
  Droplets,
  BarChart3,
  MessageCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutGrid },
  { name: "AI Yield Prediction", path: "/yield-prediction", icon: TrendingUp },
  { name: "Weather Intelligence", path: "/weather", icon: Cloud, comingSoon: true },
  { name: "Soil Health", path: "/soil-health", icon: Leaf, comingSoon: true },
  { name: "Pest & Disease", path: "/pest-disease", icon: Bug, comingSoon: true },
  { name: "Irrigation", path: "/irrigation", icon: Droplets, comingSoon: true },
  { name: "Performance", path: "/performance", icon: BarChart3, comingSoon: true },
  { name: "Contact Us", path: "/contact", icon: MessageCircle },
  { name: "Help Desk", path: "/help", icon: HelpCircle },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "bg-card border-r border-border shadow-soft transition-smooth",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-primary">GreenByte</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="transition-bounce"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.comingSoon) {
            return (
              <div
                key={item.name}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg opacity-50 cursor-not-allowed",
                  collapsed ? "justify-center" : ""
                )}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && (
                  <span className="flex-1 text-sm">{item.name}</span>
                )}
                {!collapsed && (
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">Soon</span>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth",
                collapsed ? "justify-center" : "",
                isActive
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span className="flex-1 text-sm">{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};