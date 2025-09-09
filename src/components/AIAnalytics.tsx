"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

const modelPerformance = [
  { name: "LSTM Price Predictor", accuracy: 91.2, trades: 1247, profit: 18.7 },
  { name: "Sentiment Analyzer", accuracy: 87.9, trades: 892, profit: 14.3 },
  { name: "Pattern Recognizer", accuracy: 94.1, trades: 634, profit: 22.1 },
  { name: "Risk Optimizer", accuracy: 88.6, trades: 1056, profit: 16.8 },
  { name: "Volume Predictor", accuracy: 85.3, trades: 723, profit: 12.9 },
];

const predictionAccuracy = [
  { period: "1H", accuracy: 89.2, predictions: 245 },
  { period: "4H", accuracy: 91.7, predictions: 186 },
  { period: "1D", accuracy: 93.4, predictions: 98 },
  { period: "1W", accuracy: 87.1, predictions: 42 },
  { period: "1M", accuracy: 82.6, predictions: 18 },
];

const marketCorrelations = [
  { asset1: "SPY", asset2: "QQQ", correlation: 0.87, strength: "Strong" },
  { asset1: "BTC", asset2: "ETH", correlation: 0.79, strength: "Strong" },
  { asset1: "USD", asset2: "EUR", correlation: -0.65, strength: "Moderate" },
  { asset1: "GOLD", asset2: "USD", correlation: -0.72, strength: "Strong" },
  { asset1: "OIL", asset2: "SPY", correlation: 0.34, strength: "Weak" },
];

const volatilityData = [
  { date: "Mon", realized: 0.23, predicted: 0.25, vix: 18.5 },
  { date: "Tue", realized: 0.28, predicted: 0.27, vix: 19.2 },
  { date: "Wed", realized: 0.31, predicted: 0.29, vix: 21.1 },
  { date: "Thu", realized: 0.26, predicted: 0.28, vix: 20.3 },
  { date: "Fri", realized: 0.24, predicted: 0.26, vix: 18.9 },
  { date: "Sat", realized: 0.22, predicted: 0.24, vix: 17.8 },
  { date: "Sun", realized: 0.21, predicted: 0.23, vix: 17.2 },
];

export function AIAnalytics() {
  return (
    <div className="space-y-6">
      {/* Model Performance Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Model Performance</CardTitle>
            <CardDescription>Real-time performance metrics for all active models</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {modelPerformance.map((model, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{model.name}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {model.accuracy}% accuracy
                    </Badge>
                    <Badge variant={model.profit >= 15 ? "default" : "secondary"} className="text-xs">
                      +{model.profit}% profit
                    </Badge>
                  </div>
                </div>
                <Progress value={model.accuracy} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {model.trades} predictions made
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prediction Accuracy by Timeframe</CardTitle>
            <CardDescription>Model accuracy across different prediction horizons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={predictionAccuracy}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="period" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                    domain={[70, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Bar dataKey="accuracy" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Volatility Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Volatility Forecasting</CardTitle>
          <CardDescription>AI-powered volatility prediction vs realized volatility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volatilityData}>
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
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                />
                <Line
                  type="monotone"
                  dataKey="realized"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#3b82f6' }}
                  name="Realized Volatility"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: '#10b981' }}
                  name="AI Predicted"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm text-muted-foreground">Realized Volatility</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-px bg-green-500 border-dashed" />
              <span className="text-sm text-muted-foreground">AI Prediction</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Correlations */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Asset Correlation Matrix</CardTitle>
            <CardDescription>Real-time correlation analysis between major assets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {marketCorrelations.map((corr, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">{corr.asset1}</Badge>
                    <span className="text-muted-foreground">↔</span>
                    <Badge variant="outline" className="text-xs">{corr.asset2}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">
                      {corr.correlation > 0 ? '+' : ''}{corr.correlation.toFixed(2)}
                    </span>
                    <Badge variant={
                      Math.abs(corr.correlation) > 0.7 ? "default" :
                      Math.abs(corr.correlation) > 0.4 ? "secondary" : "outline"
                    } className="text-xs">
                      {corr.strength}
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={Math.abs(corr.correlation) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI System Health</CardTitle>
            <CardDescription>Real-time monitoring of AI infrastructure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Data Pipeline</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Healthy</span>
                </div>
              </div>
              <Progress value={98} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Model Training</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Active</span>
                </div>
              </div>
              <Progress value={87} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Prediction Engine</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Optimal</span>
                </div>
              </div>
              <Progress value={94} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Risk Analysis</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Warning</span>
                </div>
              </div>
              <Progress value={76} className="h-2" />
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-foreground">99.8%</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">2.1ms</div>
                  <div className="text-xs text-muted-foreground">Latency</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Analytics Dashboard</CardTitle>
          <CardDescription>Deep learning insights and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Neural Network Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Training Loss</span>
                  <span className="font-medium text-green-600">0.0234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Validation Loss</span>
                  <span className="font-medium text-green-600">0.0267</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">F1 Score</span>
                  <span className="font-medium text-foreground">0.912</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Learning Rate</span>
                  <span className="font-medium text-foreground">0.001</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Data Quality</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Completeness</span>
                  <span className="font-medium text-green-600">99.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Feature Stability</span>
                  <span className="font-medium text-green-600">98.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Anomaly Rate</span>
                  <span className="font-medium text-yellow-600">0.12%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Missing Values</span>
                  <span className="font-medium text-foreground">0.03%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Model Drift</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Feature Drift</span>
                  <span className="font-medium text-green-600">Low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Concept Drift</span>
                  <span className="font-medium text-yellow-600">Moderate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Performance Drift</span>
                  <span className="font-medium text-green-600">Stable</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Retrain</span>
                  <span className="font-medium text-foreground">2h ago</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}