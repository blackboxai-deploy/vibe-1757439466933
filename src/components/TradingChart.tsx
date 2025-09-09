"use client";

import { useEffect, useState } from "react";
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts";

// Generate realistic trading data
const generateTradingData = () => {
  const data = [];
  let price = 150;
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    
    // Simulate price movement with some volatility
    const change = (Math.random() - 0.5) * 10;
    price = Math.max(100, price + change);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Math.round(price * 100) / 100,
      volume: Math.floor(Math.random() * 1000000) + 500000,
      timestamp: date.getTime()
    });
  }

  return data;
};

export function TradingChart() {
  const [data, setData] = useState(generateTradingData());
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        const lastPrice = newData[newData.length - 1].price;
        
        // Update last data point with small movement
        const change = (Math.random() - 0.5) * 2;
        newData[newData.length - 1] = {
          ...newData[newData.length - 1],
          price: Math.round((lastPrice + change) * 100) / 100
        };
        
        return newData;
      });
    }, 2000);

    // Stop animation after initial load
    const animationTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(animationTimer);
    };
  }, []);

  const currentPrice = data[data.length - 1]?.price || 0;
  const previousPrice = data[data.length - 2]?.price || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">AAPL • Apple Inc.</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-2xl font-bold text-foreground">
              ${currentPrice.toFixed(2)}
            </span>
            <span className={`flex items-center text-sm font-medium ${
              priceChange >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {priceChange >= 0 ? '↗' : '↘'} {Math.abs(priceChange).toFixed(2)} ({priceChangePercent}%)
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isAnimating ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-xs text-muted-foreground">
              {isAnimating ? 'Live' : 'Demo'}
            </span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
              domain={['dataMin - 5', 'dataMax + 5']}
              tickFormatter={(value) => `$${value}`}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border/50">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">24h High</div>
          <div className="font-semibold text-green-500">${Math.max(...data.map(d => d.price)).toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">24h Low</div>
          <div className="font-semibold text-red-500">${Math.min(...data.map(d => d.price)).toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Volume</div>
          <div className="font-semibold text-foreground">
            {(data[data.length - 1]?.volume || 0).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}