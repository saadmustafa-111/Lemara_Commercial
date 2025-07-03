// API for contacts in admin dashboard
export class AdminContactsApi {
  static async fetchContacts() {
    const response = await fetch('https://lemara-9829c937fd90.herokuapp.com/contacts/admin/all', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`Error fetching contacts: ${response.status}`);
    return response.json();
  }
}
