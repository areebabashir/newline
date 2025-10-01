import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar, 
  Download,
  Filter,
  Search,
  Eye,
  FileText,
  LayoutDashboard,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const Reports = () => {
  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 65000, trips: 320 },
    { month: 'Feb', revenue: 78000, trips: 390 },
    { month: 'Mar', revenue: 82000, trips: 410 },
    { month: 'Apr', revenue: 95000, trips: 475 },
    { month: 'May', revenue: 101000, trips: 505 },
    { month: 'Jun', revenue: 118000, trips: 590 },
];

const serviceTypes = [
    { name: 'Point-to-Point', value: 50, color: '#fde68a' },
    { name: 'Hourly', value: 30, color: '#eab308' },
    { name: 'Full Day', value: 20, color: '#1f2937' },
  ];

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '£125,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-yellow-500 to-amber-500'
    },
    {
      title: 'Total Bookings',
      value: '1,250',
      change: '+8.3%',
      trend: 'up',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Active Drivers',
      value: '45',
      change: '+5.2%',
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Completion Rate',
      value: '94.5%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-purple-500 to-violet-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        
      {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive business insights and performance metrics</p>
        </div>
            <div className="flex items-center gap-3">
              <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 text-sm">
            <Filter className="h-4 w-4" />
                Filter
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-md transition-all duration-200 hover:scale-105 dark:bg-yellow-700 dark:hover:bg-yellow-800 text-sm">
            <Download className="h-4 w-4" />
                Export
              </button>
            </div>
        </div>
      </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="bg-gradient-to-br from-yellow-50/50 to-amber-50/50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
              <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600 dark:text-green-400">{kpi.change}</span>
              </div>
            </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${kpi.color} text-white shadow-lg`}>
                    <kpi.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
          ))}
      </div>

      {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Revenue & Trips Trend */}
          <Card className="bg-gradient-to-br from-yellow-50/50 to-amber-50/50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 text-black">
                  <BarChart3 className="h-5 w-5" />
                </div>
              Revenue & Trips Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="tripsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis 
                    dataKey="month" 
                    className="text-gray-600 dark:text-gray-400 text-xs"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    className="text-gray-600 dark:text-gray-400 text-xs"
                    tick={{ fontSize: 12 }}
                  />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                    stroke="#eab308" 
                    fill="url(#revenueGradient)"
                    strokeWidth={2}
                    dot={{ fill: '#eab308', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#eab308', strokeWidth: 2, fill: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="trips" 
                    stroke="#f59e0b" 
                    fill="url(#tripsGradient)"
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Trips</span>
                </div>
              </div>
          </CardContent>
        </Card>

          {/* Service Type Distribution */}
          <Card className="bg-gradient-to-br from-yellow-50/50 to-amber-50/50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 text-black">
                  <Users className="h-5 w-5" />
                </div>
              Service Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                  <defs>
                    <linearGradient id="pointtopointGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fde68a"/>
                      <stop offset="100%" stopColor="#fcd34d"/>
                    </linearGradient>
                    <linearGradient id="hourlyGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#eab308"/>
                      <stop offset="100%" stopColor="#ca8a04"/>
                    </linearGradient>
                    <linearGradient id="fulldayGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1f2937"/>
                      <stop offset="100%" stopColor="#111827"/>
                    </linearGradient>
                  </defs>
                <Pie
                  data={serviceTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  startAngle={0}
                  endAngle={360}
                  dataKey="value"
                  stroke="hsl(var(--card))"
                  strokeWidth={2}
                >
                  {serviceTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#${entry.name.toLowerCase().replace(/-/g, '').replace(/\s/g, '')}Gradient)`} />
                  ))}
                </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontSize: '12px' }}
                  />
              </PieChart>
            </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {serviceTypes.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: service.color }}
                    ></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{service.name}</span>
                  </div>
                ))}
              </div>
          </CardContent>
        </Card>
      </div>

        {/* Recent Activity */}
        <Card className="bg-gradient-to-br from-yellow-50/50 to-amber-50/50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 text-black">
                <FileText className="h-5 w-5" />
              </div>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">New booking completed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                    </div>
                  </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Completed</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Driver assigned to booking</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">5 minutes ago</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">In Progress</Badge>
            </div>
              
              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <DollarSign className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Payment received</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">10 minutes ago</p>
                      </div>
                    </div>
                <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">Paid</Badge>
                    </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;