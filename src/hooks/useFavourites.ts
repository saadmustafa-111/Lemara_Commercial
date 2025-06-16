"use client"

import { useState, useEffect } from "react"

export interface FavouriteProperty {
  id: string
  title: string
  address: string
  price: number
  priceUnit: string
  area: number
  areaUnit: string
  propertyType: string
  status: string
  images: string[]
  date: string
  bedrooms?: number
  bathrooms?: number
  description?: string
}

// Dummy data for favorite properties
const dummyFavorites: FavouriteProperty[] = [
  {    id: "1",
    title: "Modern Downtown Apartment",
    address: "123 Main Street, Downtown, NY 10001",
    price: 3500,
    priceUnit: "monthly",
    area: 1200,
    areaUnit: "sq ft",
    propertyType: "Apartment",
    status: "For Rent",
    images: ["/images/cards/card-01.jpg"],
    date: "2024-01-15",
    bedrooms: 2,
    bathrooms: 2,
    description: "Beautiful modern apartment in the heart of downtown",
  },
  {
    id: "2",
    title: "Luxury Penthouse Suite",
    address: "456 Park Avenue, Upper East Side, NY 10021",
    price: 2500000,
    priceUnit: "total",
    area: 2800,
    areaUnit: "sq ft",
    propertyType: "Penthouse",
    status: "For Sale",
    images: ["/images/cards/card-02.jpg"],
    date: "2024-01-10",
    bedrooms: 3,
    bathrooms: 3,
    description: "Stunning penthouse with panoramic city views",
  },
  {
    id: "3",
    title: "Cozy Studio Loft",
    address: "789 Brooklyn Heights, Brooklyn, NY 11201",
    price: 2200,
    priceUnit: "monthly",
    area: 650,
    areaUnit: "sq ft",
    propertyType: "Studio",
    status: "For Rent",
    images: ["/images/cards/card-03.jpg"],
    date: "2024-01-08",
    bedrooms: 1,
    bathrooms: 1,
    description: "Charming studio loft with exposed brick walls",
  },
  {
    id: "4",
    title: "Family Townhouse",
    address: "321 Elm Street, Queens, NY 11375",
    price: 850000,
    priceUnit: "total",
    area: 2200,
    areaUnit: "sq ft",
    propertyType: "Townhouse",
    status: "For Sale",
    images: ["/images/grid-image/image-01.png"],
    date: "2024-01-05",
    bedrooms: 4,
    bathrooms: 3,
    description: "Spacious family townhouse with private garden",
  },
  {
    id: "5",
    title: "Waterfront Condo",
    address: "555 Harbor View, Staten Island, NY 10301",
    price: 4200,
    priceUnit: "monthly",
    area: 1800,
    areaUnit: "sq ft",
    propertyType: "Condo",
    status: "For Rent",
    images: ["/images/grid-image/image-02.png"],
    date: "2024-01-03",
    bedrooms: 3,
    bathrooms: 2,
    description: "Beautiful waterfront condo with marina access",
  },
  {
    id: "6",
    title: "Historic Brownstone",
    address: "888 Heritage Lane, Manhattan, NY 10025",
    price: 1200000,
    priceUnit: "total",
    area: 1900,
    areaUnit: "sq ft",
    propertyType: "Brownstone",
    status: "For Sale",
    images: ["/images/carousel/carousel-01.png"],
    date: "2024-01-01",
    bedrooms: 3,
    bathrooms: 2,
    description: "Beautifully restored historic brownstone",
  },
]

export function useFavourites() {
  const [favourites, setFavourites] = useState<FavouriteProperty[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setFavourites(dummyFavorites)
      setLoading(false)
    }, 1000)
  }, [])

  const isFavourite = (id: string): boolean => {
    return favourites.some((fav) => fav.id === id)
  }

  const addFavourite = (property: FavouriteProperty) => {
    if (!isFavourite(property.id)) {
      setFavourites((prev) => [...prev, property])
    }
  }

  const removeFavourite = (id: string) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== id))
  }

  return {
    favourites,
    loading,
    isFavourite,
    addFavourite,
    removeFavourite,
  }
}
