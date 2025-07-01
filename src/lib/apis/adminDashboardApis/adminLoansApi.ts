// API for commercial loans in admin dashboard
export class AdminLoansApi {
  static async fetchLoans() {
    let response;
    try {
      response = await fetch('https://lemara-9829c937fd90.herokuapp.com/loan');
    } catch (corsError) {
      response = await fetch('/api/loans');
    }
    if (!response.ok) throw new Error(`Error fetching loans: ${response.status}`);
    return response.json();
  }

  static async fetchLoanById(loanId: number) {
    let response;
    try {
      response = await fetch(`https://lemara-9829c937fd90.herokuapp.com/loan/${loanId}`);
    } catch (corsError) {
      response = await fetch(`/api/loans?id=${loanId}`);
    }
    if (!response.ok) throw new Error(`Error fetching loan: ${response.status}`);
    return response.json();
  }

  static async updateLoanComment(loanId: number, comment: string) {
    let response;
    try {
      response = await fetch(`https://lemara-9829c937fd90.herokuapp.com/loan/${loanId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments: comment })
      });
    } catch (corsError) {
      response = await fetch(`/api/proxy/loans/${loanId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments: comment })
      });
    }
    if (!response.ok) throw new Error(`Error updating comment: ${response.status}`);
    return response.json();
  }
}
