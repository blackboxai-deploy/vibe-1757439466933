// TradeMaster AI Trading Engine
// Core algorithm execution and strategy management

export interface TradingSignal {
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  price: number;
  quantity: number;
  timestamp: number;
  strategy: string;
  reasons: string[];
}

export interface StrategyConfig {
  id: string;
  name: string;
  type: 'technical' | 'ai' | 'fundamental';
  parameters: Record<string, any>;
  riskLevel: 'low' | 'medium' | 'high';
  active: boolean;
}

export interface TradingPosition {
  id: string;
  symbol: string;
  side: 'long' | 'short';
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  openTime: number;
  strategy: string;
}

export class TradingEngine {
  private strategies: Map<string, StrategyConfig> = new Map();
  private positions: Map<string, TradingPosition> = new Map();
  private signals: TradingSignal[] = [];
  
  constructor() {
    this.initializeDefaultStrategies();
  }

  private initializeDefaultStrategies() {
    // AI Momentum Scalper
    this.strategies.set('ai-momentum', {
      id: 'ai-momentum',
      name: 'AI Momentum Scalper',
      type: 'ai',
      parameters: {
        timeframe: '5m',
        confidenceThreshold: 0.8,
        maxPositions: 3,
        stopLoss: 0.02,
        takeProfit: 0.04
      },
      riskLevel: 'medium',
      active: true
    });

    // ML Trend Following
    this.strategies.set('ml-trend', {
      id: 'ml-trend',
      name: 'ML Trend Following',
      type: 'ai',
      parameters: {
        timeframe: '15m',
        trendStrength: 0.7,
        maxDrawdown: 0.1,
        positionSize: 0.1
      },
      riskLevel: 'low',
      active: true
    });

    // RSI Mean Reversion
    this.strategies.set('rsi-reversion', {
      id: 'rsi-reversion',
      name: 'RSI Mean Reversion',
      type: 'technical',
      parameters: {
        rsiPeriod: 14,
        oversoldLevel: 30,
        overboughtLevel: 70,
        timeframe: '1h'
      },
      riskLevel: 'high',
      active: false
    });
  }

  async generateSignals(marketData: any[]): Promise<TradingSignal[]> {
    const signals: TradingSignal[] = [];
    
    for (const [strategyId, strategy] of this.strategies) {
      if (!strategy.active) continue;
      
      try {
        const strategySignals = await this.executeStrategy(strategy, marketData);
        signals.push(...strategySignals);
      } catch (error) {
        console.error(`Error executing strategy ${strategyId}:`, error);
      }
    }
    
    // Store signals for history
    this.signals.push(...signals);
    
    // Keep only last 1000 signals
    if (this.signals.length > 1000) {
      this.signals = this.signals.slice(-1000);
    }
    
    return signals;
  }

  private async executeStrategy(strategy: StrategyConfig, marketData: any[]): Promise<TradingSignal[]> {
    switch (strategy.type) {
      case 'ai':
        return this.executeAIStrategy(strategy, marketData);
      case 'technical':
        return this.executeTechnicalStrategy(strategy, marketData);
      case 'fundamental':
        return this.executeFundamentalStrategy(strategy, marketData);
      default:
        return [];
    }
  }

  private async executeAIStrategy(strategy: StrategyConfig, marketData: any[]): Promise<TradingSignal[]> {
    const signals: TradingSignal[] = [];
    
    // Simulate AI model predictions
    for (const data of marketData.slice(-5)) { // Process last 5 data points
      const confidence = Math.random() * 0.4 + 0.6; // 60-100% confidence
      
      if (confidence >= strategy.parameters.confidenceThreshold) {
        // Simulate AI decision making
        const action = this.generateAIAction(data, strategy);
        
        if (action !== 'HOLD') {
          signals.push({
            symbol: data.symbol,
            action,
            confidence: confidence * 100,
            price: data.price,
            quantity: this.calculatePositionSize(data.price, strategy),
            timestamp: Date.now(),
            strategy: strategy.name,
            reasons: this.generateAIReasons(action, confidence)
          });
        }
      }
    }
    
    return signals;
  }

  private generateAIAction(_data: any, strategy: StrategyConfig): 'BUY' | 'SELL' | 'HOLD' {
    // Simulate AI model decision
    const momentum = Math.random() - 0.5; // -0.5 to 0.5
    const volatility = Math.random() * 0.3; // 0 to 0.3
    
    if (strategy.id === 'ai-momentum') {
      if (momentum > 0.2) return 'BUY';
      if (momentum < -0.2) return 'SELL';
    } else if (strategy.id === 'ml-trend') {
      if (momentum > 0.1 && volatility < 0.2) return 'BUY';
      if (momentum < -0.1 && volatility < 0.2) return 'SELL';
    }
    
    return 'HOLD';
  }

  private generateAIReasons(action: 'BUY' | 'SELL', confidence: number): string[] {
    const reasons = [];
    
    if (action === 'BUY') {
      reasons.push('Bullish momentum detected');
      if (confidence > 0.85) reasons.push('Strong AI confidence signal');
      reasons.push('Technical indicators align');
      if (Math.random() > 0.5) reasons.push('Volume surge detected');
    } else if (action === 'SELL') {
      reasons.push('Bearish momentum detected');
      if (confidence > 0.85) reasons.push('High probability reversal');
      reasons.push('Risk-off sentiment');
      if (Math.random() > 0.5) reasons.push('Overbought conditions');
    }
    
    return reasons;
  }

  private async executeTechnicalStrategy(strategy: StrategyConfig, marketData: any[]): Promise<TradingSignal[]> {
    const signals: TradingSignal[] = [];
    
    if (strategy.id === 'rsi-reversion') {
      for (const data of marketData.slice(-3)) {
        const rsi = this.calculateRSI(marketData, data.symbol);
        
        if (rsi < strategy.parameters.oversoldLevel) {
          signals.push({
            symbol: data.symbol,
            action: 'BUY',
            confidence: 75 + Math.random() * 15, // 75-90%
            price: data.price,
            quantity: this.calculatePositionSize(data.price, strategy),
            timestamp: Date.now(),
            strategy: strategy.name,
            reasons: [`RSI oversold at ${rsi.toFixed(1)}`, 'Mean reversion expected']
          });
        } else if (rsi > strategy.parameters.overboughtLevel) {
          signals.push({
            symbol: data.symbol,
            action: 'SELL',
            confidence: 75 + Math.random() * 15,
            price: data.price,
            quantity: this.calculatePositionSize(data.price, strategy),
            timestamp: Date.now(),
            strategy: strategy.name,
            reasons: [`RSI overbought at ${rsi.toFixed(1)}`, 'Mean reversion expected']
          });
        }
      }
    }
    
    return signals;
  }

  private async executeFundamentalStrategy(_strategy: StrategyConfig, _marketData: any[]): Promise<TradingSignal[]> {
    // Placeholder for fundamental analysis
    return [];
  }

  private calculateRSI(_data: any[], _symbol: string): number {
    // Simplified RSI calculation
    return 30 + Math.random() * 40; // Mock RSI between 30-70
  }

  private calculatePositionSize(price: number, strategy: StrategyConfig): number {
    // Simplified position sizing
    const baseSize = strategy.parameters.positionSize || 0.1;
    return Math.floor((10000 * baseSize) / price); // $10k * position size / price
  }

  async executeSignal(signal: TradingSignal): Promise<boolean> {
    try {
      // Simulate trade execution
      const position: TradingPosition = {
        id: `pos_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        symbol: signal.symbol,
        side: signal.action === 'BUY' ? 'long' : 'short',
        quantity: signal.quantity,
        entryPrice: signal.price,
        currentPrice: signal.price,
        pnl: 0,
        pnlPercent: 0,
        openTime: signal.timestamp,
        strategy: signal.strategy
      };
      
      this.positions.set(position.id, position);
      
      console.log(`Trade executed: ${signal.action} ${signal.quantity} ${signal.symbol} at $${signal.price}`);
      return true;
    } catch (error) {
      console.error('Error executing trade:', error);
      return false;
    }
  }

  updatePositions(marketData: any[]) {
    for (const [, position] of this.positions) {
      const currentData = marketData.find(d => d.symbol === position.symbol);
      if (currentData) {
        position.currentPrice = currentData.price;
        
        if (position.side === 'long') {
          position.pnl = (position.currentPrice - position.entryPrice) * position.quantity;
        } else {
          position.pnl = (position.entryPrice - position.currentPrice) * position.quantity;
        }
        
        position.pnlPercent = (position.pnl / (position.entryPrice * position.quantity)) * 100;
      }
    }
  }

  getActivePositions(): TradingPosition[] {
    return Array.from(this.positions.values());
  }

  getRecentSignals(count: number = 10): TradingSignal[] {
    return this.signals.slice(-count);
  }

  getStrategy(id: string): StrategyConfig | undefined {
    return this.strategies.get(id);
  }

  updateStrategy(id: string, config: Partial<StrategyConfig>): boolean {
    const strategy = this.strategies.get(id);
    if (strategy) {
      Object.assign(strategy, config);
      return true;
    }
    return false;
  }

  addStrategy(config: StrategyConfig): boolean {
    if (this.strategies.has(config.id)) {
      return false; // Strategy already exists
    }
    this.strategies.set(config.id, config);
    return true;
  }

  removeStrategy(id: string): boolean {
    return this.strategies.delete(id);
  }
}

// Export a singleton instance
export const tradingEngine = new TradingEngine();