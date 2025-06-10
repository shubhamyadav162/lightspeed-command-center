
import React, { useState } from 'react';
import { 
  Gauge, 
  Settings, 
  Users, 
  Database, 
  ChartBar, 
  Shield, 
  Bell, 
  FileText 
} from 'lucide-react';

interface SidebarProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

export const Sidebar = ({ activeScreen, onScreenChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Gauge },
    { id: 'gateways', label: 'Gateway Management', icon: Settings },
    { id: 'wallets', label: 'Wallet Management', icon: Database },
    { id: 'monitoring', label: 'Real-time Monitoring', icon: ChartBar },
    { id: 'clients', label: 'Client Management', icon: Users },
    { id: 'reports', label: 'Reports & Analytics', icon: FileText },
    { id: 'alerts', label: 'Alert Center', icon: Bell },
    { id: 'security', label: 'Security & Config', icon: Shield },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onScreenChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
