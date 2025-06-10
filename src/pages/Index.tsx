
import React, { useState } from 'react';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { Sidebar } from '../components/dashboard/Sidebar';
import { DashboardHome } from '../components/dashboard/DashboardHome';
import { GatewayManagement } from '../components/dashboard/GatewayManagement';
import { WalletManagement } from '../components/dashboard/WalletManagement';
import { RealTimeMonitoring } from '../components/dashboard/RealTimeMonitoring';
import { ClientManagement } from '../components/dashboard/ClientManagement';
import { ReportsAnalytics } from '../components/dashboard/ReportsAnalytics';
import { AlertCenterScreen } from '../components/dashboard/AlertCenterScreen';
import { SecurityConfig } from '../components/dashboard/SecurityConfig';

const Index = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <DashboardHome />;
      case 'gateways':
        return <GatewayManagement />;
      case 'wallets':
        return <WalletManagement />;
      case 'monitoring':
        return <RealTimeMonitoring />;
      case 'clients':
        return <ClientManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'alerts':
        return <AlertCenterScreen />;
      case 'security':
        return <SecurityConfig />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <Sidebar activeScreen={activeScreen} onScreenChange={setActiveScreen} />
        <main className="flex-1 p-6">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
};

export default Index;
