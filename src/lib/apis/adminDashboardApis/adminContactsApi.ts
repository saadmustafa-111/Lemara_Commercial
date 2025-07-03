import axiosInstance from '@/lib/axios';

// API for contacts in admin dashboard
export class AdminContactsApi {
  static async fetchContacts() {
    const response = await axiosInstance.get('/contacts/admin/all');
    return response.data;
  }
}
