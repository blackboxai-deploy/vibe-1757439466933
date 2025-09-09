"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AIAnalytics } from "@/components/AIAnalytics";

const marketSentiment = {
  overall: 72,
  stocks: 68,
  crypto: 85,
  forex: 61,
  commodities: 74
};

const aiPredictions = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    currentPrice: 175.32,
    predictedPrice: 182.50,
    confidence: 87,
    direction: "bullish",
    timeframe: "7 days",
    reasons: ["Strong earnings outlook", "AI integration momentum", "Technical breakout pattern"]
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    currentPrice: 248.67,
    predictedPrice: 235.20,
    confidence: 79,
    direction: "bearish",
    timeframe: "7 days",
    reasons: ["Delivery concerns", "Competition pressure", "Overbought technicals"]
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    currentPrice: 421.88,
    predictedPrice: 445.30,
    confidence: 92,
    direction: "bullish",
    timeframe: "7 days", 
    reasons: ["AI demand surge", "Data center growth", "Strong fundamentals"]
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    currentPrice: 378.45,
    predictedPrice: 390.80,
    confidence: 84,
    direction: "bullish",
    timeframe: "7 days",
    reasons: ["Cloud growth", "AI integration", "Enterprise strength"]
  }
];

const marketNews = [
  {
    id: 1,
    title: "Federal Reserve Signals Potential Rate Cut",
    impact: "bullish",
    confidence: 78,
    summary: "Fed officials hint at dovish stance amid economic data",
    source: "Reuters",
    time: "2 hours ago",
    relevantSymbols: ["SPY", "QQQ", "IWM"]
  },
  {
    id: 2,
    title: "AI Chip Demand Reaches Record Highs",
    impact: "bullish",
    confidence: 91,
    summary: "Semiconductor companies report unprecedented order books",
    source: "TechCrunch",
    time: "4 hours ago",
    relevantSymbols: ["NVDA", "AMD", "INTC"]
  },
  {
    id: 3,
    title: "Energy Sector Faces Headwinds",
    impact: "bearish",
    confidence: 73,
    summary: "Oil prices under pressure from supply concerns",
    source: "Bloomberg",
    time: "6 hours ago",
    relevantSymbols: ["XLE", "CVX", "XOM"]
  }
];

const patternAnalysis = [
  {
    pattern: "Bull Flag",
    symbol: "AAPL",
    probability: 78,
    target: 185.50,
    timeframe: "5-10 days",
    description: "Strong uptrend continuation pattern forming"
  },
  {
    pattern: "Head & Shoulders", 
    symbol: "TSLA",
    probability: 85,
    target: 220.00,
    timeframe: "2-4 weeks",
    description: "Reversal pattern suggests downside move"
  },
  {
    pattern: "Cup & Handle",
    symbol: "NVDA", 
    probability: 92,
    target: 460.00,
    timeframe: "1-3 weeks",
    description: "Bullish continuation pattern with high success rate"
  }
];

export default function AIInsightsPage() {
  const [realtimeData, setRealtimeData] = useState(marketSentiment);

  useEffect(() => {
    // Simulate real-time sentiment updates
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        overall: Math.max(0, Math.min(100, prev.overall + (Math.random() - 0.5) * 4)),
        stocks: Math.max(0, Math.min(100, prev.stocks + (Math.random() - 0.5) * 3)),
        crypto: Math.max(0, Math.min(100, prev.crypto + (Math.random() - 0.5) * 6)),
        forex: Math.max(0, Math.min(100, prev.forex + (Math.random() - 0.5) * 2)),
        commodities: Math.max(0, Math.min(100, prev.commodities + (Math.random() - 0.5) * 3))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSentimentColor = (value: number) => {
    if (value >= 70) return "text-green-600";
    if (value >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getSentimentLabel = (value: number) => {
    if (value >= 70) return "Bullish";
    if (value >= 40) return "Neutral";
    return "Bearish";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Market Insights</h1>
          <p className="text-muted-foreground">Advanced machine learning predictions and market analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            🤖 AI Models Active
          </Badge>
          <Button variant="outline">Refresh Analysis</Button>
        </div>
      </div>

      {/* Market Sentiment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Overall Market</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                <span className={getSentimentColor(realtimeData.overall)}>
                  {realtimeData.overall.toFixed(0)}%
                </span>
              </div>
              <Badge variant="outline" className={`text-xs ${getSentimentColor(realtimeData.overall)}`}>
                {getSentimentLabel(realtimeData.overall)}
              </Badge>
              <Progress value={realtimeData.overall} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                <span className={getSentimentColor(realtimeData.stocks)}>
                  {realtimeData.stocks.toFixed(0)}%
                </span>
              </div>
              <Badge variant="outline" className={`text-xs ${getSentimentColor(realtimeData.stocks)}`}>
                {getSentimentLabel(realtimeData.stocks)}
              </Badge>
              <Progress value={realtimeData.stocks} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Crypto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                <span className={getSentimentColor(realtimeData.crypto)}>
                  {realtimeData.crypto.toFixed(0)}%
                </span>
              </div>
              <Badge variant="outline" className={`text-xs ${getSentimentColor(realtimeData.crypto)}`}>
                {getSentimentLabel(realtimeData.crypto)}
              </Badge>
              <Progress value={realtimeData.crypto} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Forex</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                <span className={getSentimentColor(realtimeData.forex)}>
                  {realtimeData.forex.toFixed(0)}%
                </span>
              </div>
              <Badge variant="outline" className={`text-xs ${getSentimentColor(realtimeData.forex)}`}>
                {getSentimentLabel(realtimeData.forex)}
              </Badge>
              <Progress value={realtimeData.forex} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Commodities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                <span className={getSentimentColor(realtimeData.commodities)}>
                  {realtimeData.commodities.toFixed(0)}%
                </span>
              </div>
              <Badge variant="outline" className={`text-xs ${getSentimentColor(realtimeData.commodities)}`}>
                {getSentimentLabel(realtimeData.commodities)}
              </Badge>
              <Progress value={realtimeData.commodities} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="patterns">Pattern Analysis</TabsTrigger>
          <TabsTrigger value="news">Market Intelligence</TabsTrigger>
          <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid gap-6">
            {aiPredictions.map((prediction) => (
              <Card key={prediction.symbol} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{prediction.symbol}</CardTitle>
                      <CardDescription>{prediction.name}</CardDescription>
                    </div>
                    <Badge variant={prediction.direction === "bullish" ? "default" : "destructive"}>
                      {prediction.confidence}% Confidence
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Current Price</div>
                      <div className="text-xl font-bold text-foreground">
                        ${prediction.currentPrice.toFixed(2)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">AI Prediction</div>
                      <div className={`text-xl font-bold ${
                        prediction.direction === "bullish" ? "text-green-600" : "text-red-600"
                      }`}>
                        ${prediction.predictedPrice.toFixed(2)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Expected Change</div>
                      <div className={`text-xl font-bold ${
                        prediction.direction === "bullish" ? "text-green-600" : "text-red-600"
                      }`}>
                        {prediction.direction === "bullish" ? "+" : ""}
                        {((prediction.predictedPrice - prediction.currentPrice) / prediction.currentPrice * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Timeframe</div>
                      <div className="text-xl font-bold text-foreground">
                        {prediction.timeframe}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground mb-2">AI Analysis Factors:</div>
                    <div className="flex flex-wrap gap-2">
                      {prediction.reasons.map((reason, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {reason}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="patterns">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patternAnalysis.map((pattern, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{pattern.pattern}</CardTitle>
                    <Badge variant="outline">{pattern.symbol}</Badge>
                  </div>
                  <CardDescription>{pattern.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Success Probability</span>
                      <span className="font-medium text-foreground">{pattern.probability}%</span>
                    </div>
                    <Progress value={pattern.probability} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Target Price</div>
                      <div className="font-bold text-green-600">${pattern.target.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Timeframe</div>
                      <div className="font-bold text-foreground">{pattern.timeframe}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="news">
          <div className="space-y-4">
            {marketNews.map((news) => (
              <Card key={news.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary">{news.title}</CardTitle>
                      <CardDescription className="mt-1">{news.summary}</CardDescription>
                    </div>
                    <Badge variant={news.impact === "bullish" ? "default" : "destructive"} className="ml-4">
                      {news.confidence}% Impact
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{news.source}</span>
                      <span>•</span>
                      <span>{news.time}</span>
                    </div>
                    <div className="flex space-x-1">
                      {news.relevantSymbols.map((symbol) => (
                        <Badge key={symbol} variant="outline" className="text-xs">
                          {symbol}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <AIAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}