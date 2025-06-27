import { X, User, Briefcase, Phone, Mail, MapPin, DollarSign, CreditCard, BarChart4 } from "lucide-react";
import { CommercialLoan } from "../adminDashboard/commerical-loans-table";

interface LoanDetailsModalProps {
  loan: CommercialLoan | null;
  onClose: () => void;
}

export default function LoanDetailsModal({ loan, onClose }: LoanDetailsModalProps) {
  if (!loan) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-gray-50 to-[#00a0d1]/10 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Loan Application Details</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Header with loan ID and amount */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-[#00a0d1]/20 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-[#00a0d1]">
                  {loan.id}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Loan #{loan.id}</h3>
                <p className="text-gray-600">
                  Application Date: {new Date(loan.createdAt).toLocaleDateString()} | Submitted: {loan.submittedDate || 'N/A'}
                </p>
              </div>
            </div>
            <div className="px-4 py-2 bg-[#00a0d1]/10 rounded-lg">
              <span className="text-sm text-gray-600">Loan Amount:</span>
              <p className="text-xl font-bold text-[#00a0d1]">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(loan.loanAmount)}
              </p>
            </div>
          </div>

          {/* Main content sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div>
              {/* Applicant details */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Applicant Information</h4>
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#00a0d1] via-[#0090c0] to-[#0080b0] rounded-xl flex items-center justify-center shadow-lg">
                    <img
                      src={loan.avatar || "/placeholder.svg"}
                      alt={`${loan.firstName} ${loan.lastName}`}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-bold text-gray-900">{loan.firstName} {loan.lastName}</p>
                    <p className="text-gray-600">
                      SSN: {loan.ssn}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3 mt-4">
                  <div className="flex items-start">
                    <Mail className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Email:</span>
                      <span className="text-gray-900">{loan.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Phone:</span>
                      <span className="text-gray-900">{loan.houseNumber}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Address:</span>
                      <span className="text-gray-900">{loan.address}, {loan.city.replace('_', ' ')}, {loan.state} {loan.zip}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <DollarSign className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Annual Income:</span>
                      <span className="text-gray-900">{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(loan.annualIncome)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CreditCard className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Credit Score:</span>
                      <span className="text-gray-900">{loan.creditScore === null ? 'Not Available' : loan.creditScore}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status details */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Status Information</h4>
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-600">Current Status:</span>
                  <span className={`
                    ml-2 px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center
                    ${loan.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 
                     loan.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-200' : 
                     loan.status === 'submitted' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 
                     'bg-yellow-100 text-yellow-800 border border-yellow-200'}
                  `}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                      loan.status === 'approved' ? 'bg-emerald-500' : 
                      loan.status === 'rejected' ? 'bg-red-500' : 
                      loan.status === 'submitted' ? 'bg-blue-500' : 
                      'bg-yellow-500'
                    }`}></div>
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-600">Created Date:</span>
                  <span className="ml-2 text-gray-900">{new Date(loan.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-600">Updated Date:</span>
                  <span className="ml-2 text-gray-900">{new Date(loan.updatedAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Submitted Date:</span>
                  <span className="ml-2 text-gray-900">{loan.submittedDate || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Right column - Business Details and User Info */}
            <div className="space-y-6">
              {/* Business Details */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Business Information</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start">
                    <Briefcase className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Business Name:</span>
                      <span className="text-gray-900">{loan.businessName}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Briefcase className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Business Type:</span>
                      <span className="text-gray-900">{loan.businesstype}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Business Address:</span>
                      <span className="text-gray-900">{loan.businessAddress}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Business Phone:</span>
                      <span className="text-gray-900">{loan.businessNumber}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <BarChart4 className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Annual Business Revenue:</span>
                      <span className="text-gray-900">{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(loan.annualBusinessRevenue)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* User/Submitter Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">User Information</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start">
                    <User className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Submitted By:</span>
                      <span className="text-gray-900">{loan.user.firstName} {loan.user.lastName}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">User Role:</span>
                      <span className="text-gray-900">{loan.user.role}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">User Email:</span>
                      <span className="text-gray-900">{loan.user.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">User Phone:</span>
                      <span className="text-gray-900">{loan.user.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap justify-end gap-4">
            <a 
              href={`/api/loans/export?id=${loan.id}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-xl hover:bg-gray-300 transition-all cursor-pointer"
            >
              Download PDF
            </a>
            {loan.status !== 'approved' && loan.status !== 'rejected' && (
              <>
                <button 
                  onClick={() => window.location.href = `/admin/loans/process/${loan.id}`}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all"
                >
                  Process Application
                </button>
              </>
            )}
            <button onClick={onClose} className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-xl hover:bg-gray-200 transition-all">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
