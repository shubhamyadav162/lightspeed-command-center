
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, AlertTriangle, CheckCircle, Clock, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface Transaction {
  id: string;
  timestamp: string;
  gateway: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  responseTime: number;
  client: string;
}

interface SystemMetric {
  timestamp: string;
  cpu: number;
  memory: number;
  network: number;
  transactions: number;
}

export const RealTimeMonitoring = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'txn_001',
      timestamp: '2024-06-10 16:45:32',
      gateway: 'Stripe',
      amount: 150.00,
      status: 'success',
      responseTime: 120,
      client: 'ShopCorp'
    },
    {
      id: 'txn_002',
      timestamp: '2024-06-10 16:45:28',
      gateway: 'PayPal',
      amount: 89.99,
      status: 'success',
      responseTime: 180,
      client: 'TechStart'
    },
    {
      id: 'txn_003',
      timestamp: '2024-06-10 16:45:25',
      gateway: 'Square',
      amount: 299.50,
      status: 'failed',
      responseTime: 450,
      client: 'RetailPro'
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { timestamp: '16:40', cpu: 45, memory: 62, network: 78, transactions: 145 },
    { timestamp: '16:41', cpu: 52, memory: 65, network: 82, transactions: 167 },
    { timestamp: '16:42', cpu: 48, memory: 63, network: 75, transactions: 134 },
    { timestamp: '16:43', cpu: 55, memory: 68, network: 88, transactions: 189 },
    { timestamp: '16:44', cpu: 42, memory: 61, network: 71, transactions: 156 },
    { timestamp: '16:45', cpu: 49, memory: 64, network: 79, transactions: 172 }
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, level: 'warning', message: 'High response time detected on PayPal gateway', timestamp: '16:44:15' },
    { id: 2, level: 'info', message: 'Square gateway connection restored', timestamp: '16:42:30' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Add new transaction
      const newTransaction: Transaction = {
        id: `txn_${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        gateway: ['Stripe', 'PayPal', 'Square', 'Razorpay'][Math.floor(Math.random() * 4)],
        amount: Math.random() * 500 + 10,
        status: Math.random() > 0.1 ? 'success' : Math.random() > 0.5 ? 'failed' : 'pending',
        responseTime: Math.random() * 300 + 100,
        client: ['ShopCorp', 'TechStart', 'RetailPro', 'BusinessInc'][Math.floor(Math.random() * 4)]
      };

      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);

      // Update system metrics
      const newMetric: SystemMetric = {
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
        cpu: Math.random() * 30 + 40,
        memory: Math.random() * 20 + 55,
        network: Math.random() * 30 + 65,
        transactions: Math.random() * 50 + 120
      };

      setSystemMetrics(prev => [...prev.slice(1), newMetric]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const successRate = ((transactions.filter(t => t.status === 'success').length / transactions.length) * 100).toFixed(1);
  const avgResponseTime = (transactions.reduce((sum, t) => sum + t.responseTime, 0) / transactions.length).toFixed(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Real-time Monitoring</h1>
          <p className="text-gray-600">Live system performance and transaction monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live</span>
          </div>
          <Button variant="outline">Export Data</Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Transactions/min</p>
                <p className="text-2xl font-bold text-blue-600">156</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+12%</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">{successRate}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+0.3%</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold text-purple-600">{avgResponseTime}ms</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="w-3 h-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">-5ms</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">{alerts.length}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-600">Last: 2m ago</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory %" />
                <Line type="monotone" dataKey="network" stroke="#ffc658" name="Network %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="transactions" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Live Transaction Stream */}
      <Card>
        <CardHeader>
          <CardTitle>Live Transaction Stream</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Gateway</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Response Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-sm font-mono">{transaction.timestamp}</TableCell>
                  <TableCell className="text-sm font-mono">{transaction.id}</TableCell>
                  <TableCell>
                    <span className="font-medium">{transaction.gateway}</span>
                  </TableCell>
                  <TableCell>{transaction.client}</TableCell>
                  <TableCell className="font-medium">${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${transaction.responseTime > 300 ? 'text-red-600' : 'text-green-600'}`}>
                      {transaction.responseTime}ms
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border ${
                  alert.level === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className={`w-4 h-4 ${
                        alert.level === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                      <span className="font-medium">{alert.message}</span>
                    </div>
                    <span className="text-sm text-gray-600">{alert.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
