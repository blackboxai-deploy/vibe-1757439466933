"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

const performanceData = [
  { date: "Jan 1", portfolio: 100000, benchmark: 100000 },
  { date: "Jan 15", portfolio: 102300, benchmark: 101200 },
  { date: "Feb 1", portfolio: 105600, benchmark: 102800 },
  { date: "Feb 15", portfolio: 108200, benchmark: 103500 },
  { date: "Mar 1", portfolio: 112400, benchmark: 105200 },
  { date: "Mar 15", portfolio: 118700, benchmark: 106800 },
  { date: "Apr 1", portfolio: 123500, benchmark: 108400 },
  { date: "Apr 15", portfolio: 127450, benchmark: 109600 }
];

const metrics = [
  { label: "Total Return", value: "27.45%", change: "+2.8%", positive: true },
  { label: "Sharpe Ratio", value: "2.34", change: "+0.12", positive: true },
  { label: "Max Drawdown", value: "-3.2%", change: "-0.5%", positive: true },
  { label: "Win Rate", value: "87.3%", change: "+1.2%", positive: true },
  { label: "Alpha", value: "0.18", change: "+0.03", positive: true },
  { label: "Beta", value: "0.92", change: "-0.04", positive: true }
];

export function PerformanceMetrics() {
  return (
    <div className="space-y-6">
      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio vs Benchmark</CardTitle>
          <CardDescription>Cumulative performance comparison over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                />
                <Line
                  type="monotone"
                  dataKey="portfolio"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={false}
                  name="Your Portfolio"
                />
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="S&P 500"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm text-muted-foreground">Your Portfolio</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-px bg-gray-400 border-dashed" />
              <span className="text-sm text-muted-foreground">S&P 500 Benchmark</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Comprehensive performance analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="text-sm text-muted-foreground">{metric.label}</div>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="flex items-center space-x-2">
                  <Badge variant={metric.positive ? "default" : "destructive"} className="text-xs">
                    {metric.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trading Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Trading Statistics</CardTitle>
          <CardDescription>Detailed trading activity breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">This Month</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Trades</span>
                  <span className="font-medium text-foreground">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Winning Trades</span>
                  <span className="font-medium text-green-600">216</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Losing Trades</span>
                  <span className="font-medium text-red-600">31</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Average Profit</span>
                  <span className="font-medium text-foreground">$127.45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Largest Win</span>
                  <span className="font-medium text-green-600">$2,847.32</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Largest Loss</span>
                  <span className="font-medium text-red-600">-$452.18</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Strategy Performance</h4>
              <div className="space-y-3">
                {[
                  { name: "AI Momentum Scalper", trades: 128, profit: 8247, winRate: 89.3 },
                  { name: "ML Trend Following", trades: 84, profit: 6832, winRate: 93.3 },
                  { name: "RSI Mean Reversion", trades: 35, profit: -432, winRate: 66.7 }
                ].map((strategy) => (
                  <div key={strategy.name} className="p-3 rounded-lg border border-border bg-muted/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-foreground">{strategy.name}</span>
                      <Badge variant={strategy.profit >= 0 ? "default" : "destructive"} className="text-xs">
                        {strategy.profit >= 0 ? "+" : ""}${strategy.profit}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {strategy.trades} trades • {strategy.winRate}% win rate
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}