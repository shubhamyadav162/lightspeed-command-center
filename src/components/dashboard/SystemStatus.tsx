
import React from 'react';
import { Shield, Server, Database, Globe } from 'lucide-react';

export const SystemStatus = () => {
  const statusItems = [
    { label: 'Payment Processing', status: 'operational', icon: Shield, uptime: '99.9%' },
    { label: 'API Services', status: 'operational', icon: Server, uptime: '99.8%' },
    { label: 'Database', status: 'warning', icon: Database, uptime: '99.5%' },
    { label: 'External Gateways', status: 'operational', icon: Globe, uptime: '99.7%' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-700 bg-green-100';
      case 'warning': return 'text-yellow-700 bg-yellow-100';
      case 'down': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'down': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-700">All Systems Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5 text-gray-600" />
                <div className={`w-3 h-3 rounded-full ${getStatusDot(item.status)}`}></div>
              </div>
              <div className="text-sm font-medium text-gray-900">{item.label}</div>
              <div className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${getStatusColor(item.status)}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </div>
              <div className="text-xs text-gray-500 mt-1">Uptime: {item.uptime}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
