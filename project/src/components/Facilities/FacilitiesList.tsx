import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Building, MapPin, Phone, Mail, Package, Plus } from 'lucide-react';

const FacilitiesList: React.FC = () => {
  const facilities = useSelector((state: RootState) => state.facilities.facilities);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Facilities</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Facility</span>
        </button>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map(facility => (
          <div key={facility.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{facility.name}</h3>
                  <p className="text-sm text-gray-600">{facility.city}, {facility.state}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full">
                <Package className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">{facility.deviceCount}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-900">{facility.address}</p>
                  <p className="text-sm text-gray-600">{facility.city}, {facility.state} {facility.pincode}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-900">{facility.contactPhone}</p>
                  <p className="text-xs text-gray-500">{facility.contactPerson}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-900">{facility.contactEmail}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Devices Installed</span>
                <span className="text-sm font-medium text-gray-900">{facility.deviceCount} devices</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilitiesList;