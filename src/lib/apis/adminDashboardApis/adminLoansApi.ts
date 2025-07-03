import axiosInstance from '@/lib/axios';

// API for commercial loans in admin dashboard
export class AdminLoansApi {
  static async fetchLoans() {
    try {
      const response = await axiosInstance.get('/loan');
      return response.data;
    } catch (corsError) {
      console.log("Falling back to proxy due to potential CORS issues:", corsError);
      const response = await axiosInstance.get('/api/loans');
      return response.data;
    }
  }

  static async fetchLoanById(loanId: number) {
    try {
      const response = await axiosInstance.get(`/loan/${loanId}`);
      return response.data;
    } catch (corsError) {
      console.log("Falling back to proxy due to potential CORS issues:", corsError);
      const response = await axiosInstance.get(`/api/loans?id=${loanId}`);
      return response.data;
    }
  }

  static async updateLoanComment(loanId: number, comment: string) {
    try {
      const response = await axiosInstance.patch(`/loan/${loanId}`, {
        comments: comment
      });
      return response.data;
    } catch (corsError) {
      console.log("Falling back to proxy due to potential CORS issues:", corsError);
      const response = await axiosInstance.patch(`/api/proxy/loans/${loanId}`, {
        comments: comment
      });
      return response.data;
    }
  }
}
