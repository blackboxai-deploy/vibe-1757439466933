"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "📊",
    description: "Overview & Analytics"
  },
  {
    name: "Strategies",
    href: "/strategies", 
    icon: "🎯",
    description: "Algorithm Builder"
  },
  {
    name: "Backtesting",
    href: "/backtesting",
    icon: "📈", 
    description: "Historical Analysis"
  },
  {
    name: "Brokers",
    href: "/brokers",
    icon: "🔗",
    description: "Platform Integration"
  },
  {
    name: "AI Insights",
    href: "/ai-insights",
    icon: "🤖",
    description: "ML Predictions"
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    icon: "💼",
    description: "Holdings & Performance"
  },
  {
    name: "Signals",
    href: "/signals",
    icon: "📡",
    description: "Trading Alerts"
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "⚙️",
    description: "Preferences"
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              TM
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">TradeMaster</h1>
              <p className="text-xs text-muted-foreground">AI Trading Platform</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2"
        >
          {isCollapsed ? "→" : "←"}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 hover:bg-accent group",
                  isActive ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}>
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  )}
                  {!isCollapsed && isActive && (
                    <Badge variant="secondary" className="text-xs">Active</Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              U
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Demo User</div>
              <div className="text-xs text-muted-foreground">Premium Account</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}