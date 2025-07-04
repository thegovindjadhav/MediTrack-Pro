import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Plus, Calendar, User, MapPin, Clock, FileText } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import { getStatusColor } from '../../utils/statusUtils';

const ServiceVisitsList: React.FC = () => {
  const serviceVisits = useSelector((state: RootState) => state.serviceVisits.serviceVisits);
  const devices = useSelector((state: RootState) => state.devices.devices);
  const facilities = useSelector((state: RootState) => state.facilities.facilities);
  
  const [filter, setFilter] = useState('all');

  const getDeviceInfo = (deviceId: string) => {
    return devices.find(device => device.id === deviceId);
  };

  const getFacilityInfo = (facilityId: string) => {
    return facilities.find(facility => facility.id === facilityId);
  };

  const filteredVisits = serviceVisits.filter(visit => {
    if (filter === 'all') return true;
    return visit.status.toLowerCase() === filter.toLowerCase();
  });

  const getPurposeColor = (purpose: string) => {
    switch (purpose) {
      case 'Preventive':
        return 'text-green-600 bg-green-50';
      case 'Breakdown':
        return 'text-red-600 bg-red-50';
      case 'Installation':
        return 'text-blue-600 bg-blue-50';
      case 'Training':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Service Visits</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Schedule Visit</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex space-x-4">
          {['all', 'scheduled', 'in progress', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Service Visits */}
      <div className="grid gap-6">
        {filteredVisits.map(visit => {
          const device = getDeviceInfo(visit.deviceId);
          const facility = getFacilityInfo(visit.facilityId);

          return (
            <div key={visit.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {device?.model || 'Unknown Device'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Visit ID: {visit.id}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(visit.status)}`}>
                    {visit.status}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPurposeColor(visit.purpose)}`}>
                    {visit.purpose}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Visit Date</p>
                    <p className="text-sm font-medium">{formatDate(visit.visitDate)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Engineer</p>
                    <p className="text-sm font-medium">{visit.engineerName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Facility</p>
                    <p className="text-sm font-medium">{facility?.name || 'Unknown Facility'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-medium">{visit.duration} minutes</p>
                  </div>
                </div>
              </div>

              {/* Device Details */}
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Device Details</p>
                    <p className="text-sm text-gray-600">
                      {device?.type} - {device?.serialNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Location</p>
                    <p className="text-sm text-gray-600">{device?.location}</p>
                  </div>
                </div>
              </div>

              {/* Photos */}
              {visit.photos.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Photos ({visit.photos.length})</h4>
                  <div className="flex space-x-2">
                    {visit.photos.slice(0, 4).map(photo => (
                      <img
                        key={photo.id}
                        src={photo.url}
                        alt={photo.filename}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                      />
                    ))}
                    {visit.photos.length > 4 && (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-500">+{visit.photos.length - 4}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Attachments */}
              {visit.attachments.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
                  <div className="flex flex-wrap gap-2">
                    {visit.attachments.map(attachment => (
                      <div key={attachment.id} className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-lg">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{attachment.filename}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {visit.notes && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 mb-1">Visit Notes</h4>
                  <p className="text-sm text-blue-800">{visit.notes}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredVisits.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No service visits found</div>
          <p className="text-gray-500">
            {filter === 'all' ? 'No service visits scheduled' : `No ${filter} visits found`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceVisitsList;