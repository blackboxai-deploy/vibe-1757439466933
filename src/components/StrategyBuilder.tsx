"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";


const indicators = [
  { id: "sma", name: "Simple Moving Average", category: "Trend" },
  { id: "ema", name: "Exponential Moving Average", category: "Trend" },
  { id: "rsi", name: "Relative Strength Index", category: "Momentum" },
  { id: "macd", name: "MACD", category: "Momentum" },
  { id: "bb", name: "Bollinger Bands", category: "Volatility" },
  { id: "stoch", name: "Stochastic Oscillator", category: "Momentum" },
  { id: "volume", name: "Volume", category: "Volume" },
  { id: "atr", name: "Average True Range", category: "Volatility" }
];

const conditions = [
  { id: "greater", label: "Greater than" },
  { id: "less", label: "Less than" },
  { id: "equal", label: "Equal to" },
  { id: "crosses_above", label: "Crosses above" },
  { id: "crosses_below", label: "Crosses below" }
];

interface Rule {
  id: string;
  indicator: string;
  condition: string;
  value: string;
  type: "entry" | "exit";
}

export function StrategyBuilder() {
  const [strategyName, setStrategyName] = useState("");
  const [description, setDescription] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [rules, setRules] = useState<Rule[]>([]);

  const addRule = (type: "entry" | "exit") => {
    const newRule: Rule = {
      id: Math.random().toString(36).substr(2, 9),
      indicator: "",
      condition: "",
      value: "",
      type
    };
    setRules([...rules, newRule]);
  };

  const removeRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
  };

  const updateRule = (ruleId: string, field: keyof Rule, value: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, [field]: value } : rule
    ));
  };

  const entryRules = rules.filter(rule => rule.type === "entry");
  const exitRules = rules.filter(rule => rule.type === "exit");

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Strategy Information</CardTitle>
          <CardDescription>Define the basic properties of your trading strategy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="strategy-name">Strategy Name</Label>
              <Input
                id="strategy-name"
                value={strategyName}
                onChange={(e) => setStrategyName(e.target.value)}
                placeholder="My Custom Strategy"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe</Label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Minute</SelectItem>
                  <SelectItem value="5m">5 Minutes</SelectItem>
                  <SelectItem value="15m">15 Minutes</SelectItem>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="4h">4 Hours</SelectItem>
                  <SelectItem value="1d">1 Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your strategy logic and approach..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="risk-level">Risk Level</Label>
            <Select value={riskLevel} onValueChange={setRiskLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Entry Rules */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-green-600">Entry Rules</CardTitle>
              <CardDescription>Define conditions for opening trades</CardDescription>
            </div>
            <Button onClick={() => addRule("entry")} variant="outline" size="sm">
              Add Entry Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {entryRules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No entry rules defined. Click "Add Entry Rule" to get started.
            </div>
          ) : (
            entryRules.map((rule, index) => (
              <div key={rule.id} className="p-4 border border-border rounded-lg bg-green-50/50 dark:bg-green-950/20">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Entry Rule {index + 1}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeRule(rule.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <Label>Indicator</Label>
                    <Select 
                      value={rule.indicator} 
                      onValueChange={(value) => updateRule(rule.id, "indicator", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        {indicators.map(indicator => (
                          <SelectItem key={indicator.id} value={indicator.id}>
                            {indicator.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Condition</Label>
                    <Select 
                      value={rule.condition} 
                      onValueChange={(value) => updateRule(rule.id, "condition", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map(condition => (
                          <SelectItem key={condition.id} value={condition.id}>
                            {condition.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Value</Label>
                    <Input
                      value={rule.value}
                      onChange={(e) => updateRule(rule.id, "value", e.target.value)}
                      placeholder="Enter value"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" size="sm" className="w-full">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Exit Rules */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-red-600">Exit Rules</CardTitle>
              <CardDescription>Define conditions for closing trades</CardDescription>
            </div>
            <Button onClick={() => addRule("exit")} variant="outline" size="sm">
              Add Exit Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {exitRules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No exit rules defined. Click "Add Exit Rule" to get started.
            </div>
          ) : (
            exitRules.map((rule, index) => (
              <div key={rule.id} className="p-4 border border-border rounded-lg bg-red-50/50 dark:bg-red-950/20">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    Exit Rule {index + 1}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeRule(rule.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <Label>Indicator</Label>
                    <Select 
                      value={rule.indicator} 
                      onValueChange={(value) => updateRule(rule.id, "indicator", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        {indicators.map(indicator => (
                          <SelectItem key={indicator.id} value={indicator.id}>
                            {indicator.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Condition</Label>
                    <Select 
                      value={rule.condition} 
                      onValueChange={(value) => updateRule(rule.id, "condition", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map(condition => (
                          <SelectItem key={condition.id} value={condition.id}>
                            {condition.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Value</Label>
                    <Input
                      value={rule.value}
                      onChange={(e) => updateRule(rule.id, "value", e.target.value)}
                      placeholder="Enter value"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" size="sm" className="w-full">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Risk Management */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Management</CardTitle>
          <CardDescription>Configure stop loss, take profit, and position sizing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Stop Loss %</Label>
              <Input placeholder="2.5" />
            </div>
            <div className="space-y-2">
              <Label>Take Profit %</Label>
              <Input placeholder="5.0" />
            </div>
            <div className="space-y-2">
              <Label>Position Size %</Label>
              <Input placeholder="10" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button variant="outline">Save as Draft</Button>
        <div className="flex space-x-2">
          <Button variant="outline">Backtest Strategy</Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
            Create Strategy
          </Button>
        </div>
      </div>
    </div>
  );
}