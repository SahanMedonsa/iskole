'use client';

import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import Card from '../../../components/Card';
import { FaCalendarAlt, FaFileAlt, FaChartBar, FaCog, FaPlus, FaCheck, FaTimes, FaClock } from 'react-icons/fa';

const leaveCategories = [
  { id: 1, name: 'Sick Leave', color: 'bg-red-100 text-red-800', icon: '🏥' },
  { id: 2, name: 'Casual Leave', color: 'bg-blue-100 text-blue-800', icon: '🎯' },
  { id: 3, name: 'Annual Leave', color: 'bg-green-100 text-green-800', icon: '🏖️' },
  { id: 4, name: 'Maternity Leave', color: 'bg-pink-100 text-pink-800', icon: '👶' },
  { id: 5, name: 'Study Leave', color: 'bg-purple-100 text-purple-800', icon: '📚' },
  { id: 6, name: 'Emergency Leave', color: 'bg-orange-100 text-orange-800', icon: '🚨' },
  { id: 7, name: 'Half-Day Leave', color: 'bg-yellow-100 text-yellow-800', icon: '⏰' },
  { id: 8, name: 'Unpaid Leave', color: 'bg-gray-100 text-gray-800', icon: '💼' },
];

const leaveRequests = [
  {
    id: 1,
    employeeName: 'John Doe',
    employeeId: 'EMP001',
    role: 'Teacher',
    leaveType: 'Sick Leave',
    fromDate: '2024-06-15',
    toDate: '2024-06-17',
    totalDays: 3,
    reason: 'Medical appointment and recovery',
    status: 'Pending',
    submittedDate: '2024-06-10',
    leaveBalance: 15
  },
  {
    id: 2,
    employeeName: 'Jane Smith',
    employeeId: 'EMP002',
    role: 'Clerk',
    leaveType: 'Annual Leave',
    fromDate: '2024-07-01',
    toDate: '2024-07-05',
    totalDays: 5,
    reason: 'Family vacation',
    status: 'Approved',
    submittedDate: '2024-06-05',
    leaveBalance: 20
  },
  {
    id: 3,
    employeeName: 'Bob Wilson',
    employeeId: 'EMP003',
    role: 'Principal',
    leaveType: 'Study Leave',
    fromDate: '2024-08-01',
    toDate: '2024-08-15',
    totalDays: 15,
    reason: 'Professional development course',
    status: 'Rejected',
    submittedDate: '2024-06-08',
    leaveBalance: 25
  }
];

const leaveSummary = {
  totalLeaves: 45,
  leavesRemaining: 180,
  onLeaveToday: 3,
  pendingRequests: 5,
  monthlyBreakdown: [
    { month: 'Jan', leaves: 8 },
    { month: 'Feb', leaves: 6 },
    { month: 'Mar', leaves: 12 },
    { month: 'Apr', leaves: 4 },
    { month: 'May', leaves: 10 },
    { month: 'Jun', leaves: 5 }
  ]
};

export default function LeavesPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Leave Management</h1>
            <button
              onClick={() => setShowLeaveForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <FaPlus className="text-sm" />
              New Leave Request
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 ${activeTab === 'dashboard' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            >
              <FaChartBar className="inline mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 ${activeTab === 'requests' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            >
              <FaFileAlt className="inline mr-2" />
              Leave Requests
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 ${activeTab === 'categories' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            >
              <FaCog className="inline mr-2" />
              Leave Categories
            </button>
            <button
              onClick={() => setActiveTab('policy')}
              className={`px-4 py-2 ${activeTab === 'policy' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            >
              <FaCalendarAlt className="inline mr-2" />
              Leave Policy
            </button>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FaCalendarAlt className="text-blue-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Leaves Taken</p>
                      <p className="text-2xl font-bold text-gray-900">{leaveSummary.totalLeaves}</p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <FaCheck className="text-green-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Leaves Remaining</p>
                      <p className="text-2xl font-bold text-gray-900">{leaveSummary.leavesRemaining}</p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <FaClock className="text-orange-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">On Leave Today</p>
                      <p className="text-2xl font-bold text-gray-900">{leaveSummary.onLeaveToday}</p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <FaFileAlt className="text-yellow-600 text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Pending Requests</p>
                      <p className="text-2xl font-bold text-gray-900">{leaveSummary.pendingRequests}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Monthly Breakdown Chart */}
              <Card>
                <h3 className="text-lg font-semibold mb-4">Monthly Leave Breakdown</h3>
                <div className="flex items-end justify-between h-32">
                  {leaveSummary.monthlyBreakdown.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="bg-blue-500 rounded-t w-8 mb-2"
                        style={{ height: `${(item.leaves / 12) * 100}px` }}
                      ></div>
                      <span className="text-xs text-gray-600">{item.month}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Staff on Leave Today */}
              <Card>
                <h3 className="text-lg font-semibold mb-4">Staff on Leave Today</h3>
                <div className="space-y-3">
                  {leaveRequests.filter(req => req.status === 'Approved').slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{request.employeeName}</p>
                        <p className="text-sm text-gray-600">{request.role} • {request.leaveType}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        {request.fromDate} - {request.toDate}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Leave Requests Tab */}
          {activeTab === 'requests' && (
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Leave Requests</h3>
                <div className="flex gap-2">
                  <select className="px-3 py-1 border rounded text-sm">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                  <select className="px-3 py-1 border rounded text-sm">
                    <option>All Types</option>
                    {leaveCategories.map(cat => (
                      <option key={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b">
                    <tr>
                      <th className="py-2 font-medium">Employee</th>
                      <th className="py-2 font-medium">Leave Type</th>
                      <th className="py-2 font-medium">From - To</th>
                      <th className="py-2 font-medium">Days</th>
                      <th className="py-2 font-medium">Status</th>
                      <th className="py-2 font-medium">Balance</th>
                      <th className="py-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map((request) => (
                      <tr key={request.id} className="border-b">
                        <td className="py-3">
                          <div>
                            <p className="font-medium">{request.employeeName}</p>
                            <p className="text-sm text-gray-600">{request.role} • {request.employeeId}</p>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs ${leaveCategories.find(cat => cat.name === request.leaveType)?.color}`}>
                            {request.leaveType}
                          </span>
                        </td>
                        <td className="py-3 text-sm">
                          {request.fromDate} - {request.toDate}
                        </td>
                        <td className="py-3">{request.totalDays}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="py-3 text-sm">{request.leaveBalance}</td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                            {request.status === 'Pending' && (
                              <>
                                <button className="text-green-600 hover:text-green-800 text-sm">Approve</button>
                                <button className="text-red-600 hover:text-red-800 text-sm">Reject</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Leave Categories Tab */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Leave Categories</h3>
                  <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                    Add Category
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {leaveCategories.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{category.icon}</span>
                        <div className="flex gap-1">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                          <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                        </div>
                      </div>
                      <h4 className="font-medium mb-1">{category.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${category.color}`}>
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Leave Policy Tab */}
          {activeTab === 'policy' && (
            <Card>
              <h3 className="text-lg font-semibold mb-4">Leave Policy</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Standard Leave Entitlements</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Sick Leave:</span>
                        <span>15 days per year</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Casual Leave:</span>
                        <span>7 days per year</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Leave:</span>
                        <span>21 days per year</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maternity Leave:</span>
                        <span>84 days</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Leave Application Rules</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Apply at least 3 days in advance for casual/annual leave</li>
                      <li>• Medical certificate required for sick leave  3 days</li>
                      <li>• Maximum 5 consecutive days for casual leave</li>
                      <li>• Leave balance must be available</li>
                    </ul>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Edit Policy
                </button>
              </div>
            </Card>
          )}

          {/* Leave Request Form Modal */}
          {showLeaveForm && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">New Leave Request</h2>
                    <button
                      onClick={() => setShowLeaveForm(false)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role/Designation</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Teacher</option>
                          <option>Clerk</option>
                          <option>Principal</option>
                          <option>Staff</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          {leaveCategories.map(cat => (
                            <option key={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                        <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                        <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Leave</label>
                      <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Documents</label>
                      <input type="file" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact During Leave</label>
                      <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Optional" />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowLeaveForm(false)}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Submit Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 