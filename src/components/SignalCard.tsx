"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Signal {
  id: number;
  symbol: string;
  action: "BUY" | "SELL";
  confidence: number;
  price: number;
  strategy: string;
  time: string;
}

interface SignalCardProps {
  signal: Signal;
}

export function SignalCard({ signal }: SignalCardProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10 hover:bg-muted/20 transition-colors">
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
          signal.action === "BUY" ? "bg-green-500" : "bg-red-500"
        }`}>
          {signal.action === "BUY" ? "↗" : "↘"}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-foreground">{signal.symbol}</span>
            <Badge variant={signal.action === "BUY" ? "default" : "destructive"} className="text-xs">
              {signal.action}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">{signal.strategy} • {signal.time}</div>
        </div>
      </div>
      
      <div className="text-right space-y-1">
        <div className="font-medium text-foreground">${signal.price}</div>
        <div className="flex items-center space-x-2">
          <div className="text-xs text-muted-foreground">
            {signal.confidence}% confidence
          </div>
          <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
            Execute
          </Button>
        </div>
      </div>
    </div>
  );
}