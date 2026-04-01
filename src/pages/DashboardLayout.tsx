import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import DashboardPage from './DashboardPage';
import BusinessesPage from './BusinessesPage';
import PipelinePage from './PipelinePage';
import LoansPage from './LoansPage';
import AnalyticsPage from './AnalyticsPage';
import SettingsPage from './SettingsPage';

const pageTitles: Record<string, { title: string; subtitle?: string }> = {
  dashboard: { title: 'Fund Manager Dashboard' },
  businesses: { title: 'All Businesses — Complete Fundability View', subtitle: '10 businesses tracked' },
  pipeline: { title: 'Fundability Pipeline', subtitle: 'Pipeline view of all businesses' },
  loans: { title: 'Loan Approval Queue', subtitle: 'Review and approve loan applications' },
  analytics: { title: 'Analytics & Reporting', subtitle: 'Portfolio performance metrics' },
  settings: { title: 'Settings', subtitle: 'Manage your profile and fund configuration' },
};

const DashboardLayout = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const { signOut } = useAuth();

  const pageInfo = pageTitles[activePage] || pageTitles.dashboard;

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage={activePage} onNavigate={setActivePage} onSignOut={signOut} />
      <div className="ml-[220px] flex-1 min-h-screen flex flex-col">
        <Topbar
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          onLoanQueue={activePage === 'dashboard' ? () => setActivePage('loans') : undefined}
        />
        <main className="p-6 flex-1">
          {activePage === 'dashboard' && <DashboardPage onNavigate={setActivePage} />}
          {activePage === 'businesses' && <BusinessesPage />}
          {activePage === 'pipeline' && <PipelinePage />}
          {activePage === 'loans' && <LoansPage />}
          {activePage === 'analytics' && <AnalyticsPage />}
          {activePage === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
