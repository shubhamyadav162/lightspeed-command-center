
import React from 'react';
import { AlertTriangle, Info, Clock, CheckCircle } from 'lucide-react';

export const AlertCenter = () => {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Transaction Volume Detected',
      message: 'Square gateway experiencing 95% load. Consider load balancing.',
      timestamp: '2 minutes ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'error',
      title: 'Gateway Connection Failed',
      message: 'Paytm gateway is currently unreachable. Automatically routed to backup.',
      timestamp: '5 minutes ago',
      priority: 'critical'
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'Razorpay will undergo maintenance tonight from 2:00 AM to 4:00 AM.',
      timestamp: '1 hour ago',
      priority: 'low'
    },
    {
      id: 4,
      type: 'success',
      title: 'Daily Backup Completed',
      message: 'All transaction data has been successfully backed up.',
      timestamp: '2 hours ago',
      priority: 'low'
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      case 'info': return Info;
      case 'success': return CheckCircle;
      default: return Info;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Alert Center</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All Alerts
        </button>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          
          return (
            <div key={alert.id} className={`p-4 border rounded-lg ${getAlertColor(alert.type)}`}>
              <div className="flex items-start space-x-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityBadge(alert.priority)}`}>
                        {alert.priority}
                      </span>
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{alert.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
