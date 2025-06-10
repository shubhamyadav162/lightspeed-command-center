import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Building, DollarSign, Eye, Settings, MessageSquare, Key, Search } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  apiKey: string;
  status: 'active' | 'inactive' | 'suspended';
  totalTransactions: number;
  totalVolume: number;
  lastActivity: string;
  whatsappNotifications: boolean;
  emailNotifications: boolean;
  monthlyLimit: number;
  currentMonthVolume: number;
}

export const ClientManagement = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'John Smith',
      company: 'ShopCorp Inc.',
      email: 'john@shopcorp.com',
      phone: '+1-555-0123',
      apiKey: 'sk_live_abc123...',
      status: 'active',
      totalTransactions: 1250,
      totalVolume: 125000,
      lastActivity: '2024-06-10 16:30',
      whatsappNotifications: true,
      emailNotifications: true,
      monthlyLimit: 50000,
      currentMonthVolume: 32500
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      company: 'TechStart Solutions',
      email: 'sarah@techstart.io',
      phone: '+1-555-0456',
      apiKey: 'sk_live_def456...',
      status: 'active',
      totalTransactions: 890,
      totalVolume: 89500,
      lastActivity: '2024-06-10 14:15',
      whatsappNotifications: false,
      emailNotifications: true,
      monthlyLimit: 30000,
      currentMonthVolume: 18900
    },
    {
      id: '3',
      name: 'Mike Wilson',
      company: 'RetailPro Ltd.',
      email: 'mike@retailpro.com',
      phone: '+1-555-0789',
      apiKey: 'sk_live_ghi789...',
      status: 'suspended',
      totalTransactions: 2340,
      totalVolume: 234000,
      lastActivity: '2024-06-08 10:45',
      whatsappNotifications: true,
      emailNotifications: false,
      monthlyLimit: 100000,
      currentMonthVolume: 45600
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const toggleNotification = (clientId: string, type: 'whatsapp' | 'email') => {
    setClients(prev => prev.map(client => 
      client.id === clientId 
        ? { 
            ...client, 
            [type === 'whatsapp' ? 'whatsappNotifications' : 'emailNotifications']: 
              !client[type === 'whatsapp' ? 'whatsappNotifications' : 'emailNotifications']
          }
        : client
    ));
  };

  const updateClientStatus = (clientId: string, status: 'active' | 'inactive' | 'suspended') => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? { ...client, status } : client
    ));
  };

  const regenerateApiKey = (clientId: string) => {
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 15)}...`;
    setClients(prev => prev.map(client => 
      client.id === clientId ? { ...client, apiKey: newKey } : client
    ));
    alert('API key regenerated successfully!');
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalVolume = clients.reduce((sum, c) => sum + c.totalVolume, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600">Manage client accounts, API access, and notification preferences</p>
        </div>
        <Button>
          <Users className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Client Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-blue-600">{totalClients}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-green-600">{activeClients}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Building className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Volume</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${totalVolume.toLocaleString()}
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Transactions</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(clients.reduce((sum, c) => sum + c.totalTransactions, 0) / clients.length)}
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Client Directory</CardTitle>
            <div className="flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Notifications</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-gray-600">{client.company}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{client.email}</p>
                      <p className="text-sm text-gray-600">{client.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={client.status} 
                      onValueChange={(value: 'active' | 'inactive' | 'suspended') => 
                        updateClientStatus(client.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">${client.totalVolume.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">
                        {client.totalTransactions} transactions
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(client.currentMonthVolume / client.monthlyLimit) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        ${client.currentMonthVolume.toLocaleString()} / ${client.monthlyLimit.toLocaleString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-3 h-3" />
                        <Switch 
                          checked={client.whatsappNotifications}
                          onCheckedChange={() => toggleNotification(client.id, 'whatsapp')}
                        />
                        <span className="text-xs">WhatsApp</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 text-center">@</span>
                        <Switch 
                          checked={client.emailNotifications}
                          onCheckedChange={() => toggleNotification(client.id, 'email')}
                        />
                        <span className="text-xs">Email</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{client.lastActivity}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => regenerateApiKey(client.id)}
                      >
                        <Key className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* API Keys Section */}
      <Card>
        <CardHeader>
          <CardTitle>API Key Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div key={client.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-gray-600 font-mono">{client.apiKey}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Copy
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => regenerateApiKey(client.id)}
                    >
                      Regenerate
                    </Button>
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
