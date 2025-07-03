import axiosInstance from '@/lib/axios';

interface LoanApplicationData {
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
  creditScore: number;
  existingDebt: number;
  businessName: string;
  businesstype: string;
  businessAddress: string;
  annualBusinessRevenue: number;
  loanAmount: number;
}

export async function submitLoanApplication(loanData: LoanApplicationData, authToken?: string | null) {
  try {
    const response = await axiosInstance.post('/loan', loanData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      timeout: 30000
    });
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Direct API request failed:', error);
    
    // Try fallback to proxy endpoint
    try {
      const response = await axiosInstance.post('/api/proxy/loan', loanData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        timeout: 30000
      });
      
      return { success: true, data: response.data };
    } catch (proxyError) {
      console.error('Proxy request also failed:', proxyError);
      throw proxyError;
    }
  }
}
