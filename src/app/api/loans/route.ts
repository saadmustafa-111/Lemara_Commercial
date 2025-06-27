import { NextRequest, NextResponse } from 'next/server';

// External API or database client could be imported here
// import { db } from '@/lib/database';
// import { fetchFromExternalApi } from '@/lib/api-client';

// In-memory database to simulate dynamic data storage between requests
// This would be replaced by a real database connection in production
let dynamicLoansDatabase = new Map();

// Define an interface for our loan type
interface User {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  whatsapp: string;
  twitter: string;
  facebook: string;
  linkedIn: string;
  instagram: string;
  nmls: string;
  dre: string;
  role: string;
}

interface Loan {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
  creditScore: number | null;
  existingDebt: number;
  businessName: string;
  businesstype: string;
  businessAddress: string;
  annualBusinessRevenue: number;
  loanAmount: number;
  status: string;
  source: string;
  submittedDate?: string;
  user: User;
  avatar?: string;
}

// Initialize the database with some data if it's empty
async function initializeDatabase(): Promise<void> {
  if (dynamicLoansDatabase.size === 0) {
    try {
      // In production, this would be replaced with:
      // const loans = await fetchFromExternalApi('https://your-actual-api.com/loans');
      // or
      // const loans = await db.loans.findMany();
      
      // For now, we'll simulate fetching from a real database with this data
      const externalApiResponse = [
        {
          id: 1,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          firstName: "Safa",
          lastName: "Noor",
          ssn: 222,
          details: "for going abroad for medical purposes",
          address: "kaghan colony",
          city: "new_york",
          state: "AK",
          zip: "22010",
          houseNumber: "325465745324",
          businessNumber: "3456412",
          email: "test@gmail.com",
          annualIncome: 4503000,
          monthlyExpenses: 23000,
          creditScore: null,
          existingDebt: 23456,
          businessName: "clothing",
          businesstype: "partnership",
          businessAddress: "lahore",
          annualBusinessRevenue: 3000000,
          loanAmount: 450000,
          status: "approved",
          source: "Online Application",
          user: {
            id: 2,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            firstName: "Safa",
            lastName: "Noor",
            password: "******",
            email: "user@gmail.com",
            phone: "12345667",
            whatsapp: "string",
            twitter: "string",
            facebook: "string",
            linkedIn: "string",
            instagram: "string",
            nmls: "string",
            dre: "string",
            role: "user"
          },
          avatar: "https://ui-avatars.com/api/?name=Safa+Noor&background=0D8ABC&color=fff"
        }
      ];
      
      // Store data in our dynamic map
      for (const loan of externalApiResponse) {
        dynamicLoansDatabase.set(loan.id, loan);
      }
    } catch (error) {
      console.error("Error initializing database:", error);
      // In a real app, you might want to retry or handle this differently
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    // Ensure database is initialized
    await initializeDatabase();
    
    // Simulate network latency for production-like conditions
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const loanId = searchParams.get('id');
    const statusFilter = searchParams.get('status');
    
    // Fetch all loans as an array from our dynamic database
    const allLoans: Loan[] = Array.from(dynamicLoansDatabase.values());
    
    // Handle specific loan request
    if (loanId) {
      const loan = allLoans.find(loan => loan.id === Number(loanId));
      
      if (!loan) {
        return NextResponse.json({ error: 'Loan not found' }, { status: 404 });
      }
      
      // Return the specific loan with cache control headers
      return NextResponse.json(loan, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }
    
    // Apply filters if needed
    let filteredLoans = allLoans;
    if (statusFilter && statusFilter !== 'all') {
      filteredLoans = allLoans.filter(loan => loan.status === statusFilter);
    }
    
    // Return all loans with cache control headers
    return NextResponse.json(filteredLoans, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    console.error('Error fetching loans:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Ensure database is initialized before adding new records
    await initializeDatabase();
    
    const data = await req.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'businessName', 'loanAmount'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ 
          error: `Missing required field: ${field}` 
        }, { status: 400 });
      }
    }
    
    // Generate a new ID (in a real DB this would be auto-incremented or use UUID)
    const allLoans = Array.from(dynamicLoansDatabase.values()) as Loan[];
    let nextId = 1;
    if (allLoans.length > 0) {
      const maxId = Math.max(...allLoans.map(loan => loan.id));
      nextId = maxId + 1;
    }
    
    // Create the new loan
    const newLoan: Loan = {
      id: nextId,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ssn: data.ssn || Math.floor(Math.random() * 900) + 100,
      details: data.details || `Loan for ${data.businessName}`,
      address: data.address || "Address not provided",
      city: data.city || "new_york",
      state: data.state || "NY",
      zip: data.zip || "10001", 
      houseNumber: data.houseNumber || "N/A",
      businessNumber: data.businessNumber || "N/A",
      email: data.email,
      annualIncome: data.annualIncome || 0,
      monthlyExpenses: data.monthlyExpenses || 0,
      creditScore: data.creditScore || null,
      existingDebt: data.existingDebt || 0,
      businessName: data.businessName,
      businesstype: data.businesstype || "LLC",
      businessAddress: data.businessAddress || "N/A",
      annualBusinessRevenue: data.annualBusinessRevenue || 0,
      loanAmount: data.loanAmount || 0,
      status: "submitted", // New loans start as submitted
      source: data.source || "Online Application", // Default source
      submittedDate: new Date().toLocaleDateString(),
      // Create a default user if not provided
      user: data.user || {
        id: Math.floor(Math.random() * 1000) + 100,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        firstName: data.firstName,
        lastName: data.lastName,
        password: "********", // Don't include actual passwords in responses
        email: data.email,
        phone: data.phone || "N/A",
        whatsapp: data.whatsapp || "N/A",
        twitter: data.twitter || "N/A",
        facebook: data.facebook || "N/A",
        linkedIn: data.linkedIn || "N/A",
        instagram: data.instagram || "N/A",
        nmls: data.nmls || "N/A",
        dre: data.dre || "N/A",
        role: "user"
      },
      avatar: data.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.firstName+' '+data.lastName)}&background=0D8ABC&color=fff`
    };
    
    // In a real application, you would save to a database
    // db.loans.create({ data: newLoan });
    
    // For our dynamic implementation, we save to our Map
    dynamicLoansDatabase.set(newLoan.id, newLoan);
    
    // Return the newly created loan
    return NextResponse.json(newLoan, { 
      status: 201,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error creating loan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
