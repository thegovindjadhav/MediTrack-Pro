import React from 'react';
import { 
  Home, 
  Package, 
  Wrench, 
  ClipboardList, 
  FileText, 
  AlertTriangle,
  Users,
  Building,
  Settings
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'devices', label: 'Device Inventory', icon: Package },
    { id: 'installations', label: 'Installations', icon: Wrench },
    { id: 'service-visits', label: 'Service Visits', icon: ClipboardList },
    { id: 'contracts', label: 'AMC/CMC Tracker', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'facilities', label: 'Facilities', icon: Building },
    { id: 'engineers', label: 'Engineers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Package className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">MediTrack Pro</h1>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;