'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Target, Edit3, X, Users, DollarSign, TrendingUp, Calendar, User, Mail, Phone, Upload, Building, MapPin, Contact } from 'lucide-react';

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

  // For pursuit form state
  const initialPursuitForm = {
    propertyName: '',
    propertyType: '',
    squareFootage: '',
    tenancy: '',
    yearBuilt: '',
    entity: '',
    trueOwner: '',
    price: '',
    fee: '',
    probability: '',
    marketingCost: '',
    lastContact: '',
    nextStep: '',
    city: '',
    state: '',
    zip: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    image: null
  };
  const [pursuitForm, setPursuitForm] = useState(initialPursuitForm);

  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const nextStepOptions = [
    'Send Proposal',
    'Send Email',
    'Schedule Meeting',
    'Follow Up Call',
    'Site Visit'
  ];

  const handleRowClick = (pipeline) => {
    setSelectedPipeline(pipeline);
    setShowEditModal(true);
  };

  const handleAddPursuit = () => {
    setShowPursuitModal(true);
    setPursuitForm(initialPursuitForm);
  };

  const handleCreatePipeline = () => {
    router.push('/dashboard/agent/createpipeline');
  };

  const handlePursuitFormChange = (e) => {
    const { name, value, files, type } = e.target;
    setPursuitForm((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handlePursuitSubmit = (e) => {
    e.preventDefault();

    // Compose new pursuit object
    const newPursuit = {
      id: Date.now(), // Simple unique id for demo
      name: pursuitForm.propertyName || 'New Pursuit',
      contact: `${pursuitForm.firstName} ${pursuitForm.lastName}`.trim(),
      email: pursuitForm.email,
      phone: pursuitForm.phone,
      value: pursuitForm.price,
      stage: pursuitForm.nextStep.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      probability: pursuitForm.probability ? pursuitForm.probability.charAt(0).toUpperCase() + pursuitForm.probability.slice(1) : '',
      // ...add more fields as needed
    };

    // Update pipelines state
    setPipelines(prev =>
      prev.map(pipe =>
        pipe.id === selectedPipeline.id
          ? { ...pipe, pursuits: [...(pipe.pursuits || []), newPursuit] }
          : pipe
      )
    );

    setShowPursuitModal(false);
    setShowEditModal(true); // Remain in pipeline edit modal
    setPursuitForm(initialPursuitForm);
    // Optionally, update selectedPipeline too for instant UI update
    setSelectedPipeline(prev => ({
      ...prev,
      pursuits: [...(prev.pursuits || []), newPursuit]
    }));
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
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
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
                <form className="space-y-8" onSubmit={handlePursuitSubmit}>
                  {/* Property Information Section */}
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                      <Building className="w-5 h-5 mr-2 text-indigo-600" />
                      Property Information
                    </h3>
                    {/* Upload Image */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Image</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors duration-200">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-600">Click to upload or drag and drop</p>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          name="image"
                          onChange={handlePursuitFormChange}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Property Name</label>
                        <input 
                          type="text"
                          name="propertyName"
                          value={pursuitForm.propertyName}
                          onChange={handlePursuitFormChange}
                          placeholder="Enter property name"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Property Type</label>
                        <input 
                          type="text"
                          name="propertyType"
                          value={pursuitForm.propertyType}
                          onChange={handlePursuitFormChange}
                          placeholder="Enter property type"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Square Footage</label>
                        <input 
                          type="text"
                          name="squareFootage"
                          value={pursuitForm.squareFootage}
                          onChange={handlePursuitFormChange}
                          placeholder="Enter sq ft"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Tenancy</label>
                        <select 
                          name="tenancy"
                          value={pursuitForm.tenancy}
                          onChange={handlePursuitFormChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                        >
                          <option value="">Select tenancy</option>
                          <option value="vacant">Vacant</option>
                          <option value="single">Single</option>
                          <option value="multi">Multi</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Year Built</label>
                        <input 
                          type="text"
                          name="yearBuilt"
                          value={pursuitForm.yearBuilt}
                          onChange={handlePursuitFormChange}
                          placeholder="Enter year"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Entity</label>
                        <input 
                          type="text"
                          name="entity"
                          value={pursuitForm.entity}
                          onChange={handlePursuitFormChange}
                          placeholder="Enter entity"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">True Owner</label>
                        <input 
                          type="text"
                          name="trueOwner"
                          value={pursuitForm.trueOwner}
                          onChange={handlePursuitFormChange}
                          placeholder="Enter true owner"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Tracking Section */}
                  <div className="bg-emerald-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                      Tracking
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Price</label>
                        <input 
                          type="text"
                          name="price"
                          value={pursuitForm.price}
                          onChange={handlePursuitFormChange}
                          placeholder="$0"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Fee</label>
                        <input 
                          type="text"
                          name="fee"
                          value={pursuitForm.fee}
                          onChange={handlePursuitFormChange}
                          placeholder="$0"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Probability</label>
                        <select 
                          name="probability"
                          value={pursuitForm.probability}
                          onChange={handlePursuitFormChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                        >
                          <option value="">Select probability</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Est. Marketing Cost</label>
                        <input 
                          type="text"
                          name="marketingCost"
                          value={pursuitForm.marketingCost}
                          onChange={handlePursuitFormChange}
                          placeholder="$0"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Last Contact</label>
                        <input 
                          type="date"
                          name="lastContact"
                          value={pursuitForm.lastContact}
                          onChange={handlePursuitFormChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Next Step</label>
                      <select 
                        name="nextStep"
                        value={pursuitForm.nextStep}
                        onChange={handlePursuitFormChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                      >
                        <option value="">Select next step</option>
                        {nextStepOptions.map((option, idx) => (
                          <option key={idx} value={option.toLowerCase().replace(' ', '_')}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Address Section */}
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                      Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                        <input 
                          type="text"
                          name="city"
                          value={pursuitForm.city}
                          onChange={handlePursuitFormChange}
                          placeholder="Enter city"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
                        <select 
                          name="state"
                          value={pursuitForm.state}
                          onChange={handlePursuitFormChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        >
                          <option value="">Select state</option>
                          {usStates.map((state, idx) => (
                            <option key={idx} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Zip Code</label>
                        <input 
                          type="text"
                          name="zip"
                          value={pursuitForm.zip}
                          onChange={handlePursuitFormChange}
                          placeholder="Enter zip code"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Contact Info Section */}
                  <div className="bg-purple-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                      <Contact className="w-5 h-5 mr-2 text-purple-600" />
                      Contact Info
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                        <input 
                          type="text"
                          name="firstName"
                          value={pursuitForm.firstName}
                          onChange={handlePursuitFormChange}
                          placeholder="Enter first name"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                        <input 
                          type="text"
                          name="lastName"
                          value={pursuitForm.lastName}
                          onChange={handlePursuitFormChange}
                          placeholder="Enter last name"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                        <input 
                          type="tel"
                          name="phone"
                          value={pursuitForm.phone}
                          onChange={handlePursuitFormChange}
                          placeholder="Enter phone number"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                        <input 
                          type="email"
                          name="email"
                          value={pursuitForm.email}
                          onChange={handlePursuitFormChange}
                          placeholder="Enter email address"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                        />
                      </div>
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
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
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
};

export default PipeLine;