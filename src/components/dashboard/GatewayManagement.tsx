
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Settings, Zap, DollarSign, Globe, Shield } from 'lucide-react';

interface Gateway {
  id: string;
  name: string;
  provider: string;
  status: 'active' | 'inactive' | 'maintenance';
  priority: number;
  successRate: number;
  dailyLimit: number;
  currentUsage: number;
  responseTime: number;
  fees: number;
  region: string;
}

export const GatewayManagement = () => {
  const [gateways, setGateways] = useState<Gateway[]>([
    {
      id: '1',
      name: 'Stripe Gateway',
      provider: 'Stripe',
      status: 'active',
      priority: 1,
      successRate: 99.2,
      dailyLimit: 50000,
      currentUsage: 32150,
      responseTime: 120,
      fees: 2.9,
      region: 'Global'
    },
    {
      id: '2',
      name: 'PayPal Gateway',
      provider: 'PayPal',
      status: 'active',
      priority: 2,
      successRate: 97.8,
      dailyLimit: 30000,
      currentUsage: 18230,
      responseTime: 180,
      fees: 3.4,
      region: 'US/EU'
    },
    {
      id: '3',
      name: 'Square Gateway',
      provider: 'Square',
      status: 'inactive',
      priority: 3,
      successRate: 98.5,
      dailyLimit: 25000,
      currentUsage: 0,
      responseTime: 150,
      fees: 2.6,
      region: 'US'
    },
    {
      id: '4',
      name: 'Razorpay Gateway',
      provider: 'Razorpay',
      status: 'maintenance',
      priority: 4,
      successRate: 96.3,
      dailyLimit: 40000,
      currentUsage: 12500,
      responseTime: 200,
      fees: 2.0,
      region: 'India'
    }
  ]);

  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);

  const toggleGatewayStatus = (id: string) => {
    setGateways(prev => prev.map(gateway => 
      gateway.id === id 
        ? { ...gateway, status: gateway.status === 'active' ? 'inactive' : 'active' }
        : gateway
    ));
  };

  const updatePriority = (id: string, priority: number) => {
    setGateways(prev => prev.map(gateway => 
      gateway.id === id ? { ...gateway, priority } : gateway
    ));
  };

  const testConnection = (id: string) => {
    alert(`Testing connection for gateway ${id}...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gateway Management</h1>
          <p className="text-gray-600">Manage payment gateways, priorities, and routing</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Bulk Actions
          </Button>
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Add Gateway
          </Button>
        </div>
      </div>

      {/* Gateway Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Gateways</p>
                <p className="text-2xl font-bold text-green-600">
                  {gateways.filter(g => g.status === 'active').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Volume</p>
                <p className="text-2xl font-bold text-blue-600">$2.3M</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Success Rate</p>
                <p className="text-2xl font-bold text-purple-600">98.2%</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Regions</p>
                <p className="text-2xl font-bold text-orange-600">3</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gateway List */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Gateways</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gateways.map((gateway) => (
              <div key={gateway.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Switch 
                      checked={gateway.status === 'active'}
                      onCheckedChange={() => toggleGatewayStatus(gateway.id)}
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{gateway.name}</h3>
                      <p className="text-sm text-gray-600">{gateway.provider}</p>
                    </div>
                    <Badge className={getStatusColor(gateway.status)}>
                      {gateway.status}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => testConnection(gateway.id)}>
                      Test Connection
                    </Button>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Priority (1-10)</label>
                    <div className="mt-2">
                      <Slider
                        value={[gateway.priority]}
                        onValueChange={(value) => updatePriority(gateway.id, value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <span className="text-sm text-gray-500">Current: {gateway.priority}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Daily Limit</label>
                    <Input 
                      type="number" 
                      value={gateway.dailyLimit}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Fee Rate (%)</label>
                    <Input 
                      type="number" 
                      value={gateway.fees}
                      step="0.1"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2 border-t">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-lg font-semibold text-green-600">{gateway.successRate}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Usage Today</p>
                    <p className="text-lg font-semibold">
                      {gateway.currentUsage.toLocaleString()} / {gateway.dailyLimit.toLocaleString()}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(gateway.currentUsage / gateway.dailyLimit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Response Time</p>
                    <p className="text-lg font-semibold">{gateway.responseTime}ms</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Region</p>
                    <p className="text-lg font-semibold">{gateway.region}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
