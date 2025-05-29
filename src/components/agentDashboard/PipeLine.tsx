'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Target, Edit3, X, Users, DollarSign, TrendingUp, Calendar, User, Mail, Phone } from 'lucide-react';

const PipeLine = () => {
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPursuitModal, setShowPursuitModal] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState(null);

  // Sample data for visual idea with pursuits
  const [pipelines, setPipelines] = useState([
    { 
      id: 1,
      name: 'IT Sector', 
      participants: 122222, 
      prospects: '$450,000', 
      value: '$2,340,000', 
      commission: '$234,000',
      pursuits: [
        { id: 1, name: 'TechCorp Deal', contact: 'John Smith', email: 'john@techcorp.com', phone: '+1-555-0123', value: '$50,000', stage: 'Negotiation', probability: '75%' },
        { id: 2, name: 'StartupXYZ Project', contact: 'Sarah Johnson', email: 'sarah@startupxyz.com', phone: '+1-555-0124', value: '$25,000', stage: 'Proposal', probability: '45%' }
      ]
    },
    { 
      id: 2,
      name: 'Food Stall', 
      participants: 12222, 
      prospects: '$125,000', 
      value: '$890,000', 
      commission: '$89,000',
      pursuits: [
        { id: 3, name: 'Downtown Location', contact: 'Mike Chen', email: 'mike@foodgroup.com', phone: '+1-555-0125', value: '$15,000', stage: 'Initial Contact', probability: '30%' }
      ]
    }
  ]);

  const handleRowClick = (pipeline) => {
    setSelectedPipeline(pipeline);
    setShowEditModal(true);
  };

  const handleAddPursuit = () => {
    setShowPursuitModal(true);
  };

  const handleCreatePipeline = () => {
    router.push('/dashboard/agent/createpipeline');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Pipeline Management
            </h1>
            <p className="text-slate-600 text-lg">Manage and track your sales pipelines with precision</p>
          </div>
          
          <button
            onClick={handleCreatePipeline}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-out"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Create Pipeline</span>
            </div>
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-indigo-600" />
              Active Pipelines
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-4 px-6 font-bold text-slate-700 text-lg">Pipeline Name</th>
                    <th className="text-right py-4 px-6 font-bold text-slate-700 text-lg">Participants</th>
                    <th className="text-right py-4 px-6 font-bold text-slate-700 text-lg">Prospects</th>
                    <th className="text-right py-4 px-6 font-bold text-slate-700 text-lg">Value</th>
                    <th className="text-right py-4 px-6 font-bold text-slate-700 text-lg">Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {pipelines.map((pipe, idx) => (
                    <tr 
                      key={idx} 
                      onClick={() => handleRowClick(pipe)}
                      className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border-b border-slate-100 cursor-pointer"
                    >
                      <td className="py-6 px-6">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300"></div>
                          <span className="font-semibold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors duration-300">
                            {pipe.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-6 text-right">
                        <span className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-4 py-2 rounded-xl font-bold text-lg group-hover:scale-105 transition-transform duration-300">
                          <Users className="w-4 h-4 mr-2" />
                          {pipe.participants.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-6 px-6 text-right">
                        <span className="text-slate-600 font-semibold text-lg group-hover:text-slate-800 transition-colors duration-300">
                          {pipe.prospects}
                        </span>
                      </td>
                      <td className="py-6 px-6 text-right">
                        <span className="text-slate-600 font-semibold text-lg group-hover:text-slate-800 transition-colors duration-300">
                          {pipe.value}
                        </span>
                      </td>
                      <td className="py-6 px-6 text-right">
                        <span className="text-slate-600 font-semibold text-lg group-hover:text-slate-800 transition-colors duration-300">
                          {pipe.commission}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Empty State Enhancement */}
          {pipelines.length === 0 && (
            <div className="text-center py-16">
              <Target className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No pipelines yet</h3>
              <p className="text-slate-500">Create your first pipeline to get started</p>
            </div>
          )}
        </div>
        
        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 text-sm">
            Manage your sales pipeline efficiently with real-time insights and analytics
          </p>
        </div>
        
        {/* Edit Pipeline Modal */}
        {showEditModal && selectedPipeline && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-8 border-b border-slate-200">
                <h2 className="text-3xl font-bold text-slate-800 flex items-center">
                  <Edit3 className="w-7 h-7 mr-3 text-indigo-600" />
                  {selectedPipeline.name} Pipeline
                </h2>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-800">Pursuits Management</h3>
                  <button 
                    onClick={handleAddPursuit}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Pursuit
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-left py-4 px-4 font-bold text-slate-700">Pursuit Name</th>
                        <th className="text-left py-4 px-4 font-bold text-slate-700">Contact</th>
                        <th className="text-left py-4 px-4 font-bold text-slate-700">Email</th>
                        <th className="text-left py-4 px-4 font-bold text-slate-700">Phone</th>
                        <th className="text-right py-4 px-4 font-bold text-slate-700">Value</th>
                        <th className="text-center py-4 px-4 font-bold text-slate-700">Stage</th>
                        <th className="text-center py-4 px-4 font-bold text-slate-700">Probability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPipeline.pursuits?.map((pursuit) => (
                        <tr key={pursuit.id} className="hover:bg-slate-50 transition-colors duration-200 border-b border-slate-100">
                          <td className="py-4 px-4 font-semibold text-slate-800">{pursuit.name}</td>
                          <td className="py-4 px-4 text-slate-600 flex items-center">
                            <User className="w-4 h-4 mr-2 text-slate-400" />
                            {pursuit.contact}
                          </td>
                          <td className="py-4 px-4 text-slate-600">
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-slate-400" />
                              {pursuit.email}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-600">
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-slate-400" />
                              {pursuit.phone}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right font-bold text-emerald-600">{pursuit.value}</td>
                          <td className="py-4 px-4 text-center">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {pursuit.stage}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-bold">
                              {pursuit.probability}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {selectedPipeline.pursuits?.length === 0 && (
                  <div className="text-center py-12">
                    <Target className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-slate-600 mb-2">No pursuits yet</h4>
                    <p className="text-slate-500">Add your first pursuit to start tracking opportunities</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Add Pursuit Modal */}
        {showPursuitModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60 p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-2xl">
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                  <Plus className="w-6 h-6 mr-3 text-emerald-600" />
                  Add New Pursuit
                </h2>
                <button 
                  onClick={() => setShowPursuitModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              
              <div className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Pursuit Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter pursuit name"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Person</label>
                      <input 
                        type="text" 
                        placeholder="Enter contact name"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        placeholder="Enter email address"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                      <input 
                        type="tel" 
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Value</label>
                      <input 
                        type="text" 
                        placeholder="$0"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Stage</label>
                      <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200">
                        <option value="">Select stage</option>
                        <option value="Initial Contact">Initial Contact</option>
                        <option value="Qualification">Qualification</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Closed Won">Closed Won</option>
                        <option value="Closed Lost">Closed Lost</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Probability</label>
                      <input 
                        type="text" 
                        placeholder="0%"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-6">
                    <button 
                      type="button"
                      onClick={() => setShowPursuitModal(false)}
                      className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors duration-200 font-semibold"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Add Pursuit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PipeLine;