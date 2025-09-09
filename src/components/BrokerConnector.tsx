"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";

interface Broker {
  id: string;
  name: string;
  description: string;
  logo: string;
  country: string;
  status: string;
  features: string[];
  fees: string;
  rating: number;
  accounts: number;
}

interface BrokerConnectorProps {
  broker: Broker;
}

export function BrokerConnector({ broker }: BrokerConnectorProps) {
  const [connectionType, setConnectionType] = useState<"api" | "oauth" | "manual">("api");
  const [credentials, setCredentials] = useState({
    apiKey: "",
    apiSecret: "",
    username: "",
    password: "",
    accountId: ""
  });
  const [permissions, setPermissions] = useState({
    readAccount: true,
    readPositions: true,
    readOrders: true,
    placeOrders: false,
    modifyOrders: false,
    cancelOrders: false
  });
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsConnecting(false);
    // Would normally handle actual connection logic here
    alert(`Successfully connected to ${broker.name}!`);
  };

  const getConnectionSteps = () => {
    switch (broker.id) {
      case "upstox":
        return [
          "Log in to your Upstox account",
          "Go to Developer Console",
          "Create a new API application",
          "Copy API Key and Secret",
          "Paste credentials below"
        ];
      case "zerodha":
        return [
          "Log in to Kite Connect",
          "Register your application",
          "Get API credentials",
          "Enable required permissions",
          "Connect using credentials"
        ];
      case "trading212":
        return [
          "Enable API access in Trading 212",
          "Generate API token",
          "Configure permissions",
          "Test connection",
          "Complete setup"
        ];
      default:
        return [
          "Access your broker's developer portal",
          "Create API credentials",
          "Configure permissions",
          "Test connection",
          "Complete integration"
        ];
    }
  };

  return (
    <div className="space-y-6">
      {/* Broker Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <img src={broker.logo} alt={broker.name} className="h-8" />
            <div>
              <CardTitle className="text-lg">{broker.name}</CardTitle>
              <CardDescription>{broker.description}</CardDescription>
            </div>
            <Badge variant="outline">⭐ {broker.rating}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Region: </span>
              <span className="text-foreground">{broker.country}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Fees: </span>
              <span className="text-foreground">{broker.fees}</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm text-muted-foreground">Supported Assets: </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {broker.features.map((feature) => (
                <Badge key={feature} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connection Setup */}
      <Tabs value={connectionType} onValueChange={(value) => setConnectionType(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="api">API Connection</TabsTrigger>
          <TabsTrigger value="oauth">OAuth 2.0</TabsTrigger>
          <TabsTrigger value="manual">Manual Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="space-y-4">
          <Alert>
            <AlertDescription>
              API connection provides the most reliable integration with real-time data access.
              You'll need to create API credentials from your broker's developer portal.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">API Credentials</CardTitle>
              <CardDescription>Enter your {broker.name} API credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  value={credentials.apiKey}
                  onChange={(e) => setCredentials({...credentials, apiKey: e.target.value})}
                  placeholder="Enter your API key"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-secret">API Secret</Label>
                <Input
                  id="api-secret"
                  value={credentials.apiSecret}
                  onChange={(e) => setCredentials({...credentials, apiSecret: e.target.value})}
                  placeholder="Enter your API secret"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-id">Account ID (Optional)</Label>
                <Input
                  id="account-id"
                  value={credentials.accountId}
                  onChange={(e) => setCredentials({...credentials, accountId: e.target.value})}
                  placeholder="Enter your account ID if required"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="oauth" className="space-y-4">
          <Alert>
            <AlertDescription>
              OAuth 2.0 provides secure authentication without sharing credentials.
              Click the button below to authenticate with {broker.name}.
            </AlertDescription>
          </Alert>

          <Card>
            <CardContent className="text-center py-8">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-lg font-semibold mb-2">OAuth Authentication</h3>
              <p className="text-muted-foreground mb-4">
                You'll be redirected to {broker.name} to authorize the connection
              </p>
              <Button className="w-full">
                Authorize with {broker.name}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Alert>
            <AlertDescription>
              Manual setup allows you to configure the connection step-by-step.
              This method provides more control but requires additional setup time.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Manual Configuration</CardTitle>
              <CardDescription>Step-by-step setup process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {getConnectionSteps().map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="text-sm text-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Permissions</CardTitle>
          <CardDescription>Configure what actions TradeMaster can perform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-foreground">Read Permissions</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="read-account"
                    checked={permissions.readAccount}
                    onCheckedChange={(checked) => 
                      setPermissions({...permissions, readAccount: checked as boolean})
                    }
                  />
                  <Label htmlFor="read-account" className="text-sm">Account Information</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="read-positions"
                    checked={permissions.readPositions}
                    onCheckedChange={(checked) => 
                      setPermissions({...permissions, readPositions: checked as boolean})
                    }
                  />
                  <Label htmlFor="read-positions" className="text-sm">Positions & Holdings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="read-orders"
                    checked={permissions.readOrders}
                    onCheckedChange={(checked) => 
                      setPermissions({...permissions, readOrders: checked as boolean})
                    }
                  />
                  <Label htmlFor="read-orders" className="text-sm">Order History</Label>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-foreground">Trading Permissions</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="place-orders"
                    checked={permissions.placeOrders}
                    onCheckedChange={(checked) => 
                      setPermissions({...permissions, placeOrders: checked as boolean})
                    }
                  />
                  <Label htmlFor="place-orders" className="text-sm">Place Orders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="modify-orders"
                    checked={permissions.modifyOrders}
                    onCheckedChange={(checked) => 
                      setPermissions({...permissions, modifyOrders: checked as boolean})
                    }
                  />
                  <Label htmlFor="modify-orders" className="text-sm">Modify Orders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cancel-orders"
                    checked={permissions.cancelOrders}
                    onCheckedChange={(checked) => 
                      setPermissions({...permissions, cancelOrders: checked as boolean})
                    }
                  />
                  <Label htmlFor="cancel-orders" className="text-sm">Cancel Orders</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connection Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button variant="outline">Test Connection</Button>
        <div className="flex space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleConnect} disabled={isConnecting}>
            {isConnecting ? "Connecting..." : `Connect to ${broker.name}`}
          </Button>
        </div>
      </div>
    </div>
  );
}