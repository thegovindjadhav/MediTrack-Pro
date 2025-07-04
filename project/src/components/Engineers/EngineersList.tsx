import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { User, Phone, Mail, Star, Wrench, Plus } from 'lucide-react';

const EngineersList: React.FC = () => {
  const engineers = useSelector((state: RootState) => state.engineers.engineers);

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Engineers</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Engineer</span>
        </button>
      </div>

      {/* Engineers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {engineers.map(engineer => (
          <div key={engineer.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{engineer.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className={`w-4 h-4 ${getRatingColor(engineer.rating)}`} />
                    <span className={`text-sm font-medium ${getRatingColor(engineer.rating)}`}>
                      {engineer.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1 bg-orange-50 px-2 py-1 rounded-full">
                <Wrench className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-600">{engineer.activeAssignments}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-900">{engineer.phone}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-900">{engineer.email}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Specialization</p>
                <div className="flex flex-wrap gap-1">
                  {engineer.specialization.map(spec => (
                    <span key={spec} className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Assignments</span>
                <span className="text-sm font-medium text-gray-900">{engineer.activeAssignments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngineersList;