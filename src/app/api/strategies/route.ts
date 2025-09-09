import { NextRequest, NextResponse } from 'next/server';
import { tradingEngine } from '@/lib/trading-engine';

// GET /api/strategies - Get all strategies
export async function GET() {
  try {
    const strategies = [
      {
        id: 'ai-momentum',
        name: 'AI Momentum Scalper',
        description: 'Advanced machine learning model that identifies short-term momentum patterns',
        category: 'AI/ML',
        risk: 'Medium',
        performance: '+24.3%',
        accuracy: '89.3%',
        timeframe: '1-5 min',
        status: 'Active',
        trades: 128,
        profit: 8247,
        winRate: 89.3
      },
      {
        id: 'ml-trend',
        name: 'ML Trend Following',
        description: 'Deep learning algorithm that detects and follows market trends',
        category: 'AI/ML',
        risk: 'Low',
        performance: '+18.7%',
        accuracy: '93.3%',
        timeframe: '15-60 min',
        status: 'Active',
        trades: 84,
        profit: 6832,
        winRate: 93.3
      },
      {
        id: 'rsi-reversion',
        name: 'RSI Mean Reversion',
        description: 'Classic technical indicator strategy with modern risk management',
        category: 'Technical',
        risk: 'High',
        performance: '-2.1%',
        accuracy: '66.7%',
        timeframe: '5-30 min',
        status: 'Paused',
        trades: 35,
        profit: -432,
        winRate: 66.7
      }
    ];

    return NextResponse.json({ success: true, data: strategies });
  } catch (error) {
    console.error('Error fetching strategies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch strategies' },
      { status: 500 }
    );
  }
}

// POST /api/strategies - Create new strategy
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const strategy = {
      id: `custom_${Date.now()}`,
      name: body.name || 'Custom Strategy',
      type: body.type || 'technical',
      parameters: body.parameters || {},
      riskLevel: body.riskLevel || 'medium',
      active: false
    };

    const success = tradingEngine.addStrategy(strategy);
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        data: strategy,
        message: 'Strategy created successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Strategy already exists' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error creating strategy:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create strategy' },
      { status: 500 }
    );
  }
}

// PUT /api/strategies - Update strategy
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Strategy ID is required' },
        { status: 400 }
      );
    }

    const success = tradingEngine.updateStrategy(id, updateData);
    
    if (success) {
      return NextResponse.json({ 
        success: true,
        message: 'Strategy updated successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Strategy not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error updating strategy:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update strategy' },
      { status: 500 }
    );
  }
}

// DELETE /api/strategies - Delete strategy
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Strategy ID is required' },
        { status: 400 }
      );
    }

    const success = tradingEngine.removeStrategy(id);
    
    if (success) {
      return NextResponse.json({ 
        success: true,
        message: 'Strategy deleted successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Strategy not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error deleting strategy:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete strategy' },
      { status: 500 }
    );
  }
}