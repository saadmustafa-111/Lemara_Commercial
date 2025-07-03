import { useState, useEffect } from "react";
import { X, User, Briefcase, Phone, Mail, MapPin, DollarSign, CreditCard, BarChart4, AlertCircle, ChevronDown, ChevronUp, Calendar, MessageSquare } from "lucide-react";
import { CommercialLoan, LoansApi } from "@/lib/apis/adminDashboardApis/loansApi";

interface LoanDetailsModalProps {
  loan: CommercialLoan | null;
  onClose: () => void;
}

export default function LoanDetailsModal({ loan, onClose }: LoanDetailsModalProps) {
  const [otherLoans, setOtherLoans] = useState<CommercialLoan[]>([]);
  const [isLoadingOtherLoans, setIsLoadingOtherLoans] = useState(false);
  const [showOtherLoans, setShowOtherLoans] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState<number | null>(null);

  // Fetch other loans by the same user when the modal is opened
  useEffect(() => {
    const fetchOtherLoansByUser = async () => {
      if (!loan || !loan.email) return;
      
      setIsLoadingOtherLoans(true);
      try {
        // Use LoansApi to fetch all loans, then filter by email
        const allLoans = await LoansApi.fetchLoans();
        const userLoans = allLoans
          .filter((l) => l.email === loan.email && l.id !== loan.id);
        
        setOtherLoans(userLoans);
      } catch (error) {
        console.error('Error fetching other loans:', error);
      } finally {
        setIsLoadingOtherLoans(false);
      }
    };
    
    fetchOtherLoansByUser();
  }, [loan]);
  
  if (!loan) return null;
  
  const activeLoan = selectedLoanId ? otherLoans.find(l => l.id === selectedLoanId) || loan : loan;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-gray-50 to-[#00a0d1]/10 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            Loan Application Details
            {otherLoans.length > 0 && (
              <span className="ml-2 text-sm font-normal text-[#00a0d1] bg-[#00a0d1]/10 px-2 py-1 rounded-full">
                {otherLoans.length + 1} applications from this user
              </span>
            )}
          </h2>
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
                  {activeLoan.id}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Loan #{activeLoan.id}</h3>
                <p className="text-gray-600">
                  Application Date: {new Date(activeLoan.createdAt).toLocaleDateString()} | Submitted: {activeLoan.submittedDate || 'N/A'}
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
                }).format(activeLoan.loanAmount)}
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
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#00a0d1] via-[#0090c0] to-[#0080b0] rounded-xl flex items-center justify-center mr-4">
                    <img
                      src={activeLoan.avatar || "/placeholder.svg"}
                      alt={`${activeLoan.firstName} ${activeLoan.lastName}`}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-bold text-gray-900">{activeLoan.firstName} {activeLoan.lastName}</p>
                    <p className="text-gray-600">
                      SSN: {activeLoan.ssn}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3 mt-4">
                  <div className="flex items-start">
                    <Mail className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Email:</span>
                      <span className="text-gray-900">{activeLoan.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Phone:</span>
                      <span className="text-gray-900">{activeLoan.houseNumber}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Address:</span>
                      <span className="text-gray-900">{activeLoan.address}, {activeLoan.city.replace('_', ' ')}, {activeLoan.state} {activeLoan.zip}</span>
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
                      }).format(activeLoan.annualIncome)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CreditCard className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Credit Score:</span>
                      <span className="text-gray-900">{activeLoan.creditScore === null ? 'Not Available' : activeLoan.creditScore}</span>
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
                    ${activeLoan.status === 'approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 
                     activeLoan.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-200' : 
                     activeLoan.status === 'submitted' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 
                     'bg-yellow-100 text-yellow-800 border border-yellow-200'}
                  `}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                      activeLoan.status === 'approved' ? 'bg-emerald-500' : 
                      activeLoan.status === 'rejected' ? 'bg-red-500' : 
                      activeLoan.status === 'submitted' ? 'bg-blue-500' : 
                      'bg-yellow-500'
                    }`}></div>
                    {activeLoan.status.charAt(0).toUpperCase() + activeLoan.status.slice(1)}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-600">Created Date:</span>
                  <span className="ml-2 text-gray-900">{new Date(activeLoan.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-600">Updated Date:</span>
                  <span className="ml-2 text-gray-900">{new Date(activeLoan.updatedAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Submitted Date:</span>
                  <span className="ml-2 text-gray-900">{activeLoan.submittedDate || 'N/A'}</span>
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
                      <span className="text-gray-900">{activeLoan.businessName}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Briefcase className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Business Type:</span>
                      <span className="text-gray-900">{activeLoan.businesstype}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Business Address:</span>
                      <span className="text-gray-900">{activeLoan.businessAddress}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Business Phone:</span>
                      <span className="text-gray-900">{activeLoan.businessNumber}</span>
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
                      }).format(activeLoan.annualBusinessRevenue)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Admin Comments Section */}
              <div className="bg-purple-50 rounded-xl p-6 mb-6 border border-purple-200">
                <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Remarks
                </h4>
                {activeLoan.comments ? (
                  <div className="whitespace-pre-wrap text-purple-800 bg-white p-4 rounded-lg border border-purple-100">
                    {activeLoan.comments}
                  </div>
                ) : (
                  <div className="text-purple-700 bg-white p-4 rounded-lg border border-purple-100 italic">
                    No admin remarks have been added for this loan application.
                  </div>
                )}
              </div>
              
              {/* User/Submitter Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">User Information</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start">
                    <User className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">Submitted By:</span>
                      <span className="text-gray-900">{activeLoan.user.firstName} {activeLoan.user.lastName}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">User Role:</span>
                      <span className="text-gray-900">{activeLoan.user.role}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">User Email:</span>
                      <span className="text-gray-900">{activeLoan.user.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-4 h-4 mt-1 mr-2 text-[#00a0d1]" />
                    <div>
                      <span className="text-sm font-medium text-gray-600 block">User Phone:</span>
                      <span className="text-gray-900">{activeLoan.user.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Loans Section */}
          {otherLoans.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-gray-900">Other Loans from the Same User</h4>
                <button
                  onClick={() => setShowOtherLoans(!showOtherLoans)}
                  className="text-sm font-medium text-[#00a0d1] flex items-center"
                >
                  {showOtherLoans ? 'Hide' : 'View'} All
                  {showOtherLoans ? (
                    <ChevronUp className="w-4 h-4 ml-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </button>
              </div>
              
              {showOtherLoans ? (
                <div className="space-y-4">
                  {otherLoans.map((ol) => (
                    <div key={ol.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-[#00a0d1]/20 rounded-xl flex items-center justify-center mr-3">
                            <span className="text-xl font-bold text-[#00a0d1]">
                              {ol.id}
                            </span>
                          </div>
                          <div>
                            <p className="text-md font-semibold text-gray-900">Loan #{ol.id}</p>
                            <p className="text-sm text-gray-600">
                              Amount: {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(ol.loanAmount)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`
                            inline-block px-3 py-1 rounded-full text-xs font-semibold
                            ${ol.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 
                             ol.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                             ol.status === 'submitted' ? 'bg-blue-100 text-blue-800' : 
                             'bg-yellow-100 text-yellow-800'}
                          `}>
                            {ol.status.charAt(0).toUpperCase() + ol.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(ol.createdAt).toLocaleDateString()}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="w-4 h-4 mr-2" />
                          {ol.email}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="w-4 h-4 mr-2" />
                          {ol.houseNumber}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  {otherLoans.length} other loan application{otherLoans.length > 1 ? 's' : ''} found for this user.
                </div>
              )}
            </div>
          )}

          {/* Other Loans from Same User */}
          {otherLoans.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div 
                className="flex items-center justify-between cursor-pointer mb-4"
                onClick={() => setShowOtherLoans(!showOtherLoans)}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-[#00a0d1]/10 rounded-lg mr-2">
                    <User className="w-5 h-5 text-[#00a0d1]" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Other Loan Applications ({otherLoans.length})
                  </h4>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  {showOtherLoans ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>
              
              {showOtherLoans && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">ID</th>
                          <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                          <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Amount</th>
                          <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Business</th>
                          <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Remarks</th>
                          <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                          <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {otherLoans.map((otherLoan) => (
                          <tr 
                            key={otherLoan.id} 
                            className={`hover:bg-[#00a0d1]/5 transition-colors ${selectedLoanId === otherLoan.id ? 'bg-[#00a0d1]/10' : ''}`}
                          >
                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{otherLoan.id}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                              {new Date(otherLoan.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(otherLoan.loanAmount)}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">{otherLoan.businessName}</td>
                            <td className="px-3 py-2">
                              {otherLoan.comments ? (
                                <div className="max-w-[200px] overflow-hidden">
                                  <div className="flex items-start">
                                    <MessageSquare className="w-3.5 h-3.5 mr-1 text-purple-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-purple-700 line-clamp-2">
                                      {otherLoan.comments}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-xs text-gray-500 italic">No comments</span>
                              )}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <span className={`
                                px-2 py-1 text-xs font-semibold rounded-full inline-flex items-center
                                ${otherLoan.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 
                                otherLoan.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                otherLoan.status === 'submitted' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'}
                              `}>
                                {otherLoan.status.charAt(0).toUpperCase() + otherLoan.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm">
                              <button 
                                onClick={() => setSelectedLoanId(selectedLoanId === otherLoan.id ? null : otherLoan.id)}
                                className="text-[#00a0d1] hover:text-[#0080b0] font-medium"
                              >
                                {selectedLoanId === otherLoan.id ? 'Hide Details' : 'View Details'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Current Loan Info */}
          {selectedLoanId && (
            <div className="mb-6 p-4 bg-[#00a0d1]/10 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-[#00a0d1] mr-2" />
                  <span className="font-medium">
                    Currently Viewing: Loan #{selectedLoanId}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedLoanId(null)} 
                  className="px-2 py-1 bg-white text-gray-700 text-sm rounded-md hover:bg-gray-100"
                >
                  Return to Original
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap justify-end gap-4">
            <button onClick={onClose} className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-xl hover:bg-gray-200 transition-all">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}