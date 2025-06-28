import { NextRequest, NextResponse } from 'next/server';

// Example response structure based on the user's requirements
const sampleListings = [
  {
    id: 1,
    isActive: true,
    createdAt: "2025-06-28T10:30:22.606Z",
    updatedAt: "2025-06-28T10:30:22.606Z",
    market: "commercial",
    listingType: "office",
    address: "123 Main Street",
    address2: "Suite 101",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "USA",
    neighborhood: "Midtown",
    assessorsPArcelNumber: "123",
    latitude: 40.7128,
    longitude: -74.0060,
    sellerFinancing: true,
    oppertunityZone: false,
    description: "Premium office space in the heart of Midtown Manhattan",
    highlights: [
      "Corner unit with floor-to-ceiling windows",
      "Recently renovated",
      "Includes 3 private offices",
      "Shared conference room",
      "24/7 security"
    ],
    confidentiality: "NDA",
    availableToBroker: true,
    visibility: true
  },
  {
    id: 2,
    isActive: true,
    createdAt: "2025-06-28T11:59:53.606Z",
    updatedAt: "2025-06-28T11:59:53.606Z",
    market: "market",
    listingType: "bsinesesrealstate",
    address: "paris",
    address2: "",
    city: "Kohat",
    state: "kpk",
    postalCode: "26010",
    country: "Pakistan",
    neighborhood: "Quam aperiam velit c",
    assessorsPArcelNumber: "816",
    latitude: 0,
    longitude: 0,
    sellerFinancing: false,
    oppertunityZone: false,
    description: "Dicta minim consequat Labore accusantium qui quae id est fugit ex saepe quos quae incidunt dolor",
    highlights: [
      "Dolores eu dolorum p",
      "Quam repudiandae et ",
      "Officia in qui nihil",
      "Laborum Sequi eaque",
      "Nulla iure quis reru",
      "Maiores sunt est q"
    ],
    confidentiality: "customCA",
    availableToBroker: false,
    visibility: false
  },
  {
    id: 3,
    isActive: false,
    createdAt: "2025-06-27T08:15:00.606Z",
    updatedAt: "2025-06-28T09:20:12.606Z",
    market: "retail",
    listingType: "retail",
    address: "456 Oak Avenue",
    address2: "",
    city: "Chicago",
    state: "IL",
    postalCode: "60601",
    country: "USA",
    neighborhood: "Downtown",
    assessorsPArcelNumber: "456",
    latitude: 41.8781,
    longitude: -87.6298,
    sellerFinancing: true,
    oppertunityZone: true,
    description: "Prime retail space in downtown Chicago with high foot traffic",
    highlights: [
      "Corner location with high visibility",
      "Large display windows",
      "Near public transportation",
      "Ample parking nearby",
      "Recently updated electrical",
      "Ready for immediate occupancy"
    ],
    confidentiality: "NDA",
    availableToBroker: true,
    visibility: true
  },
  {
    id: 4,
    isActive: true,
    createdAt: "2025-06-25T14:22:10.606Z",
    updatedAt: "2025-06-26T16:30:45.606Z",
    market: "industrial",
    listingType: "warehouse",
    address: "789 Industrial Blvd",
    address2: "",
    city: "Dallas",
    state: "TX",
    postalCode: "75201",
    country: "USA",
    neighborhood: "Industrial District",
    assessorsPArcelNumber: "789",
    latitude: 32.7767,
    longitude: -96.7970,
    sellerFinancing: false,
    oppertunityZone: true,
    description: "Large warehouse space with modern facilities and excellent transport links",
    highlights: [
      "30,000 sq ft warehouse space",
      "Loading docks for easy access",
      "Modern security system",
      "Climate controlled areas",
      "Office space included",
      "Close to major highways"
    ],
    confidentiality: "standard",
    availableToBroker: true,
    visibility: true
  },
  {
    id: 5,
    isActive: true,
    createdAt: "2025-06-20T09:45:30.606Z",
    updatedAt: "2025-06-27T11:15:20.606Z",
    market: "agriculture",
    listingType: "farmland",
    address: "1000 Rural Route",
    address2: "",
    city: "Sacramento",
    state: "CA",
    postalCode: "95814",
    country: "USA",
    neighborhood: "Rural County",
    assessorsPArcelNumber: "1000",
    latitude: 38.5816,
    longitude: -121.4944,
    sellerFinancing: true,
    oppertunityZone: false,
    description: "Productive farmland with irrigation infrastructure and equipment included",
    highlights: [
      "100 acres of fertile land",
      "Modern irrigation system",
      "Equipment included in sale",
      "Good access roads",
      "Nearby markets",
      "Potential for organic certification"
    ],
    confidentiality: "customCA",
    availableToBroker: true,
    visibility: true
  }
];

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would fetch data from a database
    // For now, we'll return mock data that matches the expected structure
    
    // Add a small delay to simulate network latency (only for development)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json(sampleListings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real application, you would validate and save the data to a database
    // For now, we'll just simulate a successful response
    
    // Create a new listing with the next ID (in a real app, the database would handle this)
    const newListing = {
      id: sampleListings.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
      ...body
    };
    
    // In a real application, you would insert this data into your database
    
    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}
