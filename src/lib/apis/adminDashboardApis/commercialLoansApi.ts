// API for commercial loans management
export interface User {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  whatsapp: string;
  twitter: string;
  facebook: string;
  linkedIn: string;
  instagram: string;
  nmls: string;
  dre: string;
  role: string;
}

// Define the loan status enum
export enum LoanStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface CommercialLoan {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  ssn: number;
  details: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  houseNumber: string;
  businessNumber: string;
  email: string;
  annualIncome: number;
  monthlyExpenses: number;
  creditScore: number | null;
  existingDebt: number;
  businessName: string;
  businesstype: string;
  businessAddress: string;
  annualBusinessRevenue: number;
  loanAmount: number;
  status: LoanStatus | "in progress" | "submitted" | "approved" | "rejected"; // Support both enum and string for backward compatibility
  source: string;
  submittedDate?: string;
  user: User;
  avatar?: string;
  comments: string; // Admin comments for loan applications
}

const BACKEND_URL = 'https://lemara-9829c937fd90.herokuapp.com';

const CommercialLoansApi = {
  async fetchLoans(): Promise<CommercialLoan[]> {
    try {
      // Try direct connection to the Heroku backend 
      const response = await fetch(`${BACKEND_URL}/loan`);
      const data = await response.json();
      return this.processLoansData(data);
    } catch (corsError) {
      console.log("Falling back to proxy due to potential CORS issues:", corsError);
      // Fall back to our proxy API route
      const response = await fetch('/api/loans');
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return this.processLoansData(data);
    }
  },

  async fetchLoanById(loanId: number): Promise<CommercialLoan> {
    try {
      // Try direct connection to the Heroku backend for specific loan
      const response = await fetch(`${BACKEND_URL}/loan/${loanId}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const loanData = await response.json();
      
      // If the loan has a userId but no detailed user info, fetch user details
      if (loanData && loanData.userId && (!loanData.user || Object.keys(loanData.user).length === 0)) {
        try {
          const userResponse = await fetch(`${BACKEND_URL}/user/${loanData.userId}`);
          if (userResponse.ok) {
            const userData = await userResponse.json();
            loanData.user = userData;
          }
        } catch (userError) {
          console.error("Failed to fetch user details:", userError);
        }
      }
      
      return this.processLoanData(loanData);
    } catch (corsError) {
      console.log("Falling back to proxy due to potential CORS issues:", corsError);
      // Fall back to our proxy API route
      const response = await fetch(`/api/loans?id=${loanId}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const loanData = await response.json();
      return this.processLoanData(loanData);
    }
  },

  async updateLoanStatus(loanId: number, updateData: { status: string, comments: string }): Promise<CommercialLoan> {
    try {
      // Try direct connection to the Heroku backend
      const response = await fetch(`${BACKEND_URL}/loan/${loanId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      if (!response.ok) {
        throw new Error(`Error updating loan: ${response.status}`);
      }
      const data = await response.json();
      return this.processLoanData(data);
    } catch (corsError) {
      console.log("Falling back to proxy due to potential CORS issues:", corsError);
      // Fall back to our proxy API route
      const response = await fetch(`/api/proxy/loans/${loanId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      if (!response.ok) {
        throw new Error(`Error updating loan: ${response.status}`);
      }
      const data = await response.json();
      return this.processLoanData(data);
    }
  },

  // Helper method to process multiple loans data
  processLoansData(data: any): CommercialLoan[] {
    const loansData = Array.isArray(data) ? data : (data.loans || []);
    return loansData.map((loan: any) => this.processLoanData(loan));
  },

  // Helper method to process single loan data
  processLoanData(loanData: any): CommercialLoan {
    // Map status to enum values when possible
    let status = loanData.status || 'submitted';
    if (status === 'pending' || status === 'approved' || status === 'rejected') {
      status = status.toLowerCase();
    }
    
    return {
      ...loanData,
      status: status,
      comments: loanData.comments || '', // Ensure comments field is included
      submittedDate: loanData.createdAt ? new Date(loanData.createdAt).toLocaleDateString() : undefined,
      avatar: loanData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((loanData.firstName || '') + ' ' + (loanData.lastName || ''))}&background=0D8ABC&color=fff`,
      // Ensure user object is present
      user: loanData.user || {
        id: loanData.userId || 0,
        isActive: true,
        firstName: loanData.firstName || '',
        lastName: loanData.lastName || '',
        email: loanData.email || '',
        phone: loanData.houseNumber || '',
        role: 'user'
      }
    };
  }
};

export { CommercialLoansApi };
