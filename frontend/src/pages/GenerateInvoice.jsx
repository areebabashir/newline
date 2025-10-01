import React, { useState } from 'react';
import { FileText, Calendar, Search, Download } from 'lucide-react';

// Mock data for Generate Invoice
const invoiceData = {
  accounts: ['Account 1', 'Account 2', 'Account 3'],
  services: [
    { 
      details: 'Service 1', 
      timeManagement: '2h', 
      pickup: 'Yes', 
      dropoff: 'No', 
      wtMins: 30, 
      charge: 50, 
      parking: 10, 
      congestion: 5, 
      basePrice: 100, 
      total: 165, 
      adminFees: 5, 
      netVat: 20, 
      cancelled: false 
    },
    { 
      details: 'Service 2', 
      timeManagement: '1h', 
      pickup: 'No', 
      dropoff: 'Yes', 
      wtMins: 15, 
      charge: 25, 
      parking: 0, 
      congestion: 0, 
      basePrice: 50, 
      total: 75, 
      adminFees: 2, 
      netVat: 8, 
      cancelled: true 
    },
  ],
};

const GenerateInvoice = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [invoiceType, setInvoiceType] = useState('Invoice by Job No.');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Generating invoice for:', { selectedAccount, invoiceType, dateRange });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 space-y-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-yellow-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Generate Manual Invoice</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create invoices, credit notes, or refund receipts</p>
            </div>
          </div>
        </div>

        {/* Invoice Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
            {/* First Row - Account and Invoice Type */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Account
                </label>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="">Select Account</option>
                  {invoiceData.accounts.map((account) => (
                    <option key={account} value={account}>{account}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Invoice Type
                  </label>
                <div className="space-y-2">
                  {[
                    'Invoice by Job No.',
                    'Card Charge',
                    'Manual Invoice (Single Page)',
                    'Cash Invoice',
                    'Proforma Invoice'
                  ].map((type) => (
                    <label key={type} className="flex items-center">
                    <input
                      type="radio"
                        value={type}
                        checked={invoiceType === type}
                      onChange={(e) => setInvoiceType(e.target.value)}
                        className="text-yellow-600 focus:ring-yellow-500"
                    />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {type}
                      </span>
                  </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Second Row - Date Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 shadow-md transition-all duration-200 hover:scale-105 dark:bg-yellow-700 dark:hover:bg-yellow-800"
              >
                <Search className="h-4 w-4" />
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Breakdown of Services */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Breakdown of Services</h2>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-md transition-all duration-200 hover:scale-105 dark:bg-yellow-700 dark:hover:bg-yellow-800">
              <Download className="h-4 w-4" />
              Generate
            </button>
          </div>
          
          {/* Responsive Table */}
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white text-xs">Journey</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white text-xs">Details</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white text-xs">Time</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white text-xs">Pickup</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white text-xs">Dropoff</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white text-xs">WT</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white text-xs">Charge</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white text-xs">Parking</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white text-xs">Congestion</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white text-xs">Base</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white text-xs">Total</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white text-xs">Admin</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white text-xs">VAT</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.services.map((service, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="py-2 px-3 text-xs">{index + 1}</td>
                    <td className="py-2 px-3 text-xs">{service.details}</td>
                    <td className="py-2 px-3 text-xs">{service.timeManagement}</td>
                    <td className="py-2 px-3 text-xs">{service.pickup}</td>
                    <td className="py-2 px-3 text-xs">{service.dropoff}</td>
                    <td className="py-2 px-3 text-xs">{service.wtMins}</td>
                    <td className="py-2 px-3 text-xs">${service.charge}</td>
                    <td className="py-2 px-3 text-xs">${service.parking}</td>
                    <td className="py-2 px-3 text-xs">${service.congestion}</td>
                    <td className="py-2 px-3 text-xs">${service.basePrice}</td>
                    <td className="py-2 px-3 text-xs font-medium">${service.total}</td>
                    <td className="py-2 px-3 text-xs">${service.adminFees}</td>
                    <td className="py-2 px-3 text-xs">${service.netVat}</td>
                    <td className="py-2 px-3 text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        service.cancelled 
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' 
                          : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      }`}>
                        {service.cancelled ? 'Cancelled' : 'Active'}
                      </span>
                    </td>
                    </tr>
                  ))}
                
                {/* Total Row */}
                  <tr className="bg-gray-50 dark:bg-gray-700 font-semibold">
                  <td className="py-2 px-3 text-xs" colSpan="2">Total</td>
                  <td className="py-2 px-3 text-xs">
                    {invoiceData.services.reduce((sum, s) => sum + (s.timeManagement.match(/\d+/) ? parseInt(s.timeManagement.match(/\d+/)[0]) : 0), 0)}h
                  </td>
                  <td className="py-2 px-3 text-xs">{invoiceData.services.filter(s => s.pickup === 'Yes').length}</td>
                  <td className="py-2 px-3 text-xs">{invoiceData.services.filter(s => s.dropoff === 'Yes').length}</td>
                  <td className="py-2 px-3 text-xs">{invoiceData.services.reduce((sum, s) => sum + s.wtMins, 0)}</td>
                  <td className="py-2 px-3 text-xs">${invoiceData.services.reduce((sum, s) => sum + s.charge, 0)}</td>
                  <td className="py-2 px-3 text-xs">${invoiceData.services.reduce((sum, s) => sum + s.parking, 0)}</td>
                  <td className="py-2 px-3 text-xs">${invoiceData.services.reduce((sum, s) => sum + s.congestion, 0)}</td>
                  <td className="py-2 px-3 text-xs">${invoiceData.services.reduce((sum, s) => sum + s.basePrice, 0)}</td>
                  <td className="py-2 px-3 text-xs">${invoiceData.services.reduce((sum, s) => sum + s.total, 0)}</td>
                  <td className="py-2 px-3 text-xs">${invoiceData.services.reduce((sum, s) => sum + s.adminFees, 0)}</td>
                  <td className="py-2 px-3 text-xs">${invoiceData.services.reduce((sum, s) => sum + s.netVat, 0)}</td>
                  <td className="py-2 px-3 text-xs">
                    {invoiceData.services.filter(s => s.cancelled).length} cancelled
                  </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateInvoice;
