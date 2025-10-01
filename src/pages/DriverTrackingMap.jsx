import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Users, 
  Truck, 
  Navigation, 
  RefreshCw, 
  Maximize2, 
  Settings, 
  Clock,
  Eye,
  Filter,
  Search,
  Zap,
  Shield,
  Star,
  Activity
} from 'lucide-react';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DriverTrackingMap = () => {
  const [selectedDriverType, setSelectedDriverType] = useState('All');
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  // Mock driver data with enhanced information
  const drivers = [
    { 
      id: 1, 
      name: 'Mike Johnson', 
      type: 'Owner Driver', 
      lat: 31.5804, 
      lng: 74.3587, 
      status: 'Active', 
      vehicle: 'Van-001', 
      lastUpdate: '2 min ago',
      rating: 4.8,
      totalJobs: 156,
      currentJob: 'Airport Transfer',
      distance: '2.3 km'
    },
    { 
      id: 2, 
      name: 'Sarah Williams', 
      type: 'Fleet Driver', 
      lat: 31.5904, 
      lng: 74.3687, 
      status: 'On Job', 
      vehicle: 'Truck-205', 
      lastUpdate: '1 min ago',
      rating: 4.9,
      totalJobs: 203,
      currentJob: 'Corporate Event',
      distance: '5.7 km'
    },
    { 
      id: 3, 
      name: 'Tom Rodriguez', 
      type: 'Subcontractor Driver', 
      lat: 31.5704, 
      lng: 74.3487, 
      status: 'Available', 
      vehicle: 'Van-103', 
      lastUpdate: '3 min ago',
      rating: 4.6,
      totalJobs: 89,
      currentJob: null,
      distance: '1.2 km'
    },
    { 
      id: 4, 
      name: 'John Davis', 
      type: 'Owner Driver', 
      lat: 31.5654, 
      lng: 74.3537, 
      status: 'Break', 
      vehicle: 'Car-007', 
      lastUpdate: '5 min ago',
      rating: 4.7,
      totalJobs: 134,
      currentJob: null,
      distance: '3.1 km'
    },
    { 
      id: 5, 
      name: 'Lisa Martinez', 
      type: 'Fleet Driver', 
      lat: 31.5754, 
      lng: 74.3637, 
      status: 'Active', 
      vehicle: 'Truck-301', 
      lastUpdate: '1 min ago',
      rating: 4.9,
      totalJobs: 187,
      currentJob: 'Wedding Party',
      distance: '4.5 km'
    },
  ];

  const stats = [
    { 
      title: 'Active Drivers', 
      value: drivers.filter(d => d.status === 'Active').length, 
      total: drivers.length,
      icon: Users, 
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    { 
      title: 'On Job', 
      value: drivers.filter(d => d.status === 'On Job').length, 
      total: drivers.length,
      icon: Navigation, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    { 
      title: 'Available', 
      value: drivers.filter(d => d.status === 'Available').length, 
      total: drivers.length,
      icon: Truck, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    { 
      title: 'Total Vehicles', 
      value: drivers.length, 
      total: drivers.length,
      icon: MapPin, 
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  const getDriverTypeColor = (type) => {
    switch (type) {
      case 'Owner Driver': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'Fleet Driver': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'Subcontractor Driver': return 'bg-gradient-to-r from-yellow-500 to-amber-500';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500';
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200',
      'On Job': 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 border-amber-200',
      'Available': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200',
      'Break': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-200'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
        {status}
      </span>
    );
  };

  const filteredDrivers = selectedDriverType === 'All' 
    ? drivers.filter(driver => 
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : drivers.filter(driver => 
        driver.type === selectedDriverType && (
          driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [isLive]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Driver Tracking Map</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Real-time driver location and status monitoring</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {isLive ? 'Live Tracking' : 'Offline'}
                </span>
              </div>
              <button
                onClick={() => setIsLive(!isLive)}
                className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 text-sm ${
                  isLive 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <Activity className="h-4 w-4" />
                {isLive ? 'Live' : 'Offline'}
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-md transition-all duration-200 hover:scale-105 dark:bg-yellow-700 dark:hover:bg-yellow-800 text-sm">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-xl p-4 border border-gray-200 dark:border-gray-700`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">of {stat.total} total</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map and Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Live Map View</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Maximize2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>

              {/* Real Map */}
              <div className="relative rounded-lg overflow-hidden" style={{ height: '384px' }}>
                <MapContainer 
                  center={[31.5804, 74.3587]} 
                  zoom={13} 
                  style={{ height: '384px', width: '100%', borderRadius: '0.5rem' }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Driver Markers */}
                  {filteredDrivers.map((driver) => {
                    // Create custom colored icon based on driver type
                    const getMarkerColor = (type) => {
                      switch (type) {
                        case 'Owner Driver': return '#10b981';
                        case 'Fleet Driver': return '#3b82f6';
                        case 'Subcontractor Driver': return '#eab308';
                        default: return '#6b7280';
                      }
                    };
                    
                    const customIcon = L.divIcon({
                      html: `<div style="background-color: ${getMarkerColor(driver.type)}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
                      className: 'custom-div-icon',
                      iconSize: [24, 24],
                      iconAnchor: [12, 12],
                    });
                    
                    return (
                      <Marker 
                    key={driver.id}
                        position={[driver.lat, driver.lng]}
                        icon={customIcon}
                      >
                        <Popup>
                          <div className="text-sm">
                            <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                            <p className="text-gray-600">{driver.vehicle}</p>
                            <p className="text-xs text-gray-500 mt-1">{driver.type}</p>
                            <div className="mt-2 flex items-center gap-2">
                              {getStatusBadge(driver.status)}
                            </div>
                            {driver.currentJob && (
                              <p className="text-xs text-gray-600 mt-1">
                                <strong>Job:</strong> {driver.currentJob}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              <strong>Rating:</strong> ⭐ {driver.rating}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
              
              {/* Map Legend */}
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Owner Driver</span>
                    </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Fleet Driver</span>
                  </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Subcontractor</span>
                </div>
              </div>
            </div>
          </div>

          {/* Driver List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Drivers</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search drivers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-32 pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                  <select
                    value={selectedDriverType}
                    onChange={(e) => setSelectedDriverType(e.target.value)}
                    className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="All">All Types</option>
                    <option value="Owner Driver">Owner Driver</option>
                    <option value="Fleet Driver">Fleet Driver</option>
                    <option value="Subcontractor Driver">Subcontractor</option>
                  </select>
                </div>
            </div>
            
              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
              {filteredDrivers.map((driver) => (
                  <div key={driver.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getDriverTypeColor(driver.type)}`}></div>
                    <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{driver.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{driver.vehicle}</p>
                    </div>
                  </div>
                    {getStatusBadge(driver.status)}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Type:</span>
                        <span className="text-gray-900 dark:text-white">{driver.type}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-gray-900 dark:text-white">{driver.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Distance:</span>
                        <span className="text-gray-900 dark:text-white">{driver.distance}</span>
                      </div>
                      {driver.currentJob && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-400">Current Job:</span>
                          <span className="text-gray-900 dark:text-white truncate max-w-20">{driver.currentJob}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Last Update:</span>
                        <span className="text-gray-900 dark:text-white">{driver.lastUpdate}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                        <Eye className="h-3 w-3 inline mr-1" />
                        View
                      </button>
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                        <Navigation className="h-3 w-3 inline mr-1" />
                        Track
                      </button>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>

        {/* Last Update Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Auto-refresh every 30 seconds
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverTrackingMap;
