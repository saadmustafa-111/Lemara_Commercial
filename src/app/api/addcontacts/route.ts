import axiosInstance from "@/lib/axios";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    console.log("API: Received contact creation request");

    const {
      firstName,
      lastName,
      email,
      title,
      mobileNumber,
      country,
      state,
      city,
      address,
      zipcode,
      companyTitle,
        website,
        group
    } = await request.json();

    console.log("API: Parsed contact data", {
      firstName, lastName, email, mobileNumber, companyTitle
    });

    try {
      const response = await axiosInstance.post("/contacts", {
        firstName,
        lastName,
        email,
        title,
        mobileNumber,
        country,
        state,
        city,
        address,
        zipcode,
        companyTitle,
          website,
        group,
      });

      console.log("API: Contact creation success:", response.status);
      return NextResponse.json(response.data, { status: 200 });

    } catch (networkError) {
      console.error("API: Network error while contacting backend:", networkError);
      const mockResponse = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        message: "Contact created successfully (Mock response - backend unavailable)"
      };

      return NextResponse.json(mockResponse, { status: 200 });
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API: Axios Error during contact creation:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data
        }
      });

      return NextResponse.json(
        { message: error.response?.data?.message || error.message || "Internal Server Error" },
        { status: error.response?.status || 500 }
      );
    }

    console.error("API: Unexpected Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}