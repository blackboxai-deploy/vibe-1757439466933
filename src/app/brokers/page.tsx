"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { BrokerConnector } from "@/components/BrokerConnector";

const brokers = [
  {
    id: "upstox",
    name: "Upstox",
    description: "India's leading discount broker with advanced trading technology",
    logo: "https://placehold.co/120x60?text=Upstox+Logo",
    country: "India",
    status: "connected",
    features: ["Stocks", "Options", "Futures", "Currency"],
    fees: "₹20 per trade",
    rating: 4.5,
    accounts: 1200000
  },
  {
    id: "zerodha",
    name: "Zerodha Kite",
    description: "India's largest retail broker with innovative trading platform",
    logo: "https://placehold.co/120x60?text=Zerodha+Kite+Logo",
    country: "India", 
    status: "available",
    features: ["Stocks", "Options", "Futures", "Commodity", "Currency"],
    fees: "₹20 per trade",
    rating: 4.7,
    accounts: 6200000
  },
  {
    id: "trading212",
    name: "Trading 212",
    description: "Commission-free trading with powerful analysis tools",
    logo: "https://placehold.co/120x60?text=Trading212+Logo",
    country: "UK/EU",
    status: "available", 
    features: ["Stocks", "ETFs", "Forex", "CFDs"],
    fees: "Commission-free",
    rating: 4.3,
    accounts: 1800000
  },
  {
    id: "interactive-brokers",
    name: "Interactive Brokers",
    description: "Professional trading platform with global market access",
    logo: "https://placehold.co/120x60?text=Interactive+Brokers+Logo",
    country: "USA",
    status: "available",
    features: ["Stocks", "Options", "Futures", "Forex", "Bonds"],
    fees: "$0.005 per share",
    rating: 4.6,
    accounts: 1400000
  },
  {
    id: "td-ameritrade",
    name: "TD Ameritrade",
    description: "Comprehensive trading platform with research tools",
    logo: "https://placehold.co/120x60?text=TD+Ameritrade+Logo",
    country: "USA",
    status: "available",
    features: ["Stocks", "Options", "Futures", "Forex"],
    fees: "$0 stock trades",
    rating: 4.4,
    accounts: 12000000
  },
  {
    id: "binance",
    name: "Binance",
    description: "World's largest cryptocurrency exchange",
    logo: "https://placehold.co/120x60?text=Binance+Logo",
    country: "Global",
    status: "connected",
    features: ["Crypto Spot", "Crypto Futures", "Options"],
    fees: "0.1% maker/taker",
    rating: 4.2,
    accounts: 120000000
  },
  {
    id: "alpaca",
    name: "Alpaca Trading",
    description: "API-first broker designed for algorithmic trading",
    logo: "https://placehold.co/120x60?text=Alpaca+Trading+Logo", 
    country: "USA",
    status: "available",
    features: ["Stocks", "ETFs", "Crypto"],
    fees: "Commission-free",
    rating: 4.1,
    accounts: 500000
  },
  {
    id: "ig",
    name: "IG Group",
    description: "Global leader in online trading with 45+ years experience",
    logo: "https://placehold.co/120x60?text=IG+Group+Logo",
    country: "UK/Global",
    status: "available",
    features: ["Stocks", "Forex", "Indices", "Commodities"],
    fees: "Variable spreads",
    rating: 4.5,
    accounts: 295000
  }
];

export default function BrokersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const filteredBrokers = brokers.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         broker.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "all" || 
                         broker.country.toLowerCase().includes(selectedRegion.toLowerCase());
    return matchesSearch && matchesRegion;
  });

  const connectedBrokers = brokers.filter(broker => broker.status === "connected");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Broker Integration</h1>
          <p className="text-muted-foreground">Connect with global trading platforms and manage your accounts</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            {connectedBrokers.length} Connected
          </Badge>
          <Button variant="outline">Refresh Connections</Button>
        </div>
      </div>

      {/* Connected Brokers Summary */}
      {connectedBrokers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Connected Accounts</CardTitle>
            <CardDescription>Your active broker connections and account status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {connectedBrokers.map((broker) => (
                <div key={broker.id} className="p-4 rounded-lg border border-green-200 bg-green-50/50 dark:bg-green-950/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <img src={broker.logo} alt={broker.name} className="h-6" />
                      <span className="font-medium text-foreground">{broker.name}</span>
                    </div>
                    <Badge variant="default" className="text-xs">Connected</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Balance: $45,230.50 • Active: Yes
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">Settings</Button>
                    <Button variant="destructive" size="sm" className="flex-1">Disconnect</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search brokers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label>Region:</Label>
              <div className="flex space-x-2">
                <Button 
                  variant={selectedRegion === "all" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedRegion("all")}
                >
                  All
                </Button>
                <Button 
                  variant={selectedRegion === "india" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedRegion("india")}
                >
                  India
                </Button>
                <Button 
                  variant={selectedRegion === "usa" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedRegion("usa")}
                >
                  USA
                </Button>
                <Button 
                  variant={selectedRegion === "uk" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedRegion("uk")}
                >
                  UK/EU
                </Button>
                <Button 
                  variant={selectedRegion === "global" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedRegion("global")}
                >
                  Global
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Brokers */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Available Brokers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrokers.map((broker) => (
            <Card key={broker.id} className={`group hover:shadow-lg transition-all duration-300 ${
              broker.status === "connected" ? "border-green-200" : "border-border"
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <img src={broker.logo} alt={broker.name} className="h-8" />
                  <Badge variant={
                    broker.status === "connected" ? "default" : "outline"
                  }>
                    {broker.status === "connected" ? "Connected" : "Available"}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{broker.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {broker.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Region: </span>
                      <span className="text-foreground">{broker.country}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fees: </span>
                      <span className="text-foreground">{broker.fees}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rating: </span>
                      <span className="text-foreground">⭐ {broker.rating}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Users: </span>
                      <span className="text-foreground">{(broker.accounts / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Supported Assets:</div>
                    <div className="flex flex-wrap gap-1">
                      {broker.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    {broker.status === "connected" ? (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Manage
                        </Button>
                        <Button variant="destructive" size="sm" className="flex-1">
                          Disconnect
                        </Button>
                      </div>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                            Connect {broker.name}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Connect to {broker.name}</DialogTitle>
                            <DialogDescription>
                              Set up your {broker.name} account integration
                            </DialogDescription>
                          </DialogHeader>
                          <BrokerConnector broker={broker} />
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBrokers.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Brokers Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or region filters
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setSelectedRegion("all");
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}