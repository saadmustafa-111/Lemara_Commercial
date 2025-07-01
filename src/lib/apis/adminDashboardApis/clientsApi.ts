enum Role {
  ADMIN = "admin",
  USER = "user",
  BROKER = "broker",
}

interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  whatsapp: string;
  twitter: string;
  facebook: string;
  linkedIn: string;
  instagram: string;
  nmls: string;
  dre: string;
  // UI display fields
  name?: string;
  type?: string;
  totalSpent?: number;
  properties?: number;
  joinDate?: string;
  status?: string;
  avatar?: string;
  location?: string;
  rating?: number;
  lastActivity?: string;
  preferredAgent?: string;
  budget?: number;
}

const BASE_URL = 'https://lemara-9829c937fd90.herokuapp.com';

export class ClientsApi {
  static async fetchClients(): Promise<Client[]> {
    try {
      let response;
      try {
        response = await fetch(`${BASE_URL}/user?role=${Role.USER}`);
      } catch (corsError) {
        console.log("Falling back to proxy due to potential CORS issues:", corsError);
        response = await fetch(`/api/proxy/users?role=${Role.USER}`);
      }
      
      if (!response.ok) {
        throw new Error(`Error fetching clients: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Data received from API for clients:", data);
      
      const clientsList = Array.isArray(data) ? data : (data.users || []);
      const clientsData: Client[] = clientsList.map((client: any) => {
        const createdDate = client.createdAt ? new Date(client.createdAt) : new Date();
        const joinDate = createdDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        
        const activityOptions = ['1 hour ago', '3 hours ago', '1 day ago', '2 days ago', '1 week ago'];
        const randomActivity = activityOptions[Math.floor(Math.random() * activityOptions.length)];
        
        const types = ['Buyer', 'Seller', 'Investor'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        
        const agents = ['Emily Chen', 'Sarah Johnson', 'Abdul Shah', 'AJ Rana', 'David Miller'];
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
        
        return {
          ...client,
          name: `${client.firstName} ${client.lastName}`,
          status: client.isActive ? 'active' : 'inactive',
          type: randomType,
          totalSpent: randomType === 'Buyer' ? Math.floor(Math.random() * 2000000) + 500000 : 0,
          properties: Math.floor(Math.random() * 5) + 1,
          joinDate,
          avatar: `https://ui-avatars.com/api/?name=${client.firstName}+${client.lastName}&background=random`,
          location: "California, USA",
          rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
          lastActivity: randomActivity,
          preferredAgent: randomAgent,
          budget: randomType !== 'Seller' ? Math.floor(Math.random() * 3000000) + 500000 : 0
        };
      });
      
      return clientsData;
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      throw error;
    }
  }

  static async createClient(clientData: Partial<Client>): Promise<Client> {
    try {
      let response;
      try {
        response = await fetch(`${BASE_URL}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...clientData, role: Role.USER }),
        });
      } catch (corsError) {
        response = await fetch(`/api/proxy/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...clientData, role: Role.USER }),
        });
      }
      
      if (!response.ok) {
        throw new Error(`Error creating client: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Failed to create client:", error);
      throw error;
    }
  }

  static async updateClient(clientId: number, clientData: Partial<Client>): Promise<Client> {
    try {
      let response;
      try {
        response = await fetch(`${BASE_URL}/user/${clientId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clientData),
        });
      } catch (corsError) {
        response = await fetch(`/api/proxy/users/${clientId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clientData),
        });
      }
      
      if (!response.ok) {
        throw new Error(`Error updating client: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Failed to update client:", error);
      throw error;
    }
  }

  static async deleteClient(clientId: number): Promise<void> {
    try {
      let response;
      try {
        response = await fetch(`${BASE_URL}/user/${clientId}`, {
          method: 'DELETE',
        });
      } catch (corsError) {
        response = await fetch(`/api/proxy/users/${clientId}`, {
          method: 'DELETE',
        });
      }
      
      if (!response.ok) {
        throw new Error(`Error deleting client: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to delete client:", error);
      throw error;
    }
  }
}
