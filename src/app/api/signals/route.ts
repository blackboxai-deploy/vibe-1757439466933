import { NextRequest, NextResponse } from 'next/server';
import { tradingEngine } from '@/lib/trading-engine';

// Mock market data for signal generation
const mockMarketData = [
  { symbol: 'AAPL', price: 175.32, volume: 45230000, timestamp: Date.now() },
  { symbol: 'TSLA', price: 248.67, volume: 23450000, timestamp: Date.now() },
  { symbol: 'NVDA', price: 421.88, volume: 34560000, timestamp: Date.now() },
  { symbol: 'MSFT', price: 378.45, volume: 28740000, timestamp: Date.now() },
  { symbol: 'GOOGL', price: 142.56, volume: 19870000, timestamp: Date.now() }
];

// GET /api/signals - Get recent trading signals
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const strategy = searchParams.get('strategy');
    
    // Generate fresh signals
    const signals = await tradingEngine.generateSignals(mockMarketData);
    
    let filteredSignals = signals;
    
    // Filter by strategy if specified
    if (strategy) {
      filteredSignals = signals.filter(signal => 
        signal.strategy.toLowerCase().includes(strategy.toLowerCase())
      );
    }
    
    // Get recent signals from history
    const recentSignals = tradingEngine.getRecentSignals(limit);
    
    // Generate combined signals (unused for now, using mock data)
    // const allSignals = [...filteredSignals, ...recentSignals]
    //   .sort((a, b) => b.timestamp - a.timestamp)
    //   .slice(0, limit);

    // Add some mock historical signals for demo
    const mockSignals = [
      {
        id: 1,
        symbol: "AAPL",
        action: "BUY" as const,
        confidence: 92,
        price: 175.32,
        quantity: 100,
        strategy: "AI Momentum",
        timestamp: Date.now() - 120000,
        time: "2 minutes ago",
        reasons: ["Bullish momentum detected", "Strong AI confidence signal", "Volume surge detected"]
      },
      {
        id: 2,
        symbol: "TSLA",
        action: "SELL" as const,
        confidence: 87,
        price: 248.67,
        quantity: 50,
        strategy: "ML Trend",
        timestamp: Date.now() - 300000,
        time: "5 minutes ago",
        reasons: ["Bearish momentum detected", "Risk-off sentiment", "Overbought conditions"]
      },
      {
        id: 3,
        symbol: "NVDA",
        action: "BUY" as const,
        confidence: 95,
        price: 421.88,
        quantity: 25,
        strategy: "AI Momentum",
        timestamp: Date.now() - 480000,
        time: "8 minutes ago",
        reasons: ["Strong AI confidence signal", "Technical indicators align", "Bullish momentum detected"]
      }
    ];

    return NextResponse.json({ 
      success: true, 
      data: mockSignals,
      meta: {
        total: mockSignals.length,
        generated: signals.length,
        timestamp: Date.now()
      }
    });
  } catch (error) {
    console.error('Error generating signals:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate signals' },
      { status: 500 }
    );
  }
}

// POST /api/signals - Execute trading signal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const signal = {
      symbol: body.symbol,
      action: body.action,
      confidence: body.confidence || 80,
      price: body.price,
      quantity: body.quantity || 100,
      timestamp: Date.now(),
      strategy: body.strategy || 'Manual',
      reasons: body.reasons || ['Manual execution']
    };

    // Validate signal
    if (!signal.symbol || !signal.action || !signal.price) {
      return NextResponse.json(
        { success: false, error: 'Missing required signal parameters' },
        { status: 400 }
      );
    }

    if (!['BUY', 'SELL'].includes(signal.action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Must be BUY or SELL' },
        { status: 400 }
      );
    }

    // Execute the signal
    const success = await tradingEngine.executeSignal(signal);
    
    if (success) {
      return NextResponse.json({ 
        success: true,
        data: {
          signalId: `signal_${Date.now()}`,
          executedAt: Date.now(),
          status: 'executed',
          ...signal
        },
        message: 'Signal executed successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to execute signal' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error executing signal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to execute signal' },
      { status: 500 }
    );
  }
}

// PUT /api/signals - Update signal (for backtesting)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Mock signal update for backtesting
    const updatedSignal = {
      id: body.id,
      status: body.status || 'updated',
      performance: body.performance || 0,
      updatedAt: Date.now()
    };

    return NextResponse.json({ 
      success: true,
      data: updatedSignal,
      message: 'Signal updated successfully'
    });
  } catch (error) {
    console.error('Error updating signal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update signal' },
      { status: 500 }
    );
  }
}