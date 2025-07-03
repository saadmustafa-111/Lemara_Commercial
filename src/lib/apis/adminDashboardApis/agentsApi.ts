import axiosInstance from '@/lib/axios';

interface Agent {
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
  properties?: number;
  sales?: number;
  revenue?: number;
  status?: string;
  avatar?: string;
  location?: string;
  rating?: number;
  specialization?: string;
  joinDate?: string;
  name?: string;
}

const BASE_URL = 'https://lemara-9829c937fd90.herokuapp.com';

export class AgentsApi {
  static async fetchAgents(): Promise<Agent[]> {
    try {
      let response;
      try {
        response = await axiosInstance.get(`${BASE_URL}/user?role=broker`);
      } catch (corsError) {
        console.log("Falling back to proxy due to potential CORS issues:", corsError);
        response = await axiosInstance.get(`/api/proxy/users?role=broker`);
      }
      
      const data = response.data;
      console.log("Data received from API:", data);
      
      // Transform the API response to match our display needs
      const agentsList = Array.isArray(data) ? data : (data.users || data.brokers || []);
      const agentsData: Agent[] = agentsList.map((agent: any) => {
        const createdDate = agent.createdAt ? new Date(agent.createdAt) : new Date();
        const joinDate = createdDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        
        const firstName = agent.firstName || agent.name?.split(' ')[0] || "Unknown";
        const lastName = agent.lastName || (agent.name?.split(' ').slice(1).join(' ')) || "Agent";
        const isActive = typeof agent.isActive !== 'undefined' ? agent.isActive : true;
        
        return {
          ...agent,
          firstName,
          lastName,
          isActive,
          status: isActive ? 'active' : 'inactive',
          properties: agent.properties || Math.floor(Math.random() * 30) + 5,
          sales: agent.sales || Math.floor(Math.random() * 20) + 2,
          revenue: agent.revenue || Math.floor(Math.random() * 1000000) + 500000,
          joinDate,
          name: `${firstName} ${lastName}`,
          avatar: agent.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName+'+'+lastName)}&background=random`,
          location: agent.location || "California, USA",
          rating: agent.rating || parseFloat((Math.random() * 2 + 3).toFixed(1)),
          specialization: agent.specialization || "Commercial Real Estate"
        };
      });
      
      return agentsData;
    } catch (error) {
      console.error("Failed to fetch agents:", error);
      throw error;
    }
  }
}
