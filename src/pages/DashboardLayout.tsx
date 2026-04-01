import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import Sidebar from '@/components/Sidebar';
import ClientSidebar from '@/components/ClientSidebar';
import Topbar from '@/components/Topbar';
import DashboardPage from './DashboardPage';
import BusinessesPage from './BusinessesPage';
import PipelinePage from './PipelinePage';
import LoansPage from './LoansPage';
import AnalyticsPage from './AnalyticsPage';
import SettingsPage from './SettingsPage';
import AgentsPage from './AgentsPage';
import ClientDashboard from './ClientDashboard';

const adminPageTitles: Record<string, { title: string; subtitle?: string }> = {
  dashboard: { title: 'Fund Manager Dashboard' },
  businesses: { title: 'All Businesses — Complete Fundability View', subtitle: '10 businesses tracked' },
  pipeline: { title: 'Fundability Pipeline', subtitle: 'Pipeline view of all businesses' },
  loans: { title: 'Loan Approval Queue', subtitle: 'Review and approve loan applications' },
  agents: { title: 'AI Agents', subtitle: 'Run AI-powered analysis on your businesses' },
  analytics: { title: 'Analytics & Reporting', subtitle: 'Portfolio performance metrics' },
  settings: { title: 'Settings', subtitle: 'Manage your profile and fund configuration' },
};

const clientPageTitles: Record<string, { title: string; subtitle?: string }> = {
  dashboard: { title: 'My Fundability Dashboard', subtitle: 'Track your progress to capital access' },
  agents: { title: 'AI Agents', subtitle: 'Run AI-powered analysis on your business' },
  settings: { title: 'Settings', subtitle: 'Manage your profile' },
};

const DashboardLayout = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const { signOut } = useAuth();
  const { isAdmin, loading } = useUserRole();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground text-sm animate-pulse">Loading...</div>
      </div>
    );
  }

  const pageTitles = isAdmin ? adminPageTitles : clientPageTitles;
  const pageInfo = pageTitles[activePage] || pageTitles.dashboard;

  return (
    <div className="flex min-h-screen">
      {isAdmin ? (
        <Sidebar activePage={activePage} onNavigate={setActivePage} onSignOut={signOut} />
      ) : (
        <ClientSidebar activePage={activePage} onNavigate={setActivePage} onSignOut={signOut} />
      )}
      <div className="ml-[220px] flex-1 min-h-screen flex flex-col">
        <Topbar
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          onLoanQueue={isAdmin && activePage === 'dashboard' ? () => setActivePage('loans') : undefined}
        />
        <main className="p-6 flex-1">
          {isAdmin ? (
            <>
              {activePage === 'dashboard' && <DashboardPage onNavigate={setActivePage} />}
              {activePage === 'businesses' && <BusinessesPage />}
              {activePage === 'pipeline' && <PipelinePage />}
              {activePage === 'loans' && <LoansPage />}
              {activePage === 'agents' && <AgentsPage />}
              {activePage === 'analytics' && <AnalyticsPage />}
              {activePage === 'settings' && <SettingsPage />}
            </>
          ) : (
            <>
              {activePage === 'dashboard' && <ClientDashboard />}
              {activePage === 'agents' && <AgentsPage />}
              {activePage === 'settings' && <SettingsPage />}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
