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

const API_BASE_URL = 'https://lemara-9829c937fd90.herokuapp.com';

export async function submitLoanApplication(loanData: LoanApplicationData, authToken?: string | null) {
  try {
    // First try with axios
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
    console.error('Axios request failed, attempting fetch fallback...', error);
    
    // Fallback to fetch if axios fails
    try {
      const fetchResponse = await fetch(`${API_BASE_URL}/loan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        body: JSON.stringify(loanData)
      });

      if (!fetchResponse.ok) {
        const errorText = await fetchResponse.text();
        throw new Error(`HTTP error! status: ${fetchResponse.status}, message: ${errorText}`);
      }

      const data = await fetchResponse.json();
      return { success: true, data };
    } catch (fetchError) {
      console.error('Fetch fallback also failed:', fetchError);
      throw fetchError;
    }
  }
}
