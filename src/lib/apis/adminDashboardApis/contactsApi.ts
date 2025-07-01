interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: string;
  isActive: boolean;
  title?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  zipcode?: string;
  companyTitle?: string;
  website?: string;
  avatar?: string;
}

const BASE_URL = 'https://lemara-9829c937fd90.herokuapp.com';

export class ContactsApi {
  static async fetchContacts(): Promise<Contact[]> {
    try {
      // Fetch from the actual backend API
      const response = await fetch(`${BASE_URL}/contacts/admin/all`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching contacts: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Add avatar field for UI if missing and ensure all required fields have default values
      const contactsWithAvatars = data.map((contact: any) => ({
        id: contact.id || 0,
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        email: contact.email || "",
        mobileNumber: contact.mobileNumber || "",
        createdAt: contact.createdAt || new Date().toISOString(),
        isActive: typeof contact.isActive === 'boolean' ? contact.isActive : true,
        title: contact.title || "",
        country: contact.country || "",
        state: contact.state || "",
        city: contact.city || "",
        address: contact.address || "",
        zipcode: contact.zipcode || "",
        companyTitle: contact.companyTitle || "",
        website: contact.website || "",
        avatar: contact.avatar || `https://ui-avatars.com/api/?name=${contact.firstName || ""}+${contact.lastName || ""}&background=00a0d1&color=fff`
      }));
      
      return contactsWithAvatars;
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      throw error;
    }
  }

  static async createContact(contact: Partial<Contact>): Promise<Contact> {
    try {
      const response = await fetch(`${BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      });

      if (!response.ok) {
        throw new Error(`Error creating contact: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to create contact:", error);
      throw error;
    }
  }

  static async updateContact(id: number, contact: Partial<Contact>): Promise<Contact> {
    try {
      const response = await fetch(`${BASE_URL}/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      });

      if (!response.ok) {
        throw new Error(`Error updating contact: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to update contact:", error);
      throw error;
    }
  }

  static async deleteContact(id: number): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/contacts/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Error deleting contact: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to delete contact:", error);
      throw error;
    }
  }
}
