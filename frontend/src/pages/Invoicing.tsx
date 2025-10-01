import React, { useState } from "react";
import {
  FileText,
  DollarSign,
  Send,
  Download,
  Eye,
  Calendar,
  CreditCard,
  TrendingUp,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Mock data for invoices
const invoices = [
  {
    id: "INV-001",
    customerName: "John Doe",
    amount: 150.00,
    status: "paid",
    dueDate: "2024-01-15",
    createdDate: "2024-01-01",
    description: "Transportation Services",
    paymentMethod: "Credit Card",
    approved: true,
    cardCharge: 4.50,
    paidAmount: 150.00,
    vat: 30.00,
    total: 180.00,
  },
  {
    id: "INV-002",
    customerName: "Jane Smith",
    amount: 200.00,
    status: "pending",
    dueDate: "2024-01-20",
    createdDate: "2024-01-05",
    description: "Corporate Transport",
    paymentMethod: "Bank Transfer",
    approved: false,
    cardCharge: 0,
    paidAmount: 0,
    vat: 40.00,
    total: 240.00,
  },
  {
    id: "INV-003",
    customerName: "ABC Corp",
    amount: 500.00,
    status: "overdue",
    dueDate: "2024-01-10",
    createdDate: "2023-12-20",
    description: "Monthly Transport Package",
    paymentMethod: "Check",
    approved: true,
    cardCharge: 0,
    paidAmount: 0,
    vat: 100.00,
    total: 600.00,
  },
];

const Invoicing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    customerName: "",
    amount: "",
    description: "",
    dueDate: "",
  });

  const getStatusBadge = (status: string) => {
    const statusColors = {
      paid: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      overdue: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      draft: "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status as keyof typeof statusColors]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = selectedClient === "All Clients" || invoice.customerName === selectedClient;
    const matchesStatus = selectedStatus === "All Status" || invoice.status === selectedStatus;
    
    return matchesSearch && matchesClient && matchesStatus;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  const uniqueClients = ['All Clients', ...new Set(invoices.map(inv => inv.customerName))];
  const statuses = ['All Status', 'paid', 'pending', 'overdue', 'draft'];

  const handleAddInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding invoice:', newInvoice);
    setShowAddModal(false);
    setNewInvoice({ customerName: "", amount: "", description: "", dueDate: "" });
  };

  const handleExportCSV = () => {
    console.log("Export CSV");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Invoicing & Payments</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manage invoices, payments, and billing</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleExportCSV}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 text-sm"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-md transition-all duration-200 hover:scale-105 dark:bg-yellow-700 dark:hover:bg-yellow-800 text-sm"
              >
                <Plus className="h-4 w-4" />
                Create Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
            
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              {uniqueClients.map(client => (
                <option key={client} value={client}>{client}</option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
                </select>
              </div>
            </div>

        {/* Add Invoice Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Invoice</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleAddInvoice} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={newInvoice.customerName}
                    onChange={(e) => setNewInvoice({ ...newInvoice, customerName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newInvoice.description}
                    onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors text-sm"
                  >
                    Create Invoice
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Invoices Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="overflow-x-auto scrollbar-hide max-w-full">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full min-w-max table-fixed">
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                  <tr>
                    <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white text-xs">Invoice #</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white text-xs">Customer</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white text-xs">Amount</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white text-xs">Status</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white text-xs">Due Date</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white text-xs">Payment</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white text-xs">VAT</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white text-xs">Total</th>
                    <th className="text-left py-3 px-3 font-semibold text-gray-900 dark:text-white text-xs">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                      <td className="py-3 px-3 text-xs">
                        <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                          {invoice.id}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">
                              {invoice.customerName}
                      </td>
                      <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="py-3 px-3 text-xs">
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">
                        {formatDate(invoice.dueDate)}
                      </td>
                      <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">
                          {formatCurrency(invoice.paidAmount)}
                      </td>
                      <td className="py-3 px-3 text-xs text-gray-900 dark:text-white">
                        {formatCurrency(invoice.vat)}
                      </td>
                      <td className="py-3 px-3 text-xs font-medium text-gray-900 dark:text-white">
                        {formatCurrency(invoice.total)}
                      </td>
                      <td className="py-3 px-3 text-xs">
                        <div className="flex items-center gap-2">
                          <button className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300">
                            <Send className="h-4 w-4" />
                          </button>
                          <button className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>

        {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredInvoices.length)} of {filteredInvoices.length} invoices
          </div>
          <div className="flex items-center gap-2">
            <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoicing;
