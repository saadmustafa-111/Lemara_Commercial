import Image from "next/image"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Trash2,
  Star,
  Share2,
  Clock,
  ChevronLeft,
  Filter,
  SlidersHorizontal,
  Grid2X2,
  List,
} from "lucide-react"

export default function MyFavoritesPage() {
  const savedProperties = [
    {
      id: 1,
      title: "Modern Luxury Apartment",
      price: "$2,850",
      period: "/month",
      location: "Downtown Manhattan, NY",
      size: "1,200 sq ft",
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      status: "For Rent",
      rating: 4.8,
      savedDate: "May 25, 2025",
      thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop",
      amenities: ["Parking", "Gym", "Pool", "Security"],
      description: "Stunning modern apartment with city views and premium amenities in the heart of Manhattan.",
    },
    {
      id: 2,
      title: "Spacious Family Villa",
      price: "$850,000",
      period: "",
      location: "Beverly Hills, CA",
      size: "3,500 sq ft",
      type: "Villa",
      bedrooms: 4,
      bathrooms: 3,
      status: "For Sale",
      rating: 4.9,
      savedDate: "May 22, 2025",
      thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&h=300&fit=crop",
      amenities: ["Garden", "Garage", "Pool", "Fireplace"],
      description: "Beautiful family villa with spacious rooms, private garden, and luxury finishes throughout.",
    },
    {
      id: 3,
      title: "Cozy Studio Loft",
      price: "$1,200",
      period: "/month",
      location: "SoHo, New York",
      size: "650 sq ft",
      type: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      status: "For Rent",
      rating: 4.6,
      savedDate: "May 18, 2025",
      thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop",
      amenities: ["WiFi", "AC", "Furnished", "Laundry"],
      description: "Charming studio loft in the heart of SoHo with exposed brick and modern amenities.",
    },
    {
      id: 4,
      title: "Executive Penthouse",
      price: "$1.2M",
      period: "",
      location: "Miami Beach, FL",
      size: "2,800 sq ft",
      type: "Penthouse",
      bedrooms: 3,
      bathrooms: 3,
      status: "For Sale",
      rating: 5.0,
      savedDate: "May 15, 2025",
      thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop",
      amenities: ["Ocean View", "Balcony", "Concierge", "Spa"],
      description: "Luxury penthouse with breathtaking ocean views, premium finishes, and world-class amenities.",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "For Sale":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white"
      case "For Rent":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
      case "Sold":
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Personal Header Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          {/* Back Button */}
          <div className="mb-8">
            <button className="flex items-center text-blue-200 hover:text-white transition-colors">
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              {/* User Section */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center text-white font-bold text-xl mr-4">
                  JD
                </div>
                <div>
                  <h2 className="text-white text-lg font-medium">John Doe's Collection</h2>
                  <p className="text-blue-200">Last updated: May 29, 2025</p>
                </div>
              </div>

              {/* Page Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">My Favorite Properties</h1>
              <p className="text-blue-200 text-lg max-w-2xl">
                Your personally curated collection of dream properties. Manage your favorites and stay updated on their
                status.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">{savedProperties.length}</div>
                <div className="text-blue-200 text-sm">Saved Properties</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">2</div>
                <div className="text-blue-200 text-sm">Recent Views</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">1</div>
                <div className="text-blue-200 text-sm">Scheduled Tours</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Sort by:</span>
              <select className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Date Saved (Newest)</option>
                <option>Price (High to Low)</option>
                <option>Price (Low to High)</option>
                <option>Rating</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Price Range</span>
              </button>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button className="p-2 bg-blue-500 text-white">
                  <Grid2X2 className="h-5 w-5" />
                </button>
                <button className="p-2 bg-white text-gray-500 hover:bg-gray-100">
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Favorites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProperties.map((property) => (
            <div
              key={property.id}
              className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="relative">
                {/* Property Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={property.thumbnail || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Status Badge */}
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${getStatusColor(
                      property.status,
                    )}`}
                  >
                    {property.status}
                  </span>

                  {/* Saved Date Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 flex items-center gap-1 shadow-lg">
                    <Clock className="h-3 w-3" />
                    Saved {property.savedDate}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="h-10 w-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
                      <Share2 className="h-4 w-4 text-blue-600" />
                    </button>
                    <button className="h-10 w-10 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:scale-110 transition-all duration-300">
                      <Trash2 className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Price Section */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">{property.price}</span>
                      <span className="text-gray-600">{property.period}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-900">{property.rating}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {property.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1 text-red-500" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-5 border-t border-b border-gray-100 py-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4 text-blue-500" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4 text-green-500" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4 text-purple-500" />
                        <span>{property.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Your Notes</span>
                      <button className="text-xs text-blue-600 hover:text-blue-800">Edit</button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 italic border border-gray-100">
                      {property.id === 1
                        ? "Great location, check availability for June move-in"
                        : property.id === 2
                          ? "Love the garden, need to schedule a second viewing"
                          : "Add notes about this property..."}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      Schedule Tour
                    </button>
                    <button className="px-4 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300">
                      Contact Agent
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (shown when no favorites) */}
        {savedProperties.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Saved Properties Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start saving properties you love to build your collection and keep track of your favorites.
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300">
              Browse Properties
            </button>
          </div>
        )}

        {/* Recently Viewed Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Viewed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2].map((item) => (
              <div
                key={`recent-${item}`}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-40">
                  <Image
                    src={`https://images.unsplash.com/photo-${
                      item === 1 ? "1560184897-502a475f7a0d" : "1568605114967-8130f3a36994"
                    }?w=500&h=300&fit=crop`}
                    alt="Recently viewed property"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Viewed today
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">
                    {item === 1 ? "Urban Loft Studio" : "Suburban Townhouse"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item === 1 ? "Brooklyn, NY" : "Pasadena, CA"} •{" "}
                    <span className="font-medium">{item === 1 ? "$1,800/mo" : "$650,000"}</span>
                  </p>
                  <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Add to Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
