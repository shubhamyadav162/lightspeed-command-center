
import React from 'react';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { Sidebar } from '../components/dashboard/Sidebar';
import { DashboardHome } from '../components/dashboard/DashboardHome';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <DashboardHome />
        </main>
      </div>
    </div>
  );
};

export default Index;
