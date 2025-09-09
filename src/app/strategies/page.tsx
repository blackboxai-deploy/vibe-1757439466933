"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { StrategyBuilder } from "@/components/StrategyBuilder";

const prebuiltStrategies = [
  {
    id: 1,
    name: "AI Momentum Scalper",
    description: "Advanced machine learning model that identifies short-term momentum patterns",
    category: "AI/ML",
    risk: "Medium",
    performance: "+24.3%",
    accuracy: "89.3%",
    timeframe: "1-5 min",
    status: "Active",
    image: "https://placehold.co/300x200?text=AI+Momentum+Strategy+Dashboard+with+Real-time+Charts"
  },
  {
    id: 2,
    name: "ML Trend Following",
    description: "Deep learning algorithm that detects and follows market trends",
    category: "AI/ML", 
    risk: "Low",
    performance: "+18.7%",
    accuracy: "93.3%",
    timeframe: "15-60 min",
    status: "Active",
    image: "https://placehold.co/300x200?text=Machine+Learning+Trend+Analysis+with+Prediction+Models"
  },
  {
    id: 3,
    name: "RSI Mean Reversion",
    description: "Classic technical indicator strategy with modern risk management",
    category: "Technical",
    risk: "High", 
    performance: "-2.1%",
    accuracy: "66.7%",
    timeframe: "5-30 min",
    status: "Paused",
    image: "https://placehold.co/300x200?text=RSI+Technical+Indicator+Chart+with+Buy+Sell+Signals"
  },
  {
    id: 4,
    name: "MACD Crossover Pro",
    description: "Enhanced MACD strategy with dynamic parameters and AI confirmation",
    category: "Technical",
    risk: "Medium",
    performance: "+12.8%",
    accuracy: "78.2%",
    timeframe: "30-240 min",
    status: "Available",
    image: "https://placehold.co/300x200?text=MACD+Crossover+Strategy+with+Signal+Confirmation"
  },
  {
    id: 5,
    name: "Bollinger Bands Squeeze",
    description: "Volatility breakout strategy using advanced statistical analysis",
    category: "Technical",
    risk: "Medium",
    performance: "+16.4%",
    accuracy: "82.1%",
    timeframe: "60-480 min",
    status: "Available",
    image: "https://placehold.co/300x200?text=Bollinger+Bands+Volatility+Squeeze+Analysis+Chart"
  },
  {
    id: 6,
    name: "Neural Network Predictor",
    description: "Deep neural network trained on 10+ years of market data",
    category: "AI/ML",
    risk: "High",
    performance: "+31.2%",
    accuracy: "91.8%",
    timeframe: "5-120 min",
    status: "Premium",
    image: "https://placehold.co/300x200?text=Neural+Network+Market+Prediction+with+Deep+Learning"
  }
];

const customStrategies = [
  {
    id: 1,
    name: "My Custom Strategy #1",
    description: "Custom algorithm combining RSI + MACD + Volume analysis",
    performance: "+8.4%",
    trades: 45,
    status: "Testing",
    created: "3 days ago"
  },
  {
    id: 2,
    name: "Crypto Momentum", 
    description: "Specialized strategy for cryptocurrency market patterns",
    performance: "+22.7%",
    trades: 67,
    status: "Active",
    created: "1 week ago"
  }
];

export default function StrategiesPage() {

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trading Strategies</h1>
          <p className="text-muted-foreground">Create, deploy, and manage AI-powered trading algorithms</p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Create Strategy
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Strategy Builder</DialogTitle>
                <DialogDescription>
                  Create your own trading algorithm using our visual builder
                </DialogDescription>
              </DialogHeader>
              <StrategyBuilder />
            </DialogContent>
          </Dialog>
          <Button variant="outline">Import Strategy</Button>
        </div>
      </div>

      <Tabs defaultValue="marketplace" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="marketplace">Strategy Marketplace</TabsTrigger>
          <TabsTrigger value="my-strategies">My Strategies</TabsTrigger>
          <TabsTrigger value="backtesting">Backtesting Lab</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center space-x-4 p-4 rounded-lg border border-border bg-muted/20">
            <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">All Categories</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">AI/ML</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">Technical</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">Fundamental</Badge>
            </div>
            <div className="flex items-center space-x-2 ml-auto">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">Performance</Badge>
            </div>
          </div>

          {/* Strategy Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prebuiltStrategies.map((strategy) => (
              <Card key={strategy.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img 
                    src={strategy.image} 
                    alt={strategy.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={strategy.category === "AI/ML" ? "default" : "secondary"}>
                      {strategy.category}
                    </Badge>
                    <Badge variant={
                      strategy.status === "Active" ? "default" :
                      strategy.status === "Paused" ? "destructive" :
                      strategy.status === "Premium" ? "secondary" : "outline"
                    }>
                      {strategy.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {strategy.name}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {strategy.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Performance</div>
                      <div className={`font-semibold ${
                        strategy.performance.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {strategy.performance}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                      <div className="font-semibold text-foreground">{strategy.accuracy}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Risk Level</div>
                      <div className={`font-semibold ${
                        strategy.risk === "Low" ? "text-green-600" :
                        strategy.risk === "Medium" ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {strategy.risk}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Timeframe</div>
                      <div className="font-semibold text-foreground">{strategy.timeframe}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1" 
                      variant={strategy.status === "Active" ? "destructive" : "default"}
                      disabled={strategy.status === "Premium"}
                    >
                      {strategy.status === "Active" ? "Stop" : 
                       strategy.status === "Premium" ? "Upgrade Required" : "Deploy"}
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-strategies" className="space-y-6">
          <div className="grid gap-6">
            {customStrategies.map((strategy) => (
              <Card key={strategy.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{strategy.name}</CardTitle>
                      <CardDescription>{strategy.description}</CardDescription>
                    </div>
                    <Badge variant={
                      strategy.status === "Active" ? "default" :
                      strategy.status === "Testing" ? "secondary" : "outline"
                    }>
                      {strategy.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <div className="text-sm text-muted-foreground">Performance</div>
                        <div className={`font-semibold ${
                          strategy.performance.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {strategy.performance}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Trades</div>
                        <div className="font-semibold text-foreground">{strategy.trades}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Created</div>
                        <div className="font-semibold text-foreground">{strategy.created}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Clone</Button>
                      <Button size="sm">
                        {strategy.status === "Active" ? "Stop" : "Deploy"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {customStrategies.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Custom Strategies Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first custom trading strategy using our intuitive builder
                  </p>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                    Create Your First Strategy
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="backtesting">
          <Card>
            <CardHeader>
              <CardTitle>Backtesting Laboratory</CardTitle>
              <CardDescription>
                Test your strategies against historical market data to validate performance
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Backtesting Coming Soon</h3>
              <p className="text-muted-foreground mb-4">
                Advanced backtesting engine with historical data from 10+ years of market activity
              </p>
              <Button variant="outline" disabled>
                Request Early Access
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}