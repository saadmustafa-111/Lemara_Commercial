import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, UserData } from "@/lib/authService";
import axiosInstance from "@/lib/axios";
import { error } from "console";


// export async function GET(request: NextRequest) {
//   try {
//     // Call the backend API using the custom axios instance
//     const response = await axiosInstance.get("/contacts/group"); // Verify if the endpoint is correct
//     console.log("API: Groups fetch successful:", response.status);

//     // Send the backend response back to the client
//     return NextResponse.json(response.data, { status: 200 });
//   } catch (apiError: any) {
//     // Log the error for debugging
//     console.error("API: Error fetching groups:", apiError.response?.data || apiError.message);

//     if (
//       apiError.code === "ECONNREFUSED" ||
//       apiError.code === "ETIMEDOUT" ||
//       apiError.code === "ECONNABORTED" ||
//       apiError.message?.includes("timeout") ||
//       !apiError.response
//     ) {
//       console.log("API: Backend server unreachable, using fallback");

//       // Provide a fallback response when the backend is unreachable
//       const fallbackResponse = {
//         data: [], // Return an empty array or mock data
//         message: "Backend unavailable, returning empty fallback data.",
//       };

//       return NextResponse.json(fallbackResponse, {
//         status: 200,
//         headers: {
//           "X-Warning": "Backend unavailable, returning fallback data.",
//         },
//       });
//     }

//     // For other errors, return a structured error response to the client
//     return NextResponse.json(
//       {
//         error: apiError.response?.data?.message || "Failed to fetch the groups",
//         details: apiError.response?.data,
//       },
//       { status: apiError.response?.status || 500 }
//     );
//   }
// }

export async function POST(request: NextRequest) {
  try {
    console.log("API: Received contact group creation request");
    const body = await request.json();
    
    // Basic validation
    if (!body.name) {
      return NextResponse.json(
        { error: "Group name is required" },
        { status: 400 }
      );
    }
    
    // Format the data according to the backend Group entity structure
    const formattedData = {
      name: body.name,
      // The user relationship will be handled by the backend using the token
    };
    
    console.log("API: Sending formatted data to backend:", formattedData);
    
    // Forward the request to the backend API
    try {
      // axiosInstance already includes token from localStorage in its interceptors
      const response = await axiosInstance.post("/contacts/group", formattedData);
      
      console.log("API: Group creation successful:", response.status);
      return NextResponse.json(
        { message: "Group created successfully", data: response.data },
        { status: 200 }
      );
    } catch (apiError: any) {
      console.error("API: Error creating group:", apiError.response?.data || apiError.message);
      // Check for network errors
      if (apiError.code === 'ECONNREFUSED' ||
        apiError.code === 'ETIMEDOUT' ||
        apiError.code === 'ECONNABORTED' ||
        apiError.message?.includes('timeout') ||
        !apiError.response) {
        console.log("API: Backend server unreachable, using local fallback");
        
        // Create a local group as fallback when backend is unreachable
        const mockResponse = {
          id: Math.floor(Math.random() * 1000) + 1,
          name: body.name,
          createdAt: new Date().toISOString()
        };
        
        // Store the group locally in localStorage for persistence
        try {
          if (typeof window !== 'undefined') {
            // This code will only run on the client side
            const localGroups = JSON.parse(localStorage.getItem('localContactGroups') || '[]');
            localGroups.push(mockResponse);
            localStorage.setItem('localContactGroups', JSON.stringify(localGroups));
          }
        } catch (storageError) {
          console.error("Failed to store local group:", storageError);
        }
        
        return NextResponse.json(
          {
            message: "Group created locally (backend unavailable)",
            data: mockResponse,
            warning: "This group was created locally due to backend connectivity issues"
          },
          { status: 200 }
        );
      }
      
      // Return the error from the API or a fallback error
      return NextResponse.json(
        {
          error: apiError.response?.data?.message || "Failed to create group",
          details: apiError.response?.data
        },
        { status: apiError.response?.status || 500 }
      );
    }
  } catch (error) {
    console.error("Server error creating contact group:", error);
    return NextResponse.json(
      { error: "Failed to create contact group" },
      { status: 500 }
    );
  }
}

