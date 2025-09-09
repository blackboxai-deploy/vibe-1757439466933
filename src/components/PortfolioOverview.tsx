"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const portfolioData = [
  { name: "Stocks", value: 65, amount: 82925 },
  { name: "Crypto", value: 20, amount: 25490 },
  { name: "Forex", value: 10, amount: 12745 },
  { name: "Cash", value: 5, amount: 6290 }
];

const performanceData = [
  { name: "Jan", profit: 2400, trades: 45 },
  { name: "Feb", profit: 1398, trades: 38 },
  { name: "Mar", profit: 9800, trades: 67 },
  { name: "Apr", profit: 3908, trades: 52 },
  { name: "May", profit: 4800, trades: 61 },
  { name: "Jun", profit: 3800, trades: 55 }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export function PortfolioOverview() {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Asset Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Current portfolio distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {portfolioData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {portfolioData.map((item, index) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      ${item.amount.toLocaleString()} ({item.value}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Profit and trade volume trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Bar dataKey="profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Holdings */}
      <Card>
        <CardHeader>
          <CardTitle>Top Holdings</CardTitle>
          <CardDescription>Your largest positions by value</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { symbol: "AAPL", name: "Apple Inc.", shares: 250, value: 43800, change: 2.3, allocation: 34.4 },
              { symbol: "TSLA", name: "Tesla, Inc.", shares: 120, value: 29840, change: -1.2, allocation: 23.4 },
              { symbol: "NVDA", name: "NVIDIA Corp.", shares: 85, value: 35860, change: 5.7, allocation: 28.1 },
              { symbol: "MSFT", name: "Microsoft Corp.", shares: 180, value: 18270, change: 1.8, allocation: 14.1 }
            ].map((holding) => (
              <div key={holding.symbol} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {holding.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{holding.symbol}</div>
                    <div className="text-sm text-muted-foreground">{holding.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">${holding.value.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{holding.shares} shares • {holding.allocation}%</div>
                </div>
                <div className={`text-sm font-medium ${holding.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {holding.change >= 0 ? '+' : ''}{holding.change}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}