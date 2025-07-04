import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout/Layout';
import DashboardOverview from './components/Dashboard/DashboardOverview';
import DeviceInventory from './components/Devices/DeviceInventory';
import InstallationList from './components/Installations/InstallationList';
import ServiceVisitsList from './components/ServiceVisits/ServiceVisitsList';
import ContractTracker from './components/Contracts/ContractTracker';
import AlertsPanel from './components/Alerts/AlertsPanel';
import FacilitiesList from './components/Facilities/FacilitiesList';
import EngineersList from './components/Engineers/EngineersList';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'devices':
        return <DeviceInventory />;
      case 'installations':
        return <InstallationList />;
      case 'service-visits':
        return <ServiceVisitsList />;
      case 'contracts':
        return <ContractTracker />;
      case 'alerts':
        return <AlertsPanel />;
      case 'facilities':
        return <FacilitiesList />;
      case 'engineers':
        return <EngineersList />;
      case 'settings':
        return <div className="text-center py-12 text-gray-500">Settings page coming soon...</div>;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <Provider store={store}>
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPage()}
      </Layout>
    </Provider>
  );
};

export default App;