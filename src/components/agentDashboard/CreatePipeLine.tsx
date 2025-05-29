'use client'
import React, { useState } from 'react';
import { Plus, Target, Users, DollarSign, TrendingUp, CheckCircle, ArrowLeft } from 'lucide-react';

const CreatePipeline = () => {
  const [form, setForm] = useState({
    name: '',
    participants: '',
    prospects: '',
    value: '',
    commission: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Pipeline Created:', form);
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after showing success
    setTimeout(() => {
      setForm({ name: '', participants: '', prospects: '', value: '', commission: '' });
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Create New Pipeline
            </h1>
            <p className="text-slate-600 text-lg">
              Set up a new sales pipeline to track your opportunities
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="space-y-8">
              {/* Pipeline Name */}
              <div className="group">
                <label className="flex items-center text-lg font-bold text-slate-700 mb-3">
                  <Target className="w-5 h-5 mr-2 text-indigo-600" />
                  Pipeline Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-lg font-medium placeholder-slate-400 group-hover:border-slate-300"
                  placeholder="e.g. Technology Sector, Food & Beverage"
                />
              </div>

              {/* Participants */}
              <div className="group">
                <label className="flex items-center text-lg font-bold text-slate-700 mb-3">
                  <Users className="w-5 h-5 mr-2 text-emerald-600" />
                  Participants
                </label>
                <input
                  type="number"
                  name="participants"
                  value={form.participants}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg font-medium placeholder-slate-400 group-hover:border-slate-300"
                  placeholder="e.g. 1,000"
                />
                <p className="text-sm text-slate-500 mt-2 ml-2">Number of people in this pipeline</p>
              </div>

              {/* Financial Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Prospects */}
                <div className="group">
                  <label className="flex items-center text-lg font-bold text-slate-700 mb-3">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                    Prospects
                  </label>
                  <input
                    type="text"
                    name="prospects"
                    value={form.prospects}
                    onChange={handleChange}
                    placeholder="$0"
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg font-medium placeholder-slate-400 group-hover:border-slate-300"
                  />
                </div>

                {/* Value */}
                <div className="group">
                  <label className="flex items-center text-lg font-bold text-slate-700 mb-3">
                    <TrendingUp className="w-5 h-5 mr-2 text-amber-600" />
                    Value
                  </label>
                  <input
                    type="text"
                    name="value"
                    value={form.value}
                    onChange={handleChange}
                    placeholder="$0"
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-300 text-lg font-medium placeholder-slate-400 group-hover:border-slate-300"
                  />
                </div>

                {/* Commission */}
                <div className="group">
                  <label className="flex items-center text-lg font-bold text-slate-700 mb-3">
                    <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                    Commission
                  </label>
                  <input
                    type="text"
                    name="commission"
                    value={form.commission}
                    onChange={handleChange}
                    placeholder="$0"
                    className="w-full px-4 py-4 border-2 border-slate-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-lg font-medium placeholder-slate-400 group-hover:border-slate-300"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || showSuccess}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 ease-out disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-3">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        <span>Creating Pipeline...</span>
                      </>
                    ) : showSuccess ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span>Pipeline Created Successfully!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                        <span>Create Pipeline</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Success Animation Overlay */}
          {showSuccess && (
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-green-500/20 backdrop-blur-sm flex items-center justify-center rounded-3xl">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mb-4 shadow-lg animate-bounce">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Success!</h3>
                <p className="text-slate-600">Your pipeline has been created</p>
              </div>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 text-sm">
            Fill in the basic information to get started. You can always edit these details later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatePipeline;