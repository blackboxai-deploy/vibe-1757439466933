"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioOverview } from "@/components/PortfolioOverview";
import { TradingChart } from "@/components/TradingChart";
import { SignalCard } from "@/components/SignalCard";
import { PerformanceMetrics } from "@/components/PerformanceMetrics";

const activeStrategies = [
  {
    id: 1,
    name: "AI Momentum Scalper",
    status: "active",
    profit: 12.4,
    trades: 28,
    accuracy: 89.3,
    risk: "Medium"
  },
  {
    id: 2,
    name: "ML Trend Following",
    status: "active", 
    profit: 8.7,
    trades: 15,
    accuracy: 93.3,
    risk: "Low"
  },
  {
    id: 3,
    name: "RSI Mean Reversion",
    status: "paused",
    profit: -2.1,
    trades: 12,
    accuracy: 66.7,
    risk: "High"
  }
];

const recentSignals = [
  {
    id: 1,
    symbol: "AAPL",
    action: "BUY" as const,
    confidence: 92,
    price: 175.32,
    strategy: "AI Momentum",
    time: "2 minutes ago"
  },
  {
    id: 2,
    symbol: "TSLA", 
    action: "SELL" as const,
    confidence: 87,
    price: 248.67,
    strategy: "ML Trend",
    time: "5 minutes ago"
  },
  {
    id: 3,
    symbol: "NVDA",
    action: "BUY" as const,
    confidence: 95,
    price: 421.88,
    strategy: "AI Momentum",
    time: "8 minutes ago"
  }
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trading Dashboard</h1>
          <p className="text-muted-foreground">Monitor your AI-powered trading strategies and portfolio performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            🟢 All Systems Online
          </Badge>
          <Button variant="outline" size="sm">
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$127,450.32</div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-green-600">↗ +$2,847.21</span>
              <span className="text-muted-foreground ml-2">(+2.3% today)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2 / 3</div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-blue-600">Running</span>
              <span className="text-muted-foreground ml-2">(1 paused)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">43</div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-green-600">38 wins</span>
              <span className="text-muted-foreground ml-2">(88.4% accuracy)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">91.2%</div>
            <Progress value={91.2} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Charts and Performance */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
              <TabsTrigger value="chart">Live Charts</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <PortfolioOverview />
            </TabsContent>

            <TabsContent value="chart">
              <TradingChart />
            </TabsContent>

            <TabsContent value="performance">
              <PerformanceMetrics />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Strategies and Signals */}
        <div className="space-y-6">
          {/* Active Strategies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Strategies</CardTitle>
              <CardDescription>Your currently running trading algorithms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeStrategies.map((strategy) => (
                <div key={strategy.id} className="p-4 rounded-lg border border-border bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{strategy.name}</h4>
                    <Badge variant={strategy.status === "active" ? "default" : "secondary"}>
                      {strategy.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Profit: </span>
                      <span className={strategy.profit >= 0 ? "text-green-600" : "text-red-600"}>
                        {strategy.profit >= 0 ? "+" : ""}{strategy.profit}%
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Trades: </span>
                      <span className="text-foreground">{strategy.trades}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Accuracy: </span>
                      <span className="text-foreground">{strategy.accuracy}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Risk: </span>
                      <span className={`
                        ${strategy.risk === "Low" ? "text-green-600" : 
                          strategy.risk === "Medium" ? "text-yellow-600" : "text-red-600"}
                      `}>
                        {strategy.risk}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Signals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Signals</CardTitle>
              <CardDescription>Latest AI-generated trading signals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentSignals.map((signal) => (
                <SignalCard key={signal.id} signal={signal} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}