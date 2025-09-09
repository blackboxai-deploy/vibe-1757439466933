"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TradingChart } from "@/components/TradingChart";

const features = [
  {
    icon: "🤖",
    title: "AI-Powered Trading",
    description: "Advanced machine learning algorithms analyze market patterns and execute trades automatically",
    stats: "99.2% Accuracy"
  },
  {
    icon: "🔗",
    title: "Multi-Broker Integration",
    description: "Connect seamlessly with Upstocks, Zerodha, Trading212, and 50+ global trading platforms",
    stats: "50+ Brokers"
  },
  {
    icon: "📊",
    title: "Real-Time Analytics",
    description: "Live market data, advanced charting, and comprehensive performance tracking",
    stats: "Live Data"
  },
  {
    icon: "🛡️",
    title: "Risk Management",
    description: "Sophisticated risk controls, stop-loss automation, and portfolio protection",
    stats: "Protected"
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Millisecond execution speeds with cloud-based infrastructure and global servers",
    stats: "< 1ms"
  },
  {
    icon: "📱",
    title: "Mobile Trading",
    description: "Full-featured mobile app with push notifications and on-the-go portfolio management",
    stats: "24/7 Access"
  }
];

const stats = [
  { label: "Active Users", value: 125000, suffix: "+" },
  { label: "Total Profit Generated", value: 45.2, prefix: "$", suffix: "M+" },
  { label: "Average Monthly Return", value: 24.8, suffix: "%" },
  { label: "Supported Brokers", value: 52, suffix: "+" }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-small-white/[0.02] bg-[size:20px_20px]" />
        <div className="container mx-auto px-6 py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🚀 New: AI-Powered Strategy Builder
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
                    Trade Smarter
                  </span>
                  <br />
                  with AI Algorithms
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Revolutionary trading platform that combines artificial intelligence, machine learning, 
                  and advanced algorithms to deliver consistent profitable trades across global markets.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
                    Start Trading Now
                  </Button>
                </Link>
                <Link href="/strategies">
                  <Button size="lg" variant="outline" className="border-2">
                    View Strategies
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-border/50">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {stat.prefix}
                      <AnimatedCounter target={stat.value} />
                      {stat.suffix}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-8">
              <TradingChart />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Powerful Features for 
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Professional Traders</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to build, test, and deploy sophisticated trading algorithms 
              with enterprise-grade security and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{feature.icon}</span>
                    <Badge variant="outline" className="text-xs">
                      {feature.stats}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-green-500">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8 text-white">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Join thousands of successful traders using AI-powered algorithms to generate 
              consistent profits in global markets. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/ai-insights">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View AI Insights
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}