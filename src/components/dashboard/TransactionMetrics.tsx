
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react';

export const TransactionMetrics = () => {
  const metrics = [
    {
      label: 'Live Transactions',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: CreditCard,
      color: 'blue'
    },
    {
      label: 'Today\'s Volume',
      value: '$89,247',
      change: '+8.4%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'Success Rate',
      value: '98.7%',
      change: '-0.2%',
      trend: 'down',
      icon: TrendingUp,
      color: 'emerald'
    },
    {
      label: 'Failed Transactions',
      value: '23',
      change: '+15%',
      trend: 'down',
      icon: TrendingDown,
      color: 'red'
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction Metrics</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up';
          
          return (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 text-${metric.color}-600`} />
                <div className={`flex items-center text-xs ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {metric.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Live Counter */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-blue-700 font-medium">Processing Now</div>
            <div className="text-3xl font-bold text-blue-900 animate-pulse">127</div>
            <div className="text-sm text-blue-600">transactions in queue</div>
          </div>
          <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};
